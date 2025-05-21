import { document } from "./../../../../../../lib/db/schema";
import { NextResponse } from "next/server";
import { auth } from "@/app/(auth)/auth";
import { extractTextFromBlob } from "@/utils/parseFile";
import { z } from "zod";
import { generateEmbeddings } from "@/lib/ai/embedding";
// import { storeChunksWithEmbeddings } from "@/lib/db/queries";
import { insertDocumentSchema } from "@/lib/db/schema";
import { insertDocument, storeChunksWithEmbeddings } from "@/lib/db/queries";

const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ].includes(file.type),
      {
        message: "File type should be PDF or DOCX",
      }
    ),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const validation = FileSchema.safeParse({ file });
  if (!validation.success) {
    const errorMessage = validation.error.errors
      .map((e) => e.message)
      .join(", ");
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  try {
    const text = await extractTextFromBlob(file, file.name);
    let embeddings = null;
    if (text) {
      const [document] = await insertDocument(text);
      await storeChunksWithEmbeddings(document.id!, text);
    }
    return NextResponse.json({ text, embeddings }, { status: 200 });
  } catch (error) {
    console.error("Error from pdf-parse:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to parse file" },
      { status: 500 }
    );
  }
}

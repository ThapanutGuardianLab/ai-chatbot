import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/(auth)/auth";
import { extractTextFromBlob } from "@/utils/parseFile";
import { z } from "zod";
import {
  getDocumentAllByQuarter,
  getDocumentByQuarter,
  insertDocumentWithEmbeddings,
} from "@/lib/db/banking-performance/queries";

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
  console.log("session 👀 : ", session);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  const quarter = formData.get("quarter");

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (quarter === null || quarter === undefined) {
    return NextResponse.json({ error: "No quarter provided" }, { status: 400 });
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

    if (text) {
      const quarterStg = quarter as string;
      await insertDocumentWithEmbeddings(quarterStg, text);
      return new Response(null, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "No text extracted from file" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error from pdf-parse:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to parse file" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const quarte = searchParams.get("quarte");
  console.log(`Quarter: ${quarte}... 👀🔍`);

  if (!quarte) {
    return new Response("Missing documentId", { status: 400 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const documents = await getDocumentAllByQuarter({ quarterName: quarte });

  if (!documents) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(documents, { status: 200 });
}

import { auth } from "@/app/(auth)/auth";
import { getDocumentByQuarter } from "@/lib/db/banking-performance/queries";
import { type NextRequest } from "next/server";

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

  const documents = await getDocumentByQuarter({ quarterName: quarte });

  if (!documents) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(documents, { status: 200 });
}

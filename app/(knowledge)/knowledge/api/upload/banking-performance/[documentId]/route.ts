import { auth } from "@/app/(auth)/auth";
import { getDocumentById } from "@/lib/db/banking-performance/queries";
import { GetBankingPerformancesIdRequest } from "@/types/api/banking-performance/banking-performance.request";

export async function GET(
  request: Request,
  { params }: GetBankingPerformancesIdRequest
) {
  const { documentId } = await params;
  console.log("Document ID:", documentId);

  if (!documentId) {
    return new Response("Missing documentId", { status: 400 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const documents = await getDocumentById({ id: documentId });

  if (!documents) {
    return new Response("Not found", { status: 404 });
  }

  return Response.json(documents, { status: 200 });
}

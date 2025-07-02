import { MCP } from "@/enums/mcp";
import {
  MCPTransport,
  experimental_createMCPClient as createMCPClient,
} from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
// import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp";

export const mcpClient = async ({
  mode,
  endpoint,
}: {
  mode: MCP;
  endpoint?: string;
}): Promise<void> => {
  switch (mode) {
    case MCP.SSE:
      return await createSSEClient();
    case MCP.Stdio:
      return await createStdioClient();
    case MCP.StreamableHTTPClientTransport:
      return await createStreamableHTTPClientTransport(endpoint!);
    default:
      throw new Error(`Unsupported MCP mode: ${mode}`);
  }
};
const createSSEClient = async () => {
  console.log("Creating SSE client... 🌐");
  await createMCPClient({
    transport: {
      type: "sse",
      url: "https://n94rq6c7-3001.asse.devtunnels.ms/sse",
      /* headers: {
      Authorization: 'Bearer my-api-key',
    }, */
    },
  });
};

const createStdioClient = async () => {
  console.log("Creating Stdio client... 🌐");
  await await createMCPClient({
    transport: new StdioMCPTransport({
      command: "node",
      args: ["src/stdio/dist/server.js"],
    }),
  });
};
const createStreamableHTTPClientTransport = async (endpoint: string) => {
  console.log("Creating Streamable HTTP Client Transport... 🌐");
  const url = new URL(endpoint);
  await createMCPClient({
    transport: new StreamableHTTPClientTransport(url, {
      sessionId: "session_123",
    }),
  });
};

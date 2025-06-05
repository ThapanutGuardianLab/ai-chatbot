import { Document as LlamaDocument, Metadata } from "@llamaindex/core/schema";
import { LlamaParseReader } from "@llamaindex/cloud";

export const parseFinancialReportToMarkdown = async (
  file: Blob
): Promise<LlamaDocument<Metadata>[]> => {
  try {
    const reader = new LlamaParseReader({
      apiKey: process.env.LLAMA_CLOUD_API_KEY,
      resultType: "markdown",
      //   parse_mode: "parse_document_with_agent",
      // fastMode: false,
      // premiumMode: true,
      auto_mode: true,
      compact_markdown_table: true,
      splitByPage: true,
      doNotCache: true,
      disable_image_extraction: true,
      spreadsheet_extract_sub_tables: true,
      preserve_layout_alignment_across_pages: true,
      auto_mode_trigger_on_table_in_page: true,
      extract_layout: true,
      extract_charts: false,
      bbox_top: 0.1,
      bbox_bottom: 0.05,
      job_timeout_in_seconds: 1000,
      // output_tables_as_HTML: true,
    });

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const buffer = Buffer.from(uint8Array);

    return await reader.loadDataAsContent(buffer);
  } catch (error) {
    return [];
  }
};

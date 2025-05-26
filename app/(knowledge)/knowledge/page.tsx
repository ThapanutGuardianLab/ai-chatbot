"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SymbolIcon, UploadIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { InputMask, useMask } from "@react-input/mask";
import { Label } from "@radix-ui/react-label";

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useMask({
    mask: "Q_/__",
    replacement: { _: /\d/ },
  });
  const [dragActive, setDragActive] = useState(false);
  const [quarter, setQuarter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      e.preventDefault();
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("quarter", quarter);

    fetch("/knowledge/api/upload/banking-performance", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          console.error("API error:", data.error);
        } else {
          toast.success("File uploaded successfully!");
          console.log("API response:", data);
        }
      })
      .catch((err) => {
        console.log("Error uploading file:", err);
        toast.error("File upload failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      });
  };

  const formatValue = (value: string): string => {
    value = value.toUpperCase().replace(/[^Q0-9\/]/g, "");

    if (!value.startsWith("Q")) {
      value = "Q" + value.replace(/Q/g, "");
    }

    // Remove duplicate Q's except first
    value = value.replace(/Q+/g, "Q");

    // Enforce quarter digit 1-4 after Q
    if (value.length > 1) {
      const q = value[1];
      if (!/[1-4]/.test(q)) {
        value = value.slice(0, 1);
      }
    }

    // Insert slash if missing after quarter digit
    if (value.length === 2 && value[2] !== "/") {
      value = value + "/";
    }

    // Fix slash position if needed
    if (value.length > 2 && value[2] !== "/") {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    // Limit length to 5 (Qx/yy)
    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    return value;
  };
  const Content1 = () => {
    return (
      <div className=" flex flex-col h-screen items-center justify-center w-full p-3">
        <div className="w-full flex items-center gap-6 mb-4">
          <Label className="text-lg font-bold mb-2" htmlFor="quarterYear">
            Quarter/Year
          </Label>
          <input
            onBlur={(e) => setQuarter(formatValue(e.target.value))}
            defaultValue={quarter}
            ref={inputRef}
            placeholder="Qx/xx"
            className="border p-2 rounded-xl w-32"
          />
        </div>
        <div className="w-full relative">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`h-[400px] flex justify-center items-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className={`${!selectedFile ? "text-white" : "text-blue-600"}`}>
              {selectedFile
                ? `📄 ${selectedFile.name}`
                : "ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์ (.pdf, .docx)"}
            </p>
          </div>
          <Button
            disabled={!selectedFile}
            className={`absolute top-4 right-4 ${
              !selectedFile ? "!cursor-not-allowed" : "!cursor-pointer"
            }`}
            onClick={() => {
              setSelectedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
            <TrashIcon
              className={`${selectedFile ? "text-red-500" : "text-zinc-400"}`}
            />
          </Button>
        </div>
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || loading}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? (
            <SymbolIcon className="animate-spin mr-2" />
          ) : (
            <UploadIcon className="mr-2" />
          )}
          {loading ? "อัปโหลด..." : "อัปโหลดไฟล์"}
        </Button>
      </div>
    );
  };

  const Content2 = () => {
    return (
      <div className="relative flex flex-col h-screen items-center justify-center w-full bg-slate-200 text-black">
        {" "}
        Content 2
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center w-full p-3 gap-4">
      {/* <div className="grid grid-cols-2 gap-1"> */}
      <Content1 />
      {/* <Content2 /> */}
    </div>
  );
}

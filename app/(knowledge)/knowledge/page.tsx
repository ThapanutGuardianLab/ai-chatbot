"use client";

import { Button } from "@/components/ui/button";
import { SymbolIcon, UploadIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-label";

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
    if (!selectedFile) {
      toast.error("Something is wrong!!");
      return;
    }
    setLoading(true);

    const formData = new FormData();

    formData.append("file", selectedFile);

    fetch("/knowledge/api/upload/financial-report-emb", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) {
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
        setQuarter("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      });
  };

  const Content1 = () => {
    return (
      <div className=" flex flex-col h-screen items-center justify-center w-full p-3">
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
            disabled={!selectedFile || loading}
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
          disabled={!selectedFile || loading /* || !quarter */}
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

  return (
    <div className="flex flex-col h-screen items-center justify-center w-full p-3 gap-4">
      <Content1 />
    </div>
  );
}

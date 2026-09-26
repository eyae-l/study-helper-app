"use client";

import { useRef, useState } from "react";
import { extractTextFromFile, validateFileSize, formatFileSize } from "@/lib/file-utils";

interface FileUploadButtonProps {
  onFileContent: (content: string, fileName: string) => void;
  onError?: (error: string) => void;
  accept?: string;
  maxSizeMB?: number;
  variant?: "button" | "card";
  label?: string;
  icon?: React.ReactNode;
  description?: string;
}

export default function FileUploadButton({
  onFileContent,
  onError,
  accept = ".txt,.md,.doc,.docx",
  maxSizeMB = 10,
  variant = "button",
  label = "Upload File",
  icon,
  description = "TXT, MD, DOCX",
}: FileUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log("File selected:", file.name, file.type, file.size);
    setIsProcessing(true);

    try {
      // Validate file size
      if (!validateFileSize(file, maxSizeMB)) {
        const error = `File too large. Maximum size is ${maxSizeMB}MB. Your file is ${formatFileSize(file.size)}.`;
        console.error("File size error:", error);
        if (onError) {
          onError(error);
        } else {
          alert(error);
        }
        // Reset input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      console.log("Extracting text from file...");

      // Extract text from file
      const result = await extractTextFromFile(file);

      console.log("Extraction result:", result);

      if (result.error) {
        // Info log instead of error - this could be expected (like PDF not supported)
        console.info("File upload info:", result.error);
        if (onError) {
          onError(result.error);
        } else {
          alert(result.error);
        }
        // Reset input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      console.log("File content extracted successfully, length:", result.content.length);

      // Success
      onFileContent(result.content, result.fileName);

      // Reset input for future uploads
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = () => {
    console.log("Upload button clicked");
    fileInputRef.current?.click();
  };

  if (variant === "card") {
    return (
      <label className={`bg-black hover:bg-green-500/10 border border-green-500/30 hover:border-green-500/50 rounded-lg p-3 cursor-pointer transition-all group ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500/20 group-hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors">
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              icon || (
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )
            )}
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{isProcessing ? 'Processing...' : label}</p>
            <p className="text-gray-500 text-xs">{description}</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={isProcessing}
        />
      </label>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        disabled={isProcessing}
        className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-3 rounded-lg font-medium transition-colors border border-green-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </>
        ) : (
          <>
            {icon || (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
            {label}
          </>
        )}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}

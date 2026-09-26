"use client";

import { pasteFromClipboard } from "@/lib/file-utils";

interface PasteButtonProps {
  onPaste: (content: string) => void;
  onError?: (error: string) => void;
  variant?: "button" | "card";
  label?: string;
  icon?: React.ReactNode;
  description?: string;
}

export default function PasteButton({
  onPaste,
  onError,
  variant = "button",
  label = "Paste Text",
  icon,
  description = "Paste text",
}: PasteButtonProps) {
  const handlePaste = async () => {
    try {
      const text = await pasteFromClipboard();
      
      if (!text || text.trim().length === 0) {
        const error = "No text found in clipboard";
        if (onError) {
          onError(error);
        } else {
          alert(error);
        }
        return;
      }

      onPaste(text);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to paste from clipboard";
      if (onError) {
        onError(errorMsg);
      } else {
        alert(errorMsg);
      }
    }
  };

  if (variant === "card") {
    return (
      <button
        onClick={handlePaste}
        className="bg-black hover:bg-green-600/10 border border-green-500/30 hover:border-green-500/50 rounded-lg p-3 transition-all group"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600/20 group-hover:bg-green-600/30 rounded-lg flex items-center justify-center transition-colors">
            {icon || (
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )}
          </div>
          <div className="flex-1 text-left">
            <p className="text-white text-sm font-medium">{label}</p>
            <p className="text-gray-500 text-xs">{description}</p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handlePaste}
      className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-3 rounded-lg font-medium transition-colors border border-green-500/30 flex items-center justify-center gap-2"
    >
      {icon || (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )}
      {label}
    </button>
  );
}

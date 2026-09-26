// File upload and text extraction utilities
import mammoth from 'mammoth';

export interface FileUploadResult {
  content: string;
  fileName: string;
  fileType: string;
  error?: string;
}

/**
 * Extract text from various file types
 */
export async function extractTextFromFile(file: File): Promise<FileUploadResult> {
  const fileName = file.name;
  const fileType = file.type;
  const extension = fileName.split('.').pop()?.toLowerCase();

  console.log('extractTextFromFile called:', { fileName, fileType, extension });

  try {
    // Plain text files
    if (
      fileType === 'text/plain' ||
      fileType === 'text/markdown' ||
      extension === 'txt' ||
      extension === 'md'
    ) {
      console.log('Detected as text file, reading...');
      const content = await readAsText(file);
      console.log('Text file read successfully, length:', content.length);
      return { content, fileName, fileType: 'text' };
    }

    // PDF files - Direct users to use Paste button
    if (fileType === 'application/pdf' || extension === 'pdf') {
      console.info('PDF file detected - directing user to use Paste button');
      return {
        content: '',
        fileName,
        fileType: 'pdf',
        error: 'PDF upload is not supported. Please open your PDF, copy the text (Cmd+A, Cmd+C), and use the "Paste Text" button instead. This takes 10 seconds and works perfectly!',
      };
    }

    // Word documents
    if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword' ||
      extension === 'docx' ||
      extension === 'doc'
    ) {
      console.log('Detected as Word document, extracting text...');
      const content = await extractWordText(file);
      console.log('Word text extracted successfully, length:', content.length);
      return { content, fileName, fileType: 'word' };
    }

    // Unsupported file type
    return {
      content: '',
      fileName,
      fileType: 'unknown',
      error: `Unsupported file type: ${fileType || extension}. Supported formats: TXT, MD, DOCX. For PDFs: copy the text and use the Paste Text button.`,
    };
  } catch (error) {
    return {
      content: '',
      fileName,
      fileType: 'error',
      error: `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Read file as text
 */
function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      resolve(content);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Read file as ArrayBuffer
 */
function readAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as ArrayBuffer;
      resolve(content);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Clean extracted text from encoding issues - ULTRA AGGRESSIVE
 */
function cleanExtractedText(text: string): string {
  // STEP 1: Remove ALL known garbage characters
  let cleaned = text
    .replace(/�/g, '')  // Diamond question mark
    .replace(/\uFFFD/g, '')  // Replacement character  
    .replace(/[\uFFF0-\uFFFF]/g, '')  // Specials
    .replace(/[\uE000-\uF8FF]/g, ''); // Private use
  
  // STEP 2: Character-by-character filtering - ONLY keep readable characters
  const allowed = cleaned.split('').filter(char => {
    const code = char.charCodeAt(0);
    
    // Allow: space, tab, newline, carriage return
    if (code === 32 || code === 9 || code === 10 || code === 13) return true;
    
    // Allow: Basic ASCII printable (! to ~)
    // This includes: numbers, letters, punctuation
    if (code >= 33 && code <= 126) return true;
    
    // Allow: Extended Latin (À-ÿ) - for accented characters
    if (code >= 192 && code <= 255) return true;
    
    // REJECT everything else
    return false;
  }).join('');
  
  // STEP 3: Clean up formatting
  return allowed
    .replace(/  +/g, ' ')       // Multiple spaces → single space
    .replace(/\n +/g, '\n')     // Remove spaces after newline
    .replace(/ +\n/g, '\n')     // Remove spaces before newline  
    .replace(/\n\n\n+/g, '\n\n') // Multiple newlines → double newline
    .replace(/^\s+/g, '')       // Remove leading whitespace
    .replace(/\s+$/g, '')       // Remove trailing whitespace
    .trim();
}

/**
 * Extract text from Word document (.docx)
 */
async function extractWordText(file: File): Promise<string> {
  try {
    const arrayBuffer = await readAsArrayBuffer(file);
    
    // Use extractRawText for simpler extraction
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    if (result.messages.length > 0) {
      console.warn('Word extraction warnings:', result.messages);
    }
    
    // Apply aggressive cleaning to remove all garbage characters
    const cleanedText = cleanExtractedText(result.value);
    
    // Debug logging
    console.log('=== DOCX Extraction Debug ===');
    console.log('Original length:', result.value.length);
    console.log('Cleaned length:', cleanedText.length);
    console.log('First 200 chars (original):', result.value.substring(0, 200));
    console.log('First 200 chars (cleaned):', cleanedText.substring(0, 200));
    console.log('============================');
    
    // Check if we got reasonable text
    if (cleanedText.length < 10) {
      throw new Error('Could not extract readable text from this DOCX file. Please open the document, copy the text (Cmd+A, Cmd+C), and use the "Paste Text" button instead.');
    }
    
    return cleanedText;
  } catch (error) {
    console.error('Word extraction error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to extract text from Word document. Please try using the "Paste Text" button instead.');
  }
}

/**
 * Paste from clipboard
 */
export async function pasteFromClipboard(): Promise<string> {
  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (error) {
    throw new Error('Clipboard access denied. Please paste using Ctrl+V (Cmd+V on Mac)');
  }
}

/**
 * Validate file size (max 10MB for now)
 */
export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get supported file extensions
 */
export const SUPPORTED_TEXT_FILES = ['.txt', '.md', '.text', '.markdown'];
export const SUPPORTED_DOCUMENT_FILES = ['.doc', '.docx'];
export const SUPPORTED_AUDIO_FILES = ['.mp3', '.wav', '.m4a', '.ogg', '.webm'];

export const ALL_SUPPORTED_FILES = [
  ...SUPPORTED_TEXT_FILES,
  ...SUPPORTED_DOCUMENT_FILES,
];

/**
 * Check if file type is supported
 */
export function isSupportedFile(fileName: string): boolean {
  const extension = '.' + fileName.split('.').pop()?.toLowerCase();
  return ALL_SUPPORTED_FILES.includes(extension);
}

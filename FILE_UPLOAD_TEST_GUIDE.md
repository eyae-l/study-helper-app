# File Upload Testing Guide

## ✅ Supported File Formats

The upload button now supports the following file formats:

### 1. Plain Text Files (.txt)
- **Status**: ✅ Fully Supported
- **Library**: Native FileReader API
- **Test File**: `test-upload.txt`

### 2. Markdown Files (.md)
- **Status**: ✅ Fully Supported
- **Library**: Native FileReader API
- **Test File**: `test-sample.md`

### 3. PDF Files (.pdf)
- **Status**: ✅ Fully Supported
- **Library**: `pdfjs-dist` (Mozilla PDF.js)
- **Features**: 
  - Extracts text from all pages
  - Handles multi-page documents
  - Works with text-based PDFs (not scanned images)
- **Test**: Upload any PDF file from your computer

### 4. Word Documents (.docx)
- **Status**: ✅ Fully Supported
- **Library**: `mammoth`
- **Features**: 
  - Extracts plain text from DOCX files
  - Preserves paragraph structure
  - Handles basic formatting
- **Note**: Only DOCX format is fully supported (not older .doc format)
- **Test**: Upload any DOCX file from your computer

## 🧪 How to Test

1. **Go to Dashboard**
   - Navigate to http://localhost:3000/dashboard

2. **Choose a Panel**
   - Smart Notes
   - Summarizer
   - Quizzes
   - Mind Map

3. **Click "Upload File" Button**
   - You'll see a file picker dialog
   - The button shows a spinner while processing

4. **Select a File**
   - Choose from test files in the project:
     - `test-upload.txt` - Plain text
     - `test-sample.md` - Markdown
   - Or upload your own PDF/DOCX files

5. **Verify Results**
   - ✅ File content appears in the text area
   - ✅ Filename badge appears below
   - ✅ Can click X to remove and upload another file

## 🔍 Debug Information

Open browser Developer Console (F12 or Cmd+Option+I) to see detailed logs:

```
Upload button clicked
File selected: test-upload.txt text/plain 547
Extracting text from file...
extractTextFromFile called: {fileName: "test-upload.txt", fileType: "text/plain", extension: "txt"}
Detected as text file, reading...
Text file read successfully, length: 547
Extraction result: {content: "...", fileName: "test-upload.txt", fileType: "text"}
File content extracted successfully, length: 547
```

## 📦 Installed Libraries

```bash
npm install pdfjs-dist mammoth
```

- **pdfjs-dist**: Mozilla's PDF.js library for extracting text from PDF files
- **mammoth**: Microsoft Word DOCX to plain text converter

## ⚙️ Technical Details

### PDF Extraction
- Uses CDN for PDF.js worker: `cdnjs.cloudflare.com/ajax/libs/pdf.js/...`
- Extracts text page by page
- Handles multi-page documents automatically

### DOCX Extraction
- Uses mammoth.extractRawText() for plain text extraction
- Handles DOCX format (Office Open XML)
- Does not support older .doc format

### Error Handling
- File size validation (max 10MB by default)
- Unsupported file type messages
- Extraction error messages with details

## 🎯 Test Scenarios

### ✅ Success Cases
1. Upload .txt file → Content extracted
2. Upload .md file → Content extracted
3. Upload .pdf file → Text extracted from all pages
4. Upload .docx file → Text extracted

### ⚠️ Error Cases
1. File too large (>10MB) → Error message shown
2. Unsupported file type → Error message shown
3. Corrupted file → Extraction error shown

## 🐛 Troubleshooting

**Q: PDF upload shows blank content**
- A: The PDF might be image-based (scanned). PDF.js can only extract text from text-based PDFs, not images.

**Q: DOCX upload fails**
- A: Make sure it's a .docx file (not .doc). The older .doc format is not supported.

**Q: Button doesn't respond**
- A: Check browser console for errors. Make sure JavaScript is enabled.

**Q: Processing spinner never stops**
- A: Check console for errors. The file might be corrupted or too large.

## 📝 Notes

- Maximum file size: 10MB (configurable)
- PDF extraction works best with text-based PDFs
- DOCX extraction supports Office 2007+ format only
- All processing happens client-side (in the browser)
- No files are uploaded to a server

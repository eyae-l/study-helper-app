import {
  ArrowUpTrayIcon,
  DocumentIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ClipboardDocumentIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  ChartPieIcon,
  ClockIcon,
  RectangleStackIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

export default function UploadAnything() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Upload Anything */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ArrowUpTrayIcon className="w-5 h-5 text-gray-500" />
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                INPUTS
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Upload anything.
              <br />
              Master everything.
            </h2>
            <p className="text-gray-600 mb-8">
              PDFs, DOCX, plain notes, YouTube URLs … paste and
              we'll extract the key concepts in seconds.
            </p>

            {/* Upload box */}
            <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-gray-300 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-2">
                  <span className="text-blue-600 underline cursor-pointer">https://youtube.com/watch?v=...</span>
                </p>
                <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  Import
                </button>
              </div>
            </div>

            {/* File type icons */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <DocumentIcon className="w-4 h-4 text-gray-700" />
                </div>
                <span className="text-sm">PDF</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <DocumentTextIcon className="w-4 h-4 text-gray-700" />
                </div>
                <span className="text-sm">DOCX</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <VideoCameraIcon className="w-4 h-4 text-gray-700" />
                </div>
                <span className="text-sm">YouTube</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <ClipboardDocumentIcon className="w-4 h-4 text-gray-700" />
                </div>
                <span className="text-sm">Notes</span>
              </div>
            </div>
          </div>

          {/* Right side - Managed study services */}
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
              ALL-IN-ONE
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Managed study
              <br />
              services
            </h2>
            <p className="text-gray-600 mb-8">
              Fast and reliable study tools for your needs — all under one roof.
            </p>

            {/* Services list */}
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ChartBarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-black">Dashboard</span>
                </div>
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <QuestionMarkCircleIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-medium text-black">Quizzes</span>
                </div>
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <ChartPieIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium text-black">Analytics</span>
                </div>
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-5 h-5 text-yellow-600" />
                  </div>
                  <span className="font-medium text-black">AI Tutor</span>
                </div>
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <RectangleStackIcon className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium text-black">Flashcards</span>
                </div>
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <CalculatorIcon className="w-5 h-5 text-pink-600" />
                  </div>
                  <span className="font-medium text-black">Solver</span>
                </div>
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import {
  CpuChipIcon,
  LightBulbIcon,
  DocumentTextIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function HumanWriter() {
  const detectors = [
    { icon: <CpuChipIcon className="w-8 h-8" />, name: "AI" },
    { icon: <LightBulbIcon className="w-8 h-8" />, name: "Brain" },
    { icon: <DocumentTextIcon className="w-8 h-8" />, name: "Text" },
    { icon: <AdjustmentsHorizontalIcon className="w-8 h-8" />, name: "Target" },
    { icon: <ChartBarIcon className="w-8 h-8" />, name: "Data" },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CpuChipIcon className="w-5 h-5 text-gray-500" />
            <p className="text-gray-500 text-sm uppercase tracking-wider">
              Built in humanizer
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Drafts that read natural — across
            <br />
            detector-style checks
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Turn rough or AI-heavy text into clearer, more human writing. Choose how the
            model should act — from broad detector patterns to advanced mode — then edit and own the result.
          </p>
        </div>

        {/* Detector categories */}
        <div className="mb-12">
          <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-8">
            COMMON DETECTOR CATEGORIES WE DEFEND FOR
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {detectors.map((detector, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center w-20 h-20 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-gray-700">
                  {detector.icon}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6 max-w-2xl mx-auto">
            Names, thresholds, hallucinations. Tuft party, sketch deep, patch clean (each node yet)
            plankton and auditions' ecto, we can't guarantee any specific score.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
            Start for free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors border border-gray-300">
            Open humanizer
          </button>
        </div>
      </div>
    </section>
  );
}

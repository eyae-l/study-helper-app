export default function ActiveStudySets() {
  const studySets = [
    { name: "Organic Chem", progress: 76, color: "green" },
    { name: "Cell Biology", progress: 92, color: "blue" },
    { name: "World War II", progress: 45, color: "purple" },
    { name: "Linear Algebra", progress: 88, color: "orange" },
  ];

  return (
    <section className="bg-black py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-semibold text-lg">ACTIVE STUDY SETS</h3>
            <span className="text-gray-500 text-sm">4 of 12</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {studySets.map((set, index) => (
              <div key={index} className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                <h4 className="text-white font-medium mb-3">{set.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className={`text-${set.color}-400 font-medium`}>{set.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${set.color}-400`}
                      style={{ width: `${set.progress}%` }}
                    ></div>
                  </div>
                  <button className="text-gray-400 text-sm hover:text-white mt-2">
                    View materials →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

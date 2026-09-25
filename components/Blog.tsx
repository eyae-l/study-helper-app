import {
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Blog() {
  const blogPosts = [
    {
      category: "THE BLOG",
      title: "Why all-nighters quietly destroy your recall",
      description: "Watching memory rise & tumble bite. Here's how to structure a study session so the material actually has a chance to land.",
      image: "/placeholder-blog-1.jpg"
    },
    {
      category: "THE BLOG",
      title: "A short, honest guide to spaced repetition",
      description: "Simple explanation of the science behind it.",
      image: "/placeholder-blog-2.jpg"
    },
    {
      category: "TECHNICAL",
      title: "Inside Study Healper's adaptive engine",
      description: "How our AI adjusts to your learning patterns.",
      image: "/placeholder-blog-3.jpg"
    },
    {
      category: "LEARN ICAL",
      title: "Five recall habits that beat rereading every time",
      description: "Evidence-based techniques for better retention.",
      image: "/placeholder-blog-4.jpg"
    }
  ];

  return (
    <section id="blog" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
              BLOG
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black">
              Articles, stories
              <br />
              & more to learn
            </h2>
          </div>
          <button className="text-black hover:text-gray-600 transition-colors flex items-center gap-2 font-medium">
            View all blogs
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured post */}
          <div className="lg:row-span-3">
            <div className="bg-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <ClockIcon className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    5 MIN READ
                  </p>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {blogPosts[0].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {blogPosts[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Side posts */}
          <div className="space-y-6">
            {blogPosts.slice(1).map((post, index) => (
              <div key={index} className="flex gap-4 bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">
                    {post.category}
                  </p>
                  <h4 className="font-semibold text-black mb-1 leading-snug">
                    {post.title}
                  </h4>
                  <button className="text-gray-600 hover:text-black text-sm flex items-center gap-1 mt-2">
                    <span>→</span>
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

export default function Testimonials() {
  const testimonials = [
    {
      text: "Study Healper turned my 700 page bio/chem textbook into a series of daily quizzes. I went from struggling to top 10% of my class.",
      author: "Emily Thompson",
      title: "Pre-Med, Stanford",
      rating: 5
    },
    {
      text: "The spaced repetition is next level. My retention on algorithms doubled and I actually enjoy reviewing now.",
      author: "Tyler Jackson",
      title: "CS Major",
      rating: 5
    },
    {
      text: "I uploaded my AP Bio notes and had a 100-card deck in 30 seconds. Game changer for finals week!",
      author: "Madison Parker",
      title: "High School",
      rating: 5
    },
    {
      text: "Finally a study tool that treats students like real learners. Clean interface, smart AI, zero fluff.",
      author: "Ethan Walker",
      title: "Law, Harvard",
      rating: 5
    }
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-green-300/50 text-sm uppercase tracking-wider mb-4">
            TESTIMONIALS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            Don't take
            <br />
            our word for it
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div>
                  <p className="font-semibold text-black text-sm">{testimonial.author}</p>
                  <p className="text-green-300/50 text-xs">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

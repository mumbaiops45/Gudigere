import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Aarav Sharma",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      review:
        "Amazing toy quality! My son absolutely loves the remote control car. Delivery was super fast too.",
    },

    {
      id: 2,
      name: "Priya Verma",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      review:
        "Gudigere has the best toy collection online. The teddy bear was soft and premium quality.",
    },

    {
      id: 3,
      name: "Rohan Patel",
      image:
        "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 4,
      review:
        "Great prices and awesome packaging. Kids loved the LEGO set and educational toys.",
    },
  ];

  return (
    <div className="max-w-375 mx-auto px-6 lg:px-10 py-16">

      {/* HEADER */}
      <div className="text-center mb-14">

        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
          Customer Reviews
        </p>

        <h1 className="text-5xl font-extrabold text-gray-800 mt-4">
          What Parents Say
        </h1>

        <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
          Thousands of happy parents trust Gudigere
          for quality toys, amazing offers, and fast
          delivery.
        </p>
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 border border-gray-100"
          >

            {/* PROFILE */}
            <div className="flex items-center gap-4">

              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-pink-100"
              />

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {review.name}
                </h2>

                <p className="text-gray-500 text-sm">
                  Verified Customer
                </p>
              </div>
            </div>

            {/* STARS */}
            <div className="flex items-center gap-1 mt-6 text-yellow-400">

              {[...Array(review.rating)].map(
                (_, index) => (
                  <Star
                    key={index}
                    fill="currentColor"
                    size={22}
                  />
                )
              )}
            </div>

            {/* REVIEW TEXT */}
            <p className="text-gray-600 leading-relaxed mt-6 text-lg">
              "{review.review}"
            </p>

            {/* BOTTOM */}
            <div className="mt-8 flex items-center justify-between">

              <span className="text-sm text-gray-400">
                Purchased from Gudigere
              </span>

              <button className="text-cyan-700 hover:underline font-semibold">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
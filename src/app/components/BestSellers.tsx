"use client";

import { useEffect, useRef } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

export default function BestSellers() {
  const containerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 1,
      title: "Remote Racing Car",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200",
    },

    {
      id: 2,
      title: "Cute Teddy Bear",
      price: 899,
      image:
        "https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg",
    },

    {
      id: 3,
      title: "Smart Robot Toy",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1200",
    },

    {
      id: 4,
      title: "LEGO Building Set",
      price: 2999,
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200",
    },

    {
      id: 5,
      title: "Gaming Console",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200",
    },

    {
      id: 6,
      title: "Drone Flying Toy",
      price: 3499,
      image:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200",
    },
  ];

  // AUTO SLIDE
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const interval = setInterval(() => {
      if (
        container.scrollLeft +
          container.clientWidth >=
        container.scrollWidth - 10
      ) {
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: 320,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // MANUAL SLIDE
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-16">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Best Sellers
          </h1>

          <p className="text-gray-500 mt-2">
            Most loved toys by kids
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">

          <button
            onClick={scrollLeft}
            className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md flex items-center justify-center transition"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={scrollRight}
            className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md flex items-center justify-center transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <div
        ref={containerRef}
        // className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
        className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth no-scrollbar"
      >

        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[300px] bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300"
          >

            {/* IMAGE */}
            <div className="relative h-[320px] bg-gray-100 overflow-hidden">

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />

              {/* BADGE */}
              <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                30% OFF
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">

              <h2 className="text-xl font-bold text-gray-900 line-clamp-2">
                {product.title}
              </h2>

              {/* RATING */}
              <div className="flex items-center gap-1 mt-3">

                <div className="flex text-amber-400">
                  <Star fill="currentColor" size={17} />
                  <Star fill="currentColor" size={17} />
                  <Star fill="currentColor" size={17} />
                  <Star fill="currentColor" size={17} />
                  <Star fill="currentColor" size={17} />
                </div>

                <span className="text-sm text-gray-500 ml-2">
                  (120)
                </span>
              </div>

              {/* PRICE */}
              <div className="flex items-center gap-3 mt-4">

                <p className="text-3xl font-extrabold text-black">
                  ₹{product.price}
                </p>

                <p className="text-gray-400 line-through">
                  ₹{product.price + 1000}
                </p>
              </div>

              {/* BUTTON */}
              <button className="w-full mt-6 h-[50px] rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
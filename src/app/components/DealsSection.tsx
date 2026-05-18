"use client";

import { useEffect, useState } from "react";

export default function DealsSection() {
  // COUNTDOWN TIMER
  const calculateTimeLeft = () => {
    const difference =
      +new Date("2026-12-31") - +new Date();

    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),

        minutes: Math.floor(
          (difference / 1000 / 60) % 60
        ),

        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] =
    useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-375 mx-auto px-6 lg:px-10 py-14">

      {/* MAIN CONTAINER */}
      <div className="bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl overflow-hidden shadow-2xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

          {/* LEFT SIDE IMAGE */}
          <div className="relative h-125">

            <img
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200"
              alt="Deal Toy"
              className="w-full h-full object-cover"
            />

            {/* DISCOUNT BADGE */}
            <div className="absolute top-6 left-6 bg-yellow-400 text-black px-5 py-3 rounded-full font-extrabold text-xl shadow-lg animate-bounce">
              50% OFF
            </div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="text-white p-10 lg:p-16">

            <p className="uppercase tracking-[4px] text-pink-200 font-semibold">
              Limited Time Offer
            </p>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mt-4">
              Remote Control Racing Car
            </h1>

            <p className="mt-6 text-lg text-gray-200 leading-relaxed">
              Grab the hottest toy of the season with
              exclusive discounts. Perfect gift for
              kids who love speed and adventure.
            </p>

            {/* PRICE */}
            <div className="flex items-center gap-4 mt-8">

              <p className="text-5xl font-extrabold">
                ₹1499
              </p>

              <p className="text-2xl line-through text-pink-200">
                ₹2999
              </p>
            </div>

            {/* TIMER */}
            <div className="flex gap-5 mt-10">

              {/* HOURS */}
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-5 text-center min-w-25">
                <h2 className="text-4xl font-extrabold">
                  {timeLeft.hours}
                </h2>

                <p className="text-sm mt-1">
                  Hours
                </p>
              </div>

              {/* MINUTES */}
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-5 text-center min-w-25">
                <h2 className="text-4xl font-extrabold">
                  {timeLeft.minutes}
                </h2>

                <p className="text-sm mt-1">
                  Minutes
                </p>
              </div>

              {/* SECONDS */}
              <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-5 text-center min-w-25">
                <h2 className="text-4xl font-extrabold">
                  {timeLeft.seconds}
                </h2>

                <p className="text-sm mt-1">
                  Seconds
                </p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-5 mt-10">

              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg transition shadow-lg">
                Buy Now
              </button>

              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-8 py-4 rounded-full font-bold text-lg transition border border-white/30">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
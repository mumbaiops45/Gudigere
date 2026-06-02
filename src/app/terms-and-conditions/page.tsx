// app/terms-and-conditions/page.tsx

"use client";

import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <div className="bg-black text-white min-h-screen px-6 py-16">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 px-4 py-2 border border-pink-400 text-pink-400 rounded-lg hover:bg-pink-400 hover:text-black transition-all"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold mb-8 text-pink-400">
          Terms & Conditions
        </h1>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Acceptance of Terms
            </h2>
            <p>
              By accessing this website, you agree to comply with these Terms &
              Conditions.
            </p>
          </section>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-400">
          Design & Developed by{" "}
          <a
            href="https://www.nakshatranamahacreations.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 font-semibold hover:text-pink-300 transition-colors"
          >
            Nakshatra Namaha Creations
          </a>
        </div>
      </div>
    </div>
  );
}
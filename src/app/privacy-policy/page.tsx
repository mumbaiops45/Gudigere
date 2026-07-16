"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
   <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
  <div className="mx-auto w-full max-w-4xl rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-8 lg:px-12 lg:py-10">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center rounded-lg border border-pink-500 px-4 py-2 text-sm font-medium text-pink-500 transition-all hover:bg-pink-500 hover:text-white"
          // className="mb-8 rounded-lg border border-pink-500 px-5 py-2 text-pink-400 transition hover:bg-pink-500 hover:text-white"
        >
          ← Back
        </button>

          <h1 className="mb-4 text-3xl font-bold text-pink-500 sm:text-4xl">
          Privacy Policy
        </h1>

        <p className="mb-8 text-base leading-7 text-gray-600">
          At <strong>GoodieGear</strong>, we respect your privacy and are
          committed to protecting your personal information. This Privacy Policy
          explains how we collect, use, store, and safeguard your information
          when you use our website and services.
        </p>

        <div className="space-y-8 text-base leading-7 text-gray-600">

          <section>
           <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              1. Information We Collect
            </h2>
           <p className="leading-7 text-justify">
              We may collect personal information including your full name,
              email address, phone number, billing address, shipping address,
              payment details, and account information when you register,
              purchase products, or contact us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              2. How We Use Your Information
            </h2>
            <p>
              Your information helps us process orders, deliver products,
              provide customer support, improve our website, send important
              notifications, and communicate promotional offers where permitted.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              3. Payment Security
            </h2>
            <p>
              Payments are processed securely through trusted third-party
              payment gateways. We do not store your complete debit or credit
              card information on our servers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              4. Cookies
            </h2>
            <p>
              We use cookies to improve website performance, remember your
              preferences, analyze traffic, and enhance your shopping
              experience.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              5. Information Sharing
            </h2>
            <p>
              We never sell or rent your personal information. Information is
              shared only with trusted partners such as payment processors,
              delivery providers, and legal authorities when required.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              6. Data Security
            </h2>
            <p>
              We use industry-standard security measures to protect your
              information against unauthorized access, misuse, disclosure, or
              alteration.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              7. Your Rights
            </h2>
            <p>
              You may request to access, update, or delete your personal
              information by contacting our customer support team, subject to
              applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              8. Changes to this Policy
            </h2>
            <p>
              GoodieGear reserves the right to modify this Privacy Policy at any
              time. Updated versions will be posted on this page with immediate
              effect.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              9. Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, please
              contact our customer support through the Contact Us page.
            </p>
          </section>

        </div>

     

      </div>
    </div>
  );
}
"use client";

import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-gray-200 bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-8 lg:px-12 lg:py-10">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center rounded-lg border border-pink-500 px-4 py-2 text-sm font-medium text-pink-500 transition-all hover:bg-pink-500 hover:text-white"
        >
          ← Back
        </button>

        {/* Heading */}
        <h1 className="mb-4 text-3xl font-bold text-pink-500 sm:text-4xl">
          Terms & Conditions
        </h1>

        <p className="mb-8 text-base leading-7 text-gray-600">
          Welcome to <strong>GoodieGear</strong>. By accessing or using our
          website, you agree to comply with these Terms & Conditions. Please
          read them carefully before using our services.
        </p>

        <div className="space-y-8 text-base leading-7 text-gray-600">

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              1. Acceptance of Terms
            </h2>
            <p className="leading-7 text-justify">
              By accessing or using GoodieGear, you agree to be legally bound by
              these Terms & Conditions. If you do not agree, please discontinue
              using this website immediately.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              2. User Accounts
            </h2>
            <p className="leading-7 text-justify">
              You are responsible for maintaining the confidentiality of your
              login credentials and for all activities performed through your
              account. Please ensure that the information you provide during
              registration is accurate and up to date.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              3. Orders & Payments
            </h2>
            <p className="leading-7 text-justify">
              All orders are subject to product availability and confirmation.
              Prices displayed on the website may change without prior notice.
              Orders are processed only after successful payment verification.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              4. Shipping & Delivery
            </h2>
            <p className="leading-7 text-justify">
              We aim to deliver products within the estimated delivery period.
              Delivery times may vary depending on courier services, location,
              holidays, or other unforeseen circumstances.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              5. Returns & Refunds
            </h2>
            <p className="leading-7 text-justify">
              Returns, exchanges, and refunds are governed by our Return Policy.
              Products must be returned in unused condition with original
              packaging wherever applicable.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              6. Intellectual Property
            </h2>
            <p className="leading-7 text-justify">
              All content on this website, including logos, graphics, images,
              text, product descriptions, icons, and software, is the property
              of GoodieGear and is protected by applicable intellectual property
              laws. Unauthorized reproduction or distribution is prohibited.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              7. User Responsibilities
            </h2>
            <p className="leading-7 text-justify">
              You agree not to misuse the website, upload malicious content,
              interfere with website functionality, attempt unauthorized access,
              or engage in unlawful activities while using our platform.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              8. Limitation of Liability
            </h2>
            <p className="leading-7 text-justify">
              GoodieGear shall not be liable for any indirect, incidental,
              consequential, or special damages arising from the use of this
              website, products, or services to the maximum extent permitted by
              law.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              9. Changes to Terms
            </h2>
            <p className="leading-7 text-justify">
              We reserve the right to update or modify these Terms &
              Conditions at any time. Changes become effective immediately after
              being published on this page.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              10. Governing Law
            </h2>
            <p className="leading-7 text-justify">
              These Terms & Conditions shall be governed by and interpreted in
              accordance with the laws of India. Any disputes shall be subject
              to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
              11. Contact Us
            </h2>
            <p className="leading-7 text-justify">
              If you have any questions regarding these Terms & Conditions,
              please contact our customer support team through the Contact Us
              page. We will be happy to assist you.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
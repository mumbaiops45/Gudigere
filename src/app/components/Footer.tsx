import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#131A22] text-white mt-16">

      {/* TOP */}
      <div className="border-b border-gray-700">

        <div className="max-w-375 mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* COLUMN 1 */}
          <div>

            <h1 className="text-4xl font-extrabold">
              <span className="text-yellow-400">
                Gudi
              </span>
              gere
            </h1>

            <p className="text-gray-400 mt-5 leading-relaxed">
              India's biggest multi-vendor toy
              marketplace with amazing toys, games,
              learning kits, and fun products for
              kids of all ages.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">

              <button className="bg-white/10 hover:bg-pink-500 transition p-3 rounded-full text-xl">
                <FaFacebookF />
              </button>

              <button className="bg-white/10 hover:bg-pink-500 transition p-3 rounded-full text-xl">
                <FaInstagram />
              </button>

              <button className="bg-white/10 hover:bg-pink-500 transition p-3 rounded-full text-xl">
                <FaTwitter />
              </button>

              <button className="bg-white/10 hover:bg-pink-500 transition p-3 rounded-full text-xl">
                <FaYoutube />
              </button>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div>

            <h2 className="text-2xl font-bold mb-6">
              Shop
            </h2>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-white cursor-pointer">
                Remote Cars
              </li>

              <li className="hover:text-white cursor-pointer">
                Teddy Bears
              </li>

              <li className="hover:text-white cursor-pointer">
                LEGO Sets
              </li>

              <li className="hover:text-white cursor-pointer">
                Educational Toys
              </li>

              <li className="hover:text-white cursor-pointer">
                Video Games
              </li>
            </ul>
          </div>

          {/* COLUMN 3 */}
          <div>

            <h2 className="text-2xl font-bold mb-6">
              Company
            </h2>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-white cursor-pointer">
                About Us
              </li>

              <li className="hover:text-white cursor-pointer">
                Careers
              </li>

              <li className="hover:text-white cursor-pointer">
                Vendor Partner
              </li>

              <li className="hover:text-white cursor-pointer">
                Press
              </li>

              <li className="hover:text-white cursor-pointer">
                Blog
              </li>
            </ul>
          </div>

          {/* COLUMN 4 */}
          <div>

            <h2 className="text-2xl font-bold mb-6">
              Support
            </h2>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-white cursor-pointer">
                Help Center
              </li>

              <li className="hover:text-white cursor-pointer">
                Returns
              </li>

              <li className="hover:text-white cursor-pointer">
                Shipping Info
              </li>

              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-white cursor-pointer">
                Terms & Conditions
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="max-w-375 mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">

        <p>
          © 2026 Gudigere. All rights reserved.
        </p>

        <div className="flex gap-6">

          <span className="hover:text-white cursor-pointer">
            Privacy
          </span>

          <span className="hover:text-white cursor-pointer">
            Terms
          </span>

          <span className="hover:text-white cursor-pointer">
            Cookies
          </span>
        </div>
      </div>
    </footer>
  );
}
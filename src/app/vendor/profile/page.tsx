"use client";

import { useEffect } from "react";

import {
  Store,
  Mail,
  BadgeCheck,
  Pencil,
} from "lucide-react";

import useVendorProfile from "../../../hooks/useVendorProfile";

export default function VendorProfilePage() {

  const {
    vendor,
    loading,
    fetchVendorProfile,
  } = useVendorProfile();

  useEffect(() => {
    fetchVendorProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-10">

        Loading...

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* TOP */}
      <div className="bg-white rounded-[30px] border border-gray-200 p-8">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

          {/* LEFT */}
          <div className="flex items-center gap-6">

            {/* LOGO */}
            <div className="w-28 h-28 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center">

              {vendor?.shopLogo ? (
                <img
                  src={
                    vendor.shopLogo
                  }
                  alt={
                    vendor.shopName
                  }
                  className="w-full h-full object-cover"
                />
              ) : (
                <Store
                  size={42}
                  className="text-pink-600"
                />
              )}

            </div>

            {/* INFO */}
            <div>

              <div className="flex items-center gap-3">

                <h1 className="text-4xl font-black text-black">

                  {
                    vendor?.shopName
                  }

                </h1>

                {vendor?.isApproved && (
                  <BadgeCheck
                    className="text-green-500"
                    size={28}
                  />
                )}

              </div>

              <p className="text-gray-500 mt-3 max-w-2xl leading-relaxed">

                {
                  vendor?.shopDescription
                }

              </p>

              {/* USER */}
              <div className="flex items-center gap-3 mt-5 text-gray-600">

                <Mail size={18} />

                <span>

                  {
                    vendor?.user
                      ?.email
                  }

                </span>

              </div>

            </div>

          </div>

          {/* BUTTON */}
          <button className="h-[56px] px-7 rounded-2xl bg-pink-500 hover:bg-pink-600 transition text-white font-semibold flex items-center justify-center gap-3">

            <Pencil size={18} />

            Edit Profile

          </button>

        </div>

      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* STATUS */}
        <div className="bg-white rounded-[30px] border border-gray-200 p-7">

          <h2 className="text-xl font-black text-black mb-5">

            Vendor Status

          </h2>

          <div className="flex items-center gap-3">

            <div
              className={`w-4 h-4 rounded-full ${
                vendor?.isApproved
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            />

            <span className="font-semibold text-lg">

              {vendor?.isApproved
                ? "Approved Vendor"
                : "Pending Approval"}

            </span>

          </div>

        </div>

        {/* ROLE */}
        <div className="bg-white rounded-[30px] border border-gray-200 p-7">

          <h2 className="text-xl font-black text-black mb-5">

            Account Role

          </h2>

          <p className="text-lg font-semibold text-gray-700 capitalize">

            {
              vendor?.user
                ?.role
            }

          </p>

        </div>

        {/* SHOP */}
        <div className="bg-white rounded-[30px] border border-gray-200 p-7">

          <h2 className="text-xl font-black text-black mb-5">

            Shop Name

          </h2>

          <p className="text-lg font-semibold text-gray-700">

            {
              vendor?.shopName
            }

          </p>

        </div>

      </div>

    </div>
  );
}
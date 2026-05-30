"use client";

import { useState } from "react";

import {
  Check,
  Eye,
  Search,
  X,
} from "lucide-react";

import useVendor from "../../../hooks/useVendor";

import {
  approveVendor,
} from "../../../services/vendorService";

interface Vendor {
  _id: string;

  shopName: string;

  shopDescription: string;

  isApproved: boolean;

  user: {
    name: string;

    email: string;

    role: string;
  };
}

export default function VendorsPage() {
  const {
    vendors,
    fetchVendors,
  } = useVendor();

  const [search, setSearch] =
    useState("");

  const [
    viewVendor,
    setViewVendor,
  ] = useState<Vendor | null>(
    null
  );

  // APPROVE
  const handleApprove =
    async (id: string) => {
      try {
        await approveVendor(
          id
        );

        alert(
          "Vendor approved successfully"
        );

        fetchVendors();

      } catch (error) {
        console.log(error);
      }
    };

  // FILTER
  const filteredVendors =
    Array.isArray(vendors)
      ? vendors.filter(
          (vendor: Vendor) =>
            vendor.shopName
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        )
      : [];

  return (
    <div className="bg-white rounded-[25px] border border-gray-200 p-6">

      {/* TOP */}
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl font-bold text-black">

          Vendor Requests

        </h1>

        {/* SEARCH */}
        <div className="relative">

          <Search
            size={18}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-gray-100 border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-pink-500 w-[250px]"
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-gray-200 rounded-2xl">

        <table className="w-full">

          {/* HEAD */}
          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Vendor

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Email

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Shop Name

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Status

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Actions

              </th>

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {filteredVendors.map(
              (
                vendor: Vendor
              ) => (
                <tr
                  key={
                    vendor._id
                  }
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >

                  {/* NAME */}
                  <td className="px-6 py-4 font-semibold text-black">

                    {
                      vendor.user
                        ?.name
                    }

                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 text-gray-500">

                    {
                      vendor.user
                        ?.email
                    }

                  </td>

                  {/* SHOP */}
                  <td className="px-6 py-4 text-black font-medium">

                    {
                      vendor.shopName
                    }

                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">

                    {vendor.isApproved ? (
                      <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">

                        Approved

                      </span>
                    ) : (
                      <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">

                        Pending

                      </span>
                    )}

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      {/* VIEW */}
                      <button
                        onClick={() =>
                          setViewVendor(
                            vendor
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                      >

                        <Eye
                          size={18}
                        />

                      </button>

                      {/* APPROVE */}
                      {!vendor.isApproved && (
                        <button
                          onClick={() =>
                            handleApprove(
                              vendor._id
                            )
                          }
                          className="w-10 h-10 rounded-xl bg-pink-500 text-white hover:bg-pink-600 flex items-center justify-center transition"
                        >

                          <Check
                            size={18}
                          />

                        </button>
                      )}

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* VIEW MODAL */}
      {viewVendor && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">

          <div className="bg-white w-full max-w-2xl rounded-[25px] p-8 relative">

            {/* CLOSE */}
            <button
              onClick={() =>
                setViewVendor(
                  null
                )
              }
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >

              <X size={18} />

            </button>

            {/* TITLE */}
            <h2 className="text-4xl font-bold text-black mb-8">

              Vendor Details

            </h2>

            <div className="space-y-6">

              {/* USER */}
              <div>

                <p className="text-sm text-gray-400">

                  Vendor Name

                </p>

                <h3 className="text-2xl font-bold text-black mt-2">

                  {
                    viewVendor.user
                      ?.name
                  }

                </h3>

              </div>

              {/* EMAIL */}
              <div>

                <p className="text-sm text-gray-400">

                  Email

                </p>

                <h3 className="text-xl font-semibold text-black mt-2">

                  {
                    viewVendor.user
                      ?.email
                  }

                </h3>

              </div>

              {/* SHOP */}
              <div>

                <p className="text-sm text-gray-400">

                  Shop Name

                </p>

                <h3 className="text-xl font-semibold text-black mt-2">

                  {
                    viewVendor.shopName
                  }

                </h3>

              </div>

              {/* DESCRIPTION */}
              <div>

                <p className="text-sm text-gray-400">

                  Shop Description

                </p>

                <p className="text-gray-600 leading-relaxed mt-2">

                  {
                    viewVendor.shopDescription
                  }

                </p>

              </div>

              {/* STATUS */}
              <div>

                <p className="text-sm text-gray-400">

                  Approval Status

                </p>

                <div className="mt-3">

                  {viewVendor.isApproved ? (
                    <span className="bg-green-100 text-green-600 px-5 py-2 rounded-full text-sm font-semibold">

                      Approved

                    </span>
                  ) : (
                    <span className="bg-pink-100 text-pink-600 px-5 py-2 rounded-full text-sm font-semibold">

                      Pending Approval

                    </span>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
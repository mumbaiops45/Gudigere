"use client";

import {
  Package,
  ShoppingBag,
  Wallet,
  Truck,
} from "lucide-react";

// import useVendorDashboard from "../../../hooks/useVendorDashboard";
import useVendorDashboard from "../../hooks/useVendorDashboard";

export default function VendorDashboardPage() {

  const {
    data,
    loading,
    error,
  } =
    useVendorDashboard();

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  const totalOrders =
    data?.earnings
      ?.totalOrders || 0;

  const totalEarnings =
    data?.earnings
      ?.totalEarnings || 0;

  const totalProducts =
    data?.products?.length ||
    0;

  const pendingOrders =
    data?.orders?.filter(
      (
        order: any
      ) =>
        order.orderStatus ===
        "Processing"
    ).length || 0;

  return (
    <div className="p-6">

      {/* TITLE */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-black">

          Vendor Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Welcome back 👋

        </p>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* EARNINGS */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Total Earnings

              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-600">

                ₹
                {totalEarnings}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

              <Wallet
                className="text-green-600"
              />

            </div>

          </div>

        </div>

        {/* ORDERS */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Total Orders

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {totalOrders}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

              <ShoppingBag
                className="text-blue-600"
              />

            </div>

          </div>

        </div>

        {/* PRODUCTS */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Products

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {totalProducts}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center">

              <Package
                className="text-pink-600"
              />

            </div>

          </div>

        </div>

        {/* PENDING */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500">

                Pending Orders

              </p>

              <h2 className="text-3xl font-bold mt-2 text-orange-600">

                {pendingOrders}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

              <Truck
                className="text-orange-600"
              />

            </div>

          </div>

        </div>

      </div>

      {/* RECENT ORDERS */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 mt-8 shadow-sm">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold">

            Recent Orders

          </h2>

        </div>

        <div className="space-y-4">

          {data?.orders
            ?.slice(0, 5)
            .map(
              (
                order: any
              ) => (

                <div
                  key={
                    order._id
                  }
                  className="flex items-center justify-between border border-gray-100 rounded-2xl p-4"
                >

                  <div>

                    <h3 className="font-semibold">

                      {
                        order.user
                          ?.name
                      }

                    </h3>

                    <p className="text-sm text-gray-500 mt-1">

                      {
                        order.user
                          ?.email
                      }

                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-lg">

                      ₹
                      {
                        order.totalPrice
                      }

                    </p>

                    <p className="text-sm text-gray-500">

                      {
                        order.orderStatus
                      }

                    </p>

                  </div>

                </div>
              )
            )}

        </div>

      </div>

    </div>
  );
}
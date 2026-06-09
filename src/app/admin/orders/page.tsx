"use client";

import { useState } from "react";

import {
  Eye,
  Search,
  X,
} from "lucide-react";

import useOrder from "../../../hooks/useVendorOrders";

import {
  Order,
  updateOrderStatus,
} from "../../../services/orderService";

export default function OrdersPage() {

  const {
    orders,
    fetchOrders,
  } = useOrder();

  const [search, setSearch] =
    useState("");

  const [
    viewOrder,
    setViewOrder,
  ] = useState<Order | null>(
    null
  );

  // STATUS UPDATE
  const handleStatusChange =
    async (
      id: string,
      status: string
    ) => {
      try {
        await updateOrderStatus(
          id,
          status
        );

        fetchOrders();

      } catch (error) {
        console.log(error);
      }
    };

  // FILTER
  const filteredOrders =
    Array.isArray(orders)
      ? orders.filter(
          (
            order: Order
          ) =>
            order.user?.name
              ?.toLowerCase()
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

          Orders

        </h1>

        {/* SEARCH */}
        <div className="relative">

          <Search
            size={18}
            className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-gray-100 border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-pink-500 w-[260px]"
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

                Customer

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Amount

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Payment

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Delivery

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Date

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Actions

              </th>

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {filteredOrders.map(
              (
                order: Order
              ) => (
                <tr
                  key={
                    order._id
                  }
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >

                  {/* USER */}
                  <td className="px-6 py-4">

                    <div>

                      <h3 className="font-semibold text-black">

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

                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4 font-semibold text-black">

                    ₹
                    {
                      order.totalPrice
                    }

                  </td>

                  {/* PAYMENT */}
                  <td className="px-6 py-4">

                    {order.paymentStatus ===
                    "Paid" ? (
                      <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">

                        Paid

                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">

                        Pending

                      </span>
                    )}

                  </td>

                  {/* DELIVERY */}
                  <td className="px-6 py-4">

                    <select
                      value={
                        order.orderStatus
                      }
                      onChange={(
                        e
                      ) =>
                        handleStatusChange(
                          order._id,
                          e.target
                            .value
                        )
                      }
                      className="border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-pink-500"
                    >

                      <option>
                        Processing
                      </option>

                      <option>
                        Shipped
                      </option>

                      <option>
                        Delivered
                      </option>

                      <option>
                        Cancelled
                      </option>

                    </select>

                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-gray-500">

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <button
                      onClick={() =>
                        setViewOrder(
                          order
                        )
                      }
                      className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                    >

                      <Eye
                        size={18}
                      />

                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* VIEW MODAL */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">

          <div className="bg-white w-full max-w-3xl rounded-[25px] overflow-hidden relative p-8">

            {/* CLOSE */}
            <button
              onClick={() =>
                setViewOrder(
                  null
                )
              }
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >

              <X size={18} />

            </button>

            {/* TITLE */}
            <h2 className="text-4xl font-bold text-black mb-8">

              Order Details

            </h2>

            {/* USER */}
            <div className="mb-8">

              <h3 className="text-2xl font-semibold text-black">

                {
                  viewOrder.user
                    ?.name
                }

              </h3>

              <p className="text-gray-500 mt-2">

                {
                  viewOrder.user
                    ?.email
                }

              </p>

            </div>

            {/* PRODUCTS */}
            <div className="space-y-5">

              {viewOrder.orderItems?.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="flex items-center gap-5 border border-gray-200 rounded-2xl p-4"
                  >

                    <img
                      src={
                        item.product
                         ?.image || "/no-image.png"
                      }
                      alt={
                        item.product?.title || "Product"
                      }
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div>

                      <h4 className="font-semibold text-black text-lg">

                        {
                          item.product
                            ?.title
                        }

                      </h4>

                      <p className="text-gray-500 mt-2">

                        Quantity:
                        {
                          item.quantity
                        }

                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

            {/* TOTAL */}
            <div className="mt-8 bg-pink-50 rounded-2xl p-6">

              <h3 className="text-3xl font-bold text-pink-600">

                Total:
                ₹
                {
                  viewOrder.totalPrice
                }

              </h3>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
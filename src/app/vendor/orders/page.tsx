"use client";

import useVendorOrders from "@/hooks/useVendorOrders";

export default function VendorOrdersPage() {

  const {
    orders,
    loading,
    error,
  } = useVendorOrders();

  if (loading) {
    return (
      <div className="p-10 text-center text-lg">
        Loading Orders...
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

  return (
    <div className="p-6">

      {/* PAGE TITLE */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Vendor Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage customer orders
        </p>
      </div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          No orders found
        </div>
      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white border rounded-2xl shadow-sm p-6"
            >

              {/* TOP */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>
                  <h2 className="text-lg font-bold">
                    Order #
                    {order._id.slice(-6)}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-3">

                  <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                    {order.orderStatus}
                  </span>

                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    {order.paymentStatus}
                  </span>

                </div>
              </div>

              {/* CUSTOMER */}
              <div className="mb-6">

                <h3 className="font-semibold mb-2">
                  Customer Details
                </h3>

                <div className="text-sm text-gray-700 space-y-1">

                  <p>
                    Name:{" "}
                    {order.user?.name}
                  </p>

                  <p>
                    Email:{" "}
                    {order.user?.email}
                  </p>

                </div>
              </div>

              {/* SHIPPING */}
              <div className="mb-6">

                <h3 className="font-semibold mb-2">
                  Shipping Address
                </h3>

                <div className="text-sm text-gray-700 space-y-1">

                  <p>
                    {
                      order
                        .shippingAddress
                        ?.fullName
                    }
                  </p>

                  <p>
                    {
                      order
                        .shippingAddress
                        ?.mobile
                    }
                  </p>

                  <p>
                    {
                      order
                        .shippingAddress
                        ?.address
                    }
                    ,{" "}
                    {
                      order
                        .shippingAddress
                        ?.city
                    }
                    ,{" "}
                    {
                      order
                        .shippingAddress
                        ?.state
                    }{" "}
                    -{" "}
                    {
                      order
                        .shippingAddress
                        ?.pincode
                    }
                  </p>

                </div>
              </div>

              {/* PRODUCTS */}
              <div className="mb-6">

                <h3 className="font-semibold mb-3">
                  Products
                </h3>

                <div className="space-y-3">

                  {order.orderItems.map(
                    (item) => (

                      <div
                        key={item._id}
                        className="flex items-center justify-between border rounded-lg p-3"
                      >

                        <div>

                          <p className="font-medium">
                            {
                              item.product
                                ?.title
                            }
                          </p>

                          <p className="text-sm text-gray-500">
                            Quantity:{" "}
                            {item.quantity}
                          </p>

                        </div>

                        <div className="font-semibold text-green-600">
                          ₹
                          {item.price *
                            item.quantity}
                        </div>

                      </div>
                    )
                  )}

                </div>
              </div>

              {/* TOTAL */}
              <div className="flex items-center justify-between border-t pt-4">

                <h3 className="text-lg font-bold">
                  Total Amount
                </h3>

                <div className="text-2xl font-bold text-green-600">
                  ₹
                  {order.totalPrice}
                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
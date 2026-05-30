"use client";

import { useState } from "react";

import {
  Eye,
  Trash2,
  Search,
  X,
} from "lucide-react";

import useProduct from "../../../hooks/useProduct";

import {
  Product,
  deleteProduct,
} from "../../../services/productService";

export default function ProductsPage() {

  const {
    products,
    fetchProducts,
  } = useProduct();

  const [search, setSearch] =
    useState("");

  const [
    viewProduct,
    setViewProduct,
  ] = useState<Product | null>(
    null
  );

  // DELETE
  const handleDelete =
    async (id: string) => {
      const confirmDelete =
        confirm(
          "Delete product?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteProduct(
          id
        );

        fetchProducts();

      } catch (error) {
        console.log(error);
      }
    };

  // FILTER
  const filteredProducts =
    Array.isArray(products)
      ? products.filter(
        (
          product: Product
        ) =>
          product.name
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

          Product List

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

                Image

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Product

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Category

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Vendor

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Price

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Stock

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Actions

              </th>

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {filteredProducts.map(
              (
                product: Product
              ) => (
                <tr
                  key={
                    product._id
                  }
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >

                  {/* IMAGE */}
                  <td className="px-6 py-4">

                    <img
                      src={
                        product
                          .images?.[0]
                      }
                      alt={
                        product.name
                      }
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                    />

                  </td>

                  {/* NAME */}
                  <td className="px-6 py-4 font-semibold text-black">

                    {
                      product.name
                    }

                  </td>

                  {/* CATEGORY */}
                  <td className="px-6 py-4 text-gray-500">

                    {/* {
                      product
                        .category
                        ?.name ||
                      "N/A"
                    } */}
                    {
                      typeof product.category === "string"
                        ? product.category
                        : product.category?.name || "N/A"
                    }
                  </td>

                  {/* VENDOR */}
                  <td className="px-6 py-4 text-gray-500">

                    {
                      product
                        .vendor
                        ?.shopName ||
                      "N/A"
                    }

                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4 font-semibold text-black">

                    ₹
                    {
                      product.price
                    }

                  </td>

                  {/* STOCK */}
                  <td className="px-6 py-4">

                    {product.stock >
                      0 ? (
                      <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold">

                        In Stock

                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">

                        Out Stock

                      </span>
                    )}

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      {/* VIEW */}
                      <button
                        onClick={() =>
                          setViewProduct(
                            product
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                      >

                        <Eye
                          size={18}
                        />

                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-black text-white hover:bg-gray-900 flex items-center justify-center transition"
                      >

                        <Trash2
                          size={18}
                        />

                      </button>

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* VIEW MODAL */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">

          <div className="bg-white w-full max-w-3xl rounded-[25px] overflow-hidden relative">

            {/* CLOSE */}
            <button
              onClick={() =>
                setViewProduct(
                  null
                )
              }
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
            >

              <X size={18} />

            </button>

            {/* IMAGE */}
            <div className="h-[350px] overflow-hidden">

              <img
                src={
                  viewProduct
                    .images?.[0]
                }
                alt={
                  viewProduct.name
                }
                className="w-full h-full object-cover"
              />

            </div>

            {/* CONTENT */}
            <div className="p-8">

              {/* NAME */}
              <h2 className="text-4xl font-bold text-black">

                {
                  viewProduct.name
                }

              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-500 leading-relaxed mt-5 text-lg">

                {
                  viewProduct.description
                }

              </p>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-5 mt-8">

                <div className="bg-gray-100 rounded-2xl p-5">

                  <p className="text-sm text-gray-400">

                    Price

                  </p>

                  <h4 className="font-semibold mt-2 text-black text-2xl">

                    ₹
                    {
                      viewProduct.price
                    }

                  </h4>

                </div>

                <div className="bg-pink-50 rounded-2xl p-5">

                  <p className="text-sm text-pink-400">

                    Stock

                  </p>

                  <h4 className="font-semibold mt-2 text-pink-600 text-2xl">

                    {
                      viewProduct.stock
                    }

                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
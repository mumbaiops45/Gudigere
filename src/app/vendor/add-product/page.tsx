"use client";

import { useState } from "react";

import {
  Eye,
  Pencil,
  Plus,
  Trash2,
  X,
  Search,
  Package2,
} from "lucide-react";

import useVendorProduct from "../../../hooks/useVendorProduct";

import useCategory from "../../../hooks/useCategory";

import {
  createProduct,
  deleteProduct,
  Product,
  updateProduct,
} from "../../../services/vendorProductService";

import {
  Category,
} from "../../../services/categoryService";

export default function VendorProductsPage() {

  const {
    products,
    fetchProducts,
  } = useVendorProduct();

  const {
    categories,
  } = useCategory();

  // SEARCH
  const [search, setSearch] =
    useState("");

  // MODALS
  const [
    showModal,
    setShowModal,
  ] = useState(false);

  const [
    viewProduct,
    setViewProduct,
  ] = useState<Product | null>(
    null
  );

  const [
    editProduct,
    setEditProduct,
  ] = useState<Product | null>(
    null
  );

  // FORM
  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [price, setPrice] =
    useState("");

  const [
    discountPrice,
    setDiscountPrice,
  ] = useState("");

  const [stock, setStock] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [category, setCategory] =
    useState("");

  // IMAGE URL
  const [image, setImage] =
    useState("");

  const [
    isFeatured,
    setIsFeatured,
  ] = useState(false);

  const [
    isActive,
    setIsActive,
  ] = useState(true);

  const [loading, setLoading] =
    useState(false);

  // RESET
  const resetForm = () => {

    setTitle("");

    setDescription("");

    setPrice("");

    setDiscountPrice("");

    setStock("");

    setBrand("");

    setCategory("");

    setImage("");

    setIsFeatured(false);

    setIsActive(true);

    setEditProduct(null);
  };

  // EDIT
  const handleEditOpen =
    (product: Product) => {

      setEditProduct(
        product
      );

      setTitle(product.title);

      setDescription(
        product.description
      );

      setPrice(
        String(product.price)
      );

      setDiscountPrice(
        String(
          product.discountPrice
        )
      );

      setStock(
        String(product.stock)
      );

      setBrand(product.brand);

      setCategory(
        product.category
      );

      setImage(
        product.images?.[0] ||
        ""
      );

      setIsFeatured(
        product.isFeatured
      );

      setIsActive(
        product.isActive
      );

      setShowModal(true);
    };

  // SUBMIT
  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        const payload = {
          title,
          description,
          price,
          discountPrice,
          stock,
          brand,
          category,
          images: image
            ? [image]
            : [],
          isFeatured,
          isActive,
        };

        // UPDATE
        if (editProduct) {

          await updateProduct(
            editProduct._id,
            payload
          );

        } else {

          // CREATE
          await createProduct(
            payload
          );
        }

        fetchProducts();

        setShowModal(false);

        resetForm();

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

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
    products.filter(
      (
        product: Product
      ) =>
        product.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="bg-white rounded-[30px] border border-gray-200 p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>

          <h1 className="text-3xl sm:text-4xl font-black text-black">

            My Products

          </h1>

          <p className="text-gray-500 mt-2">

            Manage your store products

          </p>

        </div>

        <div className="flex flex-col sm:flex-row gap-4">

          {/* SEARCH */}
          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="h-[54px] w-full sm:w-[260px] border border-gray-200 rounded-2xl pl-12 pr-4 outline-none focus:border-pink-500"
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={() => {
              resetForm();

              setShowModal(true);
            }}
            className="bg-pink-500 hover:bg-pink-600 transition text-white h-[54px] px-6 rounded-2xl flex items-center justify-center gap-3 font-semibold"
          >

            <Plus size={20} />

            Create Product

          </button>

        </div>

      </div>

      {/* EMPTY */}
      {filteredProducts.length ===
        0 && (
        <div className="border border-dashed border-gray-300 rounded-[30px] py-20 flex flex-col items-center justify-center text-center">

          <div className="w-20 h-20 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">

            <Package2 size={36} />

          </div>

          <h2 className="text-3xl font-bold text-black mt-6">

            No Products Found

          </h2>

        </div>
      )}

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">

        {filteredProducts.map(
          (
            product: Product
          ) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-[28px] overflow-hidden bg-white"
            >

              {/* IMAGE */}
              <div className="h-[260px] bg-gray-100 overflow-hidden">

                <img
                  src={
                    product
                      .images?.[0] ||
                    "https://placehold.co/600x400"
                  }
                  alt={
                    product.title
                  }
                  className="w-full h-full object-cover"
                />

              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h2 className="text-2xl font-black text-black line-clamp-1">

                  {
                    product.title
                  }

                </h2>

                <p className="text-gray-500 mt-2 line-clamp-2">

                  {
                    product.description
                  }

                </p>

                <div className="flex items-center gap-3 mt-5">

                  <span className="text-3xl font-black text-pink-600">

                    ₹
                    {
                      product.discountPrice ||
                      product.price
                    }

                  </span>

                  {product.discountPrice >
                    0 && (
                    <span className="text-gray-400 line-through">

                      ₹
                      {
                        product.price
                      }

                    </span>
                  )}

                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3 mt-6">

                  <button
                    onClick={() =>
                      setViewProduct(
                        product
                      )
                    }
                    className="flex-1 h-[50px] rounded-2xl bg-gray-100 flex items-center justify-center"
                  >

                    <Eye size={18} />

                  </button>

                  <button
                    onClick={() =>
                      handleEditOpen(
                        product
                      )
                    }
                    className="flex-1 h-[50px] rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center"
                  >

                    <Pencil size={18} />

                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        product._id
                      )
                    }
                    className="flex-1 h-[50px] rounded-2xl bg-black text-white flex items-center justify-center"
                  >

                    <Trash2 size={18} />

                  </button>

                </div>

              </div>

            </div>
          )
        )}

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">

          <div className="bg-white w-full max-w-2xl rounded-[30px] max-h-[95vh] overflow-y-auto">

            {/* TOP */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-[30px]">

              <h2 className="text-3xl font-black text-black">

                {editProduct
                  ? "Edit Product"
                  : "Create Product"}

              </h2>

              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
                className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center"
              >

                <X size={18} />

              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={
                handleSubmit
              }
              className="p-6 space-y-5"
            >

              {/* TITLE */}
              <input
                type="text"
                placeholder="Product Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
                required
              />

              {/* DESCRIPTION */}
              <textarea
                rows={5}
                placeholder="Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
              />

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value
                    )
                  }
                  className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
                />

                <input
                  type="number"
                  placeholder="Discount Price"
                  value={
                    discountPrice
                  }
                  onChange={(e) =>
                    setDiscountPrice(
                      e.target.value
                    )
                  }
                  className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
                />

                <input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) =>
                    setStock(
                      e.target.value
                    )
                  }
                  className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
                />

                <input
                  type="text"
                  placeholder="Brand"
                  value={brand}
                  onChange={(e) =>
                    setBrand(
                      e.target.value
                    )
                  }
                  className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
                />

              </div>

              {/* CATEGORY */}
              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 bg-white"
                required
              >

                <option value="">

                  Select Category

                </option>

                {categories.map(
                  (
                    cat: Category
                  ) => (
                    <option
                      key={cat._id}
                      value={cat.name}
                    >

                      {cat.name}

                    </option>
                  )
                )}

              </select>

              {/* IMAGE URL */}
              <input
                type="text"
                placeholder="Paste Product Image URL"
                value={image}
                onChange={(e) =>
                  setImage(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-pink-500"
              />

              {/* FEATURED */}
              <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-5">

                <span className="font-semibold">

                  Featured Product

                </span>

                <input
                  type="checkbox"
                  checked={
                    isFeatured
                  }
                  onChange={(e) =>
                    setIsFeatured(
                      e.target.checked
                    )
                  }
                  className="w-5 h-5 accent-pink-500"
                />

              </div>

              {/* ACTIVE */}
              <div className="flex items-center justify-between border border-gray-200 rounded-2xl p-5">

                <span className="font-semibold">

                  Active Product

                </span>

                <input
                  type="checkbox"
                  checked={
                    isActive
                  }
                  onChange={(e) =>
                    setIsActive(
                      e.target.checked
                    )
                  }
                  className="w-5 h-5 accent-pink-500"
                />

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 transition text-white rounded-2xl py-4 font-bold text-lg"
              >

                {loading
                  ? "Saving..."
                  : editProduct
                  ? "Update Product"
                  : "Create Product"}

              </button>

            </form>

          </div>

        </div>
      )}
    </div>
  );
}
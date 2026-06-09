"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  ShoppingCart,
  Minus,
  Plus,
  Heart,
} from "lucide-react";

import {
  getSingleProduct,
  Product,
} from "../../../services/productService";

import useCartStore from "../../../store/cartStore";

import useAuthStore from "../../../store/authStore";

import {
  addToWishlist,
  removeWishlistItem,
} from "../../../services/wishlistService";

import useWishlistStore from "../../../store/wishlistStore";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function ProductDetailsPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const { token: storeToken } = useAuthStore();
  const token = storeToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const { addToCart } = useCartStore();

  const {
    wishlistItems,
    setWishlistItems,
  } = useWishlistStore();

  const [
    product,
    setProduct,
  ] = useState<Product | null>(
    null
  );

  const [loading, setLoading] =
    useState(true);

  const [quantity, setQuantity] =
    useState(1);

  const [wishlistLoading, setWishlistLoading] =
    useState(false);

  // FETCH PRODUCT
  const fetchProduct =
    async () => {

      try {

        const data =
          await getSingleProduct(
            params.id as string
          );

        setProduct(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchProduct();
  }, []);

  // ADD TO CART
  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (!product) return;

    addToCart({ ...product, quantity });
    toast.success("Added to cart");
  };

  // BUY NOW
  const handleBuyNow =
    () => {

      handleAddToCart();

      router.push("/cart");
    };

  // WISHLIST
  const inWishlist =
    product
      ? wishlistItems.some(
          (i) => i._id === product._id
        )
      : false;

  const handleWishlist =
    async () => {

      if (!token) {
        toast.error(
          "Please login first"
        );
        router.push("/login");
        return;
      }

      if (!product) return;

      setWishlistLoading(true);

      // Snapshot for revert
      const snapshot = wishlistItems;

      // Optimistic update FIRST
      if (inWishlist) {
        setWishlistItems(
          snapshot.filter(
            (i) => i._id !== product._id
          )
        );
      } else {
        setWishlistItems([
          ...snapshot,
          product as any,
        ]);
      }

      try {

        if (inWishlist) {

          await removeWishlistItem(
            product._id
          );

          toast.success(
            "Removed from wishlist"
          );

        } else {

          await addToWishlist(
            product._id
          );

          toast.success(
            "Added to wishlist!"
          );
        }

      } catch {

        // Revert on failure
        setWishlistItems(snapshot);

        toast.error(
          "Something went wrong"
        );

      } finally {

        setWishlistLoading(false);
      }
    };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        Loading...

      </div>
    );
  }

  // NO PRODUCT
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        Product not found

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* IMAGE */}
          <div className="bg-white rounded-[30px] overflow-hidden border border-gray-200">

            <img
              src={
                product.images?.[0]
              }
              alt={
                product.title
              }
              className="w-full h-[600px] object-cover"
            />

          </div>

          {/* CONTENT */}
          <div>

            {/* CATEGORY */}
            <p className="text-pink-600 font-bold uppercase tracking-wider">

              {product.category}

            </p>

            {/* NAME */}
            <h1 className="text-5xl font-black text-black mt-3">

              {product.title}

            </h1>

            {/* PRICE */}
            <div className="mt-6">

              <span className="text-5xl font-black text-pink-600">

                ₹{product.price}

              </span>

            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-lg leading-relaxed mt-8">

              {product.description}

            </p>

            {/* STOCK */}
            <div className="mt-8">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                In Stock:
                {" "}
                {product.stock}

              </span>

            </div>

            {/* QUANTITY */}
            <div className="mt-10">

              <h3 className="font-bold text-lg mb-4">

                Quantity

              </h3>

              <div className="flex items-center gap-4">

                {/* MINUS */}
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-11 h-11 rounded-xl border border-gray-200 hover:border-pink-400 hover:bg-pink-50 text-gray-600 hover:text-pink-600 flex items-center justify-center transition-all duration-150"
                >
                  <Minus size={16} />
                </button>

                {/* VALUE */}
                <span className="text-2xl font-black w-10 text-center text-gray-900">
                  {quantity}
                </span>

                {/* PLUS */}
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 rounded-xl border border-gray-200 hover:border-pink-400 hover:bg-pink-50 text-gray-600 hover:text-pink-600 flex items-center justify-center transition-all duration-150"
                >
                  <Plus size={16} />
                </button>

              </div>

            </div>

            {/* BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">

              {/* CART */}
              <button
                onClick={handleAddToCart}
                className="h-14 rounded-xl bg-pink-600 hover:bg-pink-700 active:bg-pink-800 transition-all duration-150 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md hover:shadow-pink-100"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {/* BUY */}
              <button
                onClick={handleBuyNow}
                className="h-14 rounded-xl bg-gray-900 hover:bg-black active:bg-gray-950 transition-all duration-150 text-white font-black text-base shadow-sm hover:shadow-md"
              >
                Buy Now
              </button>

              {/* WISHLIST */}
              <button
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className={`sm:col-span-2 h-14 rounded-xl border-2 font-black text-base flex items-center justify-center gap-2.5 transition-all duration-150 ${
                  inWishlist
                    ? "border-pink-500 bg-pink-50 text-pink-600 hover:bg-pink-100"
                    : "border-gray-200 text-gray-600 hover:border-pink-400 hover:text-pink-600 hover:bg-pink-50"
                }`}
              >
                <Heart
                  size={20}
                  className={
                    inWishlist
                      ? "fill-pink-500 text-pink-500"
                      : ""
                  }
                />
                {inWishlist
                  ? "Saved to Wishlist"
                  : "Add to Wishlist"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
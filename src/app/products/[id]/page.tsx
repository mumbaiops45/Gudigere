"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  ShoppingCart,
  Minus,
  Plus,
  Heart,
  Star,
  ArrowLeft,
} from "lucide-react";

import {
  getSingleProduct,
  Product,
} from "../../../services/productService";

import {
  Review,
  getProductReviews,
  createReview,
} from "../../../services/reviewService";

import useCartStore from "../../../store/cartStore";

import useAuthStore from "../../../store/authStore";

import {
  addToWishlist,
  removeWishlistItem,
  getWishlist,
} from "../../../services/wishlistService";

import useWishlistStore from "../../../store/wishlistStore";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

const AVATAR_COLORS = [
  "bg-pink-500", "bg-purple-500", "bg-blue-500",
  "bg-green-500", "bg-amber-500", "bg-rose-500", "bg-indigo-500",
];

function AvatarInitials({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${color}`}>
      {initials}
    </div>
  );
}

export default function ProductDetailsPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const { token: storeToken, user } = useAuthStore() as { token: string | null; user: any; logout: () => void };
  const token = storeToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);

  const { addToCart, cartItems } = useCartStore();

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

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

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

  const fetchReviews = async () => {
    try {
      const data = await getProductReviews(params.id as string);
      setReviews(data.reviews);
    } catch {
      // reviews fail silently
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);
  const handleSubmitReview = async () => {
    if (!token) {
      toast.error("Please login to leave a review");
      router.push("/login");
      return;
    }

    if (reviewRating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!reviewComment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setReviewSubmitting(true);

    try {
      const res = await createReview({
        product: params.id as string,
        rating: reviewRating,
        comment: reviewComment,
      });

      toast.success(res.message);

      // Clear form
      setReviewRating(0);
      setReviewHover(0);
      setReviewComment("");

      // Reload published reviews
      fetchReviews();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setReviewSubmitting(false);
    }
  };
  // ADD TO CART
  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (!product) return;

    addToCart({
      ...product,
      quantity,
    });

    if (inWishlist) {
      try {
        await removeWishlistItem(product._id);

        const data = await getWishlist();

        const products =
          data?.wishlist?.products ??
          data?.products ??
          (Array.isArray(data?.wishlist) ? data.wishlist : []) ??
          [];

        setWishlistItems(products);

      } catch (error) {
        console.log(error);
      }
    }

    toast.success("Added to cart");
  };

  // BUY NOW
  const handleBuyNow = async () => {
    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (!product) return;
    const exists = cartItems.some(
      (item: any) => item._id === product._id
    );

    if (!exists) {
      addToCart({
        ...product,
        quantity,
      });
    }

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
        {/* ---- BACK BUTTON ---- */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors duration-150"
            aria-label="Go back to homepage"
          >
            <ArrowLeft size={20} />
            <span className="font-semibold">Back to Home</span>
          </button>
        </div>

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
                className={`sm:col-span-2 h-14 rounded-xl border-2 font-black text-base flex items-center justify-center gap-2.5 transition-all duration-150 ${inWishlist
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

      {/* REVIEWS */}
      <div className="max-w-4xl mx-auto px-4 mt-12 mb-12">

        <h2 className="text-xl font-black text-gray-900 mb-5">Customer Reviews</h2>

        {/* REVIEW LIST */}
        <div className="space-y-3 mb-6">
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-sm">No reviews yet!.</p>
          ) : (
            reviews.map((r) => (
              <div key={r._id} className="flex gap-3 p-3 rounded-xl border border-pink-100 bg-pink-50/30">
                <AvatarInitials name={r.customer?.name ?? "U"} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-gray-900 text-sm">{r.customer?.name ?? "User"}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={12} className={s <= r.rating ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 ml-auto">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{r.comment}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ADD REVIEW FORM */}
        <div className="border border-pink-200 rounded-xl p-4 bg-pink-50/20">
          <p className="text-sm font-bold text-gray-700 mb-2">Write a Review</p>
          <div className="flex gap-0.5 mb-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setReviewRating(s)} onMouseEnter={() => setReviewHover(s)} onMouseLeave={() => setReviewHover(0)}>
                <Star size={22} className={s <= (reviewHover || reviewRating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your experience..."
              rows={2}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              onClick={handleSubmitReview}
              disabled={reviewSubmitting}
              className="px-5 rounded-lg bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bold text-sm transition-all"
            >
              {reviewSubmitting ? "..." : "Post"}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
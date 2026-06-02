"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Eye, Star, Check, Heart } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/services/productService";
import { addToWishlist, removeWishlistItem } from "@/services/wishlistService";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import useWishlistStore from "@/store/wishlistStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { token: storeToken } = useAuthStore() as { token: string | null };
  const token = storeToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  const { cartItems, addToCart } = useCartStore() as {
    cartItems: (Product & { quantity: number })[];
    addToCart: (p: Product & { quantity: number }) => void;
  };

  const { wishlistItems, setWishlistItems } = useWishlistStore();

  const [added, setAdded] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const inCart = cartItems.some((i) => i._id === product._id);
  const inWishlist = wishlistItems.some((i) => i._id === product._id);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      toast.error("Please login to save to wishlist");
      router.push("/login");
      return;
    }
    setWishlistLoading(true);

    // Snapshot current list so we can revert if API fails
    const snapshot = wishlistItems;

    // Optimistic update FIRST — item shows immediately
    if (inWishlist) {
      setWishlistItems(snapshot.filter((i) => i._id !== product._id));
    } else {
      setWishlistItems([...snapshot, product as any]);
    }

    try {
      if (inWishlist) {
        await removeWishlistItem(product._id);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(product._id);
        toast.success("Added to wishlist!");
      }
    } catch {
      // Revert to snapshot on failure
      setWishlistItems(snapshot);
      toast.error("Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };
  const inStock = product.stock > 0;
  const image = product.images?.[0] || "https://placehold.co/400x300/fce4f3/e91e8c?text=No+Image";
  const categoryName =
    typeof product.category === "object" ? product.category?.name : product.category;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      toast.error("Please login to add items to cart");
      router.push("/login");
      return;
    }
    if (!inStock) { toast.error("Out of stock"); return; }
    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <Link href={`/products/${product._id}`} className="block relative h-56 overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Quick view */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-md">
              <Eye size={15} className="text-gray-600" />
            </div>
          </div>
          <button
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-md transition-colors"
          >
            <Heart
              size={15}
              className={inWishlist ? "fill-pink-500 text-pink-500" : "text-gray-400 hover:text-pink-500"}
            />
          </button>
        </div>
        {!inStock && (
          <span className="absolute top-3 left-3 bg-gray-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            Sold Out
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {categoryName && (
          <span className="text-[11px] font-semibold text-pink-500 uppercase tracking-wide">
            {categoryName}
          </span>
        )}

        <Link href={`/products/${product._id}`}>
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
          <span className="text-[11px] text-gray-400 ml-1">(4.5)</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-lg font-black text-pink-600">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.stock > 0 && product.stock <= 10 && (
            <span className="text-[10px] text-orange-500 font-semibold">
              {product.stock} left
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-1">
          <Link href={`/products/${product._id}`} className="flex-1">
            <button className="w-full h-10 rounded-xl border border-gray-200 hover:border-pink-400 hover:bg-pink-50 text-gray-600 hover:text-pink-600 font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-1.5">
              <Eye size={14} />
              View
            </button>
          </Link>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`flex-1 h-10 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all duration-150 ${
              !inStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : added || inCart
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-pink-600 hover:bg-pink-700 text-white shadow-sm hover:shadow-md hover:shadow-pink-100"
            }`}
          >
            <AnimatePresence mode="wait">
              {added || inCart ? (
                <motion.span key="added" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1.5">
                  <Check size={14} /> Added
                </motion.span>
              ) : (
                <motion.span key="add" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1.5">
                  <ShoppingCart size={14} /> Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

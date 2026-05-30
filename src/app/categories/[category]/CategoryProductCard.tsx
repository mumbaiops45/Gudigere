"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingCart, Check, Star } from "lucide-react";
import { toast } from "sonner";

import useAuthStore from "../../../store/authStore";
import useCartStore from "../../../store/cartStore";
import { Product } from "../../../services/productService";

interface Props {
  product: Product;
  index: number;
}

export default function CategoryProductCard({ product, index }: Props) {
  const router = useRouter();
  const { token } = useAuthStore() as { token: string | null };
  const { cartItems, addToCart } = useCartStore() as {
    cartItems: (Product & { quantity: number })[];
    addToCart: (product: Product & { quantity: number }) => void;
  };

  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const inCart = cartItems.some((item) => item._id === product._id);
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please login to add items to cart");
      router.push("/login");
      return;
    }

    if (!inStock) {
      toast.error("This product is out of stock");
      return;
    }

    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  const vendorName =
    typeof product.vendor === "object"
      ? (product.vendor as { shopName?: string })?.shopName
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-shadow duration-300"
    >
      {/* STOCK BADGE */}
      {!inStock && (
        <div className="absolute top-4 left-4 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          Out of Stock
        </div>
      )}

      {inStock && (
        <div className="absolute top-4 left-4 z-20 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          In Stock
        </div>
      )}

      {/* QUICK VIEW OVERLAY */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-10 bg-black/20 flex items-center justify-center pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* QUICK VIEW BUTTON */}
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link href={`/products/${product._id}`}>
          <button className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-colors duration-200">
            <Eye size={16} />
          </button>
        </Link>
      </div>

      {/* IMAGE */}
      <Link href={`/products/${product._id}`}>
        <div className="relative h-[240px] overflow-hidden bg-gray-50">
          <motion.img
            src={product.images?.[0] || "https://placehold.co/400x300/f3f4f6/9ca3af?text=No+Image"}
            alt={product.name}
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5">
        {/* VENDOR */}
        {vendorName && (
          <p className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-1">
            {vendorName}
          </p>
        )}

        {/* NAME */}
        <Link href={`/products/${product._id}`}>
          <h3 className="font-black text-gray-900 text-lg leading-tight line-clamp-2 hover:text-pink-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* STARS (decorative) */}
        <div className="flex items-center gap-0.5 mt-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={13} className="text-yellow-400 fill-yellow-400" />
          ))}
          <span className="text-xs text-gray-400 ml-1.5">(4.5)</span>
        </div>

        {/* PRICE + STOCK */}
        <div className="flex items-end justify-between mt-4">
          <div>
            <span className="text-2xl font-black text-pink-600">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {product.stock} left
          </span>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-5">
          {/* VIEW */}
          <Link href={`/products/${product._id}`} className="flex-1">
            <button className="w-full h-11 rounded-xl border border-gray-200 hover:border-pink-400 hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-all duration-150 flex items-center justify-center gap-2 font-semibold text-sm">
              <Eye size={16} />
              View
            </button>
          </Link>

          {/* ADD TO CART */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`flex-1 h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-150 ${
              !inStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : added || inCart
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-pink-600 hover:bg-pink-700 text-white shadow-sm hover:shadow-md hover:shadow-pink-100"
            }`}
          >
            <AnimatePresence mode="wait">
              {added || inCart ? (
                <motion.span
                  key="added"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Check size={16} />
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Add
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

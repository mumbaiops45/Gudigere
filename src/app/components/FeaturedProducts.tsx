"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Eye, Heart, Star, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { getProducts, Product } from "@/services/productService";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

function StarRow({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < count ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const router = useRouter();
  const { token } = useAuthStore() as { token: string | null };
  const { cartItems, addToCart } = useCartStore() as {
    cartItems: (Product & { quantity: number })[];
    addToCart: (product: Product & { quantity: number }) => void;
  };

  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const inCart = cartItems.some((item) => item._id === product._id);
  const inStock = product.stock > 0;
  const image = product.images?.[0] || "/placeholder-product.jpg";
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

    if (!inStock) {
      toast.error("This product is out of stock");
      return;
    }

    addToCart({ ...product, quantity: 1 });
    setAdded(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col"
    >
      {/* Image area */}
      <Link href={`/products/${product._id}`} className="block relative h-60 overflow-hidden bg-linear-to-br from-pink-50 to-amber-50">
        <Image
          src={image}
          alt={product.name || "Product image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Stock badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-gray-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
            Sold Out
          </span>
        )}

        {/* Floating action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={(e) => { e.preventDefault(); setLiked((v) => !v); }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Heart size={16} className={liked ? "fill-red-500 text-red-500" : "text-gray-500"} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); router.push(`/products/${product._id}`); }}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:scale-110 transition-transform flex items-center justify-center"
          >
            <Eye size={16} className="text-gray-600" />
          </button>
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {categoryName && (
          <span className="text-[11px] font-semibold text-pink-500 uppercase tracking-wide">
            {categoryName}
          </span>
        )}

        <Link href={`/products/${product._id}`}>
          <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2 hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <StarRow count={4} />

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xl font-black text-pink-600">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.vendor?.shopName && (
            <span className="text-[10px] text-gray-400 truncate max-w-22.5">
              by {product.vendor.shopName}
            </span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`mt-1 w-full flex items-center justify-center gap-2 font-bold text-sm py-2.5 rounded-xl transition-all duration-150 ${
            !inStock
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : added || inCart
              ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
              : "bg-pink-600 hover:bg-pink-700 text-white shadow-sm hover:shadow-md hover:shadow-pink-100"
          }`}
        >
          <AnimatePresence mode="wait">
            {added || inCart ? (
              <motion.span
                key="added"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Check size={15} />
                {inCart ? "In Cart" : "Added!"}
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart size={15} />
                {inStock ? "Add to Cart" : "Out of Stock"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

function Skeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-60 bg-linear-to-br from-gray-100 to-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-100 rounded-full w-1/3" />
        <div className="h-4 bg-gray-200 rounded-full w-4/5" />
        <div className="h-3 bg-gray-100 rounded-full w-2/5" />
        <div className="h-6 bg-gray-200 rounded-full w-1/2 mt-2" />
        <div className="h-10 bg-gray-200 rounded-2xl w-full mt-1" />
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.slice(0, 4)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-white to-pink-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 bg-linear-to-r from-pink-100 to-amber-100 text-pink-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={13} />
            Handpicked For You
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900">
            Featured <span className="text-pink-600">Products</span>
          </h2>
          <p className="text-gray-500 mt-3 text-base max-w-md mx-auto">
            Most loved toys by kids &amp; parents — curated with care.
          </p>
        </motion.div>

        {/* Grid */}
        {error ? (
          <p className="text-center text-gray-400 py-16">Failed to load products. Please try again.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)
              : products.map((p, i) => <ProductCard key={p._id} product={p} index={i} />)}
          </div>
        )}

        {/* View All */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-linear-to-r from-pink-600 to-amber-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-pink-200 hover:scale-105 transition-all duration-300"
            >
              View All Products
              <ShoppingCart size={17} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

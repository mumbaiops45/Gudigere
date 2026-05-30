import Link from "next/link";
import { ChevronLeft, Home, PackageSearch } from "lucide-react";

import { getProducts, Product } from "../../../services/productService";
import CategoryProductCard from "./CategoryProductCard";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryProductsPage({ params }: Props) {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);

  const products = await getProducts();

  // Debug log in server terminal
  if (products.length > 0) {
    console.log(
      "[CategoryPage] sample product.category:",
      JSON.stringify(products[0].category)
    );
  }

  const normalize = (s: string) => s.toLowerCase().replace(/\s/g, "");
  const target = normalize(categoryName);

  const filteredProducts = products.filter((product: Product) => {
    const cat = product.category;
    if (!cat) return false;
    const name =
      typeof cat === "string"
        ? cat
        : (cat as { name?: string }).name ?? "";
    return normalize(name) === target;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-pink-50/30">

      {/* ── HERO HEADER ── */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-pink-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-100 rounded-full opacity-30 blur-2xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-pink-500 transition-colors flex items-center gap-1">
              <Home size={14} />
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-500 font-medium">Categories</span>
            <span>/</span>
            <span className="text-pink-600 font-semibold">{categoryName}</span>
          </nav>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              {/* BACK BUTTON */}
              <Link href="/">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-pink-600 bg-gray-100 hover:bg-pink-50 px-4 py-2 rounded-full transition-all duration-200 mb-4">
                  <ChevronLeft size={16} />
                  Back
                </button>
              </Link>

              {/* TITLE */}
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
                {categoryName}
              </h1>
              <p className="text-gray-400 mt-2 text-base">
                Discover the best toys in this category
              </p>
            </div>

            {/* PRODUCT COUNT BADGE */}
            <div className="flex items-center gap-3 self-end pb-1">
              <div className="bg-pink-50 border border-pink-100 rounded-2xl px-5 py-3 text-center">
                <p className="text-3xl font-black text-pink-600 leading-none">
                  {filteredProducts.length}
                </p>
                <p className="text-xs font-semibold text-pink-400 mt-0.5">
                  Products
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6">
              <PackageSearch size={44} className="text-pink-300" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              No Products Found
            </h2>
            <p className="text-gray-400 mt-3 max-w-sm text-base">
              We haven't added products to <span className="font-semibold text-gray-600">{categoryName}</span> yet. Check back soon!
            </p>
            <Link href="/">
              <button className="mt-8 inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3.5 rounded-full transition-colors duration-200 shadow-md hover:shadow-pink-200 hover:shadow-lg">
                <Home size={18} />
                Back to Home
              </button>
            </Link>
          </div>
        )}

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product: Product, index: number) => (
              <CategoryProductCard
                key={product._id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

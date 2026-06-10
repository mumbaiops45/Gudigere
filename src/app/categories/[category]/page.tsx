import Link from "next/link";
import { ChevronLeft, PackageSearch } from "lucide-react";

import { getAllProducts, Product } from "../../../services/productService";
import CategoryProductCard from "./CategoryProductCard";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryProductsPage({ params }: Props) {
  // const { category } = await params;
  // const categoryName = decodeURIComponent(category);

  // const products = await getAllProducts();

  // // Debug log in server terminal
  // if (products.length > 0) {
  //   console.log(
  //     "[CategoryPage] sample product.category:",
  //     JSON.stringify(products[0].category)
  //   );
  // }
  const { category } = await params;
  const categoryName = decodeURIComponent(category);

  const products = await getAllProducts();

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
    <div className="min-h-screen bg-[#f6f7fb]">
      {/* Top Bar */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-4 py-5">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/categories">Categories</Link>
            <span>/</span>
            <span className="font-medium text-gray-900">
              {categoryName}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {categoryName}
              </h1>

              <p className="text-gray-500 mt-1">
                {filteredProducts.length} Products Available
              </p>
            </div>

            <Link href="/">
              <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition">
                <ChevronLeft size={16} />
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {filteredProducts.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-semibold text-gray-900">
                Showing {filteredProducts.length} Products
              </p>

              <select className="h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm">
                <option>Sort By</option>
                <option>Newest</option>
                <option>Price Low → High</option>
                <option>Price High → Low</option>
                <option>Best Selling</option>
              </select>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <div className="bg-white border rounded-3xl p-16 text-center shadow-sm">
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto">
              <PackageSearch
                size={42}
                className="text-pink-400"
              />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-3">
              Products for "{categoryName}" will appear here soon.
            </p>

            <Link href="/">
              <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-xl transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div
            className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
           gap-4
           items-stretch
          "
          >
            {filteredProducts.map(
              (product: Product, index: number) => (
                <CategoryProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
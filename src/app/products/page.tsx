// "use client";

// import { useEffect, useState } from "react";

// import ProductCard from "@/components/product/ProductCard";
// import {Product,getAllProducts as getProducts} from "@/services/productService"; 

// export default function ProductsPage() {
//   const [products, setProducts] =
//     useState<Product[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts =
//     async () => {
//       try {
//         const data =
//           await getProducts();

//         setProducts(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//   if (loading) {
//     return (
//       <div className="p-10 text-xl">
//         Loading products...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">

//       <h1 className="text-4xl font-black mb-8">
//         Products
//       </h1>

//       {products.length === 0 ? (
//         <p>
//           No products found
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//           {products.map(
//             (product) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//               />
//             )
//           )}

//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ProductCard from "@/components/product/ProductCard";
import {
  Product,
  getAllProducts,
} from "@/services/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const age = searchParams.get("age") || undefined;
  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const sort = searchParams.get("sort") || undefined;

  useEffect(() => {
    fetchProducts();
  }, [age, search, category, sort]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts(
        age,
        search,
        category,
        sort
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (search) {
      return `Search Results for "${search}"`;
    }

    if (category) {
      return category;
    }

    switch (age) {
      case "0-2":
        return "0–2 Years Toys";
      case "3-5":
        return "3–5 Years Toys";
      case "6-8":
        return "6–8 Years Toys";
      case "9-12":
        return "9–12 Years Toys";
      case "12plus":
        return "12+ Years Toys";
      default:
        return "All Products";
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-black mb-8">
        {getTitle()}
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">
            No products found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
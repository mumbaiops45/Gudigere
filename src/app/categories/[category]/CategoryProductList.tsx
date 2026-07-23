"use client";

import { useMemo, useState } from "react";
import { Product } from "../../../services/productService";
import CategoryProductCard from "./CategoryProductCard";

interface Props {
  products: Product[];
}

type SortType =
  | "default"
  | "newest"
  | "price-low"
  | "price-high"
  | "best-selling";

export default function CategoryProductList({
  products,
}: Props) {
  const [sortBy, setSortBy] =
    useState<SortType>("default");

  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sortBy) {
      case "newest":
        return list.sort(
          (a: any, b: any) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );

      case "price-low":
        return list.sort(
          (a, b) => a.price - b.price
        );

      case "price-high":
        return list.sort(
          (a, b) => b.price - a.price
        );

      case "best-selling":
        return list.sort(
          (a: any, b: any) =>
            Number(b.sales || b.sold || 0) -
            Number(a.sales || a.sold || 0)
        );

      default:
        return list;
    }
  }, [products, sortBy]);

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-semibold text-gray-900">
            Showing {sortedProducts.length} Products
          </p>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as SortType)
            }
            className="h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm"
          >
            <option value="default">
              Sort By
            </option>

            <option value="newest">
              Newest
            </option>

            <option value="price-low">
              Price Low → High
            </option>

            <option value="price-high">
              Price High → Low
            </option>

            <option value="best-selling">
              Best Selling
            </option>
          </select>
        </div>
      </div>

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
        {sortedProducts.map((product, index) => (
          <CategoryProductCard
            key={product._id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
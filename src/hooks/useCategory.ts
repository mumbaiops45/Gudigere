// import { useEffect } from "react";

// import {
//   getCategories,
//   Category,
// } from "../services/categoryService";

// import useCategoryStore from "../store/categoryStore";

// export default function useCategory() {

//   const {
//     categories,
//     setCategories,
//   } = useCategoryStore();

//   // FETCH
//   const fetchCategories =
//     async () => {

//       try {

//         const data:
//           Category[] =
//           await getCategories();

//         setCategories(data);

//       } catch (error) {

//         console.log(error);
//       }
//     };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return {
//     categories,
//     fetchCategories,
//   };
// }

"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getCategories,
  Category,
} from "../services/categoryService";

import useCategoryStore from "../store/categoryStore";

export default function useCategory() {

  const {
    categories,
    setCategories,
  } = useCategoryStore();

  // Only show spinner on true first-load (store is empty and not yet persisted)
  const [loading, setLoading] =
    useState<boolean>(categories.length === 0);

  // FETCH CATEGORIES
  const fetchCategories =
    async () => {

      try {

        if (categories.length === 0) setLoading(true);

        const data:
          Category[] =
          await getCategories();

        setCategories(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    fetchCategories,
  };
}
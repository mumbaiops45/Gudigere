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

  const [loading, setLoading] =
    useState<boolean>(true);

  // FETCH CATEGORIES
  const fetchCategories =
    async () => {

      try {

        setLoading(true);

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
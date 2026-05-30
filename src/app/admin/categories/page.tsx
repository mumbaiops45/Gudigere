"use client";

import { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Search,
  X,
} from "lucide-react";

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../services/categoryService";

import useCategory from "../../../hooks/useCategory";

interface Category {
  _id: string;

  name: string;

  image: string;

  description: string;
}

export default function CategoriesPage() {
  const {
    categories,
    fetchCategories,
  } = useCategory();

  const [isOpen, setIsOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [name, setName] =
    useState("");

  const [image, setImage] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    editingId,
    setEditingId,
  ] = useState<string | null>(
    null
  );

  const [loading, setLoading] =
    useState(false);

  // VIEW MODAL
  const [
    viewCategory,
    setViewCategory,
  ] = useState<Category | null>(
    null
  );

  // OPEN CREATE MODAL
  const openCreateModal =
    () => {
      setEditingId(null);

      setName("");

      setImage("");

      setDescription("");

      setIsOpen(true);
    };

  // EDIT
  const handleEdit = (
    category: Category
  ) => {
    setEditingId(
      category._id
    );

    setName(category.name);

    setImage(
      category.image
    );

    setDescription(
      category.description
    );

    setIsOpen(true);
  };

  // CREATE / UPDATE
  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const payload = {
          name,
          image,
          description,
        };

        // UPDATE
        if (editingId) {
          await updateCategory(
            editingId,
            payload
          );
        }

        // CREATE
        else {
          await createCategory(
            payload
          );
        }

        fetchCategories();

        setIsOpen(false);

      } catch (error: any) {
        alert(
          error.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  // DELETE
  const handleDelete =
    async (id: string) => {
      const confirmDelete =
        confirm(
          "Delete category?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteCategory(
          id
        );

        fetchCategories();

      } catch (error) {
        console.log(error);
      }
    };

  // FILTER
  const filteredCategories =
    Array.isArray(
      categories
    )
      ? categories.filter(
          (
            category: Category
          ) =>
            category.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        )
      : [];

  return (
    <div className="bg-white rounded-[25px] border border-gray-200 p-6">

      {/* TOP */}
      <div className="flex items-center justify-between mb-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-black">

          Category List

        </h1>

        <div className="flex items-center gap-4">

          {/* CREATE */}
          <button
            onClick={
              openCreateModal
            }
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
          >

            <Plus size={18} />

            Add Category

          </button>

          {/* SEARCH */}
          <div className="relative">

            <Search
              size={18}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-gray-100 border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-pink-500 w-[250px]"
            />

          </div>

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-gray-200 rounded-2xl">

        <table className="w-full">

          {/* HEAD */}
          <thead className="bg-gray-100">

            <tr>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Image

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Category Name

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Description

              </th>

              <th className="text-left px-6 py-4 font-semibold text-gray-700">

                Actions

              </th>

            </tr>

          </thead>

          {/* BODY */}
          <tbody>

            {filteredCategories.map(
              (
                category: Category
              ) => (
                <tr
                  key={
                    category._id
                  }
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >

                  {/* IMAGE */}
                  <td className="px-6 py-4">

                    <img
                      src={
                        category.image
                      }
                      alt={
                        category.name
                      }
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                    />

                  </td>

                  {/* NAME */}
                  <td className="px-6 py-4 font-semibold text-black">

                    {
                      category.name
                    }

                  </td>

                  {/* DESCRIPTION */}
                  <td className="px-6 py-4 text-gray-500 max-w-[400px]">

                    {
                      category.description
                    }

                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      {/* VIEW */}
                      <button
                        onClick={() =>
                          setViewCategory(
                            category
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                      >

                        <Eye
                          size={18}
                        />

                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          handleEdit(
                            category
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 hover:bg-pink-200 flex items-center justify-center transition"
                      >

                        <Pencil
                          size={18}
                        />

                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(
                            category._id
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-black text-white hover:bg-gray-900 flex items-center justify-center transition"
                      >

                        <Trash2
                          size={18}
                        />

                      </button>

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* CREATE / UPDATE MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">

          <div className="bg-white w-full max-w-xl rounded-[25px] p-8 relative">

            {/* CLOSE */}
            <button
              onClick={() =>
                setIsOpen(false)
              }
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            >

              <X size={18} />

            </button>

            {/* TITLE */}
            <h2 className="text-3xl font-bold text-black mb-8">

              {editingId
                ? "Update Category"
                : "Create Category"}

            </h2>

            {/* FORM */}
            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >

              {/* NAME */}
              <input
                type="text"
                placeholder="Category Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-pink-500"
                required
              />

              {/* IMAGE */}
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) =>
                  setImage(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-pink-500"
              />

              {/* DESCRIPTION */}
              <textarea
                placeholder="Description"
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-pink-500 min-h-[140px]"
              />

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-semibold transition"
              >

                {loading
                  ? "Loading..."
                  : editingId
                  ? "Update Category"
                  : "Create Category"}

              </button>

            </form>

          </div>

        </div>
      )}

      {/* VIEW MODAL */}
      {viewCategory && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">

          <div className="bg-white w-full max-w-2xl rounded-[25px] overflow-hidden relative">

            {/* CLOSE */}
            <button
              onClick={() =>
                setViewCategory(
                  null
                )
              }
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
            >

              <X size={18} />

            </button>

            {/* IMAGE */}
            <div className="h-[320px] overflow-hidden">

              <img
                src={
                  viewCategory.image
                }
                alt={
                  viewCategory.name
                }
                className="w-full h-full object-cover"
              />

            </div>

            {/* CONTENT */}
            <div className="p-8">

              {/* TITLE */}
              <h2 className="text-4xl font-bold text-black">

                {
                  viewCategory.name
                }

              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-500 leading-relaxed mt-5 text-lg">

                {
                  viewCategory.description
                }

              </p>

              {/* INFO */}
              <div className="grid grid-cols-2 gap-5 mt-8">

                <div className="bg-gray-100 rounded-2xl p-5">

                  <p className="text-sm text-gray-400">

                    Category ID

                  </p>

                  <h4 className="font-semibold mt-2 text-black">

                    {
                      viewCategory._id
                    }

                  </h4>

                </div>

                <div className="bg-pink-50 rounded-2xl p-5">

                  <p className="text-sm text-pink-400">

                    Status

                  </p>

                  <h4 className="font-semibold mt-2 text-pink-600">

                    Active

                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
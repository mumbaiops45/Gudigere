// // // "use client";

// // // import { useState } from "react";

// // // import {
// // //   Plus,
// // //   Pencil,
// // //   Trash2,
// // //   Eye,
// // //   Search,
// // //   X,
// // // } from "lucide-react";

// // // import {
// // //   createCategory,
// // //   updateCategory,
// // //   deleteCategory,
// // // } from "../../../services/categoryService";

// // // import useCategory from "../../../hooks/useCategory";

// // // interface Category {
// // //   _id: string;

// // //   name: string;

// // //   image: string;

// // //   description: string;
// // // }

// // // export default function CategoriesPage() {
// // //   const {
// // //     categories,
// // //     fetchCategories,
// // //   } = useCategory();

// // //   const [isOpen, setIsOpen] =
// // //     useState(false);

// // //   const [search, setSearch] =
// // //     useState("");

// // //   const [name, setName] =
// // //     useState("");

// // //   const [image, setImage] =
// // //     useState("");

// // //   const [
// // //     description,
// // //     setDescription,
// // //   ] = useState("");

// // //   const [
// // //     editingId,
// // //     setEditingId,
// // //   ] = useState<string | null>(
// // //     null
// // //   );

// // //   const [loading, setLoading] =
// // //     useState(false);

// // //   // VIEW MODAL
// // //   const [
// // //     viewCategory,
// // //     setViewCategory,
// // //   ] = useState<Category | null>(
// // //     null
// // //   );

// // //   // OPEN CREATE MODAL
// // //   const openCreateModal =
// // //     () => {
// // //       setEditingId(null);

// // //       setName("");

// // //       setImage("");

// // //       setDescription("");

// // //       setIsOpen(true);
// // //     };

// // //   // EDIT
// // //   const handleEdit = (
// // //     category: Category
// // //   ) => {
// // //     setEditingId(
// // //       category._id
// // //     );

// // //     setName(category.name);

// // //     setImage(
// // //       category.image
// // //     );

// // //     setDescription(
// // //       category.description
// // //     );

// // //     setIsOpen(true);
// // //   };

// // //   // CREATE / UPDATE
// // //   const handleSubmit =
// // //     async (
// // //       e: React.FormEvent
// // //     ) => {
// // //       e.preventDefault();

// // //       try {
// // //         setLoading(true);

// // //         const payload = {
// // //           name,
// // //           image,
// // //           description,
// // //         };

// // //         // UPDATE
// // //         if (editingId) {
// // //           await updateCategory(
// // //             editingId,
// // //             payload
// // //           );
// // //         }

// // //         // CREATE
// // //         else {
// // //           await createCategory(
// // //             payload
// // //           );
// // //         }

// // //         fetchCategories();

// // //         setIsOpen(false);

// // //       } catch (error: any) {
// // //         alert(
// // //           error.response?.data
// // //             ?.message ||
// // //             "Something went wrong"
// // //         );
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //   // DELETE
// // //   const handleDelete =
// // //     async (id: string) => {
// // //       const confirmDelete =
// // //         confirm(
// // //           "Delete category?"
// // //         );

// // //       if (!confirmDelete)
// // //         return;

// // //       try {
// // //         await deleteCategory(
// // //           id
// // //         );

// // //         fetchCategories();

// // //       } catch (error) {
// // //         console.log(error);
// // //       }
// // //     };

// // //   // FILTER
// // //   const filteredCategories =
// // //     Array.isArray(
// // //       categories
// // //     )
// // //       ? categories.filter(
// // //           (
// // //             category: Category
// // //           ) =>
// // //             category.name
// // //               .toLowerCase()
// // //               .includes(
// // //                 search.toLowerCase()
// // //               )
// // //         )
// // //       : [];

// // //   return (
// // //     <div className="bg-white rounded-[25px] border border-gray-200 p-6">

// // //       {/* TOP */}
// // //       <div className="flex items-center justify-between mb-6">

// // //         {/* TITLE */}
// // //         <h1 className="text-3xl font-bold text-black">

// // //           Category List

// // //         </h1>

// // //         <div className="flex items-center gap-4">

// // //           {/* CREATE */}
// // //           <button
// // //             onClick={
// // //               openCreateModal
// // //             }
// // //             className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
// // //           >

// // //             <Plus size={18} />

// // //             Add Category

// // //           </button>

// // //           {/* SEARCH */}
// // //           <div className="relative">

// // //             <Search
// // //               size={18}
// // //               className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
// // //             />

// // //             <input
// // //               type="text"
// // //               placeholder="Search..."
// // //               value={search}
// // //               onChange={(e) =>
// // //                 setSearch(
// // //                   e.target.value
// // //                 )
// // //               }
// // //               className="bg-gray-100 border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-pink-500 w-[250px]"
// // //             />

// // //           </div>

// // //         </div>

// // //       </div>

// // //       {/* TABLE */}
// // //       <div className="overflow-x-auto border border-gray-200 rounded-2xl">

// // //         <table className="w-full">

// // //           {/* HEAD */}
// // //           <thead className="bg-gray-100">

// // //             <tr>

// // //               <th className="text-left px-6 py-4 font-semibold text-gray-700">

// // //                 Image

// // //               </th>

// // //               <th className="text-left px-6 py-4 font-semibold text-gray-700">

// // //                 Category Name

// // //               </th>

// // //               <th className="text-left px-6 py-4 font-semibold text-gray-700">

// // //                 Description

// // //               </th>

// // //               <th className="text-left px-6 py-4 font-semibold text-gray-700">

// // //                 Actions

// // //               </th>

// // //             </tr>

// // //           </thead>

// // //           {/* BODY */}
// // //           <tbody>

// // //             {filteredCategories.map(
// // //               (
// // //                 category: Category
// // //               ) => (
// // //                 <tr
// // //                   key={
// // //                     category._id
// // //                   }
// // //                   className="border-t border-gray-100 hover:bg-gray-50 transition"
// // //                 >

// // //                   {/* IMAGE */}
// // //                   <td className="px-6 py-4">

// // //                     <img
// // //                       src={
// // //                         category.image
// // //                       }
// // //                       alt={
// // //                         category.name
// // //                       }
// // //                       className="w-16 h-16 rounded-xl object-cover border border-gray-200"
// // //                     />

// // //                   </td>

// // //                   {/* NAME */}
// // //                   <td className="px-6 py-4 font-semibold text-black">

// // //                     {
// // //                       category.name
// // //                     }

// // //                   </td>

// // //                   {/* DESCRIPTION */}
// // //                   <td className="px-6 py-4 text-gray-500 max-w-[400px]">

// // //                     {
// // //                       category.description
// // //                     }

// // //                   </td>

// // //                   {/* ACTIONS */}
// // //                   <td className="px-6 py-4">

// // //                     <div className="flex items-center gap-3">

// // //                       {/* VIEW */}
// // //                       <button
// // //                         onClick={() =>
// // //                           setViewCategory(
// // //                             category
// // //                           )
// // //                         }
// // //                         className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
// // //                       >

// // //                         <Eye
// // //                           size={18}
// // //                         />

// // //                       </button>

// // //                       {/* EDIT */}
// // //                       <button
// // //                         onClick={() =>
// // //                           handleEdit(
// // //                             category
// // //                           )
// // //                         }
// // //                         className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 hover:bg-pink-200 flex items-center justify-center transition"
// // //                       >

// // //                         <Pencil
// // //                           size={18}
// // //                         />

// // //                       </button>

// // //                       {/* DELETE */}
// // //                       <button
// // //                         onClick={() =>
// // //                           handleDelete(
// // //                             category._id
// // //                           )
// // //                         }
// // //                         className="w-10 h-10 rounded-xl bg-black text-white hover:bg-gray-900 flex items-center justify-center transition"
// // //                       >

// // //                         <Trash2
// // //                           size={18}
// // //                         />

// // //                       </button>

// // //                     </div>

// // //                   </td>

// // //                 </tr>
// // //               )
// // //             )}

// // //           </tbody>

// // //         </table>

// // //       </div>

// // //       {/* CREATE / UPDATE MODAL */}
// // //       {isOpen && (
// // //         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">

// // //           <div className="bg-white w-full max-w-xl rounded-[25px] p-8 relative">

// // //             {/* CLOSE */}
// // //             <button
// // //               onClick={() =>
// // //                 setIsOpen(false)
// // //               }
// // //               className="absolute top-5 right-5 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
// // //             >

// // //               <X size={18} />

// // //             </button>

// // //             {/* TITLE */}
// // //             <h2 className="text-3xl font-bold text-black mb-8">

// // //               {editingId
// // //                 ? "Update Category"
// // //                 : "Create Category"}

// // //             </h2>

// // //             {/* FORM */}
// // //             <form
// // //               onSubmit={
// // //                 handleSubmit
// // //               }
// // //               className="space-y-5"
// // //             >

// // //               {/* NAME */}
// // //               <input
// // //                 type="text"
// // //                 placeholder="Category Name"
// // //                 value={name}
// // //                 onChange={(e) =>
// // //                   setName(
// // //                     e.target.value
// // //                   )
// // //                 }
// // //                 className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-pink-500"
// // //                 required
// // //               />

// // //               {/* IMAGE */}
// // //               <input
// // //                 type="text"
// // //                 placeholder="Image URL"
// // //                 value={image}
// // //                 onChange={(e) =>
// // //                   setImage(
// // //                     e.target.value
// // //                   )
// // //                 }
// // //                 className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-pink-500"
// // //               />

// // //               {/* DESCRIPTION */}
// // //               <textarea
// // //                 placeholder="Description"
// // //                 value={
// // //                   description
// // //                 }
// // //                 onChange={(e) =>
// // //                   setDescription(
// // //                     e.target.value
// // //                   )
// // //                 }
// // //                 className="w-full border border-gray-200 rounded-xl px-5 py-4 outline-none focus:border-pink-500 min-h-[140px]"
// // //               />

// // //               {/* BUTTON */}
// // //               <button
// // //                 type="submit"
// // //                 disabled={loading}
// // //                 className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-semibold transition"
// // //               >

// // //                 {loading
// // //                   ? "Loading..."
// // //                   : editingId
// // //                   ? "Update Category"
// // //                   : "Create Category"}

// // //               </button>

// // //             </form>

// // //           </div>

// // //         </div>
// // //       )}

// // //       {/* VIEW MODAL */}
// // //       {viewCategory && (
// // //         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">

// // //           <div className="bg-white w-full max-w-2xl rounded-[25px] overflow-hidden relative">

// // //             {/* CLOSE */}
// // //             <button
// // //               onClick={() =>
// // //                 setViewCategory(
// // //                   null
// // //                 )
// // //               }
// // //               className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
// // //             >

// // //               <X size={18} />

// // //             </button>

// // //             {/* IMAGE */}
// // //             <div className="h-[320px] overflow-hidden">

// // //               <img
// // //                 src={
// // //                   viewCategory.image
// // //                 }
// // //                 alt={
// // //                   viewCategory.name
// // //                 }
// // //                 className="w-full h-full object-cover"
// // //               />

// // //             </div>

// // //             {/* CONTENT */}
// // //             <div className="p-8">

// // //               {/* TITLE */}
// // //               <h2 className="text-4xl font-bold text-black">

// // //                 {
// // //                   viewCategory.name
// // //                 }

// // //               </h2>

// // //               {/* DESCRIPTION */}
// // //               <p className="text-gray-500 leading-relaxed mt-5 text-lg">

// // //                 {
// // //                   viewCategory.description
// // //                 }

// // //               </p>

// // //               {/* INFO */}
// // //               <div className="grid grid-cols-2 gap-5 mt-8">

// // //                 <div className="bg-gray-100 rounded-2xl p-5">

// // //                   <p className="text-sm text-gray-400">

// // //                     Category ID

// // //                   </p>

// // //                   <h4 className="font-semibold mt-2 text-black">

// // //                     {
// // //                       viewCategory._id
// // //                     }

// // //                   </h4>

// // //                 </div>

// // //                 <div className="bg-pink-50 rounded-2xl p-5">

// // //                   <p className="text-sm text-pink-400">

// // //                     Status

// // //                   </p>

// // //                   <h4 className="font-semibold mt-2 text-pink-600">

// // //                     Active

// // //                   </h4>

// // //                 </div>

// // //               </div>

// // //             </div>

// // //           </div>

// // //         </div>
// // //       )}

// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { useState, useRef } from "react";
// // import {
// //   Plus,
// //   Pencil,
// //   Trash2,
// //   Eye,
// //   Search,
// //   X,
// //   Upload,
// //   Loader2,
// // } from "lucide-react";

// // import {
// //   createCategory,
// //   updateCategory,
// //   deleteCategory,
// // } from "../../../services/categoryService";
// // import useCategory from "../../../hooks/useCategory";

// // interface Category {
// //   _id: string;
// //   name: string;
// //   image: string; // can be a URL or Base64 string
// //   description: string;
// // }

// // export default function CategoriesPage() {
// //   const { categories, fetchCategories } = useCategory();

// //   // UI state
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

// //   // Form state
// //   const [name, setName] = useState("");
// //   const [image, setImage] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [editingId, setEditingId] = useState<string | null>(null);
// //   const [imagePreview, setImagePreview] = useState("");

// //   // View modal
// //   const [viewCategory, setViewCategory] = useState<Category | null>(null);

// //   // File input ref
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   const openCreateModal = () => {
// //     setEditingId(null);
// //     setName("");
// //     setImage("");
// //     setDescription("");
// //     setImagePreview("");
// //     setIsOpen(true);
// //   };

// //   const handleEdit = (category: Category) => {
// //     setEditingId(category._id);
// //     setName(category.name);
// //     setImage(category.image);
// //     setImagePreview(category.image);
// //     setDescription(category.description);
// //     setIsOpen(true);
// //   };

// //   // Handle file selection
// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     if (!file.type.startsWith("image/")) {
// //       alert("Please select an image file (jpg, png, etc.)");
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       const base64String = reader.result as string;
// //       setImage(base64String);
// //       setImagePreview(base64String);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!name.trim()) {
// //       alert("Category name is required");
// //       return;
// //     }
// //     if (!image) {
// //       alert("Please select an image");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const payload = {
// //         name: name.trim(),
// //         image, // Base64 string or existing URL when editing without change
// //         description: description.trim(),
// //       };

// //       if (editingId) {
// //         await updateCategory(editingId, payload);
// //       } else {
// //         await createCategory(payload);
// //       }

// //       await fetchCategories();
// //       setIsOpen(false);
// //     } catch (error: any) {
// //       alert(error.response?.data?.message || "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id: string) => {
// //     if (!confirm("Delete this category?")) return;
// //     try {
// //       setDeleteLoadingId(id);
// //       await deleteCategory(id);
// //       await fetchCategories();
// //     } catch (error) {
// //       console.error(error);
// //       alert("Failed to delete category");
// //     } finally {
// //       setDeleteLoadingId(null);
// //     }
// //   };

// //   const filteredCategories = Array.isArray(categories)
// //     ? categories.filter((cat: Category) =>
// //         cat.name.toLowerCase().includes(search.toLowerCase())
// //       )
// //     : [];

// //   return (
// //     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// //         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Category List</h1>

// //         <div className="flex flex-col sm:flex-row gap-3">
// //           <button
// //             onClick={openCreateModal}
// //             className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-sm"
// //           >
// //             <Plus size={18} />
// //             Add Category
// //           </button>

// //           <div className="relative">
// //             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
// //             <input
// //               type="text"
// //               placeholder="Search categories..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               className="pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-pink-500 outline-none transition w-full sm:w-64"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <div className="overflow-x-auto border border-gray-200 rounded-xl">
// //         <table className="min-w-full">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="text-left px-6 py-4 font-semibold text-gray-600">Image</th>
// //               <th className="text-left px-6 py-4 font-semibold text-gray-600">Name</th>
// //               <th className="text-left px-6 py-4 font-semibold text-gray-600">Description</th>
// //               <th className="text-left px-6 py-4 font-semibold text-gray-600">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredCategories.length === 0 ? (
// //               <tr>
// //                 <td colSpan={4} className="text-center py-12 text-gray-400">
// //                   No categories found
// //                 </td>
// //               </tr>
// //             ) : (
// //               filteredCategories.map((category: Category) => (
// //                 <tr key={category._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
// //                   <td className="px-6 py-4">
// //                     <img
// //                       src={category.image}
// //                       alt={category.name}
// //                       className="w-14 h-14 rounded-lg object-cover border border-gray-200"
// //                     />
// //                   </td>
// //                   <td className="px-6 py-4 font-semibold text-gray-800">{category.name}</td>
// //                   <td className="px-6 py-4 text-gray-500 max-w-md truncate">{category.description}</td>
// //                   <td className="px-6 py-4">
// //                     <div className="flex items-center gap-2">
// //                       <button
// //                         onClick={() => setViewCategory(category)}
// //                         className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
// //                         title="View"
// //                       >
// //                         <Eye size={16} />
// //                       </button>
// //                       <button
// //                         onClick={() => handleEdit(category)}
// //                         className="w-9 h-9 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 flex items-center justify-center transition"
// //                         title="Edit"
// //                       >
// //                         <Pencil size={16} />
// //                       </button>
// //                       <button
// //                         onClick={() => handleDelete(category._id)}
// //                         disabled={deleteLoadingId === category._id}
// //                         className="w-9 h-9 rounded-lg bg-gray-800 text-white hover:bg-gray-900 flex items-center justify-center transition disabled:opacity-50"
// //                         title="Delete"
// //                       >
// //                         {deleteLoadingId === category._id ? (
// //                           <Loader2 size={16} className="animate-spin" />
// //                         ) : (
// //                           <Trash2 size={16} />
// //                         )}
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Create / Update Modal */}
// //       {isOpen && (
// //         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm">
// //           <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
// //             {/* Header */}
// //             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
// //               <h2 className="text-xl font-bold text-gray-800">
// //                 {editingId ? "Edit Category" : "New Category"}
// //               </h2>
// //               <button
// //                 onClick={() => setIsOpen(false)}
// //                 className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
// //               >
// //                 <X size={16} />
// //               </button>
// //             </div>

// //             {/* Body */}
// //             <div className="p-6 space-y-5">
// //               {/* Image Upload & Preview */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Category Image *
// //                 </label>
// //                 <div
// //                   className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-pink-400 transition"
// //                   onClick={() => fileInputRef.current?.click()}
// //                 >
// //                   {imagePreview ? (
// //                     <div className="relative inline-block">
// //                       <img
// //                         src={imagePreview}
// //                         alt="Preview"
// //                         className="max-h-40 rounded-lg object-contain mx-auto"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           setImage("");
// //                           setImagePreview("");
// //                           if (fileInputRef.current) fileInputRef.current.value = "";
// //                         }}
// //                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
// //                       >
// //                         <X size={14} />
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <div className="py-6">
// //                       <Upload className="mx-auto h-10 w-10 text-gray-400" />
// //                       <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
// //                       <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</p>
// //                     </div>
// //                   )}
// //                   <input
// //                     ref={fileInputRef}
// //                     type="file"
// //                     accept="image/*"
// //                     onChange={handleFileChange}
// //                     className="hidden"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Name */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Category Name *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   placeholder="e.g., Electronics"
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-pink-500"
// //                   required
// //                 />
// //               </div>

// //               {/* Description */}
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Description
// //                 </label>
// //                 <textarea
// //                   placeholder="Optional description"
// //                   value={description}
// //                   onChange={(e) => setDescription(e.target.value)}
// //                   rows={3}
// //                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-pink-500 resize-none"
// //                 />
// //               </div>

// //               {/* Submit Button */}
// //               <button
// //                 type="submit"
// //                 onClick={handleSubmit}
// //                 disabled={loading}
// //                 className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
// //               >
// //                 {loading && <Loader2 size={18} className="animate-spin" />}
// //                 {loading ? "Saving..." : editingId ? "Update Category" : "Create Category"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* View Modal */}
// //       {viewCategory && (
// //         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm">
// //           <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden relative">
// //             <button
// //               onClick={() => setViewCategory(null)}
// //               className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
// //             >
// //               <X size={16} />
// //             </button>

// //             <div className="h-64 md:h-80 overflow-hidden">
// //               <img
// //                 src={viewCategory.image}
// //                 alt={viewCategory.name}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>

// //             <div className="p-6 md:p-8">
// //               <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{viewCategory.name}</h2>
// //               <p className="text-gray-600 mt-4 leading-relaxed">{viewCategory.description}</p>

// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
// //                 <div className="bg-gray-50 rounded-xl p-4">
// //                   <p className="text-xs text-gray-400 uppercase tracking-wide">Category ID</p>
// //                   <p className="font-mono text-sm mt-1 break-all">{viewCategory._id}</p>
// //                 </div>
// //                 <div className="bg-pink-50 rounded-xl p-4">
// //                   <p className="text-xs text-pink-400 uppercase tracking-wide">Status</p>
// //                   <p className="font-semibold text-pink-600 mt-1">Active</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useRef } from "react";
// import {
//   Plus,
//   Pencil,
//   Trash2,
//   Eye,
//   Search,
//   X,
//   Upload,
//   Loader2,
// } from "lucide-react";

// import {
//   createCategory,
//   updateCategory,
//   deleteCategory,
// } from "../../../services/categoryService";
// import useCategory from "../../../hooks/useCategory";

// interface Category {
//   _id: string;
//   name: string;
//   image: string; // Base64 string or URL
//   description: string;
// }

// export default function CategoriesPage() {
//   const { categories, fetchCategories } = useCategory();

//   const [isOpen, setIsOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

//   const [name, setName] = useState("");
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [imagePreview, setImagePreview] = useState("");

//   const [viewCategory, setViewCategory] = useState<Category | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const openCreateModal = () => {
//     setEditingId(null);
//     setName("");
//     setImage("");
//     setDescription("");
//     setImagePreview("");
//     setIsOpen(true);
//   };

//   const handleEdit = (category: Category) => {
//     setEditingId(category._id);
//     setName(category.name);
//     setImage(category.image);
//     setImagePreview(category.image);
//     setDescription(category.description);
//     setIsOpen(true);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file (jpg, png, etc.)");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = reader.result as string;
//       setImage(base64String);
//       setImagePreview(base64String);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       alert("Category name is required");
//       return;
//     }
//     if (!image) {
//       alert("Please select an image");
//       return;
//     }

//     try {
//       setLoading(true);
//       const payload = {
//         name: name.trim(),
//         image,
//         description: description.trim(),
//       };

//       if (editingId) {
//         await updateCategory(editingId, payload);
//       } else {
//         await createCategory(payload);
//       }

//       await fetchCategories();
//       setIsOpen(false);
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this category?")) return;
//     try {
//       setDeleteLoadingId(id);
//       await deleteCategory(id);
//       await fetchCategories();
//     } catch (error) {
//       console.error(error);
//       alert("Failed to delete category");
//     } finally {
//       setDeleteLoadingId(null);
//     }
//   };

//   const filteredCategories = Array.isArray(categories)
//     ? categories.filter((cat: Category) =>
//         cat.name.toLowerCase().includes(search.toLowerCase())
//       )
//     : [];

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Category List</h1>

//         <div className="flex flex-col sm:flex-row gap-3">
//           <button
//             onClick={openCreateModal}
//             className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-sm"
//           >
//             <Plus size={18} />
//             Add Category
//           </button>

//           <div className="relative">
//             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search categories..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-pink-500 outline-none transition w-full sm:w-64"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto border border-gray-200 rounded-xl">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="text-left px-6 py-4 font-semibold text-gray-600">Image</th>
//               <th className="text-left px-6 py-4 font-semibold text-gray-600">Name</th>
//               <th className="text-left px-6 py-4 font-semibold text-gray-600">Description</th>
//               <th className="text-left px-6 py-4 font-semibold text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCategories.length === 0 ? (
//               <tr>
//                 <td colSpan={4} className="text-center py-12 text-gray-400">
//                   No categories found
//                 </td>
//               </tr>
//             ) : (
//               filteredCategories.map((category: Category) => (
//                 <tr key={category._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
//                   {/* Fixed size image - NO DISTORTION */}
//                   <td className="px-6 py-4">
//                     <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
//                       <img
//                         src={category.image}
//                         alt={category.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 font-semibold text-gray-800">{category.name}</td>
//                   <td className="px-6 py-4 text-gray-500 max-w-md truncate">{category.description}</td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => setViewCategory(category)}
//                         className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
//                         title="View"
//                       >
//                         <Eye size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleEdit(category)}
//                         className="w-9 h-9 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 flex items-center justify-center transition"
//                         title="Edit"
//                       >
//                         <Pencil size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(category._id)}
//                         disabled={deleteLoadingId === category._id}
//                         className="w-9 h-9 rounded-lg bg-gray-800 text-white hover:bg-gray-900 flex items-center justify-center transition disabled:opacity-50"
//                         title="Delete"
//                       >
//                         {deleteLoadingId === category._id ? (
//                           <Loader2 size={16} className="animate-spin" />
//                         ) : (
//                           <Trash2 size={16} />
//                         )}
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Create / Update Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm">
//           <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-bold text-gray-800">
//                 {editingId ? "Edit Category" : "New Category"}
//               </h2>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
//               >
//                 <X size={16} />
//               </button>
//             </div>

//             {/* Body */}
//             <div className="p-6 space-y-5">
//               {/* Image Upload & Preview - Fixed size preview */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category Image *
//                 </label>
//                 <div
//                   className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-pink-400 transition"
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   {imagePreview ? (
//                     <div className="relative inline-block">
//                       <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 mx-auto">
//                         <img
//                           src={imagePreview}
//                           alt="Preview"
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <button
//                         type="button"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setImage("");
//                           setImagePreview("");
//                           if (fileInputRef.current) fileInputRef.current.value = "";
//                         }}
//                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
//                       >
//                         <X size={14} />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="py-6">
//                       <Upload className="mx-auto h-10 w-10 text-gray-400" />
//                       <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
//                       <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</p>
//                     </div>
//                   )}
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                 </div>
//               </div>

//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category Name *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Electronics"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-pink-500"
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   placeholder="Optional description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   rows={3}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-pink-500 resize-none"
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
//               >
//                 {loading && <Loader2 size={18} className="animate-spin" />}
//                 {loading ? "Saving..." : editingId ? "Update Category" : "Create Category"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Modal */}
//       {viewCategory && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm">
//           <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden relative">
//             <button
//               onClick={() => setViewCategory(null)}
//               className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
//             >
//               <X size={16} />
//             </button>

//             <div className="h-64 md:h-80 overflow-hidden">
//               <img
//                 src={viewCategory.image}
//                 alt={viewCategory.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="p-6 md:p-8">
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{viewCategory.name}</h2>
//               <p className="text-gray-600 mt-4 leading-relaxed">{viewCategory.description}</p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
//                 <div className="bg-gray-50 rounded-xl p-4">
//                   <p className="text-xs text-gray-400 uppercase tracking-wide">Category ID</p>
//                   <p className="font-mono text-sm mt-1 break-all">{viewCategory._id}</p>
//                 </div>
//                 <div className="bg-pink-50 rounded-xl p-4">
//                   <p className="text-xs text-pink-400 uppercase tracking-wide">Status</p>
//                   <p className="font-semibold text-pink-600 mt-1">Active</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





"use client";

import { useState, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Search,
  X,
  Upload,
  Loader2,
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
  image: string; // Base64 string or URL
  description: string;
}

export default function CategoriesPage() {
  const { categories, fetchCategories } = useCategory();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [viewCategory, setViewCategory] = useState<Category | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openCreateModal = () => {
    setEditingId(null);
    setName("");
    setImage("");
    setDescription("");
    setImagePreview("");
    setIsOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingId(category._id);
    setName(category.name);
    setImage(category.image);
    setImagePreview(category.image);
    setDescription(category.description);
    setIsOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (jpg, png, etc.)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: name.trim(),
        image,
        description: description.trim(),
      };

      if (editingId) {
        await updateCategory(editingId, payload);
      } else {
        await createCategory(payload);
      }

      await fetchCategories();
      setIsOpen(false);
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      setDeleteLoadingId(id);
      await deleteCategory(id);
      await fetchCategories();
    } catch (error) {
      console.error(error);
      alert("Failed to delete category");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const filteredCategories = Array.isArray(categories)
    ? categories.filter((cat: Category) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Category List</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={openCreateModal}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-sm"
          >
            <Plus size={18} />
            Add Category
          </button>

          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-pink-500 outline-none transition w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Image</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Name</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Description</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-gray-400">
                  No categories found
                </td>
              </tr>
            ) : (
              filteredCategories.map((category: Category) => (
                <tr key={category._id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  {/* Fixed size image - NO DISTORTION */}
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200 bg-gray-50">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{category.name}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-md truncate">{category.description}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewCategory(category)}
                        className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(category)}
                        className="w-9 h-9 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 flex items-center justify-center transition"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        disabled={deleteLoadingId === category._id}
                        className="w-9 h-9 rounded-lg bg-gray-800 text-white hover:bg-gray-900 flex items-center justify-center transition disabled:opacity-50"
                        title="Delete"
                      >
                        {deleteLoadingId === category._id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Update Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Category" : "New Category"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              {/* Image Upload & Preview - Fixed size preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image *
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-pink-400 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 mx-auto">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage("");
                          setImagePreview("");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="py-6">
                      <Upload className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                      <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Electronics"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-pink-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Optional description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-pink-500 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70 flex items-center justify-center gap-2 mt-4"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? "Saving..." : editingId ? "Update Category" : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewCategory && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden relative">
            <button
              onClick={() => setViewCategory(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
            >
              <X size={16} />
            </button>

            <div className="h-64 md:h-80 overflow-hidden">
              <img
                src={viewCategory.image}
                alt={viewCategory.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{viewCategory.name}</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">{viewCategory.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Category ID</p>
                  <p className="font-mono text-sm mt-1 break-all">{viewCategory._id}</p>
                </div>
                <div className="bg-pink-50 rounded-xl p-4">
                  <p className="text-xs text-pink-400 uppercase tracking-wide">Status</p>
                  <p className="font-semibold text-pink-600 mt-1">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
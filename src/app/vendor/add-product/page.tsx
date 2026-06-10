"use client";

import { useState, useRef } from "react";
import {
  Eye,
  Pencil,
  Plus,
  Trash2,
  X,
  Search,
  Package2,
  Star,
  Tag,
  AlignLeft,
  Building2,
  IndianRupee,
  Layers,
  Users,
  Sparkles,
  CheckCircle2,
  Upload,
  ImageIcon,
  ChevronRight,
} from "lucide-react";

import useVendorProduct from "../../../hooks/useVendorProduct";
import useCategory from "../../../hooks/useCategory";
import {
  createProduct,
  deleteProduct,
  Product,
  updateProduct,
} from "../../../services/vendorProductService";
import { Category } from "../../../services/categoryService";

/* ─── tiny helpers ─────────────────────────────────────────────── */

const inputCls =
  "w-full h-10 bg-gray-50 border border-gray-200 rounded-xl px-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition";

function Field({
  label,
  icon,
  children,
  required,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        <span className="text-pink-500">{icon}</span>
        {label}
        {required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  colorOn = "bg-pink-500",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  colorOn?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${checked ? colorOn : "bg-gray-200"
        }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"
          }`}
      />
    </button>
  );
}

/* ─── main page ─────────────────────────────────────────────────── */

export default function VendorProductsPage() {
  const { products, fetchProducts } = useVendorProduct();
  const { categories } = useCategory();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [age, setAge] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setTitle(""); setDescription(""); setPrice(""); setDiscountPrice("");
    setStock(""); setBrand(""); setCategory(""); setImage("");
    setIsFeatured(false); setIsActive(true); setAge(0); setEditProduct(null);
  };

  const handleEditOpen = (product: Product) => {
    setEditProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(String(product.price));
    setDiscountPrice(String(product.discountPrice || ""));
    setStock(String(product.stock));
    setBrand(product.brand || "");
    setCategory(product.category);
    setImage(product.images?.[0] || "");
    setIsFeatured(product.isFeatured);
    setIsActive(product.isActive);
    setAge(product.age ?? 0);
    setShowModal(true);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPEG, PNG, WebP)");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const removeImage = () => {
    setImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        title, description,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : 0,
        stock: Number(stock),
        brand, category,
        images: image ? [image] : [],
        isFeatured, isActive,
        age: Number(age),
      };
      if (editProduct) {
        await updateProduct(editProduct._id, payload);
      } else {
        await createProduct(payload);
      }
      fetchProducts();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((p: Product) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const discountPct =
    price && discountPrice && Number(price) > 0
      ? Math.round(((Number(price) - Number(discountPrice)) / Number(price)) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-[1500px] mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-400 mt-1 text-sm">Manage your store inventory</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full sm:w-64 bg-white border border-gray-200 rounded-xl pl-9 pr-4 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
              />
            </div>
            <button
              onClick={() => { resetForm(); setShowModal(true); }}
              className="h-11 px-5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-pink-200"
            >
              <Plus size={16} /> New Product
            </button>
          </div>
        </div>

        {/* ── Empty state ── */}
        {filteredProducts.length === 0 && (
          <div className="border-2 border-dashed border-gray-200 rounded-2xl py-20 flex flex-col items-center justify-center text-center bg-white">
            <div className="w-16 h-16 rounded-2xl bg-pink-50 text-pink-400 flex items-center justify-center mb-4">
              <Package2 size={30} />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">No Products Found</h2>
            <p className="text-gray-400 mt-1 text-sm">Create your first product to get started</p>
          </div>
        )}

        {/* ── Product grid ── */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"> */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product) => (
            <div
              key={product._id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-[560px] flex flex-col">
              <div className="relative h-52 bg-gray-100 overflow-hidden">
                <img
                  src={product.images?.[0] || "https://placehold.co/600x400"}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                {product.isFeatured && (
                  <div className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ Featured
                  </div>
                )}

                {product.discountPrice > 0 && (
                  <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    -
                    {Math.round(
                      ((product.price - product.discountPrice) /
                        product.price) *
                      100
                    )}
                    %
                  </div>
                )}

                <div
                  className={` absolute  bottom-3 right-3  px-3  py-1 rounded-full text-xs font-semibold
                  ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"} `} >
                  {product.stock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </div>
              </div>
              <div className="p-3">
                <h2
                  className="text-xl font-bold text-gray-900 leading-6 line-clamp-2 min-h-[56px]"
                >{product.title}</h2>
                <p
                  className=" text-gray-500 text-sm mt-2 line-clamp-2 min-h-[50px]"
                >{product.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {(product.age ?? 0) > 0 && (
                    <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-0.5 rounded-full font-medium">Age {product.age}+</span>
                  )}
                  {product.brand && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-medium">{product.brand}</span>
                  )}
                  {product.category && (
                    <span className="bg-pink-50 text-pink-600 text-xs px-2.5 py-0.5 rounded-full font-medium">{product.category}</span>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-3xl font-black text-pink-600">₹{product.discountPrice || product.price}</span>
                  {product.discountPrice > 0 && (
                    <span className="text-gray-400 line-through text-sm">₹{product.price}</span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-5">
                  <button onClick={() => setViewProduct(product)} className="flex-1 h-11 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center gap-1.5 text-sm font-medium">
                    <Eye size={13} /> View
                  </button>
                  <button onClick={() => handleEditOpen(product)} className="flex-1 h-11 rounded-xl bg-pink-50 border border-pink-100 text-pink-600 hover:bg-pink-100 transition flex items-center justify-center gap-1.5 text-sm font-medium">
                    <Pencil size={13} /> Edit
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="flex-1 h-11 rounded-xl bg-gray-900 text-white hover:bg-black transition flex items-center justify-center gap-1.5 text-sm font-medium">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ CREATE / EDIT MODAL (redesigned) ══ */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">

              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md shadow-pink-200">
                    <Package2 size={16} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base">
                      {editProduct ? "Edit Product" : "Add New Product"}
                    </h2>
                    <p className="text-xs text-gray-400">
                      {editProduct ? "Update product details" : "Fill in the details below"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="w-8 h-11 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-500"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Modal body — two-column layout */}
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row overflow-hidden flex-1 min-h-0">

                {/* LEFT — Image + toggles */}
                <div className="md:w-72 shrink-0 border-r border-gray-100 flex flex-col gap-5 p-5 bg-gray-50/60 overflow-y-auto">

                  {/* Image upload */}
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Product Image</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      className="hidden"
                    />

                    {image ? (
                      <div className="relative rounded-2xl overflow-hidden border-2 border-pink-200 shadow-sm group">
                        <img src={image} alt="Preview" className="w-full h-52 object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="h-9 px-4 rounded-xl bg-white text-gray-800 text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-100 transition"
                          >
                            <Upload size={13} /> Change
                          </button>
                          <button
                            type="button"
                            onClick={removeImage}
                            className="h-9 px-4 rounded-xl bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-600 transition"
                          >
                            <X size={13} /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        className={`w-full h-52 rounded-2xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-3 transition-all ${dragOver ? "border-pink-400 bg-pink-50" : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50 bg-white"
                          }`}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center">
                          <ImageIcon size={22} className="text-pink-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-semibold text-gray-600">
                            {dragOver ? "Drop it here!" : "Upload Image"}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">Click or drag & drop</p>
                          <p className="text-[10px] text-gray-300 mt-1">JPEG, PNG, WebP · Max 2MB</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Toggles */}
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Settings</p>

                    <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center">
                            <Sparkles size={13} className="text-amber-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-700">Featured</p>
                            <p className="text-xs text-gray-400">Show on homepage</p>
                          </div>
                        </div>
                        <Toggle checked={isFeatured} onChange={setIsFeatured} colorOn="bg-amber-400" />
                      </div>

                      <div className="flex items-center justify-between px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-xl bg-green-50 flex items-center justify-center">
                            <CheckCircle2 size={13} className="text-green-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-700">Active</p>
                            <p className="text-xs text-gray-400">Visible to customers</p>
                          </div>
                        </div>
                        <Toggle checked={isActive} onChange={setIsActive} colorOn="bg-green-500" />
                      </div>
                    </div>
                  </div>

                  {/* Discount badge preview */}
                  {discountPct > 0 && (
                    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-center">
                      <p className="text-xs text-gray-400 mb-1">Discount Preview</p>
                      <p className="text-3xl font-black text-rose-500">{discountPct}% OFF</p>
                      {price && discountPrice && (
                        <p className="text-xs text-gray-500 mt-1">
                          ₹{discountPrice} <span className="line-through text-gray-400">₹{price}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* RIGHT — Form fields */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">

                  {/* Section: Basic Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-pink-500 to-rose-500" />
                      <h3 className="text-sm font-bold text-gray-800">Basic Information</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Product Title" icon={<Tag size={11} />} required>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className={inputCls}
                          placeholder="e.g. Premium Football"
                          required
                        />
                      </Field>
                      <Field label="Brand" icon={<Building2 size={11} />}>
                        <input
                          type="text"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          className={inputCls}
                          placeholder="Nike, Adidas…"
                        />
                      </Field>
                      <Field label="Category" icon={<Package2 size={11} />} required>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className={inputCls}
                          required
                        >
                          <option value="">Select category…</option>
                          {categories.map((cat: Category) => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Min. Age" icon={<Users size={11} />}>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(Number(e.target.value))}
                          className={inputCls}
                          placeholder="0"
                          min={0}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100" />

                  {/* Section: Pricing */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
                      <h3 className="text-sm font-bold text-gray-800">Pricing & Inventory</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Field label="Price (₹)" icon={<IndianRupee size={11} />} required>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                          <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className={`${inputCls} pl-7`}
                            placeholder="1999"
                            required
                            min={0}
                          />
                        </div>
                      </Field>
                      <Field label="Sale Price (₹)" icon={<IndianRupee size={11} />}>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                          <input
                            type="number"
                            value={discountPrice}
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            className={`${inputCls} pl-7`}
                            placeholder="1499"
                            min={0}
                          />
                        </div>
                      </Field>
                      <Field label="Stock Qty" icon={<Layers size={11} />} required>
                        <input
                          type="number"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          className={inputCls}
                          placeholder="100"
                          required
                          min={0}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100" />

                  {/* Section: Description */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-violet-400 to-purple-500" />
                      <h3 className="text-sm font-bold text-gray-800">Description</h3>
                    </div>
                    <Field label="Product Description" icon={<AlignLeft size={11} />}>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`${inputCls} h-auto py-2.5 resize-none`}
                        placeholder="Describe what makes this product special…"
                      />
                    </Field>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm transition shadow-lg shadow-pink-200 disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Saving…
                      </span>
                    ) : (
                      <>
                        {editProduct ? <Pencil size={15} /> : <Plus size={15} />}
                        {editProduct ? "Update Product" : "Create Product"}
                        <ChevronRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── View Product Modal ── */}
        {viewProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative">
                {viewProduct.images?.[0] ? (
                  <img
                    src={viewProduct.images[0]}
                    alt={viewProduct.title || "Product image"}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                    <ImageIcon size={40} className="text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button
                  onClick={() => setViewProduct(null)}
                  className="absolute top-3 right-3 w-8 h-11 rounded-full bg-black/40 hover:bg-black/60 transition flex items-center justify-center text-white"
                >
                  <X size={15} />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white font-bold text-lg leading-tight">{viewProduct.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white font-black text-xl">₹{viewProduct.discountPrice || viewProduct.price}</span>
                    {viewProduct.discountPrice > 0 && (
                      <span className="text-white/60 line-through text-sm">₹{viewProduct.price}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4 max-h-[50vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Category", value: viewProduct.category },
                    { label: "Brand", value: viewProduct.brand || "—" },
                    { label: "Stock", value: `${viewProduct.stock} units` },
                    { label: "Min. Age", value: (viewProduct.age ?? 0) > 0 ? `${viewProduct.age}+` : "All ages" },
                    { label: "Featured", value: viewProduct.isFeatured ? "Yes" : "No" },
                    { label: "Active", value: viewProduct.isActive ? "Yes" : "No" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                      <p className="text-sm font-semibold text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>
                {viewProduct.description && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Description</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{viewProduct.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

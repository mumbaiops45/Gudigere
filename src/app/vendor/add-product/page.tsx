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
  Image,
  Sparkles,
  CheckCircle2,
  Upload,
  Trash as TrashIcon,
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

function InputField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
        <span className="text-pink-500">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full h-10 bg-white border border-gray-200 rounded-lg px-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition";

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
  const [image, setImage] = useState(""); // base64 string or URL
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [age, setAge] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setDiscountPrice("");
    setStock("");
    setBrand("");
    setCategory("");
    setImage("");
    setIsFeatured(false);
    setIsActive(true);
    setAge(0);
    setEditProduct(null);
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

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPEG, PNG, WebP, etc.)");
      return;
    }

    // Validate size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string); // base64 data URL
    };
    reader.readAsDataURL(file);
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
        title,
        description,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : 0,
        stock: Number(stock),
        brand,
        category,
        images: image ? [image] : [],
        isFeatured,
        isActive,
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
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
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="h-11 px-5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-pink-200"
            >
              <Plus size={16} /> New Product
            </button>
          </div>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="border-2 border-dashed border-gray-200 rounded-2xl py-20 flex flex-col items-center justify-center text-center bg-white">
            <div className="w-16 h-16 rounded-2xl bg-pink-50 text-pink-400 flex items-center justify-center mb-4">
              <Package2 size={30} />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">No Products Found</h2>
            <p className="text-gray-400 mt-1 text-sm">Create your first product to get started</p>
          </div>
        )}

        {/* Product grid (unchanged) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product: Product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="relative h-36 bg-gray-100 overflow-hidden">
                <img
                  src={product.images?.[0] || "https://placehold.co/600x400"}
                  alt={product.title || "Product image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.isFeatured && (
                  <div className="absolute top-2.5 left-2.5 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Featured
                  </div>
                )}
                {product.discountPrice > 0 && (
                  <div className="absolute top-2.5 right-2.5 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                  </div>
                )}
                <div
                  className={`absolute bottom-2.5 right-2.5 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${
                    product.stock > 0 ? "bg-green-100/90 text-green-700" : "bg-red-100/90 text-red-600"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </div>
              </div>

              <div className="p-3">
                <h2 className="font-semibold text-gray-900 truncate">{product.title}</h2>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {(product.age ?? 0) > 0 && (
                    <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                      Age {product.age}+
                    </span>
                  )}
                  {product.brand && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                      {product.brand}
                    </span>
                  )}
                  {product.category && (
                    <span className="bg-pink-50 text-pink-600 text-xs px-2.5 py-0.5 rounded-full font-medium">
                      {product.category}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-xl font-bold text-pink-600">
                    ₹{product.discountPrice || product.price}
                  </span>
                  {product.discountPrice > 0 && (
                    <span className="text-gray-400 line-through text-sm">₹{product.price}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setViewProduct(product)}
                    className="flex-1 h-8 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center gap-1.5 text-sm font-medium"
                  >
                    <Eye size={13} /> View
                  </button>
                  <button
                    onClick={() => handleEditOpen(product)}
                    className="flex-1 h-8 rounded-xl bg-pink-50 border border-pink-100 text-pink-600 hover:bg-pink-100 transition flex items-center justify-center gap-1.5 text-sm font-medium"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-1 h-8 rounded-xl bg-gray-900 text-white hover:bg-black transition flex items-center justify-center gap-1.5 text-sm font-medium"
                  >
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CREATE / EDIT MODAL with File Attachment ── */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Package2 size={14} className="text-white" />
                  </div>
                  <h2 className="text-white font-bold text-base">
                    {editProduct ? "Update Product" : "Create Product"}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center text-white"
                >
                  <X size={14} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="overflow-y-auto max-h-[85vh] p-6 space-y-5 custom-scrollbar"
              >
                {/* Row 1: Title + Brand */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Product Title" icon={<Tag size={11} />}>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={inputCls}
                      placeholder="e.g. Premium Football"
                      required
                    />
                  </InputField>
                  <InputField label="Brand" icon={<Building2 size={11} />}>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className={inputCls}
                      placeholder="Nike, Adidas..."
                    />
                  </InputField>
                </div>

                {/* Row 2: Category + Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Category" icon={<Package2 size={11} />}>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={inputCls}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat: Category) => (
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </InputField>
                  <InputField label="Min. Age" icon={<Users size={11} />}>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className={inputCls}
                      placeholder="18"
                      min={0}
                    />
                  </InputField>
                </div>

                {/* Row 3: Price, Discount Price, Stock (3 columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <InputField label="Price (₹)" icon={<IndianRupee size={11} />}>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={inputCls}
                      placeholder="1999"
                      required
                      min={0}
                    />
                  </InputField>
                  <InputField label="Discount Price (₹)" icon={<IndianRupee size={11} />}>
                    <input
                      type="number"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      className={inputCls}
                      placeholder="1499"
                      min={0}
                    />
                  </InputField>
                  <InputField label="Stock Quantity" icon={<Layers size={11} />}>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className={inputCls}
                      placeholder="100"
                      required
                      min={0}
                    />
                  </InputField>
                </div>

                {/* Row 4: Image Attachment (instead of URL input) */}
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500">
                    <span className="text-pink-500"><Image size={11} /></span>
                    Product Image
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-10 px-4 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 text-sm font-medium flex items-center gap-2 hover:bg-gray-200 transition"
                    >
                      <Upload size={14} /> Choose Image
                    </button>
                    {image && (
                      <button
                        type="button"
                        onClick={removeImage}
                        className="h-10 px-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium flex items-center gap-2 hover:bg-red-100 transition"
                      >
                        <TrashIcon size={14} /> Remove
                      </button>
                    )}
                  </div>
                  {/* Image preview */}
                  {image && (
                    <div className="mt-2 relative inline-block">
                      <img
                        src={image}
                        alt="Preview"
                        className="h-24 w-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    </div>
                  )}
                  <p className="text-[10px] text-gray-400">Supports JPEG, PNG, WebP (max 2MB)</p>
                </div>

                {/* Row 5: Description */}
                <InputField label="Description" icon={<AlignLeft size={11} />}>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${inputCls} h-auto py-2 resize-none`}
                    placeholder="Detailed product description..."
                  />
                </InputField>

                {/* Row 6: Featured & Active toggles */}
                <div className="flex flex-wrap gap-5 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 accent-pink-500"
                    />
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Sparkles size={14} className="text-amber-500" /> Featured Product
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="w-4 h-4 accent-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-green-600" /> Active Product
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm transition shadow-md shadow-pink-200 disabled:opacity-60 mt-2"
                >
                  {loading ? "Saving…" : editProduct ? "Update Product" : "Create Product"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* View Product Modal (unchanged) */}
        {viewProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-3.5 flex items-center justify-between">
                <h2 className="text-white font-bold text-sm">Product Details</h2>
                <button
                  onClick={() => setViewProduct(null)}
                  className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 transition flex items-center justify-center text-white"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
                {viewProduct.images?.[0] && (
                  <img
                    src={viewProduct.images[0]}
                    alt={viewProduct.title  || "Product image"}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                )}
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Title", value: viewProduct.title },
                    { label: "Category", value: viewProduct.category },
                    { label: "Brand", value: viewProduct.brand || "—" },
                    { label: "Price", value: `₹${viewProduct.price}` },
                    ...(viewProduct.discountPrice > 0 ? [{ label: "Discount Price", value: `₹${viewProduct.discountPrice}` }] : []),
                    { label: "Stock", value: String(viewProduct.stock) },
                    ...((viewProduct.age ?? 0) > 0 ? [{ label: "Min. Age", value: `${viewProduct.age}+` }] : []),
                    { label: "Featured", value: viewProduct.isFeatured ? "Yes" : "No" },
                    { label: "Active", value: viewProduct.isActive ? "Yes" : "No" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                        {label}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
                {viewProduct.description && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                      Description
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">{viewProduct.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
}
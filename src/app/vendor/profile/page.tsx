"use client";

import { useEffect, useRef, useState } from "react";
import {
  Store,
  Mail,
  BadgeCheck,
  Pencil,
  User,
  Shield,
  ShieldCheck,
  ShieldAlert,
  X,
  Upload,
  ImageIcon,
  AlignLeft,
  Tag,
} from "lucide-react";

import useVendorProfile from "@/hooks/useVendorProfile";
import { updateVendorProfile } from "@/services/vendorProfileService";

const inputCls =
  "w-full h-10 bg-gray-50 border border-gray-200 rounded-xl px-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition";

export default function VendorProfilePage() {
  const { vendor, loading, fetchVendorProfile } = useVendorProfile();

  /* ── edit modal state ── */
  const [showEdit, setShowEdit]       = useState(false);
  const [shopName, setShopName]       = useState("");
  const [shopDesc, setShopDesc]       = useState("");
  const [logo, setLogo]               = useState("");
  const [dragOver, setDragOver]       = useState(false);
  const [saving, setSaving]           = useState(false);
  const [saveError, setSaveError]     = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchVendorProfile(); }, []);

  const openEdit = () => {
    setShopName(vendor?.shopName ?? "");
    setShopDesc(vendor?.shopDescription ?? "");
    setLogo(vendor?.shopLogo ?? "");
    setSaveError("");
    setShowEdit(true);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 2 * 1024 * 1024) { alert("Image must be under 2 MB"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSaveError("");
      await updateVendorProfile({ shopName, shopDescription: shopDesc, shopLogo: logo });
      await fetchVendorProfile();
      setShowEdit(false);
    } catch {
      setSaveError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  /* ── loading skeleton ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8 animate-pulse">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="bg-white rounded-2xl h-48 border border-gray-100" />
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4].map((i) => <div key={i} className="bg-white rounded-2xl h-28 border border-gray-100" />)}
          </div>
        </div>
      </div>
    );
  }

  const initials = vendor?.shopName
    ? vendor.shopName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "GG";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Store Profile</h1>
          <p className="text-gray-400 mt-1 text-sm">Your vendor account details</p>
        </div>

        {/* ── Hero card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          <div className="h-24 bg-linear-to-r from-pink-500 via-rose-500 to-pink-600" />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-12 mb-4">
              <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-md overflow-hidden bg-pink-100 flex items-center justify-center shrink-0">
                {vendor?.shopLogo ? (
                  <img src={vendor.shopLogo} alt={vendor.shopName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-black text-pink-600">{initials}</span>
                )}
              </div>
              <button
                onClick={openEdit}
                className="h-10 px-4 rounded-xl bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-semibold flex items-center gap-2 transition shadow-md shadow-pink-200"
              >
                <Pencil size={14} /> Edit Profile
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-black text-gray-900">{vendor?.shopName ?? "—"}</h2>
                {vendor?.isApproved
                  ? <BadgeCheck size={22} className="text-green-500" />
                  : <ShieldAlert size={20} className="text-amber-400" />}
              </div>
              {vendor?.shopDescription && (
                <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-xl">{vendor.shopDescription}</p>
              )}
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                <Mail size={14} className="text-gray-400 shrink-0" />
                {vendor?.user?.email ?? "—"}
              </div>
            </div>
          </div>
        </div>

        {/* ── Info grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${vendor?.isApproved ? "bg-green-50" : "bg-amber-50"}`}>
                {vendor?.isApproved ? <ShieldCheck size={16} className="text-green-500" /> : <ShieldAlert size={16} className="text-amber-500" />}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vendor Status</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${vendor?.isApproved ? "bg-green-500" : "bg-amber-400"}`} />
              <p className="font-semibold text-gray-800">{vendor?.isApproved ? "Approved Vendor" : "Pending Approval"}</p>
            </div>
            <p className="text-xs text-gray-400 mt-1 ml-4">
              {vendor?.isApproved ? "Your store is live and visible to customers" : "Your account is under review"}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center">
                <Shield size={16} className="text-violet-500" />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account Role</p>
            </div>
            <p className="font-semibold text-gray-800 capitalize">{vendor?.user?.role ?? "—"}</p>
            <p className="text-xs text-gray-400 mt-1">Access level for this portal</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center">
                <Store size={16} className="text-pink-500" />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shop Name</p>
            </div>
            <p className="font-semibold text-gray-800">{vendor?.shopName ?? "—"}</p>
            <p className="text-xs text-gray-400 mt-1">Displayed on your product listings</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                <User size={16} className="text-blue-500" />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Contact</p>
            </div>
            <p className="font-semibold text-gray-800">{vendor?.user?.name ?? "—"}</p>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <Mail size={11} />{vendor?.user?.email ?? "—"}
            </p>
          </div>
        </div>
      </div>

      {/* ══ Edit Modal ══ */}
      {showEdit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-md shadow-pink-200">
                  <Store size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-base">Edit Store Profile</h2>
                  <p className="text-xs text-gray-400">Update your shop information</p>
                </div>
              </div>
              <button
                onClick={() => setShowEdit(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-gray-500"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSave} className="overflow-y-auto flex-1 p-6 space-y-5">

              {/* Logo upload */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  <span className="text-pink-500"><ImageIcon size={11} /></span>
                  Shop Logo
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
                />

                {logo ? (
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-pink-200 shadow-sm group">
                    <img src={logo} alt="Logo preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                      <button type="button" onClick={() => fileRef.current?.click()} className="text-white text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg">
                        Change
                      </button>
                      <button type="button" onClick={() => setLogo("")} className="text-white text-xs font-semibold bg-rose-500/80 hover:bg-rose-600 px-3 py-1 rounded-lg">
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) processFile(f); }}
                    className={`w-32 h-32 rounded-2xl border-2 border-dashed cursor-pointer flex flex-col items-center justify-center gap-2 transition-all ${
                      dragOver ? "border-pink-400 bg-pink-50" : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50"
                    }`}
                  >
                    <Upload size={20} className="text-gray-300" />
                    <p className="text-xs text-gray-400 text-center leading-snug">Click or<br />drag & drop</p>
                  </div>
                )}
              </div>

              {/* Shop name */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <span className="text-pink-500"><Tag size={11} /></span>
                  Shop Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className={inputCls}
                  placeholder="Your store name"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <span className="text-pink-500"><AlignLeft size={11} /></span>
                  Shop Description
                </label>
                <textarea
                  rows={4}
                  value={shopDesc}
                  onChange={(e) => setShopDesc(e.target.value)}
                  className={`${inputCls} h-auto py-2.5 resize-none`}
                  placeholder="Tell customers about your store…"
                />
              </div>

              {saveError && (
                <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2">{saveError}</p>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowEdit(false)}
                  className="flex-1 h-11 rounded-2xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 h-11 rounded-2xl bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm transition shadow-lg shadow-pink-200 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Saving…
                    </>
                  ) : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

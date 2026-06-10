"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Heart, LogIn, UserPlus, Lock } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  action?: "cart" | "wishlist" | "order";
}

const messages = {
  cart:     { icon: ShoppingCart, title: "Login to Add to Cart",     sub: "Sign in to save items and checkout faster." },
  wishlist: { icon: Heart,        title: "Login to Save to Wishlist", sub: "Sign in to save your favourite toys."       },
  order:    { icon: Lock,         title: "Login to Place Order",      sub: "Sign in to track and manage your orders."  },
};

export default function LoginPromptModal({ open, onClose, action = "cart" }: Props) {
  const router = useRouter();
  const { icon: Icon, title, sub } = messages[action];

  const go = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm pointer-events-auto overflow-hidden">

              {/* Top accent */}
              <div className="h-1.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500" />

              {/* Close button */}
              <div className="flex justify-end px-5 pt-4">
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="px-8 pb-8 pt-2 text-center">
                {/* Icon circle */}
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-pink-500" />
                </div>

                {/* Brand */}
                <p className="text-sm font-black text-pink-500 uppercase tracking-widest mb-1">
                  GoodieGear
                </p>

                <h2 className="text-xl font-black text-gray-900">{title}</h2>
                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{sub}</p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 mt-6">
                  <button
                    onClick={() => go("/login")}
                    className="w-full h-12 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-pink-200 hover:shadow-lg"
                  >
                    <LogIn size={18} />
                    Login to Continue
                  </button>

                  <button
                    onClick={() => go("/register")}
                    className="w-full h-12 border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 text-gray-700 hover:text-pink-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <UserPlus size={18} />
                    Create New Account
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  10,000+ toys · Free delivery above ₹2,000
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

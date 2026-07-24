// "use client";

// import { useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import {
//     Heart,
//     Trash2,
//     ShoppingCart,
// } from "lucide-react";

// import useWishlist from "../../hooks/useWishlist";
// import { removeWishlistItem } from "../../services/wishlistService";
// import useCartStore from "../../store/cartStore";

// export default function WishlistPage() {

//     const router = useRouter();

//     // Guard — redirect guests to login
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             toast.error("Please login to view your wishlist");
//             router.push("/login");
//         }
//     }, []);

//     const {
//         wishlistItems,
//         fetchWishlist,
//     } = useWishlist();

//     const { addToCart } = useCartStore();

//     // REMOVE
//     const handleRemove = async (productId: string) => {
//         try {
//             await removeWishlistItem(productId);
//             await fetchWishlist();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // MOVE TO CART — add to cart, remove from wishlist, navigate to cart
//     const handleMoveToCart = async (product: any) => {
//         addToCart({
//             ...product,
//             quantity: 1,
//         });

//         try {
//             await removeWishlistItem(product._id);
//             await fetchWishlist();
//         } catch (error) {
//             console.log(error);
//         }

//         router.push("/cart");
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-12">
//             <div className="max-w-7xl mx-auto px-4">

//                 {/* TOP */}
//                 <div className="mb-10">
//                     <h1 className="text-5xl font-black text-black">My Wishlist</h1>
//                     <p className="text-gray-500 mt-3">Your favorite products</p>
//                 </div>

//                 {/* EMPTY */}
//                 {wishlistItems.length === 0 && (
//                     <div className="bg-white rounded-[30px] border border-gray-200 py-24 text-center">
//                         <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mx-auto">
//                             <Heart size={40} className="text-pink-600" />
//                         </div>
//                         <h2 className="text-4xl font-black text-black mt-6">Wishlist Empty</h2>
//                         <p className="text-gray-500 mt-3">Save products you love</p>
//                         <Link href="/">
//                             <button className="mt-8 h-[56px] px-8 rounded-2xl bg-pink-500 hover:bg-pink-600 transition text-white font-bold">
//                                 Continue Shopping
//                             </button>
//                         </Link>
//                     </div>
//                 )}

//                 {/* PRODUCTS GRID */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//                     {wishlistItems.map((product: any) => (
//                         <div
//                             key={product._id}
//                             className="bg-white rounded-[30px] overflow-hidden border border-gray-200 hover:shadow-xl transition flex flex-col"
//                         >
//                             {/* ─── CLICKABLE PRODUCT (image, title, desc, price) ─── */}
//                             <Link
//                                 href={`/products/${product._id}`}
//                                 className="block cursor-pointer"
//                             >
//                                 {/* IMAGE */}
//                                 <div className="relative h-[280px] overflow-hidden bg-gray-100">
//                                     <Image
//                                         src={product.images?.[0] || "https://placehold.co/400x300/fce4f3/e91e8c?text=No+Image"}
//                                         alt={product.name}
//                                         fill
//                                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                                         className="object-cover hover:scale-105 transition duration-500"
//                                     />
//                                 </div>

//                                 {/* CONTENT */}
//                                 <div className="p-5">
//                                     <h2 className="text-2xl font-black text-black line-clamp-1">
//                                         {product.name}
//                                     </h2>
//                                     <p className="text-gray-500 mt-3 line-clamp-2">
//                                         {product.description}
//                                     </p>
//                                     <div className="mt-5">
//                                         <span className="text-3xl font-black text-pink-600">
//                                             ₹{product.price}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </Link>

//                             {/* ─── BUTTONS (outside the link) ────────────────────────── */}
//                             <div className="p-5 pt-0 grid grid-cols-2 gap-3 mt-auto">
//                                 {/* MOVE CART */}
//                                 <button
//                                     onClick={() => handleMoveToCart(product)}
//                                     className="h-[52px] rounded-2xl bg-pink-500 hover:bg-pink-600 transition text-white font-bold flex items-center justify-center gap-2"
//                                 >
//                                     <ShoppingCart size={18} />
//                                     Cart
//                                 </button>

//                                 {/* REMOVE */}
//                                 <button
//                                     onClick={() => handleRemove(product._id)}
//                                     className="h-[52px] rounded-2xl bg-red-100 text-red-600 font-bold flex items-center justify-center gap-2"
//                                 >
//                                     <Trash2 size={18} />
//                                     Remove
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    Heart,
    Trash2,
    ShoppingCart,
} from "lucide-react";

import useWishlist from "../../hooks/useWishlist";
import { removeWishlistItem } from "../../services/wishlistService";
import useCartStore from "../../store/cartStore";

export default function WishlistPage() {

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to view your wishlist");
            router.push("/login");
        }
    }, []);

    const {
        wishlistItems,
        fetchWishlist,
    } = useWishlist();

    const { addToCart } = useCartStore();

    const handleRemove = async (productId: string) => {
        try {
            await removeWishlistItem(productId);
            await fetchWishlist();
        } catch (error) {
            console.log(error);
        }
    };

    const handleMoveToCart = async (product: any) => {
        addToCart({
            ...product,
            quantity: 1,
        });

        try {
            await removeWishlistItem(product._id);
            await fetchWishlist();
        } catch (error) {
            console.log(error);
        }

        router.push("/cart");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* TOP */}
                <div className="mb-6 sm:mb-8 md:mb-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black">My Wishlist</h1>
                    <p className="text-gray-500 mt-1 sm:mt-2 md:mt-3 text-sm sm:text-base">Your favorite products</p>
                </div>

                {/* EMPTY */}
                {wishlistItems.length === 0 && (
                    <div className="bg-white rounded-[30px] border border-gray-200 py-16 sm:py-20 md:py-24 text-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-pink-100 flex items-center justify-center mx-auto">
                            <Heart size={32} className="text-pink-600 sm:w-10 sm:h-10" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mt-4 sm:mt-5 md:mt-6">Wishlist Empty</h2>
                        <p className="text-gray-500 mt-2 text-sm sm:text-base">Save products you love</p>
                        <Link href="/">
                            <button className="mt-6 sm:mt-8 h-12 sm:h-[56px] px-6 sm:px-8 rounded-2xl bg-pink-500 hover:bg-pink-600 transition text-white font-bold text-sm sm:text-base">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {wishlistItems.map((product: any) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-[30px] overflow-hidden border border-gray-200 hover:shadow-xl transition flex flex-col"
                        >
                            {/* ─── CLICKABLE PRODUCT ─── */}
                            <Link
                                href={`/products/${product._id}`}
                                className="block cursor-pointer"
                            >
                                {/* IMAGE – fixed aspect‑ratio square with subtle bottom border */}
                                <div className="relative w-full aspect-square bg-gray-100 overflow-hidden border-b border-gray-200">
                                    <Image
                                        src={
                                            product.images?.[0] &&
                                            product.images[0].startsWith("http")
                                                ? product.images[0]
                                                : "https://placehold.co/600x600/fce4f3/e91e8c?text=No+Image"
                                        }
                                        alt={product.name || "Product"}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover hover:scale-105 transition duration-500"
                                        priority={false}
                                    />
                                </div>

                                {/* CONTENT – tighter padding for less white space */}
                                <div className="p-3 sm:p-4 md:p-5">
                                    <h2 className="text-base sm:text-lg md:text-xl font-black text-black line-clamp-1">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm line-clamp-2">
                                        {product.description || "No description available"}
                                    </p>
                                    <div className="mt-2 sm:mt-3 md:mt-4">
                                        <span className="text-xl sm:text-2xl md:text-3xl font-black text-pink-600">
                                            ₹{Number(product.price).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                </div>
                            </Link>

                            {/* ─── BUTTONS ────────────────────────── */}
                            <div className="p-3 sm:p-4 md:p-5 pt-0 grid grid-cols-2 gap-2 sm:gap-3 mt-auto">
                                <button
                                    onClick={() => handleMoveToCart(product)}
                                    className="h-[40px] sm:h-[44px] md:h-[52px] rounded-2xl bg-pink-500 hover:bg-pink-600 transition text-white font-bold flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                                >
                                    <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                                    Cart
                                </button>
                                <button
                                    onClick={() => handleRemove(product._id)}
                                    className="h-[40px] sm:h-[44px] md:h-[52px] rounded-2xl bg-red-100 text-red-600 font-bold flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                                >
                                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
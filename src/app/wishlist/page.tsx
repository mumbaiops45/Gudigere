"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
    Heart,
    Trash2,
    ShoppingCart,
} from "lucide-react";

import useWishlist from "../../hooks/useWishlist";

import {
    removeWishlistItem,
} from "../../services/wishlistService";

import useCartStore from "../../store/cartStore";

export default function WishlistPage() {

    const router = useRouter();

    // Guard — redirect guests to login
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

    // REMOVE
    const handleRemove =
        async (
            productId: string
        ) => {

            try {

                await removeWishlistItem(
                    productId
                );

                fetchWishlist();

            } catch (error) {

                console.log(error);
            }
        };

    // MOVE TO CART — add to cart, remove from wishlist, navigate to cart
    const handleMoveToCart =
        async (product: any) => {

            addToCart({
                ...product,
                quantity: 1,
            });

            try {
                await removeWishlistItem(product._id);
                fetchWishlist();
            } catch {
                // item still moves to cart even if remove fails
            }

            router.push("/cart");
        };

    return (
        <div className="min-h-screen bg-gray-50 py-12">

            <div className="max-w-7xl mx-auto px-4">

                {/* TOP */}
                <div className="mb-10">

                    <h1 className="text-5xl font-black text-black">

                        My Wishlist

                    </h1>

                    <p className="text-gray-500 mt-3">

                        Your favorite products

                    </p>

                </div>

                {/* EMPTY */}
                {wishlistItems.length ===
                    0 && (
                        <div className="bg-white rounded-[30px] border border-gray-200 py-24 text-center">

                            <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mx-auto">

                                <Heart
                                    size={40}
                                    className="text-pink-600"
                                />

                            </div>

                            <h2 className="text-4xl font-black text-black mt-6">

                                Wishlist Empty

                            </h2>

                            <p className="text-gray-500 mt-3">

                                Save products you love

                            </p>

                            <Link href="/">

                                <button className="mt-8 h-[56px] px-8 rounded-2xl bg-pink-500 hover:bg-pink-600 transition text-white font-bold">

                                    Continue Shopping

                                </button>

                            </Link>

                        </div>
                    )}

                {/* PRODUCTS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                    {wishlistItems.map(
                        (product: any) => (

                            <div
                                key={product._id}
                                className="bg-white rounded-[30px] overflow-hidden border border-gray-200 hover:shadow-xl transition"
                            >

                                {/* IMAGE */}
                                <div className="h-[280px] overflow-hidden bg-gray-100">

                                    <img
                                        src={
                                            product
                                                .images?.[0]
                                        }
                                        alt={
                                            product.name
                                        }
                                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                    />

                                </div>

                                {/* CONTENT */}
                                <div className="p-5">

                                    <h2 className="text-2xl font-black text-black line-clamp-1">

                                        {
                                            product.name
                                        }

                                    </h2>

                                    <p className="text-gray-500 mt-3 line-clamp-2">

                                        {
                                            product.description
                                        }

                                    </p>

                                    {/* PRICE */}
                                    <div className="mt-5">

                                        <span className="text-3xl font-black text-pink-600">

                                            ₹
                                            {
                                                product.price
                                            }

                                        </span>

                                    </div>

                                    {/* BUTTONS */}
                                    <div className="grid grid-cols-2 gap-3 mt-6">

                                        {/* MOVE CART */}
                                        <button
                                            onClick={() =>
                                                handleMoveToCart(
                                                    product
                                                )
                                            }
                                            className="h-[52px] rounded-2xl bg-pink-500 hover:bg-pink-600 transition text-white font-bold flex items-center justify-center gap-2"
                                        >

                                            <ShoppingCart
                                                size={18}
                                            />

                                            Cart

                                        </button>

                                        {/* REMOVE */}
                                        <button
                                            onClick={() =>
                                                handleRemove(
                                                    product._id
                                                )
                                            }
                                            className="h-[52px] rounded-2xl bg-red-100 text-red-600 font-bold flex items-center justify-center gap-2"
                                        >

                                            <Trash2
                                                size={18}
                                            />

                                            Remove

                                        </button>

                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </div>

            </div>

        </div>
    );
}
import { ShoppingCart, Zap } from "lucide-react";

type Props = { product: any };

export default function ProductCard({ product }: Props) {
  const discount = Math.round(((product.price + 500 - product.price) / (product.price + 500)) * 100);

  return (
    <div className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">

      {/* IMAGE */}
      <div className="relative bg-gray-50 h-44 sm:h-52 flex items-center justify-center p-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-pink-600 text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded">
          {discount}% off
        </div>
      </div>

      {/* DETAILS */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1">

        <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
          {product.vendor}
        </p>

        <h2 className="text-xs sm:text-sm text-gray-800 line-clamp-2 leading-snug min-h-8 sm:min-h-10">
          {product.title}
        </h2>

        {/* RATING */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            4.5 ★
          </span>
          <span className="text-[10px] text-gray-400">(245)</span>
        </div>

        {/* PRICE */}
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-base sm:text-lg font-black text-gray-900">₹{product.price}</span>
          <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{product.price + 500}</span>
          <span className="text-[10px] sm:text-xs text-green-600 font-bold">{discount}% off</span>
        </div>

        <p className="text-[10px] sm:text-[11px] text-green-600 font-semibold mt-0.5">
          FREE Delivery Tomorrow
        </p>

        {/* BUTTONS */}
        <div className="flex gap-2 mt-auto pt-3">
          <button className="btn-shine flex-1 bg-yellow-400 hover:bg-black hover:text-white text-gray-900 py-2 sm:py-2.5 rounded font-bold text-[10px] sm:text-xs transition-colors flex items-center justify-center gap-1">
            <ShoppingCart size={11} />
            Add to Cart
          </button>
          <button className="btn-shine flex-1 bg-pink-600 hover:bg-black text-white py-2 sm:py-2.5 rounded font-bold text-[10px] sm:text-xs transition-colors flex items-center justify-center gap-1">
            <Zap size={11} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

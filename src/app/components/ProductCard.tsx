type Props = {
  product: any;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">

      {/* PRODUCT IMAGE */}
      <div className="relative bg-[#f8f8f8] p-4 flex items-center justify-center h-65 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain hover:scale-110 transition duration-400"
        />

        {/* DISCOUNT RIBBON */}
        <div className="absolute top-3 left-3 bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
          SALE
        </div>
      </div>

      {/* PRODUCT DETAILS */}
      <div className="p-5 flex flex-col flex-1">

        {/* TITLE */}
        <h2 className="text-base font-bold text-gray-800 line-clamp-2 min-h-12">
          {product.title}
        </h2>

        {/* VENDOR */}
        <p className="text-sm text-gray-500 mt-2">
          by{" "}
          <span className="font-semibold text-pink-600">
            {product.vendor}
          </span>
        </p>

        {/* RATING */}
        <div className="flex items-center mt-3">
          <div className="flex text-amber-400 text-base tracking-tight">
            ★★★★☆
          </div>
          <span className="text-sm text-gray-400 ml-2">(245)</span>
        </div>

        {/* PRICE */}
        <div className="mt-4 flex items-end gap-2">
          <p className="text-2xl font-extrabold text-gray-900">
            ₹{product.price}
          </p>
          <p className="text-gray-400 line-through text-sm mb-0.5">
            ₹{product.price + 500}
          </p>
          <span className="text-xs font-bold text-green-600 mb-0.5">
            25% off
          </span>
        </div>

        {/* DELIVERY */}
        <p className="text-xs text-green-600 mt-1.5 font-semibold">
          ✓ FREE Delivery Tomorrow
        </p>

        {/* BUTTON */}
        <button className="btn-shine w-full mt-auto pt-5 bg-amber-400 hover:bg-amber-500 text-black py-3 rounded-full font-extrabold text-sm transition-all shadow-md hover:shadow-amber-400/40 hover:scale-[1.02] active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h2>
        <Link href="/" className="text-green-700 font-medium underline">
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white p-6 rounded-xl shadow"
          >
            {/* Product info */}
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">
                ₹{item.priceInr} per {item.unit}
              </p>

              {/* ✅ Quantity Controls */}
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price + remove */}
            <div className="text-right">
              <p className="font-semibold text-lg">
                ₹{item.priceInr * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm hover:underline mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 bg-gray-100 p-6 rounded-xl flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Total: ₹{totalPrice}</p>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:underline"
          >
            Clear cart
          </button>
        </div>

        <Link
          href="/checkout"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
``
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemList = Object.values(items); // Convierte los ítems del objeto en un array

  return (
    <div className="p-4">
      <h2 className="font-bold">Shopping Cart</h2>
      {itemList.length > 0 ? (
        itemList.map((item) => (
          <div key={item.id} className="pt-10">
            <img
              src={item.image}
              alt={item.title}
              className="w-auto h-48 object-contain aspect-square"
            />
            <p>
              {item.title} - {item.price} USD - Qty: {item.quantity}
            </p>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;

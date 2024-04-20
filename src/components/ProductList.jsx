import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import axios from "axios";
import { useState } from "react";

async function fetchProducts() {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "An error occurred");
  }
}

function ProductList() {
  const dispatch = useDispatch();
  const queryInfo = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [filter, setFilter] = useState("");

  const { data: products, error, isLoading } = queryInfo;

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="p-4 border shadow-md">
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-auto h-48 object-contain aspect-square"
              />
            </div>
            <h3 className="font-bold truncate">{product.title}</h3>
            <p>{product.price} USD</p>
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

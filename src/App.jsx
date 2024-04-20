import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="flex gap-4 mb-4 text-white">
          <Link to="/" className="bg-blue-500 px-3 py-2 rounded">
            Home
          </Link>
          <Link to="/cart" className="bg-green-500 px-3 py-2 rounded">
            Cart
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./components/Profile";
import Content from "./components/Content";
import Basket from "./components/Basket";
import './App.css'
import UpdateProfile from "./components/UpdateProfile";

function App() {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const respone = await axios.get("http://localhost:8000/products");
    const newData = respone.data.Products;

    console.log("DATA", newData);
    setProducts(newData);
  };
  useEffect(() => {
    getData();
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const countCartItems = cartItems.length;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/content"
          element={<Content countCartItems={countCartItems} />}
        >
          <Route
            path="basket"
            element={
              <Basket
                products={products}
                onAdd={onAdd}
                onRemove={onRemove}
                cartItems={cartItems}
              />
            }
          />

          <Route path="profile" element={<Profile />} />
          <Route path='update-profile' element={<UpdateProfile/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

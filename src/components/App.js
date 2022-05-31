import Customers from "./Customers";
import Products from "./Products";
import Orders from "./Orders";
import StripeContainer from "./StripeContainer";
import React,{useState} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import {HashRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
  const [order_id, setOrderID] = useState();
  const handleOrderID = (order_id) => {
    setOrderID(order_id);    
  }
  return (
    <div className="App">
    <Navbar />
      <Router>
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/" element={<Products handleOrderID={handleOrderID}/>} />
          <Route path="/orders" element={<Orders orderID={order_id} />} />
          <Route path="/payment" element={<StripeContainer/>} />
        </Routes>
      </Router>
      <Footer />      
    </div>
  );
}

export default App;

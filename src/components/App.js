import Customers from "./Customers";
import Products from "./Products";
import Orders from "./Orders";
import React,{useState} from "react";

import {HashRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  const [order_id, setOrderID] = useState();
  const handleOrderID = (order_id) => {
    setOrderID(order_id);    
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/" element={<Products handleOrderID={handleOrderID}/>} />
          <Route path="/orders" element={<Orders orderID={order_id} />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;

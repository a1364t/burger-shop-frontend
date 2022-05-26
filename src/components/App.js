import Customers from "./Customers";
import Products from "./Products";

import {HashRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;

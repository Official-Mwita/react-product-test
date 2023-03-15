
import './App.css';
import LoginPage from './component/Login';
import ProductTable from './component/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Logiv2';
import CreateProductPage from './component/Addproduct';
import { useState } from 'react';

function App() {
  const[productinfo, setproductinfo] = useState(null)

  return (
    <Router>
      <Routes>
      <Route path="/addproduct" element={<CreateProductPage productinfo={productinfo}/>} />
        <Route path="*" element={<Login />} />
        <Route path="/main" element={<ProductTable setproductinfo={setproductinfo}/>} />
      </Routes>
    </Router>
  );
}

export default App;

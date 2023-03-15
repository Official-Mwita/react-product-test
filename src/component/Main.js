import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function handleLogout() {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location="/login"
  }

 
function ProductTable({setproductinfo}) {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const location = useNavigate()


  const handleCreate = () => {
    setproductinfo(null)
    location('/addproduct')
  }

  useEffect(() => {


    // Make a GET request to the products endpoint
   !token?window.location="/login" : fetch('http://192.168.1.13:5001/api/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setProducts(data))
    .catch(error => console.error(error));
  }, [token]);

  const update = product => {
    setproductinfo(product)
    location('/addproduct') 
  }

  return (
    <div className='app'>
        <h2>A list of products</h2>
         <table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Unit Price</th>
          <th>Available Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.productId} onClick={() => update(product)} className='pr-table'>
            <td>{product.productId}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.unitPrice}</td>
            <td>{product.availableQnty}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={handleLogout}>Logout</button>
    <button onClick={handleCreate}><Link>Add product</Link></button>
    </div>
   
    
  );
}

export default ProductTable;

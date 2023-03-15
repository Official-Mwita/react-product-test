import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function CreateProductPage({productinfo}) {
  const [name, setName] = useState(productinfo?.name);
  const [category, setCategory] = useState(productinfo?.category);
  const [unitPrice, setUnitPrice] = useState(productinfo?.unitPrice);
  const [availableQnty, setAvailableQnty] = useState(productinfo?.availableQnty);
  const [color, setSetColor] = useState(productinfo?.color);

  const [producterror, setProducterror] = useState(null);



  function checkproduct() {
    let notvalid = true
    setProducterror(null)

    if(name.trim == '' || category.trim == '' || unitPrice < 1 || availableQnty < 1)
        notvalid = false

    return notvalid
    
  }

  // Handle the form submission
  function handleSubmit(event) {
    event.preventDefault();

    if(!checkproduct()){
        setProducterror("Product values are not set")
        return
    }
        

    const url = 'http://192.168.1.13:5001/api/products';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        color: color,
        name: name,
        category: category,
        unitPrice: parseFloat(unitPrice),
        availableQnty: parseInt(availableQnty)
      })
    };

    fetch(url, options)
      .then(response => {
        if (response.ok) {
            window.location.href = '/main';
        } else {
          throw new Error('Failed to create product.');
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <h2>Create New Product</h2>
      {producterror && <p style={{ color: 'red' }}>{producterror}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={event => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Category:
          <input type="text" value={category} onChange={event => setCategory(event.target.value)} />
        </label>
        <br />
        <label>
          Color:
          <input type="text" value={color} onChange={event => setSetColor(event.target.value)} />
        </label>
        <br />
        <label>
          Unit Price:
          <input type="number" value={unitPrice} onChange={event => setUnitPrice(event.target.value)} />
        </label>
        <br />
        <label>
          Available Quantity:
          <input type="number" value={availableQnty} onChange={event => setAvailableQnty(event.target.value)} />
        </label>
        <br />
        <button type="submit">{productinfo ? 'Edit':'Create'}</button>
        <button style={{marginLeft:5}}><Link to='/main'>Back</Link></button>
      </form>
    </div>
  );
}

export default CreateProductPage;

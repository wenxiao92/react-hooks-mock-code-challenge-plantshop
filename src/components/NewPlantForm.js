import React, {useState} from "react";

function NewPlantForm({onAddPlant}) {
  //when posting data, identify all components for the JSON data and create a state for each
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  function handleSubmit (e) {
    e.preventDefault();
    fetch('http://localhost:6001/plants',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "price": price,
      }),
    })
    .then((r) => r.json())
    .then((newPlant) => onAddPlant(newPlant));
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} placeholder="Plant name" onChange={(e) => setName(e.target.value)}/>
        <input type="text" name="image" value={image} placeholder="Image URL" onChange={(e) => setImage(e.target.value)}/>
        <input type="number" name="price" value={price} step="0.01" placeholder="Price" onChange={(e) => setPrice(e.target.value)}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;

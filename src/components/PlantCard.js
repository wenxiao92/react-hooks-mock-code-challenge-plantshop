import React, {useState} from "react";

function PlantCard({plantData, onUpdatePlant}) {

  console.log(onUpdatePlant)

  const {id, name, image, price} = plantData;
  const [availability, setAvail] = useState(true)
  const [pricing, setPrice] = useState(price) //initial state is the price from the JSON

  function changeAvail(){
    setAvail((availability) => !availability)
  }

  function handlePriceFormSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'price': pricing }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        console.log(updatedPlant, onUpdatePlant);
        // onUpdatePlant(updatedPlant);
      });
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {availability ? (
        <button className="primary" onClick={changeAvail}>In Stock</button>
      ) : (
        <button onClick={changeAvail}>Out of Stock</button>
      )}
      <button>Delete</button>
      <form onSubmit={handlePriceFormSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="New price..."
          value={pricing}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;

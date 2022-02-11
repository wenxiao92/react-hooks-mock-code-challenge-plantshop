import React from "react";
import PlantCard from "./PlantCard";

function PlantList({data, onUpdatePlant}) {
  //console.log(data)
  console.log(onUpdatePlant)
  const displayPlants = data.map((plants) => (
    <PlantCard
    key={plants.id}
    plantData={plants}
    onUpdatePlant={onUpdatePlant}

    />
  ))

  return (
    <ul className="cards">{displayPlants}</ul>
  );
}

export default PlantList;

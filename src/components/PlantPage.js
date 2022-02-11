import React, {useEffect, useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  //holds the current plant data
  const[plants, setPlant] = useState([])
  const[searched, setSearch] = useState('')

  useEffect(()=>{
    fetch('http://localhost:6001/plants')
    .then((r) => r.json())
    .then((data) => setPlant(data))
  },[])

  function handleSubmit(newPlant){
    const newArray = [...plants, newPlant]
    setPlant(newArray)
  }

  function handleUpdate(updatedPlant){
    console.log(updatedPlant)
    // const updatedPlantsArray = plants.map((plant) => {
    //   if (plant.id === updatedPlant.id) {
    //     return updatedPlant;
    //   } else {
    //     return plant;
    //   }
    // });
    // setPlant(updatedPlantsArray);
  }
  
  //filters the plants based on the searched state before sending it as a prop to PlantList. We assign
  //the filtered list of plants into displayPlants and use this as a prop instead of the actual state 'plants'
  //alternatively, we can just put the plants.filter within the {} that will get sent as a prop
  const displayPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searched.toLowerCase());
  })

  return (
    <main>
      <NewPlantForm onAddPlant={handleSubmit}/>
      <Search search={searched} onSearch={setSearch}/>
      <PlantList data={displayPlants} onUpdatePlant={handleUpdate}/>
    </main>
  );
}

export default PlantPage;

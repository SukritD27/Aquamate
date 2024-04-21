import React, { useState, useEffect  } from 'react';
import './builder_tool.css'
import SearchBar from './search_bar';
import FilterBar from './filter_bar';
import BuildSection from './build_section';
import TabBar from './tab_bar';

const BuilderTool = () => {
  
  // Initializing states
  const [activeTab, setActiveTab] = useState('Fish');
  const [searchTerm, setSearchTerm] = useState('');
  const [fishData, setFishData] = useState([]);
  const [plantData, setPlantData] = useState([]);
  const [tankData, setTankData] = useState([]);
  const [selectedFish, setSelectedFish] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState([]);
  const [selectedTank, setSelectedTank] = useState(null);
  const [filterTank, setFilterTank] = useState({min: '', max: ''});
  const [filterPH, setFilterPH] = useState({min: '', max: ''});
  const [filterTemp, setFilterTemp] = useState({min: '', max: ''});
  const [filterForS, setFilterForS] = useState("");

  const openTab = (tabName) => {
    setActiveTab(tabName);
    setSearchTerm(''); // Reset search term on tab change
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/search?search=${searchTerm}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Use a map to hold the state setters for easier access
        const setStateMap = {
          'Fauna': setFishData,
          'Flora': setPlantData,
          'Tank': setTankData,
        };

        
        Object.keys(setStateMap).forEach(type => {
          const filteredData = data.filter(item => {
            // Check if the item matches the type and search term
            const matchesTypeAndSearch = (item.Type === type || item.type === type) &&
              (item.commonName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
              item.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.size?.toString().includes(searchTerm));
        
            // Check if pH is within filter range
            const matchesPh = !filterPH.min && !filterPH.max || // No pH filter applied
              (item.pH && parseFloat(item.pH) >= parseFloat(filterPH.min) && parseFloat(item.pH) <= parseFloat(filterPH.max));
        
            // Check if temperature is within filter range
            const matchesTemp = !filterTemp.min && !filterTemp.max || // No temperature filter applied
              (item.temp && parseFloat(item.temp) >= parseFloat(filterTemp.min) && parseFloat(item.temp) <= parseFloat(filterTemp.max));
        
            // Check if the item's minTankSize falls within the specified range
            const matchesTank = (!filterTank.min && !filterTank.max) || // No tank size filter applied
              (item.minTankSize >= parseFloat(filterTank.min) && item.minTankSize <= parseFloat(filterTank.max));
            
          

            // Check for Water Type (Salt/Fresh)
            const matchesForS = !filterForS || (filterForS.toLowerCase() === 'salt' && item.saltOrFresh === 'S') ||
              (filterForS.toLowerCase() === 'fresh' && item.saltOrFresh === 'F');
        
            // Return true only if all conditions are met
            return matchesTypeAndSearch && matchesPh && matchesTemp && matchesTank && matchesForS;
          });
          // Update state for each type with the filtered data
          setStateMap[type](filteredData);
        });
      }catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [searchTerm, activeTab, filterPH, filterForS, filterTank,filterTemp]); // Dependency on both activeTab and searchTerm ensures data is refetched on change


  const isFishCompatible = (newFish) => {
    let incompatibilityReasons = [];

    // Check compatibility with other selected fish
    for (let fish of selectedFish) {
      const fishAggressiveTowards = fish.aggressive && typeof fish.aggressive === 'string' 
                                    ? fish.aggressive.split(',').map(name => name.trim().toLowerCase()) 
                                    : [];
      const newFishAggressiveTowards = newFish.aggressive && typeof newFish.aggressive === 'string' 
                                      ? newFish.aggressive.split(',').map(name => name.trim().toLowerCase()) 
                                      : [];
      const newFishCommonNames = newFish.commonName && typeof newFish.commonName === 'string' 
                                ? newFish.commonName.split(',').map(name => name.trim().toLowerCase()) 
                                : [];
      const fishCommonNames = fish.commonName && typeof fish.commonName === 'string' 
                              ? fish.commonName.split(',').map(name => name.trim().toLowerCase()) 
                              : [];

      const isAggressive = fishAggressiveTowards.some(name => newFishCommonNames.includes(name)) || 
                            newFishAggressiveTowards.some(name => fishCommonNames.includes(name));
      if (isAggressive) {
        console.log("Incompatible: Aggressive towards each other.");
        incompatibilityReasons.push('aggressive');
      }

      if (newFish.pH && fish.pH && typeof newFish.pH === 'string' && typeof fish.pH === 'string') {
        const newFishPHRange = newFish.pH.split('-').map(Number);
        const fishPHRange = fish.pH.split('-').map(Number);
        if (newFishPHRange[0] > fishPHRange[1] || newFishPHRange[1] < fishPHRange[0]) {
          console.log("Incompatible: Different pH requirements.");
          incompatibilityReasons.push('pH');
        }
      }

      if (newFish.temp && fish.temp && typeof newFish.temp === 'string' && typeof fish.temp === 'string') {
        const newFishTempRange = newFish.temp.split('-').map(Number);
        const fishTempRange = fish.temp.split('-').map(Number);
        if (newFishTempRange[0] > fishTempRange[1] || newFishTempRange[1] < fishTempRange[0]) {
          console.log("Incompatible: Different temperature requirements.");
          incompatibilityReasons.push('temp');
        }
      }

      if (newFish.saltOrFresh && fish.saltOrFresh && newFish.saltOrFresh !== fish.saltOrFresh) {
        console.log("Incompatible: Different water types (salt or fresh).");
        incompatibilityReasons.push('saltOrFresh');
      }
    }

    // Check compatibility with selected plants
    for (let plant of selectedPlant) {
      if (newFish.pH && plant.pH && typeof newFish.pH === 'string' && typeof plant.pH === 'string') {
        const fishPHRange = newFish.pH.split('-').map(Number);
        const plantPHRange = plant.pH.split('-').map(Number);
        if (fishPHRange[0] < plantPHRange[0] || fishPHRange[1] > plantPHRange[1]) {
          console.log("Incompatible: The fish's pH range is not suitable for the plant.");
          incompatibilityReasons.push('pH');
        }
      }

      if (newFish.saltOrFresh && plant.saltOrFresh && newFish.saltOrFresh !== plant.saltOrFresh) {
        console.log("Incompatible: Fish's water type does not match plant's water type.");
        incompatibilityReasons.push('saltOrFresh');
      }
    }
    
    if (selectedTank) {
      if (newFish.minTankSize > selectedTank.size) {
        console.log("Incompatible: The fish requires a larger tank.");
        incompatibilityReasons.push('minTankSize');
      }
    }

    // Return both compatibility status and reasons
    return {
      isCompatible: incompatibilityReasons.length === 0,
      reasons: incompatibilityReasons
    };
  };

  const isPlantCompatible = (newPlant) => {
    let incompatibilityReasons = [];

    // Check compatibility with selected fish
    for (let fish of selectedFish) {
      if (newPlant.pH && fish.pH && typeof newPlant.pH === 'string' && typeof fish.pH === 'string') {
        const plantPHRange = newPlant.pH.split('-').map(Number);
        const fishPHRange = fish.pH.split('-').map(Number);
        if (plantPHRange[0] > fishPHRange[1] || plantPHRange[1] < fishPHRange[0]) {
          console.log("Incompatible: Different pH requirements.");
          incompatibilityReasons.push('pH');
        }
      }

      if (newPlant.saltOrFresh && fish.saltOrFresh && newPlant.saltOrFresh !== fish.saltOrFresh) {
        console.log("Incompatible: Plant's water type does not match fish's water type.");
        incompatibilityReasons.push('saltOrFresh');
      }
    }

    // Check compatibility with other selected plants
    for (let plant of selectedPlant) {
      if (newPlant.pH && plant.pH && typeof newPlant.pH === 'string' && typeof plant.pH === 'string') {
        const newPlantPHRange = newPlant.pH.split('-').map(Number);
        const otherPlantPHRange = plant.pH.split('-').map(Number);
        if (newPlantPHRange[0] > otherPlantPHRange[1] || newPlantPHRange[1] < otherPlantPHRange[0]) {
          console.log("Incompatible: Different pH requirements between plants.");
          incompatibilityReasons.push('pH');
        }
      }

      if (newPlant.saltOrFresh && plant.saltOrFresh && newPlant.saltOrFresh !== plant.saltOrFresh) {
        console.log("Incompatible: Plant's water type does not match fish's water type.");
        incompatibilityReasons.push('saltOrFresh');
      }
    }

    // Check compatibility with the selected tank based on roughBulk
    if (selectedTank && newPlant.roughBulk) {
      if (newPlant.roughBulk > selectedTank.size) {
        console.log("Incompatible: The plant's bulk is too large for the tank.");
        incompatibilityReasons.push('roughBulk');
      }
    }

    // Return both compatibility status and reasons
    return {
      isCompatible: incompatibilityReasons.length === 0,
      reasons: incompatibilityReasons
    };
  };

  const isTankCompatible = (newTank) => {
    let incompatibilityReasons = [];

    // Check compatibility with selected fish based on size and water type
    for (let fish of selectedFish) {
      if (fish.minTankSize > newTank.size) {
        console.log(`Incompatible: The fish requires a larger tank than ${newTank.size} liters.`);
        incompatibilityReasons.push('size');
      }
    }

    // Check compatibility with selected plants based on water type
    for (let plant of selectedPlant) {
      // Check compatibility with the selected tank based on roughBulk
      if (newTank && plant.roughBulk) {
        if (plant.roughBulk > newTank.size) {
          console.log("Incompatible: The plant's bulk is too large for the tank.");
          incompatibilityReasons.push('size');
        }
      }
    }


    // Return both compatibility status and reasons
    return {
      isCompatible: incompatibilityReasons.length === 0,
      reasons: incompatibilityReasons
    };
  };



  //------------------Add items---------------------------
  // Function to add a new fish to the selectedFish array
  const addFishToSelection = (newFish) => {
    setSelectedFish(prevSelectedFish => {
      // Check if the fish is already in the array by looking for its id
      const fishExists = prevSelectedFish.some(fish => fish.id === newFish.id);
      if (!fishExists && isFishCompatible(newFish)) {
    
        return [...prevSelectedFish, newFish];
      } else {
        // Otherwise, return the previous state
        return prevSelectedFish;
      }
    });
  };

  
  const handleFishSelection = (fish) => {
    addFishToSelection(fish);
  };

 
  const addPlantToSelection = (newPlant) => {
    setSelectedPlant(prevSelectedPlant => {
      const plantExists = prevSelectedPlant.some(plant => plant.id === newPlant.id);
      if (!plantExists) {
        return [...prevSelectedPlant, newPlant];
      } else {
        return prevSelectedPlant;
      }
    });
  };

  const handlePlantSelection = (plant) => {
    addPlantToSelection(plant);
  };


  const handleTankSelection = (tank) => {
    setSelectedTank(tank);
  };



  //------------------Delete items---------------------------
  // Function to remove a fish from the selectedFish array
  const removeFishFromSelection = (fishId) => {
    setSelectedFish(prevSelectedFish => prevSelectedFish.filter(fish => fish.id !== fishId));
  };

  
  const handleFishRemoval = (fishId) => {
    removeFishFromSelection(fishId);
  };

  // Function to remove a plant from the selectedPlant array
  const removePlantFromSelection = (plantId) => {
    setSelectedPlant(prevSelectedPlant => prevSelectedPlant.filter(plant => plant.id !== plantId));
  };

  
  const handlePlantRemoval = (plantId) => {
    removePlantFromSelection(plantId);
  };

  // Function to remove the selected tank
  const handleTankRemoval = () => {
    setSelectedTank(null);
  };




  return (
    <>

    {/* ***********************************************************************
                                  Tab divisions 
        ************************************************************************/}
         {/* Include the TabBar component */}
      <TabBar activeTab={activeTab} openTab={openTab} />

      <div className='main-container'>

        {/* ***********************************************************************
                                  Tab Content 
        ************************************************************************/}


        {/* ===================== FISH TAB ===================== */}
        <div id="Fish" className={`tabcontent ${activeTab === 'Fish' ? 'active' : ''}`}>
          
        
          <FilterBar
              filterTank={filterTank}
              setFilterTank={setFilterTank}
              filterPH={filterPH}
              setFilterPH={setFilterPH}
              filterTemp={filterTemp}
              setFilterTemp={setFilterTemp}
              searchTerm={searchTerm}
              setSearchTerm = {setSearchTerm}
          />


          <div className="card-container">
            {fishData.map((fish) => {
              const compatibility = isFishCompatible(fish);
              const cardClass = compatibility.isCompatible ? "fish-card" : "fish-card grayed-out";

              return (
                <div key={fish.id} className={cardClass} onClick={compatibility.isCompatible ? () => handleFishSelection(fish) : undefined}>
                  <img src={fish.photo} alt={fish.commonName} className="card-image" />
                  <p>{fish.commonName}</p>
                  <div className="card-details">
                    <p className={compatibility.reasons.includes('minTankSize') ? 'incompatible' : ''}>Tank Size Req: {fish.minTankSize}</p>
                    <p className={compatibility.reasons.includes('difficulty') ? 'incompatible' : ''}>Difficulty: {fish.difficulty}</p>
                    <p className={compatibility.reasons.includes('pH') ? 'incompatible' : ''}>PH: {fish.pH}</p>
                    <p className={compatibility.reasons.includes('temp') ? 'incompatible' : ''}>Temperature: {fish.temp}</p>
                    <p className={compatibility.reasons.includes('saltOrFresh') ? 'incompatible' : ''}>Salt Or Fresh: {fish.saltOrFresh}</p>
                    <p className={compatibility.reasons.includes('aggressive') ? 'incompatible' : ''}>Aggressive with: {fish.aggressive}</p>
                    <button className="info-button">Get more Info</button>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
        
        {/* ===================== PLANTS TAB ===================== */}
        <div id="Plants" className={`tabcontent ${activeTab === 'Plants' ? 'active' : ''}`}>
         
          <div className="card-container">
            {plantData.map((plant) => {
              const compatibility = isPlantCompatible(plant);
              const cardClass = compatibility.isCompatible ? "plant-card" : "plant-card grayed-out";

              return (
                <div key={plant.id} className={cardClass} onClick={compatibility.isCompatible ? () => handlePlantSelection(plant) : undefined}>
                  <img className='card-image' src={plant.photo} alt={plant.commonname} />
                  <p>{plant.commonName}</p>
                  <div className="card-details">
                    <p className={compatibility.reasons.includes('pH') ? 'incompatible' : ''}>pH: {plant.pH}</p>
                    <p className={compatibility.reasons.includes('saltOrFresh') ? 'incompatible' : ''}>Water Type: {plant.saltOrFresh}</p>
                    <button className="info-button">Get more Info</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================== TANKS TAB ===================== */}
        <div id="Tanks" className={`tabcontent ${activeTab === 'Tanks' ? 'active' : ''}`}>
          

          <div className="card-container">
            {tankData.map((tank) => {
              const compatibility = isTankCompatible(tank);
              const cardClass = compatibility.isCompatible ? "tank-card" : "tank-card grayed-out";

              return (
                <div key={tank.id} className={cardClass} onClick={compatibility.isCompatible ? () => handleTankSelection(tank) : undefined}>
                  <img className='card-image' src={tank.photo} alt={tank.name} />
                  <div className="card-details">
                    <p className={compatibility.reasons.includes('size') ? 'incompatible' : ''}>Size: {tank.size}</p>
                    <p>Shape: {tank.shape}</p>
                    <button className="info-button">Get more Info</button>
                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>



        {/* ***********************************************************************
                                  BUILD SECTION 
        ************************************************************************/}
          <BuildSection
            selectedFish={selectedFish}
            handleFishRemoval={handleFishRemoval}
            selectedPlant={selectedPlant}
            handlePlantRemoval={handlePlantRemoval}
            selectedTank={selectedTank}
            handleTankRemoval={handleTankRemoval}
        />

        </div>
      </>
);
};


export default BuilderTool;

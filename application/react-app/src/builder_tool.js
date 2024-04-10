import React, { useState } from 'react';
import './css/builder_tool.css'

const BuilderTool = () => {
  // Tab Functions, get the active tab, hide the rest
  const [activeTab, setActiveTab] = useState('Fish');
  const openCity = (cityName) => {
    setActiveTab(cityName);
  };

  // ******************** FISH DATA connect to DATABASE ********************
  const fishData = [
    { id: 1, name: "Goldfish", imageUrl: "path-to-goldfish-image", tankSize: "30L", difficulty: "Easy", temperament: "Calm" },
    { id: 2, name: "Neon Tetra", imageUrl: "path-to-neon-tetra-image", tankSize: "20L", difficulty: "Medium", temperament: "Active" },
    { id: 3, name: "Koi", imageUrl: "path-to-koi-image", tankSize: "100L", difficulty: "Hard", temperament: "Active" },
    // ... more fish data
  ];
  const [selectedFish, setSelectedFish] = useState(null);

  // ******************** PLANT DATA connect to DATABASE ********************
  const plantData = [
    { id: 1, name: "Duckweed", imageUrl: "path-to-Duckweed-image", lightReq: "8hrs of light", growthRate: "Slow", fishCompability: "True" },
    { id: 2, name: "Neon Tetra", imageUrl: "path-to-neon-tetra-image", lightReq: "8hrs of light", growthRate: "Fast", fishCompability: "False" },
    // ... more fish data
  ];
  const [selectedPlant, setSelectedPlant] = useState(null);

  // ******************** TANK DATA connect to DATABASE ********************
  const tankData = [
    { id: 1, name: "5 Gallon", imageUrl: "path-to-5g-image", lenght: "12", width: "6", height: "8", weight: "7 lbs"},
    { id: 2, name: "10 Gallon", imageUrl: "path-to-10g-image", lenght: "20", width: "10", height: "12", weight: "11 lbs"},
    { id: 3, name: "20 Gallon", imageUrl: "path-to-20g-image", lenght: "24", width: "12", height: "16", weight: "25 lbs"},
    // ... more fish data
  ];
  const [selectedTank, setSelectedTank] = useState(null);

  
  // Dummy function for handling filter changes
  const handleFilterChange = (filter) => {
    console.log('Filter changed to: ', filter);
    // Implement filter logic here
  };

  return (
    <>
      {/* ***********************************************************************
                                Tab divisions 
      ************************************************************************/}
      <div className="tab">
        <button className={`tablinks ${activeTab === 'Fish' ? 'active' : ''}`} onClick={() => openCity('Fish')}>
          Fish
        </button>
        <button className={`tablinks ${activeTab === 'Plants' ? 'active' : ''}`} onClick={() => openCity('Plants')}>
          Plants
        </button>
        <button className={`tablinks ${activeTab === 'Tanks' ? 'active' : ''}`} onClick={() => openCity('Tanks')}>
          Tanks
        </button>
        <button className={`tablinks ${activeTab === 'Favorites' ? 'active' : ''}`} onClick={() => openCity('Favorites')}>
          Favorites
        </button>
      </div>

      {/* ***********************************************************************
                                Tab Content 
      ************************************************************************/}

      {/* ===================== FISH TAB ===================== */}
      <div id="Fish" className={`tabcontent ${activeTab === 'Fish' ? 'active' : ''}`}>
        <aside className="filter-sidebar">
          <h2>Filters</h2>
          {/* Add your filter options here */}
          <button onClick={() => handleFilterChange('easy')}>Easy</button>
          <button onClick={() => handleFilterChange('hard')}>Hard</button>
          {/* ... more filters */}
        </aside>

        <div className="grid">
          {fishData.map((fish) => (
            <div key={fish.id} className="card" onClick={() => setSelectedFish(fish)}>
              <img src={fish.imageUrl} alt={fish.name} />
              <div className="fish-info">
                <h3>{fish.name}</h3>
                <p>Tank Size Req: {fish.tankSize}</p>
                <p>Difficulty: {fish.difficulty}</p>
                <p>Temperament: {fish.temperament}</p>
                <button className="info-button">Get more Info</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* ===================== PLANTS TAB ===================== */}
      <div id="Plants" className={`tabcontent ${activeTab === 'Plants' ? 'active' : ''}`}>
        <aside className="filter-sidebar">
          <h2>Filters</h2>
          {/* Add your filter options here */}
          <button onClick={() => handleFilterChange('Duckweed')}>Duckweed</button>
          <button onClick={() => handleFilterChange('Java Fern')}>Java Fern</button>
          {/* ... more filters */}
        </aside>

        <div className="grid">
          {plantData.map((plant) => (
            <div key={plant.id} className="card" onClick={() => setSelectedPlant(plant)}>
              <img src={plant.imageUrl} alt={plant.name} />
              <div className="info">
                <h3>{plant.name}</h3>
                <p>Light Req: {plant.tankSize}</p>
                <p>Growth Rate: {plant.difficulty}</p>
                <p>Fish Compability: {plant.temperament}</p>
                <button className="info-button">Get more Info</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== TANKS TAB ===================== */}
      <div id="Tanks" className={`tabcontent ${activeTab === 'Tanks' ? 'active' : ''}`}>
        <aside className="filter-sidebar">
            <h2>Filters</h2>
            {/* Add your filter options here */}
            <button onClick={() => handleFilterChange('less 10gallons')}>Less than 10 Gallons</button>
            <button onClick={() => handleFilterChange('more 10gallons')}>More than 10 Gallons</button>
            {/* ... more filters */}
        </aside>

        <div className="grid">
          {tankData.map((tank) => (
            <div key={tank.id} className="card" onClick={() => setSelectedTank(tank)}>
              <img src={tank.imageUrl} alt={tank.name} />
              <div className="info">
                <h3>{tank.name}</h3>
                <p>Length {tank.lenght}</p>
                <p>Width: {tank.width}</p>
                <p>Height: {tank.height}</p>
                <p>Weight: {tank.weight}</p>
                <button className="info-button">Get more Info</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== FAVORITES TAB ===================== */}
      <div id="Favorites" className={`tabcontent ${activeTab === 'Favorites' ? 'active' : ''}`}>
      
      {/* Fish Section */}
      <div className="fish-list">
          {fishData.map((fish) => (
            <div key={fish.id} className="card" onClick={() => setSelectedFish(fish)}>
              <img src={fish.imageUrl} alt={fish.name} />
              <div className="fish-info">
                <h3>{fish.name}</h3>
                <p>Tank Size Req: {fish.tankSize}</p>
                <p>Difficulty: {fish.difficulty}</p>
                <p>Temperament: {fish.temperament}</p>
                <button className="info-button">Get more Info</button>
              </div>
            </div>
          ))}
        </div>

      {/* Plants Section */}
      <div className="plant-list">
          {plantData.map((plant) => (
            <div key={plant.id} className="card" onClick={() => setSelectedPlant(plant)}>
              <img src={plant.imageUrl} alt={plant.name} />
              <div className="plant-info">
                <h3>{plant.name}</h3>
                <p>Light Req: {plant.tankSize}</p>
                <p>Growth Rate: {plant.difficulty}</p>
                <p>Fish Compability: {plant.temperament}</p>
                <button className="info-button">Get more Info</button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tanks Section */}
        <div className="tank-list">
          {tankData.map((tank) => (
            <div key={tank.id} className="card" onClick={() => setSelectedTank(tank)}>
              <img src={tank.imageUrl} alt={tank.name} />
              <div className="tank-info">
                <h3>{tank.name}</h3>
                <p>Length {tank.lenght}</p>
                <p>Width: {tank.width}</p>
                <p>Height: {tank.height}</p>
                <p>Weight: {tank.weight}</p>
                <button className="info-button">Get more Info</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ***********************************************************************
                                BUILD SECTION 
      ************************************************************************/}
      
    </>
  );
};

export default BuilderTool;
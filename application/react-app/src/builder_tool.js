import React, { useState, useEffect } from 'react';
import './builder_tool.css'
import SearchBar from './search_bar';
function BuilderTool() {

    // Initializing states
    const [activeTab, setActiveTab] = useState('Fish');
    const [searchTerm, setSearchTerm] = useState('');
    const [fishData, setFishData] = useState([]);
    const [plantData, setPlantData] = useState([]);
    const [tankData, setTankData] = useState([]);
    const [selectedFish, setSelectedFish] = useState(null);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [selectedTank, setSelectedTank] = useState(null);

    const openCity = (cityName) => {
        setActiveTab(cityName);
        setSearchTerm(''); // Reset search term on tab change
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
               //const response = await fetch(`https://aquamate.me/search?search=${searchTerm}`);
                const response = await fetch(`http://localhost:8080/search?search=${searchTerm}`)
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

                // Assuming 'Type' is correctly capitalized in your data, if not, adjust accordingly
                Object.keys(setStateMap).forEach(type => {
                    const filteredData = data.filter(item =>
                        (item.Type === type || item.type === type) && (
                            item.commonName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.size?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    );
                    setStateMap[type](filteredData);
                });
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [searchTerm, activeTab]); // Dependency on both activeTab and searchTerm ensures data is refetched on change



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

            {/*SearchBar component */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


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
                                <h3>{fish.commonName}</h3>
                                <p>Tank Size Req: {fish.minTankSize}</p>
                                <p>Difficulty: {fish.difficulty}</p>
                                <p>Aggressive with: {fish.aggressive}</p>
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
                                <h3>{plant.commonName}</h3>
                                <p>Light Req: {plant.lightRequirement}</p>
                                <p>Growth Rate: {plant.growthRate}</p>
                                <p>Difficulty: {plant.difficulty}</p>
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
                    {tankData.map((tank) => (<div key={tank.id} className="card" onClick={() => setSelectedTank(tank)}>
                        <img src={tank.imageUrl} alt={tank.name} />
                        <div className="info">
                            <p>Size: {tank.size}</p>
                            <p>Shape: {tank.shape}</p>

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

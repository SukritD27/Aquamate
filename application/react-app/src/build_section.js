import React from 'react';
import './builder_tool.css';

const BuildSection = ({ selectedFish, handleFishRemoval, selectedPlant, handlePlantRemoval, selectedTank, handleTankRemoval }) => {
    return (
        <div className="build-container">
            <div className="build-title">Selected Fish</div>
            <div className="build-section">
                {selectedFish.map(fish => (
                    <div className="build-item" key={fish.id} onClick={() => handleFishRemoval(fish.id)}>
                        <img src={fish.photo} alt={fish.commonName} />
                        <div className="build-description">{fish.commonName}</div>
                    </div>
                ))}
            </div>

            <div className="build-title">Selected Plants</div>
            <div className="build-section">
                {selectedPlant.map(plant => (
                    <div className="build-item" key={plant.id} onClick={() => handlePlantRemoval(plant.id)}>
                        <img src={plant.photo} alt={plant.commonName} />
                        <div className="build-description">{plant.commonName}</div>
                    </div>
                ))}
            </div>

            <div className="build-title">Selected Tank</div>
            <div className="build-section">
                {selectedTank && (
                    <div className="build-item" onClick={() => handleTankRemoval(selectedTank.id)}>
                        <img src={selectedTank.photo} alt={`Tank: ${selectedTank.size}`} />
                        <div className="build-description">Size: {selectedTank.size}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuildSection;

import React from 'react';
import './css/builder_tool.css'
import SearchBar from './search_bar';

const FilterBar = ({ filterTank, setFilterTank, filterPH, setFilterPH, filterTemp, setFilterTemp, searchTerm, setSearchTerm }) => {
    return (
        <aside className="filter-sidebar">
            <h2>Filters</h2>
            {/* Include the SearchBar component */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* Tank size filters */}
            <div className="filter-item">
                <label htmlFor="tankSizeMin">Min Tank Size (gallons):</label>
                <input
                    type="text"
                    id="tankSizeMin"
                    name="tankSizeMin"
                    placeholder="Min e.g., 10"
                    value={filterTank.min}
                    onChange={(e) => setFilterTank(prev => ({ ...prev, min: e.target.value }))}
                />
                <label htmlFor="tankSizeMax">Max Tank Size (gallons):</label>
                <input
                    type="text"
                    id="tankSizeMax"
                    name="tankSizeMax"
                    placeholder="Max e.g., 200"
                    value={filterTank.max}
                    onChange={(e) => setFilterTank(prev => ({ ...prev, max: e.target.value }))}
                />
            </div>

            {/* pH filters */}
            <div className="filter-item">
                <label htmlFor="pHMin">Min pH:</label>
                <input
                    type="text"
                    id="pHMin"
                    name="pHMin"
                    placeholder="Min e.g., 5.0"
                    value={filterPH.min}
                    onChange={(e) => setFilterPH(prev => ({ ...prev, min: e.target.value }))}
                />
                <label htmlFor="pHMax">Max pH:</label>
                <input
                    type="text"
                    id="pHMax"
                    name="pHMax"
                    placeholder="Max e.g., 9.0"
                    value={filterPH.max}
                    onChange={(e) => setFilterPH(prev => ({ ...prev, max: e.target.value }))}
                />
            </div>

            {/* Temperature filters */}
            <div className="filter-item">
                <label htmlFor="tempMin">Min Temperature (°F):</label>
                <input
                    type="text"
                    id="tempMin"
                    name="tempMin"
                    placeholder="Min e.g., 60"
                    value={filterTemp.min}
                    onChange={(e) => setFilterTemp(prev => ({ ...prev, min: e.target.value }))}
                />
                <label htmlFor="tempMax">Max Temperature (°F):</label>
                <input
                    type="text"
                    id="tempMax"
                    name="tempMax"
                    placeholder="Max e.g., 90"
                    value={filterTemp.max}
                    onChange={(e) => setFilterTemp(prev => ({ ...prev, max: e.target.value }))}
                />
            </div>
        </aside>
    );
};

export default FilterBar;

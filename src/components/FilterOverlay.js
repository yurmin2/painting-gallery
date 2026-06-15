import React, { useState } from 'react';
import './FilterOverlay.css';

function FilterOverlay({ isOpen, onClose, filters, onApplyFilters, onClearFilters, artists, locations }) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleApply = () => {
        onApplyFilters(localFilters);
    };

    const handleClear = () => {
        const emptyFilters = {
            artist: '',
            location: '',
            yearFrom: '',
            yearTo: ''
        };
        setLocalFilters(emptyFilters);
        onClearFilters();
    };

    return (
        <div className={`filter-overlay ${isOpen ? 'open' : ''}`}>
            <div className="filter-close" onClick={onClose}></div>
            <div className="filter-content">
                <div className="filter-section">
                    <div className="filter-section-header">
                        <div className="filter-section-title">ARTIST</div>
                    </div>
                    <select 
                        className="filter-select"
                        value={localFilters.artist}
                        onChange={(e) => setLocalFilters({...localFilters, artist: e.target.value})}
                    >
                        <option value="">Select the artist</option>
                        {artists.map(artist => (
                            <option key={artist} value={artist}>{artist}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-section">
                    <div className="filter-section-header">
                        <div className="filter-section-title">LOCATION</div>
                    </div>
                    <select 
                        className="filter-select"
                        value={localFilters.location}
                        onChange={(e) => setLocalFilters({...localFilters, location: e.target.value})}
                    >
                        <option value="">Select the location</option>
                        {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-section">
                    <div className="filter-section-header">
                        <div className="filter-section-title">YEARS</div>
                    </div>
                    <div className="years-row">
                        <div className="year-input">
                            <input 
                                type="number" 
                                placeholder="From" 
                                value={localFilters.yearFrom}
                                onChange={(e) => setLocalFilters({...localFilters, yearFrom: e.target.value})}
                            />
                        </div>
                        <div className="year-dash">—</div>
                        <div className="year-input">
                            <input 
                                type="number" 
                                placeholder="To"
                                value={localFilters.yearTo}
                                onChange={(e) => setLocalFilters({...localFilters, yearTo: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <div className="filter-buttons">
                    <button className="show-btn" onClick={handleApply}>
                        <span>SHOW THE RESULTS</span>
                    </button>
                    <button className="clear-btn" onClick={handleClear}>
                        <span>CLEAR</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterOverlay;
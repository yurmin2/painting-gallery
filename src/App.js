// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Gallery from './components/Gallery';
import FilterOverlay from './components/FilterOverlay';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [apiPaintings, setApiPaintings] = useState([]);
    const [filteredPaintings, setFilteredPaintings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        artist: '',
        location: '',
        yearFrom: '',
        yearTo: ''
    });

    const fetchPaintings = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@1.0', {
                headers: { 'Accept': 'application/json' }
            });

            const spec = await response.json();
            const paintingsData = spec.paths['/paintings'].get.responses['200'].content['application/json'].example;
            
            if (!paintingsData || !Array.isArray(paintingsData)) {
                throw new Error('Не удалось получить массив картин');
            }
            
            const paintingsWithId = paintingsData.map((painting, index) => ({
                ...painting,
                id: index + 1,
                image: painting.imageUrl,
                titleColor: 'dark'
            }));
            
            setApiPaintings(paintingsWithId);
            setFilteredPaintings(paintingsWithId);
            
        } catch (err) {
            console.error("Ошибка загрузки:", err);
            setError(`Ошибка: ${err.message}`);
            setApiPaintings([]);
            setFilteredPaintings([]);
        } finally {
            setIsLoading(false);
        }
    };

    // поиск
    useEffect(() => {
        let result = [...apiPaintings];
        
        if (searchQuery.trim()) {
            result = result.filter(painting =>
                painting.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
       
        if (filters.artist) {
            result = result.filter(painting =>
                painting.artist.toLowerCase().includes(filters.artist.toLowerCase())
            );
        }
        
        if (filters.location) {
            result = result.filter(painting =>
                painting.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }
        
        if (filters.yearFrom) {
            result = result.filter(painting => 
                painting.year >= parseInt(filters.yearFrom)
            );
        }
        
        if (filters.yearTo) {
            result = result.filter(painting => 
                painting.year <= parseInt(filters.yearTo)
            );
        }
        
        setFilteredPaintings(result);
    }, [searchQuery, filters, apiPaintings]);

    useEffect(() => {
        fetchPaintings();
    }, []);

    useEffect(() => {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const openFilter = () => {
        setIsFilterOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
        document.body.style.overflow = '';
    };
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    const applyFilters = (newFilters) => {
        setFilters(newFilters);
        closeFilter();
    };
    
    const clearFilters = () => {
        setFilters({
            artist: '',
            location: '',
            yearFrom: '',
            yearTo: ''
        });
        setSearchQuery('');
    };

    const uniqueArtists = [...new Set(apiPaintings.map(p => p.artist))];
    const uniqueLocations = [...new Set(apiPaintings.map(p => p.location))];

    return (
        <div className="container">
            <Header theme={theme} onThemeToggle={toggleTheme} />
            <main>
                <div className="search-filter-row">
                    <div className="search-form">
                        <div className="search-icon"></div>
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Painting title"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="filter-wrapper">
                        <button className="filter-btn" onClick={openFilter}>
                            <div className="filter-icon"></div>
                        </button>
                    </div>
                </div>
                
                {isLoading && <div className="loading-message">Loading gallery...</div>}
                {error && <div className="error-message">Error: {error}</div>}
                {!isLoading && !error && filteredPaintings.length === 0 && (
                    <div className="error-message">No paintings found. Try changing your search or filters.</div>
                )}
                {!isLoading && !error && filteredPaintings.length > 0 && (
                    <>
                        
                        <Gallery paintings={filteredPaintings} />
                    </>
                )}
            </main>
            
            {isFilterOpen && <div className="overlay-backdrop open" onClick={closeFilter}></div>}
            <FilterOverlay 
                isOpen={isFilterOpen} 
                onClose={closeFilter}
                filters={filters}
                onApplyFilters={applyFilters}
                onClearFilters={clearFilters}
                artists={uniqueArtists}
                locations={uniqueLocations}
            />
        </div>
    );
}

export default App;
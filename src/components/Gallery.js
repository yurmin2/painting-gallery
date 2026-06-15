import React, { useState } from 'react';
import Card from './Card';
import './Gallery.css';

function Gallery({ paintings }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(paintings.length / itemsPerPage);

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = paintings.slice(start, end);

    return (
        <>
            <div className="gallery">
                {currentItems.map(painting => (
                    <Card key={painting.id} painting={painting} />
                ))}
            </div>
            
            <div className="pagination">
                <button 
                    className="pag-arrow pag-arrow-left"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                />
                <div className="pag-numbers">
                    {[...Array(totalPages)].map((_, i) => (
                        <div
                            key={i}
                            className={`pag-number ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
                <button 
                    className="pag-arrow pag-arrow-right"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                />
            </div>
        </>
    );
}

export default Gallery;
import React, { useState, useEffect } from 'react';
import './Header.css';
import moonIcon from '../assets/moon-icon.png';
import sunIcon from '../assets/sun-icon.png';

function Header({ theme, onThemeToggle }) {

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        } else {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && savedTheme !== theme) {
            onThemeToggle(); 
        }
    }, []);
    return (
        <div className="header">
        <div className="theme-toggle" onClick={onThemeToggle}>
            <img 
                className="theme-icon" 
                alt="Toggle theme"
                src={theme === 'dark' ? sunIcon : moonIcon}
            />
        </div>
    </div>
    );
}

export default Header;
import React from 'react';
import './App.css';
import { NavLink } from "react-router-dom";

import github_icon from './icons/github_icon.png';

import greenimage from './media/greenarchbackground.png';
import spaceimage from './media/spacearchbackground.png';

function Archsetup() {

    return (
        <div>
            <div className="header">
            <NavLink className="return-button glow" to="/">
                    <h1>Back</h1>
            </NavLink>
            </div>
            <div className="archsetupapp">
                <h1 className="pagetitle">Arch setup</h1>
                <div className="overview">
                    <img className="vidsetting" alt="Qries" src={greenimage} />
                    <h1 className="description">
                    Cool Seafoam green background. My favorite color!
                    </h1><br/>
                    <img className="vidsetting" alt="Qries" src={spaceimage} />
                    <h1 className="description">
                    Space theme to match the aesthetic. Flat Earth?!?! &#x1F927;&#x1F927;&#x1F927;
                    </h1><br/>
                </div>
                
            </div>
            <div className="repolink">
                <a href="https://github.com/FloofyJin/dot-files" target="_blank" rel="noopener noreferrer">
                    <img className="logo-icon" alt="Qries" src={github_icon} />
                </a>
            </div>
            

            <div className="footer">
                <h1 className="license">© Jinsung Park, MIT Licensed</h1>
            </div>
        </div>
    );
}

export default Archsetup;
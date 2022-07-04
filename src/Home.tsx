import React from 'react';
import './App.css';
import { NavLink } from "react-router-dom";

import github_icon from './icons/github_icon.png';
import linkedin_icon from './icons/linkedin_icon.png';
import discord_icon from './icons/discord_icon.png';
import youtube_icon from './icons/youtube_icon.png';
import resume_icon from './icons/resume_icon.png';
import huffman_icon from './icons/huffman_icon.png';
import httpserver_icon from './icons/httpserver_icon.png';
import webscraper_icon from './icons/webcrawler_icon.png';
//blender

//git push
//npm run deploy

function Home() {

    return (
        <div>
            <div className="header">
                <div className="resume">
                    <a href="https://drive.google.com/file/d/1zFHgvD4BC6QsokVzbYLdp9UVxq-5r9ff/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <img className="logo-icon" alt="Qries" src={resume_icon} />
                    </a>
                </div>
                <div className="socials">
                    <a href="https://github.com/FloofyJin" target="_blank" rel="noopener noreferrer">
                        <img className="logo-icon" alt="Qries" src={github_icon} />
                    </a>
                    <a href="https://www.youtube.com/channel/UC8WyNw0cWU4nAXSuQMtNZug" target="_blank" rel="noopener noreferrer">
                        <img className="logo-icon" alt="Qries" src={youtube_icon} />
                    </a>
                    <a href="https://www.linkedin.com/in/nymph-tea/" target="_blank" rel="noopener noreferrer">
                        <img className="logo-icon" alt="Qries" src={linkedin_icon} />
                    </a>
                    <a href="https://discord.com/users/449983218788204569" target="_blank" rel="noopener noreferrer">
                        <img className="logo-icon" alt="Qries" src={discord_icon} />
                    </a>
                </div>
            </div>

            <div className="App">
                <h1 className="title">Jinsung Park</h1>
                <div className="content">
                    <div className="item">
                        <NavLink className="image-link glow" to="/webcrawler">
                            <img className="item-icon" alt="Qries" src={webscraper_icon} />
                            <h1 className="item-text">
                                Web Crawler
                            </h1>
                        </NavLink>
                    </div>
                    <div className="item">
                        <NavLink className="image-link glow" to="/huffman">
                            <img className="item-icon" alt="Qries" src={huffman_icon} />
                            <h1 className="item-text">
                                Encoder
                            </h1>
                        </NavLink>
                    </div>
                    <div className="item">
                        <NavLink className="image-link glow" to="/httpserver">
                            <img className="item-icon" alt="Qries" src={httpserver_icon} />
                            <h1 className="item-text">
                                HTTP Server
                            </h1>
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="footer">
                <h1 className="license">© Jinsung Park, MIT Licensed</h1>
            </div>
        </div>
    );
}

export default Home;
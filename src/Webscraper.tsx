import React from 'react';
import './App.css';
import { NavLink } from "react-router-dom";

import github_icon from './icons/github_icon.png';

import webscraperbotvid from './media/webcrawlerbotdemo.mp4';

function Webscraper() {

    return (
        <div>
            <div className="header">
            <NavLink className="return-button glow" to="/">
                    <h1>Back</h1>
            </NavLink>
        </div>
            <div className="webcrawlerapp">
                <h1 className="pagetitle">Web Crawler</h1>
                <video className="vidsetting" src={webscraperbotvid} loop autoPlay muted></video>
                <div className="overview">
                    <h1>Goal</h1>
                    <h1 className="description">
                    Initially, this project was created for the sole purpose to solving mobile trivia questions for prize money. In 2019, 
                    the internet became massively obsessed with trivia games such as HQ trivia and Cash show. So tried my hand at the sensation 
                    I repurposing a web scraper used to collect search queries from google with an optical character recognition tool, fitting 
                    it with a counter to select the correct answer given a question with 3 choices.
                    </h1>
                    <h1>Insight</h1>
                    <h1 className="description">
                    This webscraper uses OCR to read characters from a screenshot which is taken whenever the program is run. From the 
                    screenshot, the program will identify a portion of the screen as either question or choice. Using a web scraper, it 
                    queries the net for the question with the given answer choice. The query with the most result is identified as the answer.
                    </h1>
                </div>
            </div>

            <div className="repolink">
                <a href="https://github.com/FloofyJin/Tesseract" target="_blank" rel="noopener noreferrer">
                    <img className="logo-icon" alt="Qries" src={github_icon} />
                </a>
            </div>

            <div className="footer">
                <h1 className="license">© Jinsung Park, MIT Licensed</h1>
            </div>
        </div>
    );
}

export default Webscraper;
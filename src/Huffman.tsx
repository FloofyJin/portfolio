import React from 'react';
import './App.css';
import { NavLink } from "react-router-dom";

import github_icon from './icons/github_icon.png';

import huffmanvid from './media/huffmandemo.mp4';
import huffmantree from './media/huffmantree.png';

function Huffman() {

    return (
        <div>
            <div className="header">
            <NavLink className="return-button glow" to="/">
                    <h1>Back</h1>
            </NavLink>
        </div>
            <div className="huffmanapp">
                <h1 className="pagetitle">RSA Cryptography</h1>
                <video className="vidsetting" src={huffmanvid} loop autoPlay muted></video>
                <div className="overview">
                    <h1>Goal</h1>
                    <h1 className="description">
                    The entire point of this project was to demonstrate the properties of reducing file size through optimal binary data 
                    encoded based on the frequency of symbols in the file. This method was originally developed by an MIT student 
                    David A. Huffman in 1952 and has beat a dissimliar top-down approach of Shannon-Fano coding.
                    </h1>
                    <h1>Encoder</h1>
                    <h1 className="description">
                    The encoder first takes the frequency of each character in the file, then creates a histogram of the counted values.
                    Using a priority queue, construct huffman tree for each symbol. After all is done, step through each symbol of the input
                    file again, and emit the code value for each character.
                    </h1>
                    <img height="300px" src={huffmantree} />
                    <h1>Decoder</h1>
                    <h1 className="description">
                    The decoder will read the header off the of the encoded file to verify that it is the correct format and creates a dump
                    tree based on the huffman tree. Program will iterate over the tree to match each bit in the encoded file with the given
                    character.
                    </h1>
                </div>
                <a className="repolink" href="https://github.com/FloofyJin/Huffman-Encoder" target="_blank" rel="noopener noreferrer">
                    <img className="logo-icon" alt="Qries" src={github_icon} />
                </a>
            </div>

            <div className="footer">
                <h1 className="license">© Jinsung Park, MIT Licensed</h1>
            </div>
        </div>
    );
}

export default Huffman;
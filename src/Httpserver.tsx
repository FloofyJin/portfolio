import React from 'react';
import './App.css';
import { NavLink } from "react-router-dom";

import httpservervid from './media/httpserverdemo.mp4';

function Httpserver() {

    return (
        <div>
            <div className="header">
            <NavLink className="return-button glow" to="/">
                    <h1>Back</h1>
            </NavLink>
        </div>
            <div className="huffmanapp">
                <h1 className="pagetitle">HTTP Server</h1>
                <video className="vidsetting" src={httpservervid} loop autoPlay muted></video>
                <div className="overview">
                    <h1>Goal</h1>
                    <h1 className="description">
                    This program was initially written for my school project. The entire point
                    of this assignment was to demonstrate the properties of reducing file size through optimal binary data 
                    encoded based on the frequency of symbols in the file. This method was originally developed by an MIT student 
                    David A. Huffman in 1952 and has beat a dissimliar top-down approach of Shannon-Fano coding.
                    </h1>
                    <h1>Encoder</h1>
                    <h1 className="description">
                    The encoder first takes the frequency of each character in the file, then creates a histogram of the counted values.
                    Using a priority queue, construct huffman tree for each symbol. After all is done, step through each symbol of the input
                    file again, and emit the code value for each character.
                    </h1>
                    <h1>Decoder</h1>
                    <h1 className="description">
                    The decoder will read the header off the of the encoded file to verify that it is the correct format and creates a dump
                    tree based on the huffman tree. Program will iterate over the tree to match each bit in the encoded file with the given
                    character.
                    </h1>
                </div>
            </div>

            <div className="footer">
                <h1 className="license">© Jinsung Park, MIT Licensed</h1>
            </div>
        </div>
    );
}

export default Httpserver;
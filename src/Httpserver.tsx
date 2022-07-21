import React from 'react';
import './App.css';
import { NavLink } from "react-router-dom";

import github_icon from './icons/github_icon.png';

import httpservervid from './media/httpserverdemo.mp4';

function Httpserver() {

    return (
        <div>
            <div className="header">
            <NavLink className="return-button glow" to="/">
                    <h1>Back</h1>
            </NavLink>
            </div>
            <div className="httpserverapp">
                <h1 className="pagetitle">HTTP Server</h1>
                <div className="overview">
                    <video className="vidsetting" src={httpservervid} loop autoPlay muted></video>
                    <h1>Goal</h1>
                    <h1 className="description">
                    My goal for this program was to design a write a multi-threaded server to transfer files via HTTP connection. Using 
                    curl or simply sending a "GET", "PUT", "APPEND" through netcat command is suitable for communicating with the server.
                    </h1>
                    <h1>Insight</h1>
                    <h1 className="description">
                    This program was written completely in C with the help of priority queue to maintain the flow of requests and an 
                    epoll to handle transmission of data that aren't instant. The server works by having a loop that checks for an incoming 
                    request through a conditional mux. The connection then reads from the file descriptor until the Operation, uri, and header 
                    have been received.
                    </h1>
                    <h1>Future</h1>
                    <h1 className="description">
                    Although the current version of the server only handles three commands notably "GET", "PUT", and "APPEND", I plan to 
                    implement "POST" next so that eventually this server can host a variety of functions needed to maintain a system. As 
                    such, the next step would be implement an sql databas where I can organize the collection of files instead of having 
                    them scattered across the root folder. One nice touch would be to implement a simple gui to upload files without needing 
                    to use the terminal.
                    </h1>
                </div>
                <a className="repolink" href="https://github.com/FloofyJin/Http-Server" target="_blank" rel="noopener noreferrer">
                        <img className="logo-icon" alt="Qries" src={github_icon} />
                    </a>
            </div>

            <div className="footer">
                <h1 className="license">© Jinsung Park, MIT Licensed</h1>
            </div>
        </div>
    );
}

export default Httpserver;
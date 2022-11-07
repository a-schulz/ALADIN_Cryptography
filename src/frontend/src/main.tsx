import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Config} from "./components/Config";
import {ConfigMedium} from "./components/ConfigMedium";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ConfigHard} from "./components/ConfigHard";
import {Task} from "./components/Task";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Config/>}/>
                <Route path="/medium" element={<ConfigMedium/>}/>
                <Route path="/hard" element={<ConfigHard/>}/>
                <Route path="/task" element={<Task/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

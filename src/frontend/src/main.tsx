import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Config} from "./components/Config";
import {ConfigMedium} from "./components/ConfigMedium";
import {ConfigHard} from "./components/ConfigHard";
import {GetKeys} from "./components/GetKeys";
import {EncryptDecrypt} from "./components/EncryptDecrypt";
import {NavBar} from "./components/NavBar";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <NavBar></NavBar>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Config/>}/>
                <Route path="/medium" element={<ConfigMedium/>}/>
                <Route path="/hard" element={<ConfigHard/>}/>
                <Route path="/task/get-keys" element={<GetKeys/>}/>
                <Route path="/task/encrypt-decrypt" element={<EncryptDecrypt/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

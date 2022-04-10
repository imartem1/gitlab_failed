import React, {useState} from 'react';
import './index.css'
import {BrowserRouter, Routes, Route, Link,} from "react-router-dom";
import NewPage from "./pages/newPage";
import MainPage from "./pages/mainPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import StartPage from './pages/startPage';


function App() {

    return(
        <BrowserRouter>
            <div className="navbar">
                <div className="navbar__links">
                    <Link className="navbar__link"to="/main">3D</Link>
                    <Link className="navbar__link" to="/page">Запрос модели</Link>
                    <Link className="navbar__link" to="">Главная страница</Link>
                </div>
                
            </div>
            <Routes>
                <Route path="/page" element={<NewPage/>}/>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="" element={<StartPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

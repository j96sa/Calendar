import React from 'react';
import {HashRouter, Routes, Route} from "react-router-dom";
import MainPage from './components/MainPage';
import { CheckDayProvider } from './context/checkDayContext';

export default function Router() {
  return (
    <HashRouter>
      <CheckDayProvider>
        <Routes>            
            <Route path="/" element={<MainPage/>}/>
        </Routes>
        </CheckDayProvider>
    </HashRouter>
  )
}

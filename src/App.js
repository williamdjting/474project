import AppStyle from "./App.module.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ArrayProvider } from './ArrayContext';
import CreateItem from './components/CreateItem';
import ViewItem from './components/ViewItem';
import NotFound from './components/NotFound';

function App() {
  return (
    
    <ArrayProvider>
      <Router>
        <div>
        <Routes>
            <Route exact path="/" element={<CreateItem />} />
            <Route path="/view" element={<ViewItem />} />
            <Route path="*" element={<NotFound />} /> {/* This route will be rendered if no other route matches */}
          </Routes>
        </div>
      </Router>
    </ArrayProvider>
  );


}

export default App;

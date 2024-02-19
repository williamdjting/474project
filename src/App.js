import AppStyle from "./App.module.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateItem from './components/CreateItem';
import ViewItem from './components/ViewItem';
import NotFound from './components/NotFound';

function App() {
  return (
    
    <Router>
      <div>
      <Routes>
          <Route path="/" element={<CreateItem />} />
          <Route path="/view" element={<ViewItem />} />
          <Route path="*" element={<NotFound />} /> {/* This route will be rendered if no other route matches */}
        </Routes>
      </div>
    </Router>
  );


}

export default App;

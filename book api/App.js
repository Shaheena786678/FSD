import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtList from './ArtList';
import ArtDetail from './ArtDetail';
import Header from './Header';
import './App.css';
import ContactUs from './ContactUs';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ArtList />} />
          <Route path="/art/:id" element={<ArtDetail />} />
          <Route path="/ContactUs" component={<ContactUs/>} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;

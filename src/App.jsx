import React from 'react';
import Header from './components/Header';
import './index.css';

export default function App() {
  return (
    <div className="app-container">
      <Header
        titre="Mon Super Compteur React"
        sousTitre="Maitrise des Hooks fondamentaux useState et useEffect"
      />
    </div>
  );
}
import React, { useState } from 'react';

export default function Counter() {
  // Declaration de l'etat reactif count initialise a 0
  const [count, setCount] = useState(0);

  // Fonction d'incrementation
  const handleIncrement = () => {
    // Forme fonctionnelle recommandee : garantit d'utiliser la valeur precedente exacte
    setCount((prev) => prev + 1);
  };

  // Fonction de decrementation
  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  // Fonction de remise a zero
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="counter-card">
      <div className="counter-display">{count}</div>
      <div className="btn-group">
        <button className="btn btn-dec" onClick={handleDecrement}>
          -1
        </button>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <button className="btn btn-inc" onClick={handleIncrement}>
          +1
        </button>
      </div>
    </div>
  );
}
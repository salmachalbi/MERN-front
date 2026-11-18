import { useState, useEffect } from 'react';

export default function Counter() {
  
    // 1. Initialisation de count depuis le localStorage (si existant, sinon 0)
  const [count, setCount] = useState(() => {
    const sauvegarde = localStorage.getItem('mon_compteur_valeur');
    return sauvegarde !== null ? parseInt(sauvegarde, 10) : 0;
  });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('Aucun clic pour le moment');
  const [totalClics, setTotalClics] = useState(0);

// Défi 2 : Sauvegarde & Restauration Complète de l’Historique (useEffect) ★★
const [historique, setHistorique] = useState(() => {
  const sauvegarde = localStorage.getItem('mon_compteur_historique');
  return sauvegarde !== null ? JSON.parse(sauvegarde) : [];
});
  // 2. EFFET A : Synchroniser le titre de l'onglet du navigateur
  useEffect(() => {
    document.title = 'Compteur : ' + count;
  }, [count]); // Ne se relance que si `count` change !

  // 3. EFFET B : Sauvegarde automatique dans le localStorage
  useEffect(() => {
    localStorage.setItem('mon_compteur_valeur', count.toString());
  }, [count]);
  // Défi 2 :EFFET C : Sauvegarde automatique de l'historique dans le localStorage
useEffect(() => {
  localStorage.setItem('mon_compteur_historique', JSON.stringify(historique));
}, [historique]);
  // Gestionnaire d'incrementation avec variables simples et borne max
const handleIncrement = () => {
  const nouveauCompte = count + step;
  if (nouveauCompte > 50) {
    setMessage('Seuil maximal de 50 atteint !');
    return;
  }
  setCount(nouveauCompte);
  setMessage('Ajout de ' + step);
  setTotalClics(totalClics + 1);
  const action = '+' + step;
  setHistorique([...historique, action]);
};

  // Gestionnaire de decrementation avec borne min
const handleDecrement = () => {
  const nouveauCompte = count - step;
  if (nouveauCompte < -50) {
    setMessage('Seuil minimal de -50 atteint !');
    return;
  }
  setCount(nouveauCompte);
  setMessage('Retrait de ' + step);
  setTotalClics(totalClics + 1);
  const action = '-' + step;
  setHistorique([...historique, action]);
};

  // Gestionnaire de remise a zero
  const handleReset = () => {
    setCount(0);
    setMessage('Remise a zero');
    setTotalClics(totalClics + 1);
    setHistorique([]);
  };

  // Couleur dynamique selon le signe du compteur
  const getStyleClass = () => {
    if (count > 0) return 'counter-display positive';
    if (count < 0) return 'counter-display negative';
    return 'counter-display zero';
  };

  return (
    <div className="counter-card">
      <div className={getStyleClass()}>{count}</div>
      <div className="btn-group">
        <button className="btn btn-dec" onClick={handleDecrement}>-{step}</button>
        <button className="btn btn-reset" onClick={handleReset}>Reset</button>
        <button className="btn btn-inc" onClick={handleIncrement}>+{step}</button>
      </div>
      <div className="step-control">
        <label>Pas d'incrementation : </label>
        <select value={step} onChange={(e) => setStep(parseInt(e.target.value, 10))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className="history-card">
        <p><strong>Derniere action : </strong>{message}</p>
        <p><strong>Total des clics : </strong>{totalClics}</p>
        {historique.length > 0 && (
          <p><strong>Historique : </strong>{historique.join(', ')}</p>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import Game from './components/Game';
import './index.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Cybersecurity Training Game</h1>
        <p>Test your knowledge on phishing and password security!</p>
      </header>
      <main>
        <Game />
      </main>
      <footer>
        <p>&copy; 2024 Cybersecurity Trainer</p>
      </footer>
    </div>
  );
}

export default App;
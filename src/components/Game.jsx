import React, { useState, useEffect, useCallback } from 'react';
import PhishingDetector from './PhishingDetector';
import PasswordChecker from './PasswordChecker';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const Game = () => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [stages, setStages] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStages = useCallback(async () => {
    const MAX_RETRIES = 3;
    let attempt = 0;
    setError(null);

    while (attempt < MAX_RETRIES) {
      try {
        setIsLoading(true);
        const response = await fetch('/api/getStages'); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStages(data);
        setIsLoading(false);
        return;
      } catch (e) {
        attempt++;
        console.error(`Attempt ${attempt} failed to load game data:`, e.message);
        if (attempt >= MAX_RETRIES) {
          setError('Failed to load game data after multiple retries. Please check the network.');
          setIsLoading(false);
          return;
        }
        await delay(1000 * Math.pow(2, attempt - 1));
      }
    }
  }, []);

  useEffect(() => {
    fetchStages();
  }, [fetchStages]);

  const numStages = stages ? stages.length : 0;
  const progressPercent = stages ? (((currentStageIndex + 1) / numStages) * 100) : 0;

  const handleStageComplete = (points) => {
    const calculatedPoints = Math.max(0, points);
    setTotalScore(prev => prev + calculatedPoints);

    setTimeout(() => {
      if (currentStageIndex < numStages - 1) {
        setCurrentStageIndex(prev => prev + 1);
      } else {
        setIsGameOver(true);
      }
    }, 3000); 
  };

  const resetGame = () => {
    setCurrentStageIndex(0);
    setTotalScore(0);
    setIsGameOver(false);
    fetchStages();
  };

  if (isLoading) {
    return <h2>Loading Cybersecurity Stages... Please wait.</h2>;
  }
  
  if (error) {
    return (
      <div style={{color: '#dc3545', fontWeight: 'bold'}}>
        <h2>Error Loading Game</h2>
        <p>{error}</p>
        <button onClick={resetGame}>Try Reloading Game</button>
      </div>
    );
  }

  const stage = stages[currentStageIndex];

  if (isGameOver) {
    const maxPossibleScore = stages.reduce((sum, s) => sum + (s.pointsOnCorrect || s.maxPoints || 0), 0);
    const scorePercentage = (totalScore / maxPossibleScore) * 100;
    let finalMessage, finalTip;

    if (scorePercentage >= 90) {
      finalMessage = "Cybersecurity Ace! You have excellent security instincts.";
      finalTip = "Keep up the great work! Consider using a password manager to effortlessly create and store complex passwords.";
    } else if (scorePercentage >= 60) {
      finalMessage = "Great Effort! You have a solid grasp of key security concepts.";
      finalTip = "Focus on the small details. Always hover over links before clicking and scrutinize sender email domains.";
    } else {
      finalMessage = "Good start, but there's room to improve your defenses.";
      finalTip = "Never trust an email that pressures you to act immediately, especially if it asks for credentials or money. Always verify with the source directly.";
    }

    return (
      <div className="game-over">
        <h2>🎉 Game Over!</h2>
        <h3>Final Score: {totalScore} out of {maxPossibleScore}</h3>
        <p style={{fontSize: '1.2em', fontWeight: 'bold', color: scorePercentage >= 60 ? '#6bff6b' : '#ff6b6b'}}>{finalMessage}</p>
        <h4>Your Next Steps:</h4>
        <p>💡 **{finalTip}**</p>
        <button onClick={resetGame}>Play Again</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Stage {currentStageIndex + 1} of {numStages}</h3>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>
      
      {stage.type === 'phishing' && (
        <PhishingDetector 
          emailData={stage.data} 
          pointsOnCorrect={stage.pointsOnCorrect}
          onComplete={handleStageComplete} 
        />
      )}
      
      {stage.type === 'password' && (
        <PasswordChecker 
          data={stage.data} 
          maxPoints={stage.maxPoints}
          onComplete={handleStageComplete} 
        />
      )}

      <h4 style={{marginTop: '2rem'}}>Current Score: {totalScore}</h4>
    </div>
  );
};

export default Game;
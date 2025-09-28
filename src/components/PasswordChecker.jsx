import React, { useState } from 'react';

const scorePassword = (password) => {
  let score = 0;
  const checks = {
    length: password.length >= 12,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*()]/.test(password),
  };

  if (checks.length) score += 1;
  if (checks.upper) score += 1;
  if (checks.lower) score += 1;
  if (checks.number) score += 1;
  if (checks.symbol) score += 1;

  return { score, checks };
};

const PasswordChecker = ({ data, maxPoints, onComplete }) => {
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { score, checks } = scorePassword(password);
  const earnedPoints = score;
  const strengthText = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong', 'Excellent'][score];

  const handleSubmit = () => {
    setIsSubmitted(true);
    let message = `Your password strength is: ${strengthText}. You earned ${earnedPoints} points.`;
    
    if (earnedPoints < maxPoints) {
      message += ` Try to use a longer password (12+ characters) with uppercase, lowercase, numbers, and symbols to maximize your score.`;
    } else {
      message = `Excellent! Your password is Very Strong, meeting all criteria. You earned ${maxPoints} points!`;
    }

    setFeedback({
      message: message,
      isCorrect: earnedPoints === maxPoints,
      points: earnedPoints
    });
    
    onComplete(earnedPoints);
  };

  return (
    <div className="password-container">
      <h3>Password Creation Challenge</h3>
      <p>{data.instruction}</p>

      <div className="password-input-area">
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFeedback(null);
            setIsSubmitted(false);
          }}
          placeholder="Enter your new password"
          disabled={isSubmitted}
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #3c3c3c', backgroundColor: '#1e1e1e', color: 'white' }}
        />
        
        <div className="strength-indicator">
            <p>Strength: <strong>{strengthText}</strong> ({score}/{maxPoints} criteria met)</p>
            <ul style={{ listStyleType: 'none', padding: 0, fontSize: '0.9em', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <li style={{ color: checks.length ? 'lightgreen' : '#ff9999' }}>{checks.length ? '✅' : '❌'} 12+ Characters</li>
                <li style={{ color: checks.upper ? 'lightgreen' : '#ff9999' }}>{checks.upper ? '✅' : '❌'} Uppercase Letter</li>
                <li style={{ color: checks.lower ? 'lightgreen' : '#ff9999' }}>{checks.lower ? '✅' : '❌'} Lowercase Letter</li>
                <li style={{ color: checks.number ? 'lightgreen' : '#ff9999' }}>{checks.number ? '✅' : '❌'} Number</li>
                <li style={{ color: checks.symbol ? 'lightgreen' : '#ff9999' }}>{checks.symbol ? '✅' : '❌'} Symbol (!@#$ etc.)</li>
            </ul>
        </div>
      </div>

      <button onClick={handleSubmit} disabled={password.length === 0 || isSubmitted}>
        Submit Password
      </button>

      {feedback && (
        <div className={`feedback-box ${feedback.isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <p>{feedback.message}</p>
        </div>
      )}
    </div>
  );
};

export default PasswordChecker;
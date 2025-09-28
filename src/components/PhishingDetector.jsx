import React, { useState } from 'react';

const PhishingDetector = ({ emailData, pointsOnCorrect, onComplete }) => {
  const [feedback, setFeedback] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { subject, sender, body, isPhishing, tip } = emailData;

  const handleSubmit = (isUserPhishing) => {
    setIsSubmitted(true);
    let message = '';
    let points = 0;
    let isCorrect = false;

    if (isUserPhishing === isPhishing) {
      isCorrect = true;
      points = pointsOnCorrect;
      message = `Correct! This email is ${isPhishing ? 'Phishing' : 'Legitimate'}. You earned ${points} points.`;
    } else {
      isCorrect = false;
      points = 0;
      message = `Incorrect. This email is actually ${isPhishing ? 'Phishing' : 'Legitimate'}. You earned 0 points.`;
    }

    message += ` The key takeaway: ${tip}`;

    setFeedback({
      message,
      isCorrect,
      points
    });

    onComplete(points);
  };

  return (
    <div className="phishing-container">
      <h3>Phishing Detection Stage</h3>
      <p>Analyze the email below and decide if it is a legitimate message or a phishing attempt.</p>
      
      <div className="email-container">
        <div className="email-header">
          <p><strong>From:</strong> {sender}</p>
          <p><strong>Subject:</strong> {subject}</p>
        </div>
        <div className="email-body">
          {body}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handleSubmit(true)} disabled={isSubmitted} style={{ backgroundColor: '#dc3545' }}>
          It's Phishing (SCAM)
        </button>
        <button onClick={() => handleSubmit(false)} disabled={isSubmitted} style={{ backgroundColor: '#28a745' }}>
          It's Legitimate (SAFE)
        </button>
      </div>

      {feedback && (
        <div className={`feedback-box ${feedback.isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <p><strong>Result:</strong> {feedback.message}</p>
          <p>Points Awarded: {feedback.points}</p>
        </div>
      )}
    </div>
  );
};

export default PhishingDetector;
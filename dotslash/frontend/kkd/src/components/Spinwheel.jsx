import React, { useState } from 'react';
import WheelComponent from 'react-wheel-of-prizes';

const App = () => {
  const segments = [
    'Exchange code',
    'Time complexity',
    'Get a hint',
    'Restriction of built-in',
    'See other\'s code',
    'Solve a riddle',
    'Freeze other\'s compiler',
    'Better luck next time'
  ];
  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ];

  const [winner, setWinner] = useState('');

  const redirectToCompiler = () => {
    window.location.href = '/compiler'; // Redirect to compiler page
  };

  const handleSpin = () => {
    const randomIndex = Math.floor(Math.random() * segments.length);
    setWinner(segments[randomIndex]);
  };
  
  const redirectToCompilerWithDelay = () => {
    // Introduce a delay of 2 seconds before redirecting to the compiler page
    setTimeout(() => {
      redirectToCompiler();
    }, 4000); // 2000 milliseconds = 2 seconds
  };
  
  return (
    <div style={{minHeight: '100vh', marginLeft:'400px', marginTop:'100px' }}>
      <div className="wheel-container" style={{ textAlign: 'center' }}>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment={winner}
          onFinished={(winner) => {
            setWinner(winner);
            redirectToCompilerWithDelay(); // Redirect to compiler after the wheel spins with delay
          }}
          primaryColor='white'
          contrastColor='white'
          buttonText='Spin'
          isOnlyOnce={false}
          size={290}
          upDuration={100}
          downDuration={500}
          fontFamily='Arial'
          textColor='white'
        />
      </div>
      {winner && <p style={{ color: "white" }}>Congratulations! You won {winner}!</p>}
    </div>
  );
};

export default App;

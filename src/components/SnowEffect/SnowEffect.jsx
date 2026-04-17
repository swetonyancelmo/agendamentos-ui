import React, { useEffect, useState } from 'react';
import './SnowEffect.css';

const SnowEffect = () => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    const totalFlocos = 35;
    const novosFlocos = Array.from({ length: totalFlocos }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      size: Math.random() * 1.5 + 0.7 + 'rem',
      duration: Math.random() * 8 + 6 + 's',
      delay: Math.random() * -12 + 's', // Delay negativo para já começar caindo
      opacity: Math.random() * 0.8 + 0.2
    }));
    setFlakes(novosFlocos);
  }, []);

  return (
    <div className="neve-canvas">
      {flakes.map((f) => (
        <div
          key={f.id}
          className="snowflake"
          style={{
            left: f.left,
            fontSize: f.size,
            animationDuration: f.duration,
            animationDelay: f.delay,
            opacity: f.opacity
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default SnowEffect;
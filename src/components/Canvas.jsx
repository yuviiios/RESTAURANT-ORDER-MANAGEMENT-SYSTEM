import React, { useEffect, useRef } from 'react';
import './Canvas.css';

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Example of canvas drawing
    function drawPlate() {
      // Draw plate
      ctx.beginPath();
      ctx.arc(150, 150, 100, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#e67e22';
      ctx.lineWidth = 5;
      ctx.stroke();

      // Draw decorative pattern
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.arc(150, 150, 80, (i * Math.PI) / 4, ((i + 1) * Math.PI) / 4);
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    drawPlate();
  }, []);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width="300"
        height="300"
        className="decorative-canvas"
      />
    </div>
  );
}

export default Canvas;
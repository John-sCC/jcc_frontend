console.log("scriptloaded")

function createFibonacciSpiral(n) {
    const container = document.getElementById('fibonacci-container');
    const fibonacciSequence = [0, 1];
  
    // Calculate Fibonacci sequence up to the specified term
    for (let i = 2; i <= n; i++) {
      fibonacciSequence[i] = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];
    }
  
    let currentX = 0;
    let currentY = 0;
    let direction = 0; // 0: right, 1: down, 2: left, 3: up
  
    for (let i = 0; i < n; i++) {
      const sideLength = fibonacciSequence[i];
      const div = document.createElement('div');
      div.style.width = sideLength * 10 + 'px'; // Adjust multiplier for scaling
      div.style.height = sideLength * 10 + 'px'; // Adjust multiplier for scaling
      div.classList.add('fibonacci-box');
      div.textContent = sideLength;
  
      container.appendChild(div);
  
      // Position div based on direction
      if (direction === 0) {
        div.style.left = currentX + 'px';
        div.style.top = currentY + 'px';
        currentX += sideLength * 10;
      } else if (direction === 1) {
        div.style.left = currentX - sideLength * 10 + 'px';
        div.style.top = currentY + 'px';
        currentY += sideLength * 10;
      } else if (direction === 2) {
        div.style.left = currentX - sideLength * 10 + 'px';
        div.style.top = currentY - sideLength * 10 + 'px';
        currentX -= sideLength * 10;
      } else if (direction === 3) {
        div.style.left = currentX + 'px';
        div.style.top = currentY - sideLength * 10 + 'px';
        currentY -= sideLength * 10;
      }
  
      // Update direction
      direction = (direction + 1) % 4;
    }
  }
  
// Hacker Terminal Simulation Game
document.addEventListener('DOMContentLoaded', () => {
  try {
    const gameOverlay = document.getElementById('gameOverlay');
    const gameCanvas = document.getElementById('gameCanvas');
    const gameScore = document.getElementById('gameScore');
    const gameLeaderboard = document.getElementById('gameLeaderboard');
    const gameClose = document.getElementById('gameClose');
    
    if (!gameOverlay || !gameCanvas || !gameScore || !gameLeaderboard || !gameClose) {
      throw new Error('Game elements not found');
    }
    
    const ctx = gameCanvas.getContext('2d');
    let score = 0;
    let nodes = [];
    let connections = [];
    let targetNodes = [];
    let currentLevel = 1;
    let animationFrameId;
    
    const leaderboard = [
      { name: 'Rashed', score: 0 },
      { name: 'Hackerman', score: 450 },
      { name: 'CyberWizard', score: 320 },
      { name: 'CodeBreaker', score: 230 },
      { name: 'NeoMatrix', score: 180 }
    ];

    // Define node types with colors
    const nodeTypes = [
      { name: 'Firewall', color: '#ff2e63' },
      { name: 'Database', color: '#64ffda' },
      { name: 'Server', color: '#7b2cbf' },
      { name: 'Endpoint', color: '#3498db' },
      { name: 'Gateway', color: '#f39c12' }
    ];

    function createRandomNode() {
      const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
      return {
        x: 50 + Math.random() * (gameCanvas.width - 100),
        y: 50 + Math.random() * (gameCanvas.height - 100),
        radius: 15,
        type: type.name,
        color: type.color,
        compromised: false,
        pulseSize: 0,
        pulseDirection: 1
      };
    }

    function createRandomConnection(nodes) {
      if (nodes.length < 2) return null;
      const nodeA = nodes[Math.floor(Math.random() * nodes.length)];
      let nodeB;
      do {
        nodeB = nodes[Math.floor(Math.random() * nodes.length)];
      } while (nodeB === nodeA);
      
      return {
        nodeA,
        nodeB,
        active: false,
        progress: 0
      };
    }

    function startGame() {
      score = 0;
      currentLevel = 1;
      nodes = [];
      connections = [];
      targetNodes = [];
      gameScore.textContent = score;
      
      // Create level
      createLevel(currentLevel);
      
      gameLoop();
    }

    function createLevel(level) {
      // Clear previous level
      nodes = [];
      connections = [];
      targetNodes = [];
      
      // Create nodes based on level
      const nodeCount = 4 + level * 2;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(createRandomNode());
      }
      
      // Create connections
      const connectionCount = nodeCount + Math.floor(level * 1.5);
      for (let i = 0; i < connectionCount; i++) {
        const connection = createRandomConnection(nodes);
        if (connection) connections.push(connection);
      }
      
      // Set target nodes (these need to be compromised to complete the level)
      const targetCount = Math.min(1 + Math.floor(level / 2), nodes.length - 1);
      const targetCandidates = [...nodes];
      for (let i = 0; i < targetCount; i++) {
        const index = Math.floor(Math.random() * targetCandidates.length);
        targetNodes.push(targetCandidates[index]);
        targetCandidates.splice(index, 1);
      }
      
      // Always compromise at least one node at the start to give the player a beginning point
      nodes[0].compromised = true;
    }

    function checkLevelCompletion() {
      const allTargetsCompromised = targetNodes.every(node => node.compromised);
      if (allTargetsCompromised) {
        score += currentLevel * 100;
        gameScore.textContent = score;
        currentLevel++;
        
        // Update leaderboard
        leaderboard[0].score = Math.max(leaderboard[0].score, score);
        leaderboard.sort((a, b) => b.score - a.score);
        gameLeaderboard.innerHTML = leaderboard
          .slice(0, 5)
          .map((entry, i) => `${i + 1}. ${entry.name}: ${entry.score}`)
          .join('<br>');
        
        // Create new level
        createLevel(currentLevel);
      }
    }

    function gameLoop() {
      // Clear canvas
      ctx.fillStyle = 'rgba(10, 25, 47, 0.3)';
      ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
      
      // Draw connections
      connections.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(connection.nodeA.x, connection.nodeA.y);
        ctx.lineTo(connection.nodeB.x, connection.nodeB.y);
        
        if (connection.active) {
          // Animated dashed line for active connections
          ctx.setLineDash([5, 5]);
          ctx.strokeStyle = '#64ffda';
          ctx.lineWidth = 2;
          
          // Data packet animation
          const packetPosition = connection.progress / 100;
          const packetX = connection.nodeA.x + (connection.nodeB.x - connection.nodeA.x) * packetPosition;
          const packetY = connection.nodeA.y + (connection.nodeB.y - connection.nodeA.y) * packetPosition;
          
          ctx.stroke();
          ctx.setLineDash([]);
          
          // Draw data packet
          ctx.fillStyle = '#64ffda';
          ctx.beginPath();
          ctx.arc(packetX, packetY, 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Update progress
          connection.progress += 2;
          if (connection.progress >= 100) {
            connection.progress = 0;
            connection.active = false;
            connection.nodeB.compromised = true;
          }
        } else {
          // Regular connection line
          ctx.setLineDash([]);
          ctx.strokeStyle = 'rgba(120, 120, 120, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
      
      // Draw nodes
      nodes.forEach(node => {
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.compromised ? node.color : 'rgba(150, 150, 150, 0.6)';
        ctx.fill();
        
        // Draw node label
        ctx.fillStyle = '#fff';
        ctx.font = '10px IBM Plex Mono';
        ctx.textAlign = 'center';
        ctx.fillText(node.type, node.x, node.y + node.radius + 15);
        
        // Draw pulse effect for compromised nodes
        if (node.compromised) {
          node.pulseSize += 0.2 * node.pulseDirection;
          if (node.pulseSize > 10) node.pulseDirection = -1;
          if (node.pulseSize < 0) node.pulseDirection = 1;
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + node.pulseSize, 0, Math.PI * 2);
          ctx.strokeStyle = node.color;
          ctx.stroke();
        }
        
        // Highlight target nodes
        if (targetNodes.includes(node)) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 5, 0, Math.PI * 2);
          ctx.strokeStyle = '#f39c12';
          ctx.setLineDash([2, 2]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
      
      // Draw level info
      ctx.fillStyle = '#fff';
      ctx.font = '14px IBM Plex Mono';
      ctx.textAlign = 'left';
      ctx.fillText(`Level: ${currentLevel}`, 10, 20);
      
      // Check level completion
      checkLevelCompletion();
      
      animationFrameId = requestAnimationFrame(gameLoop);
    }

    // Make sure game overlay is scrollable
    if (gameOverlay) {
      gameOverlay.style.overflow = 'auto';
      gameOverlay.style.overflowX = 'hidden';
    }

    // Ensure the game canvas has proper event handling
    if (gameCanvas) {
      gameCanvas.style.cursor = 'pointer';
      
      // Make canvas responsive
      function resizeCanvas() {
        const maxWidth = Math.min(600, window.innerWidth - 40);
        if (window.innerWidth <= 768) {
          gameCanvas.width = maxWidth;
          gameCanvas.height = maxWidth * 0.8;
        }
      }
      
      // Resize canvas on window resize
      window.addEventListener('resize', () => {
        resizeCanvas();
        if (nodes.length > 0) {
          // Redraw game if active
          gameLoop();
        }
      });
      
      // Initial resize
      resizeCanvas();
    }

    // Event listener for node clicking - improved version
    gameCanvas.addEventListener('click', e => {
      const rect = gameCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      console.log('Canvas clicked at:', clickX, clickY);
      
      // Check if a compromised node was clicked
      const compromisedNode = nodes.find(node => {
        if (!node.compromised) return false;
        const dist = Math.sqrt((clickX - node.x) ** 2 + (clickY - node.y) ** 2);
        console.log('Distance to node:', dist, 'Node radius:', node.radius);
        return dist <= node.radius;
      });
      
      if (compromisedNode) {
        console.log('Compromised node clicked:', compromisedNode);
        // Find connections from this node to uncompromised nodes
        connections.forEach(conn => {
          if (conn.nodeA === compromisedNode && !conn.nodeB.compromised && !conn.active) {
            conn.active = true;
            conn.progress = 0;
          }
        });
      }
    });

    // Expose game functions for terminal to use
    window.launchGame = function() {
      gameOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent body scrolling
      
      // Add a temporary top close button for easier access
      const topCloseBtn = document.createElement('button');
      topCloseBtn.className = 'game-close';
      topCloseBtn.id = 'gameCloseTop';
      topCloseBtn.textContent = 'Exit Terminal';
      topCloseBtn.style.top = '20px';
      topCloseBtn.style.bottom = 'auto';
      
      // Remove any existing top close button
      const existingTopBtn = document.getElementById('gameCloseTop');
      if (existingTopBtn) {
        existingTopBtn.remove();
      }
      
      gameOverlay.appendChild(topCloseBtn);
      
      // Add event listener to the top close button
      topCloseBtn.addEventListener('click', () => {
        gameOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scrolling
        cancelAnimationFrame(animationFrameId);
        topCloseBtn.remove();
      });
      
      startGame();
    };
    
    // Add an additional way to close
    gameClose.addEventListener('click', () => {
      gameOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore body scrolling
      cancelAnimationFrame(animationFrameId);
    });

    document.addEventListener('keydown', e => {
      if (gameOverlay.classList.contains('active') && e.key === 'Escape') {
        gameOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scrolling
        cancelAnimationFrame(animationFrameId);
      }
    });
    
  } catch (e) {
    console.error('Game initialization failed: ' + e.message);
  }
}); 
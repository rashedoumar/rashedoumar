// Error Handling
function showError(message) {
  console.error(message);
  const toast = document.getElementById('errorToast');
  if (toast) {
    toast.textContent = `Error: ${message}`;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
  }
}

// Terminal Functionality
try {
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalInput = document.getElementById('terminalInput');
  const terminalSuggestions = document.getElementById('terminalSuggestions');
  
  if (!terminalOutput || !terminalInput) throw new Error('Terminal elements not found');
  
  // Welcome message with smaller ASCII art
  const welcomeMessage = `
  <span style="color: var(--accent); font-size: 0.6em;">
  ██████╗  █████╗ ███████╗██╗  ██╗███████╗██████╗ 
  ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔════╝██╔══██╗
  ██████╔╝███████║███████╗███████║█████╗  ██║  ██║
  ██╔══██╗██╔══██║╚════██║██╔══██║██╔══╝  ██║  ██║
  ██║  ██║██║  ██║███████║██║  ██║███████╗██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═════╝ 
  </span>
  
  <span style="color: var(--neon-pink); font-size: 0.9em;">Welcome to Rashed Omar's Portfolio Terminal v2.0</span>
  
  <span style="color: var(--text-secondary); font-size: 0.85em;">Type 'help' to see available commands</span>
  <span style="color: var(--text-secondary); font-size: 0.85em;">Last login: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</span>
  `;
  
  terminalOutput.innerHTML = welcomeMessage;
  
  // Command history
  const commandHistory = [];
  let historyIndex = -1;
  
  // Auto-completion functionality with new commands
  const availableCommands = [
    'help', 'about', 'skills', 'projects', 'contact', 'game', 'clear',
    'git log', 'aws status', 'docker ps', 'terraform plan', 'kubernetes status',
    'python --version', 'react start', 'system status', 'hipaa audit',
    'laravel deploy', 'npm run', 'ls', 'whoami', 'sudo npm install',
    'hack nasa', 'hack google', 'hack portfolio', 'ssh user@example.com',
    'ping google.com', 'neofetch', 'uname -a', 'rm -rf /',
    'joke', 'ai chat', 'ai generate', 'ai predict', 'exit',
    // Existing cool commands
    'matrix', 'glitch', 'rainbow', 'ascii', 'fortune', 'cowsay',
    'hackerman', 'crypto', 'weather', 'moon', 'stars', 'fire',
    'cyberpunk', 'retro', 'neon', 'hologram', 'scan', 'decrypt',
    'encrypt', 'bypass', 'inject', 'exploit', 'backdoor', 'rootkit',
    // New cool commands
    'pulse', 'wave', 'binary', 'quantum', 'dna', 'virus',
    'worm', 'trojan', 'phishing', 'ddos', 'bruteforce', 'sniff',
    'spoof', 'mitm', 'keylogger', 'ransomware', 'botnet', 'zero-day',
    'nuclear', 'laser', 'plasma', 'fusion', 'antimatter', 'teleport',
    'time', 'dimension', 'portal', 'void', 'nebula', 'cosmos'
  ];
  
  // Auto-complete function
  function autoCompleteCommand(input) {
    if (!input) return [];
    const normalizedInput = input.toLowerCase();
    return availableCommands.filter(cmd => 
      cmd.toLowerCase().startsWith(normalizedInput)
    );
  }
  
  // Show suggestions
  terminalInput.addEventListener('input', function() {
    const input = this.value.trim();
    const suggestions = autoCompleteCommand(input);
    
    if (suggestions.length > 0 && input.length > 0) {
      terminalSuggestions.innerHTML = suggestions
        .map(s => {
          const matchIndex = s.toLowerCase().indexOf(input.toLowerCase());
          const beforeMatch = s.slice(0, matchIndex);
          const match = s.slice(matchIndex, matchIndex + input.length);
          const afterMatch = s.slice(matchIndex + input.length);
          return `<div class="suggestion" data-command="${s}">
            ${beforeMatch}<span class="match">${match}</span>${afterMatch}
          </div>`;
        })
        .join('');
      terminalSuggestions.style.display = 'block';
    } else {
      terminalSuggestions.style.display = 'none';
    }
  });
  
  // Handle suggestion clicks
  terminalSuggestions.addEventListener('click', function(e) {
    const suggestion = e.target.closest('.suggestion');
    if (suggestion) {
      terminalInput.value = suggestion.dataset.command;
      terminalSuggestions.style.display = 'none';
      terminalInput.focus();
    }
  });
  
  // Hide suggestions when input loses focus
  terminalInput.addEventListener('blur', function() {
    // Small delay to allow clicking on suggestions
    setTimeout(() => {
      terminalSuggestions.style.display = 'none';
    }, 200);
  });
  
  // Add keyboard navigation for suggestions
  let selectedSuggestionIndex = -1;
  
  terminalInput.addEventListener('keydown', function(e) {
    const suggestions = Array.from(terminalSuggestions.children);
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        selectedSuggestionIndex = (selectedSuggestionIndex + 1) % suggestions.length;
        suggestions.forEach((s, i) => {
          s.classList.toggle('selected', i === selectedSuggestionIndex);
        });
        suggestions[selectedSuggestionIndex].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        selectedSuggestionIndex = (selectedSuggestionIndex - 1 + suggestions.length) % suggestions.length;
        suggestions.forEach((s, i) => {
          s.classList.toggle('selected', i === selectedSuggestionIndex);
        });
        suggestions[selectedSuggestionIndex].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
      e.preventDefault();
      const selectedSuggestion = suggestions[selectedSuggestionIndex];
      if (selectedSuggestion) {
        terminalInput.value = selectedSuggestion.dataset.command;
        terminalSuggestions.style.display = 'none';
        selectedSuggestionIndex = -1;
      }
    } else if (e.key === 'Escape') {
      terminalSuggestions.style.display = 'none';
      selectedSuggestionIndex = -1;
    }
  });
  
  // Add animation helper functions at the top of the file
  function createProgressBar(percentage, color = 'var(--accent)') {
    const width = 50;
    const filled = Math.floor(width * (percentage / 100));
    const empty = width - filled;
    return `<div style="background: rgba(100, 255, 218, 0.1); height: 20px; width: 100%; border-radius: 5px; margin: 5px 0;">
      <div style="background: linear-gradient(90deg, ${color}, #FFEB3B); height: 20px; width: ${percentage}%; border-radius: 5px; transition: width 0.5s ease;"></div>
    </div>`;
  }
  
  function createMatrixText(text, speed = 50) {
    let output = '';
    for (let i = 0; i < text.length; i++) {
      output += `<span style="color: var(--accent); animation: matrix-fade ${speed}ms ${i * speed}ms forwards;">${text[i]}</span>`;
    }
    return output;
  }
  
  function createGlitchText(text) {
    return text.split('').map(char => 
      `<span style="animation: glitch 0.3s infinite;">${char}</span>`
    ).join('');
  }
  
  // Helper functions for text effects
  function createRainbowText(text) {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    return text.split('').map((char, i) => 
      `<span style="color: ${colors[i % colors.length]}; animation: rainbow 2s infinite ${i * 0.1}s;">${char}</span>`
    ).join('');
  }
  
  function createNeonText(text) {
    return text.split('').map(char => 
      `<span style="text-shadow: 0 0 5px var(--accent), 0 0 10px var(--accent), 0 0 20px var(--accent);">${char}</span>`
    ).join('');
  }
  
  // Define command implementations
  const commands = {
    help: () => {
      return `
        <span style="color: var(--accent);">Available commands:</span>
        
        <span style="color: var(--neon-pink);">Basic Commands:</span>
        <span style="color: var(--text-secondary);">help</span> - Show this help message
        <span style="color: var(--text-secondary);">about</span> - About Rashed Omar
        <span style="color: var(--text-secondary);">skills</span> - List skills and expertise
        <span style="color: var(--text-secondary);">projects</span> - View recent projects
        <span style="color: var(--text-secondary);">contact</span> - Contact information
        <span style="color: var(--text-secondary);">game</span> - Play Network Infiltration game
        <span style="color: var(--text-secondary);">clear</span> - Clear terminal
        
        <span style="color: var(--neon-pink);">AI Commands:</span>
        <span style="color: var(--text-secondary);">ai chat [prompt]</span> - Chat with the AI assistant
        <span style="color: var(--text-secondary);">ai generate [prompt]</span> - Generate code samples
        <span style="color: var(--text-secondary);">ai predict [domain]</span> - Get AI predictions
        
        <span style="color: var(--neon-pink);">System Commands:</span>
        <span style="color: var(--text-secondary);">git log</span> - Show recent git activity
        <span style="color: var(--text-secondary);">aws status</span> - Check AWS services status
        <span style="color: var(--text-secondary);">docker ps</span> - List running containers
        <span style="color: var(--text-secondary);">terraform plan</span> - Show infrastructure plan
        <span style="color: var(--text-secondary);">kubernetes status</span> - Check k8s cluster status
        <span style="color: var(--text-secondary);">python --version</span> - Show Python version
        <span style="color: var(--text-secondary);">react start</span> - Start a React development server
        <span style="color: var(--text-secondary);">system status</span> - Show system resource usage
        <span style="color: var(--text-secondary);">hipaa audit</span> - Run HIPAA compliance check
        <span style="color: var(--text-secondary);">laravel deploy</span> - Deploy Laravel application
        <span style="color: var(--text-secondary);">npm run</span> - Run NPM commands
        <span style="color: var(--text-secondary);">ls</span> - List directory contents
        <span style="color: var(--text-secondary);">whoami</span> - Show current user
        <span style="color: var(--text-secondary);">sudo</span> - Run command as administrator
        
        <span style="color: var(--neon-pink);">Visual Effects:</span>
        <span style="color: var(--text-secondary);">matrix</span> - Activate Matrix rain effect
        <span style="color: var(--text-secondary);">glitch</span> - Create glitch text effect
        <span style="color: var(--text-secondary);">rainbow</span> - Display rainbow text
        <span style="color: var(--text-secondary);">ascii [type]</span> - Show ASCII art
        <span style="color: var(--text-secondary);">pulse</span> - Show pulsing progress bar
        <span style="color: var(--text-secondary);">wave</span> - Display wave patterns
        <span style="color: var(--text-secondary);">binary</span> - Show binary stream
        <span style="color: var(--text-secondary);">neon</span> - Activate neon text mode
        <span style="color: var(--text-secondary);">hologram</span> - Simulate holographic interface
        <span style="color: var(--text-secondary);">destroy</span> - Simulate website destruction and rebuild
        
        <span style="color: var(--neon-pink);">Fun Commands:</span>
        <span style="color: var(--text-secondary);">fortune</span> - Show random programming fortune
        <span style="color: var(--text-secondary);">cowsay [message]</span> - Make a cow say something
        <span style="color: var(--text-secondary);">joke</span> - Tell a programmer joke
        <span style="color: var(--text-secondary);">crypto</span> - Show cryptocurrency prices
        <span style="color: var(--text-secondary);">weather</span> - Show weather simulation
        <span style="color: var(--text-secondary);">moon</span> - Show moon phase
        <span style="color: var(--text-secondary);">stars</span> - Create starfield effect
        <span style="color: var(--text-secondary);">fire</span> - Show fire animation
        
        <span style="color: var(--neon-pink);">Theme Commands:</span>
        <span style="color: var(--text-secondary);">cyberpunk</span> - Activate cyberpunk mode
        <span style="color: var(--text-secondary);">retro</span> - Activate retro DOS mode
        
        <span style="color: var(--neon-pink);">Security Simulations:</span>
        <span style="color: var(--text-secondary);">hackerman</span> - Simulate hacking sequence
        <span style="color: var(--text-secondary);">scan</span> - Simulate system scan
        <span style="color: var(--text-secondary);">decrypt</span> - Simulate decryption
        <span style="color: var(--text-secondary);">encrypt</span> - Simulate encryption
        <span style="color: var(--text-secondary);">bypass</span> - Simulate security bypass
        <span style="color: var(--text-secondary);">inject</span> - Simulate code injection
        <span style="color: var(--text-secondary);">exploit</span> - Simulate vulnerability exploit
        <span style="color: var(--text-secondary);">backdoor</span> - Simulate backdoor installation
        <span style="color: var(--text-secondary);">rootkit</span> - Simulate rootkit deployment
        <span style="color: var(--text-secondary);">virus</span> - Simulate virus attack
        <span style="color: var(--text-secondary);">worm</span> - Simulate worm propagation
        <span style="color: var(--text-secondary);">trojan</span> - Simulate trojan horse
        <span style="color: var(--text-secondary);">phishing</span> - Simulate phishing attempt
        <span style="color: var(--text-secondary);">ddos</span> - Simulate DDoS attack
        <span style="color: var(--text-secondary);">bruteforce</span> - Simulate password cracking
        <span style="color: var(--text-secondary);">sniff</span> - Simulate packet sniffing
        <span style="color: var(--text-secondary);">spoof</span> - Simulate IP spoofing
        <span style="color: var(--text-secondary);">mitm</span> - Simulate man-in-the-middle attack
        <span style="color: var(--text-secondary);">keylogger</span> - Simulate keylogger
        <span style="color: var(--text-secondary);">ransomware</span> - Simulate ransomware attack
        <span style="color: var(--text-secondary);">botnet</span> - Simulate botnet operation
        <span style="color: var(--text-secondary);">zero-day</span> - Simulate zero-day exploit
        
        <span style="color: var(--neon-pink);">Scientific Simulations:</span>
        <span style="color: var(--text-secondary);">quantum</span> - Simulate quantum computation
        <span style="color: var(--text-secondary);">dna</span> - Show DNA sequence
        <span style="color: var(--text-secondary);">nuclear</span> - Simulate nuclear reaction
        <span style="color: var(--text-secondary);">laser</span> - Simulate laser operation
        <span style="color: var(--text-secondary);">plasma</span> - Simulate plasma state
        <span style="color: var(--text-secondary);">fusion</span> - Simulate fusion reaction
        <span style="color: var(--text-secondary);">antimatter</span> - Simulate antimatter
        
        <span style="color: var(--neon-pink);">Space & Time:</span>
        <span style="color: var(--text-secondary);">teleport</span> - Simulate teleportation
        <span style="color: var(--text-secondary);">time</span> - Simulate time manipulation
        <span style="color: var(--text-secondary);">dimension</span> - Simulate dimensional travel
        <span style="color: var(--text-secondary);">portal</span> - Simulate portal creation
        <span style="color: var(--text-secondary);">void</span> - Simulate void creation
        <span style="color: var(--text-secondary);">nebula</span> - Simulate nebula formation
        <span style="color: var(--text-secondary);">cosmos</span> - Simulate universe creation
        
        <span style="color: var(--neon-pink);">Network Commands:</span>
        <span style="color: var(--text-secondary);">hack [target]</span> - Try a hacking simulation
        <span style="color: var(--text-secondary);">ssh [user@host]</span> - Connect to remote server
        <span style="color: var(--text-secondary);">ping [host]</span> - Ping a host
        <span style="color: var(--text-secondary);">neofetch</span> - Display system info
        <span style="color: var(--text-secondary);">uname -a</span> - Print system information
      `;
    },
    about: () => {
      return `
        <span style="color: var(--accent);">Rashed Omar</span>
        <span style="color: var(--text-secondary);">Full Stack Engineer at Vytalize Health</span>
        
        Senior software engineer with extensive experience in healthcare technology,
        cloud infrastructure, and secure application development. Currently building
        scalable solutions at Vytalize Health to improve patient care and provider efficiency.
        
        <span style="color: var(--neon-pink);">Fun fact:</span> This portfolio interface is inspired by sci-fi terminal UIs,
        but all the commands are simulations - no actual servers were hacked in the making of this site!
      `;
    },
    skills: () => {
      return `
        <span style="color: var(--accent);">Skills & Technologies:</span>
        
        <span style="color: var(--neon-pink);">Frontend:</span> React, Angular, TypeScript, JavaScript, HTML5, CSS3
        
        <span style="color: var(--neon-pink);">Backend:</span> Node.js, PHP, Laravel, Python, Java
        
        <span style="color: var(--neon-pink);">Cloud & DevOps:</span> AWS, Docker, Kubernetes, Terraform, CI/CD
        
        <span style="color: var(--neon-pink);">Databases:</span> MySQL, PostgreSQL, MongoDB, Redis, Elasticsearch
        
        <span style="color: var(--neon-pink);">Healthcare Tech:</span> HIPAA, FHIR, CCLF, Salesforce Health Cloud
        
        <span style="color: var(--neon-pink);">AI & ML:</span> TensorFlow, PyTorch, NLP, AWS SageMaker
        
        <span style="color: var(--text-secondary);">View more details in the Skills section below</span>
      `;
    },
    projects: () => {
      return `
        <span style="color: var(--accent);">Recent Projects:</span>
        
        <span style="color: var(--neon-pink);">Banzai Collaboration Tracking</span>
        <span style="color: var(--text-secondary);">Serverless platform for healthcare collaboration, HIPAA-compliant.</span>
        <span style="color: var(--text-secondary);">Tech: TypeScript, Node.js, React, AWS Lambda</span>
        
        <span style="color: var(--neon-pink);">Care Patient Dashboard</span>
        <span style="color: var(--text-secondary);">Patient health dashboard with Twilio integration and microservices.</span>
        <span style="color: var(--text-secondary);">Tech: Laravel, Node.js, React, Docker</span>
        
        <span style="color: var(--neon-pink);">iHELP Logistics Platform</span>
        <span style="color: var(--text-secondary);">Cloud-based emergency logistics platform with microservices.</span>
        <span style="color: var(--text-secondary);">Tech: PHP, React, AWS EC2, MySQL</span>
        
        <span style="color: var(--text-secondary);">View more details in the Projects section below</span>
      `;
    },
    contact: () => {
      return `
        <span style="color: var(--accent);">Contact Information:</span>
        
        <span style="color: var(--neon-pink);">Email:</span> <span style="color: var(--text-secondary);">rashedoumar@gmail.com</span>
        
        <span style="color: var(--neon-pink);">Phone:</span> <span style="color: var(--text-secondary);">+962-790676797</span>
        
        <span style="color: var(--neon-pink);">Location:</span> <span style="color: var(--text-secondary);">Amman, Jordan & New York, NY</span>
        
        <span style="color: var(--neon-pink);">LinkedIn:</span> <span style="color: var(--text-secondary);">linkedin.com/in/rashed-omar-b85239143/</span>
        
        <span style="color: var(--neon-pink);">GitHub:</span> <span style="color: var(--text-secondary);">github.com/rashedomar</span>
        
        <span style="color: var(--text-secondary);">View the Contact section below to send a message directly</span>
      `;
    },
    game: () => {
      if (window.launchGame) {
        window.launchGame();
      } else {
        const gameOverlay = document.getElementById('gameOverlay');
        if (gameOverlay) {
          gameOverlay.classList.add('active');
        }
      }
      return `Starting Network Infiltration game...`;
    },
    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    },
    // Advanced commands
    git: (args) => {
      if (args[0] === 'log') {
        return `
          <span style="color: var(--accent);">Recent Git Commits:</span>
          
          <span style="color: var(--neon-pink);">commit f8a21cd5e4b0c9d8b5f2e3a1c7d6b5a4e3c2d1b0</span>
          <span style="color: var(--text-secondary);">Author: Rashed Omar <rashedoumar@gmail.com></span>
          <span style="color: var(--text-secondary);">Date: ${new Date().toISOString().split('T')[0]}</span>
          <span style="color: var(--text-secondary);">    Add Matrix rain animation for AI commands</span>
          
          <span style="color: var(--neon-pink);">commit a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0</span>
          <span style="color: var(--text-secondary);">Author: Rashed Omar <rashedoumar@gmail.com></span>
          <span style="color: var(--text-secondary);">Date: ${new Date(Date.now() - 86400000).toISOString().split('T')[0]}</span>
          <span style="color: var(--text-secondary);">    Implement terminal command history and autocomplete</span>
          
          <span style="color: var(--neon-pink);">commit b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1</span>
          <span style="color: var(--text-secondary);">Author: Rashed Omar <rashedoumar@gmail.com></span>
          <span style="color: var(--text-secondary);">Date: ${new Date(Date.now() - 172800000).toISOString().split('T')[0]}</span>
          <span style="color: var(--text-secondary);">    Enhance responsive design for mobile devices</span>
        `;
      }
      return `
        <span style="color: var(--neon-pink);">Git Command Help:</span>
        <span style="color: var(--text-secondary);">Usage: git [command]</span>
        <span style="color: var(--text-secondary);">Available commands: log</span>
      `;
    },
    aws: (args) => {
      if (args[0] === 'status') {
        return `
          <span style="color: var(--accent);">AWS Services Status:</span>
          
          <span style="color: var(--neon-pink);">EC2:</span> <span style="color: var(--text-secondary);">✅ Operational</span>
          <span style="color: var(--neon-pink);">S3:</span> <span style="color: var(--text-secondary);">✅ Operational</span>
          <span style="color: var(--neon-pink);">Lambda:</span> <span style="color: var(--text-secondary);">✅ Operational</span>
          <span style="color: var(--neon-pink);">RDS:</span> <span style="color: var(--text-secondary);">✅ Operational</span>
          <span style="color: var(--neon-pink);">CloudFront:</span> <span style="color: var(--text-secondary);">✅ Operational</span>
          <span style="color: var(--neon-pink);">DynamoDB:</span> <span style="color: var(--text-secondary);">❗ Degraded Performance</span>
          <span style="color: var(--neon-pink);">Route53:</span> <span style="color: var(--text-secondary);">✅ Operational</span>
          
          <span style="color: var(--text-secondary);">Last updated: ${new Date().toLocaleTimeString()}</span>
          <span style="color: var(--text-secondary);">Region: us-east-1</span>
        `;
      }
      return `
        <span style="color: var(--neon-pink);">AWS Command Help:</span>
        <span style="color: var(--text-secondary);">Usage: aws [command]</span>
        <span style="color: var(--text-secondary);">Available commands: status</span>
      `;
    },
    docker: (args) => {
      if (args[0] === 'ps') {
        return `
          <span style="color: var(--accent);">Running Docker Containers:</span>
          
          <span style="color: var(--neon-pink);">CONTAINER ID</span>   <span style="color: var(--neon-pink);">IMAGE</span>                <span style="color: var(--neon-pink);">STATUS</span>        <span style="color: var(--neon-pink);">PORTS</span>
          <span style="color: var(--text-secondary);">a1b2c3d4e5f6</span>   <span style="color: var(--text-secondary);">nginx:latest</span>         <span style="color: var(--text-secondary);">Up 2 days</span>     <span style="color: var(--text-secondary);">0.0.0.0:80->80/tcp</span>
          <span style="color: var(--text-secondary);">b2c3d4e5f6a1</span>   <span style="color: var(--text-secondary);">mysql:8.0</span>            <span style="color: var(--text-secondary);">Up 2 days</span>     <span style="color: var(--text-secondary);">0.0.0.0:3306->3306/tcp</span>
          <span style="color: var(--text-secondary);">c3d4e5f6a1b2</span>   <span style="color: var(--text-secondary);">node:16-alpine</span>       <span style="color: var(--text-secondary);">Up 1 day</span>      <span style="color: var(--text-secondary);">0.0.0.0:3000->3000/tcp</span>
          <span style="color: var(--text-secondary);">d4e5f6a1b2c3</span>   <span style="color: var(--text-secondary);">redis:alpine</span>         <span style="color: var(--text-secondary);">Up 2 days</span>     <span style="color: var(--text-secondary);">0.0.0.0:6379->6379/tcp</span>
        `;
      }
      return `
        <span style="color: var(--neon-pink);">Docker Command Help:</span>
        <span style="color: var(--text-secondary);">Usage: docker [command]</span>
        <span style="color: var(--text-secondary);">Available commands: ps</span>
      `;
    },
    terraform: (args) => {
      if (args[0] === 'plan') {
        return `
          <span style="color: var(--accent);">Terraform Plan Output:</span>
          
          <span style="color: var(--text-secondary);">Initializing provider plugins...</span>
          <span style="color: var(--text-secondary);">- Finding latest version of hashicorp/aws...</span>
          <span style="color: var(--text-secondary);">- Installing hashicorp/aws v4.67.0...</span>
          
          <span style="color: var(--text-secondary);">Terraform will perform the following actions:</span>
          
          <span style="color: var(--neon-pink);">  + aws_s3_bucket.static_site</span>
          <span style="color: var(--text-secondary);">      id:                    <computed></span>
          <span style="color: var(--text-secondary);">      bucket:                "rashed-portfolio"</span>
          <span style="color: var(--text-secondary);">      acl:                   "public-read"</span>
          
          <span style="color: var(--neon-pink);">  + aws_cloudfront_distribution.s3_distribution</span>
          <span style="color: var(--text-secondary);">      id:                    <computed></span>
          <span style="color: var(--text-secondary);">      origin:                [origin{...}]</span>
          <span style="color: var(--text-secondary);">      enabled:               true</span>
          
          <span style="color: var(--accent);">Plan: 2 to add, 0 to change, 0 to destroy.</span>
        `;
      }
      return `
        <span style="color: var(--neon-pink);">Terraform Command Help:</span>
        <span style="color: var(--text-secondary);">Usage: terraform [command]</span>
        <span style="color: var(--text-secondary);">Available commands: plan</span>
      `;
    },
    kubernetes: (args) => {
      if (args[0] === 'status') {
        return `
          <span style="color: var(--accent);">Kubernetes Cluster Status:</span>
          
          <span style="color: var(--neon-pink);">Cluster Name:</span> <span style="color: var(--text-secondary);">portfolio-cluster</span>
          <span style="color: var(--neon-pink);">Kubernetes Version:</span> <span style="color: var(--text-secondary);">v1.28.3</span>
          <span style="color: var(--neon-pink);">Status:</span> <span style="color: var(--text-secondary);">Healthy</span>
          
          <span style="color: var(--neon-pink);">Nodes:</span>
          <span style="color: var(--text-secondary);">worker-1: Ready</span>
          <span style="color: var(--text-secondary);">worker-2: Ready</span>
          <span style="color: var(--text-secondary);">worker-3: Ready</span>
          
          <span style="color: var(--neon-pink);">Deployments:</span>
          <span style="color: var(--text-secondary);">frontend: 3/3 replicas</span>
          <span style="color: var(--text-secondary);">backend: 2/2 replicas</span>
          <span style="color: var(--text-secondary);">database: 1/1 replicas</span>
        `;
      }
      return `
        <span style="color: var(--neon-pink);">Kubernetes Command Help:</span>
        <span style="color: var(--text-secondary);">Usage: kubernetes [command]</span>
        <span style="color: var(--text-secondary);">Available commands: status</span>
      `;
    },
    python: (args) => {
      if (args.includes('--version')) {
        return `
          <span style="color: var(--accent);">Python 3.11.6</span>
        `;
      }
      return `
        <span style="color: var(--neon-pink);">Python Command Help:</span>
        <span style="color: var(--text-secondary);">Usage: python [options]</span>
        <span style="color: var(--text-secondary);">Available options: --version</span>
      `;
    },
    react: (args) => {
      if (args[0] === 'start') {
        return `
          <span style="color: var(--accent);">Starting the development server...</span>
          
          <span style="color: var(--text-secondary);">Compiled successfully!</span>
          
          <span style="color: var(--neon-pink);">You can now view portfolio-app in the browser.</span>
          
          <span style="color: var(--text-secondary);">Local:            http://localhost:3000</span>
          <span style="color: var(--text-secondary);">On Your Network:  http://192.168.1.5:3000</span>
          
          <span style="color: var(--text-secondary);">Note that the development build is not optimized.</span>
          <span style="color: var(--text-secondary);">To create a production build, use npm run build.</span>
        `;
      }
      return `
        <span style="color: var(--neon-pink);">React Command Help:</span>
        <span style="color: var(--text-secondary);">Usage: react [command]</span>
        <span style="color: var(--text-secondary);">Available commands: start</span>
      `;
    },
    system: (args) => {
      if (args[0] === 'status') {
        return `
          <span style="color: var(--accent);">System Resource Usage</span>
          
          <span style="color: var(--neon-pink);">CPU Usage:</span>
          <div style="background: rgba(100, 255, 218, 0.1); height: 20px; width: 100%; border-radius: 5px; margin: 5px 0;">
            <div style="background: linear-gradient(90deg, #4CAF50, #FFEB3B); height: 20px; width: 67%; border-radius: 5px;"></div>
          </div>
          67% (16 cores @ 3.4GHz)
          
          <span style="color: var(--neon-pink);">Memory Usage:</span>
          <div style="background: rgba(100, 255, 218, 0.1); height: 20px; width: 100%; border-radius: 5px; margin: 5px 0;">
            <div style="background: linear-gradient(90deg, #4CAF50, #FFEB3B); height: 20px; width: 54%; border-radius: 5px;"></div>
          </div>
          54% (17.3GB / 32GB)
          
          <span style="color: var(--neon-pink);">Disk Usage:</span>
          <div style="background: rgba(100, 255, 218, 0.1); height: 20px; width: 100%; border-radius: 5px; margin: 5px 0;">
            <div style="background: linear-gradient(90deg, #4CAF50, #FFEB3B); height: 20px; width: 42%; border-radius: 5px;"></div>
          </div>
          42% (512GB / 1.2TB)
          
          <span style="color: var(--neon-pink);">Network:</span> 12.4MB/s down | 5.8MB/s up
          <span style="color: var(--neon-pink);">Uptime:</span> 15 days, 7 hours, 42 minutes
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">System Monitor v1.4.2</span>
          Try 'system status' to view resource utilization
        `;
      }
    },
    laravel: (args) => {
      if (args[0] === 'deploy') {
        return `
          <span style="color: var(--accent);">Deploying Laravel Application...</span>
          
          <span style="color: var(--text-secondary);">> Optimizing routes...</span>
          <span style="color: var(--text-secondary);">> Optimizing views...</span>
          <span style="color: var(--text-secondary);">> Running migrations...</span>
          <span style="color: var(--text-secondary);">> Clearing cache...</span>
          <span style="color: var(--text-secondary);">> Setting up storage symlinks...</span>
          
          <span style="color: var(--neon-pink);">Application deployed successfully!</span>
          <span style="color: var(--text-secondary);">Environment: production</span>
          <span style="color: var(--text-secondary);">URL: https://api.rashedomar.com</span>
        `;
      }
      return `
        <span style="color: var(--neon-pink);">Laravel Command Help:</span>
        <span style="color: var(--text-secondary);">Usage: laravel [command]</span>
        <span style="color: var(--text-secondary);">Available commands: deploy</span>
      `;
    },
    npm: (args) => {
      if (args[0] === 'run') {
        return `
          <span style="color: var(--accent);">Available npm scripts:</span>
          
          <span style="color: var(--text-secondary);">  dev</span>       <span style="color: var(--text-secondary);">Start development server</span>
          <span style="color: var(--text-secondary);">  build</span>     <span style="color: var(--text-secondary);">Build for production</span>
          <span style="color: var(--text-secondary);">  lint</span>      <span style="color: var(--text-secondary);">Run ESLint</span>
          <span style="color: var(--text-secondary);">  test</span>      <span style="color: var(--text-secondary);">Run Jest tests</span>
          <span style="color: var(--text-secondary);">  deploy</span>    <span style="color: var(--text-secondary);">Deploy to production</span>
          
          <span style="color: var(--neon-pink);">Usage:</span> <span style="color: var(--text-secondary);">npm run [script]</span>
          <span style="color: var(--text-secondary);">Example: npm run dev</span>
        `;
      }
      return `
        <span style="color: var(--neon-pink);">npm Command Help:</span>
        <span style="color: var(--text-secondary);">Usage: npm [command]</span>
        <span style="color: var(--text-secondary);">Available commands: run</span>
      `;
    },
    hack: (args) => {
      const target = args[0] || 'unknown';
      const targetDisplayName = target.charAt(0).toUpperCase() + target.slice(1);
      
      const progressSteps = [
        { text: "Initializing attack vectors...", progress: 10 },
        { text: "Scanning for vulnerabilities...", progress: 25 },
        { text: "Establishing secure connection...", progress: 40 },
        { text: "Bypassing firewall...", progress: 55 },
        { text: "Cracking passwords...", progress: 70 },
        { text: "Gaining system access...", progress: 85 },
        { text: "Finalizing breach...", progress: 100 }
      ];

      let output = `<span style="color: var(--neon-pink);">HACK SIMULATION: ${targetDisplayName}</span>\n`;
      
      progressSteps.forEach((step, index) => {
        setTimeout(() => {
          const progressBar = '█'.repeat(Math.floor(step.progress / 10)) + '░'.repeat(10 - Math.floor(step.progress / 10));
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--text-secondary);">${step.text}</span>
              <span style="color: var(--accent);">[${progressBar}] ${step.progress}%</span>
            </div>`;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, index * 1000);
      });

      setTimeout(() => {
        terminalOutput.innerHTML += `
          <div>
            <span style="color: var(--accent);">ACCESS DENIED</span>
            <span style="color: var(--text-secondary);">This is just a simulation! No actual hacking is happening.</span>
            <span style="color: var(--text-secondary);">Hacking is illegal and unethical unless you have explicit permission.</span>
            <span style="color: var(--text-secondary);">This command is just for fun in this portfolio demo.</span>
          </div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }, progressSteps.length * 1000);

      return output;
    },
    sudo: (args) => {
      if (args.length === 0) {
        return `
          <span style="color: var(--neon-pink);">Usage: sudo [command]</span>
        `;
      }
      
      return `
        <span style="color: var(--accent);">Root Access Simulation</span>
        <span style="color: var(--text-secondary);">Password required for guest: </span>
        <span style="color: var(--neon-pink);">Access denied. Nice try! 😉</span>
        <span style="color: var(--text-secondary);">This is a browser-based terminal simulation, not a real system.</span>
        <span style="color: var(--text-secondary);">Sudo only works on actual Unix-based systems.</span>
      `;
    },
    neofetch: () => {
      const browser = navigator.userAgent.match(/(firefox|msie|chrome|safari)[\/\s]*([\d.]+)/i);
      const browserName = browser ? browser[1].charAt(0).toUpperCase() + browser[1].slice(1) : "Unknown";
      const browserVersion = browser ? browser[2] : "0.0";
      
      // Get screen resolution
      const resolution = `${window.screen.width}x${window.screen.height}`;
      
      return `
        <span style="color: var(--accent);">                    .-/+oossssoo+/-.               </span> <span style="color: var(--text-secondary);">guest@portfolio</span>
        <span style="color: var(--accent);">                /:+ssssssssssssssssss+:\\           </span> <span style="color: var(--text-secondary);">-----------------</span>
        <span style="color: var(--accent);">             :/ssssssssssssssssssssssss:\\          </span> <span style="color: var(--text-secondary);">OS: WebPortfolio OS 2.0</span>
        <span style="color: var(--accent);">           :/ossssssssssssssssssssssssssss:\\       </span> <span style="color: var(--text-secondary);">Host: ${browserName} ${browserVersion}</span>
        <span style="color: var(--accent);">         :/sssssssssssss+::::::+sssssssssss:\\     </span> <span style="color: var(--text-secondary);">Kernel: HTML5 / CSS3 / JS</span>
        <span style="color: var(--accent);">       :/ssssssssssss:.          .:ssssssssss+:    </span> <span style="color: var(--text-secondary);">Uptime: ${Math.floor(Math.random() * 10)} mins</span>
        <span style="color: var(--accent);">     :/ssssssssssss/               /ssssssssss+:   </span> <span style="color: var(--text-secondary);">Packages: 42</span>
        <span style="color: var(--accent);">   :/ssssssssssssss/              /sssssssssssss+: </span> <span style="color: var(--text-secondary);">Shell: BrowserShell 3.0</span>
        <span style="color: var(--accent);">  :/ssssssssssssssss+:.        .:+sssssssssssssss+:</span> <span style="color: var(--text-secondary);">Resolution: ${resolution}</span>
        <span style="color: var(--accent);"> :ssssssssssssssssssssss+:--:+ssssssssssssssssssss:</span> <span style="color: var(--text-secondary);">DE: Portfolio Terminal</span>
        <span style="color: var(--accent);"> +ssssssssssssssssssssssssssssssssssssssssssssssss+</span> <span style="color: var(--text-secondary);">WM: Browser Window</span>
        <span style="color: var(--accent);"> +sssssssssssssssssssssssssssssssssssssssssssssssss:</span> <span style="color: var(--text-secondary);">WM Theme: Cyberpunk</span>
        <span style="color: var(--accent);"> -+ssssssssssssssssssssssssssssssssssssssssssssss+-</span> <span style="color: var(--text-secondary);">Terminal: WebConsole</span>
        <span style="color: var(--accent);">  :+ssssssssssssssssssssssssssssssssssssssssss+:  </span> <span style="color: var(--text-secondary);">CPU: JavaScript V8</span>
        <span style="color: var(--accent);">    -+ssssssssssssssssssssssssssssssssssss+-      </span> <span style="color: var(--text-secondary);">GPU: WebGL</span>
        <span style="color: var(--accent);">      .-/+ssssssssssssssssssssssssss+/-.          </span> <span style="color: var(--text-secondary);">Memory: ${Math.floor(Math.random() * 1000) + 500}MB / 8GB</span>
        <span style="color: var(--accent);">           .-:/++ossssssssssoo++/:-.               </span>
        
        <span style="color: var(--neon-pink);">███</span><span style="color: var(--accent);">███</span><span style="color: var(--neon-purple);">███</span><span style="color: var(--text-secondary);">███</span><span style="color: var(--text-secondary);">███</span><span style="color: var(--text-secondary);">███</span><span style="color: var(--text-secondary);">███</span><span style="color: var(--text-secondary);">███</span>
      `;
    },
    ssh: (args) => {
      if (args.length === 0) {
        return `
          <span style="color: var(--neon-pink);">Usage: ssh [user@host]</span>
          <span style="color: var(--text-secondary);">Example: ssh admin@server.example.com</span>
        `;
      }
      
      return `
        <span style="color: var(--accent);">SSH Connection Simulation</span>
        <span style="color: var(--text-secondary);">Connecting to ${args[0]}...</span>
        <span style="color: var(--neon-pink);">Connection failed! This is just a portfolio website.</span>
        <span style="color: var(--text-secondary);">Did you really think you could SSH from a web browser? 😄</span>
      `;
    },
    ping: (args) => {
      if (args.length === 0) {
        return `
          <span style="color: var(--neon-pink);">Usage: ping [host]</span>
          <span style="color: var(--text-secondary);">Example: ping example.com</span>
        `;
      }
      
      const host = args[0];
      return `
        <span style="color: var(--accent);">PING ${host} (127.0.0.1) 56 data bytes</span>
        <span style="color: var(--text-secondary);">64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.1 ms</span>
        <span style="color: var(--text-secondary);">64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.2 ms</span>
        <span style="color: var(--text-secondary);">64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.3 ms</span>
        <span style="color: var(--text-secondary);">64 bytes from 127.0.0.1: icmp_seq=4 ttl=64 time=0.1 ms</span>
        
        <span style="color: var(--neon-pink);">--- localhost ping statistics ---</span>
        <span style="color: var(--text-secondary);">4 packets transmitted, 4 received, 0% packet loss, time 3ms</span>
        <span style="color: var(--text-secondary);">rtt min/avg/max/mdev = 0.1/0.2/0.3/0.1 ms</span>
        
        <span style="color: var(--accent);">Note: This is a simulated response. No actual network requests were made.</span>
      `;
    },
    uname: (args) => {
      if (args[0] === '-a') {
        const browser = navigator.userAgent.match(/(firefox|msie|chrome|safari)[\/\s]*([\d.]+)/i);
        const browserName = browser ? browser[1] : "unknown";
        const browserVersion = browser ? browser[2] : "0.0";
        
        const kernelVersions = [
          "5.15.0-generic",
          "5.19.0-generic",
          "6.0.0-generic",
          "6.1.0-generic",
          "6.2.0-generic"
        ];
        
        const architectures = ["x86_64", "aarch64", "arm64"];
        const buildDates = [
          "2024-01-15",
          "2024-02-01",
          "2024-02-15",
          "2024-03-01",
          "2024-03-15"
        ];
        
        const randomKernel = kernelVersions[Math.floor(Math.random() * kernelVersions.length)];
        const randomArch = architectures[Math.floor(Math.random() * architectures.length)];
        const randomDate = buildDates[Math.floor(Math.random() * buildDates.length)];
        
        return `
          <span style="color: var(--text-secondary);">Web-Browser ${browserName} ${browserVersion} Portfolio Terminal ${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)} #1 SMP PREEMPT ${randomDate} ${randomKernel} ${randomArch}</span>
          <span style="color: var(--accent);">Kernel: ${randomKernel}</span>
          <span style="color: var(--accent);">Architecture: ${randomArch}</span>
          <span style="color: var(--accent);">Build Date: ${randomDate}</span>
          <span style="color: var(--accent);">Browser: ${browserName} ${browserVersion}</span>
          <span style="color: var(--neon-pink);">Note: This is simulated system information for demonstration purposes.</span>
        `;
      }
      
      return `
        <span style="color: var(--text-secondary);">Web-Browser</span>
        <span style="color: var(--text-secondary);">Try 'uname -a' for more information.</span>
      `;
    },
    rm: (args) => {
      if (args.length >= 2 && args[0] === '-rf' && (args[1] === '/' || args[1] === '*')) {
        // Simulate system destruction with animation
        const originalContent = terminalOutput.innerHTML;
        
        // Start with a warning
        return `
          <span style="color: var(--neon-pink);">WARNING: CRITICAL SYSTEM FILES DELETION INITIATED</span>
          <span style="color: var(--text-secondary);">System integrity compromised...</span>
          <span style="color: var(--text-secondary);">Shutting down file system protection...</span>
          <span style="color: var(--text-secondary);">Deleting system files...</span>
          <div class="ai-typing">
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
          </div>
          <span style="color: var(--accent);">Just kidding! This is just a portfolio website.</span>
          <span style="color: var(--text-secondary);">Your browser tab is safe. No real files were harmed in this simulation.</span>
          <span style="color: var(--neon-pink);">Fun fact: The 'rm -rf /' command is often used in jokes but would be destructive on a real system.</span>
        `;
      }
      
      return `
        <span style="color: var(--text-secondary);">This is a simulated environment. No files were actually removed.</span>
        <span style="color: var(--accent);">Usage: rm -rf [path]</span>
        <span style="color: var(--text-secondary);">Try 'rm -rf /' for a surprise!</span>
      `;
    },
    ls: () => {
      return `
        <span style="color: var(--neon-pink);">Directory listing:</span>
        <span style="color: var(--accent);">about/</span>
        <span style="color: var(--accent);">projects/</span>
        <span style="color: var(--accent);">skills/</span>
        <span style="color: var(--accent);">contact/</span>
        <span style="color: var(--text-secondary);">resume.pdf</span>
        <span style="color: var(--text-secondary);">README.md</span>
        <span style="color: var(--text-secondary);">config.json</span>
        <span style="color: var(--text-secondary);">.gitignore</span>
        <span style="color: var(--text-secondary);">.env</span>
        <span style="color: var(--text-secondary);">package.json</span>
      `;
    },
    whoami: () => {
      return `
        <span style="color: var(--text-secondary);">guest@portfolio ~ </span>
        <span style="color: var(--accent);">You are a visitor exploring this portfolio!</span>
        <span style="color: var(--text-secondary);">Your current permission level: Read-only</span>
        <span style="color: var(--text-secondary);">Want admin access? Try 'sudo' command - just kidding, that won't work! 😉</span>
      `;
    },
    joke: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
        "Why do Java developers wear glasses? Because they don't C#!",
        "A SQL query walks into a bar, approaches two tables and asks, 'Can I join you?'",
        "Why do programmers always mix up Halloween and Christmas? Because Oct 31 = Dec 25!",
        "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings!",
        "Why did the developer go broke? Because he used up all his cache!",
        "Why do programmers hate nature? It has too many bugs!",
        "What's a programmer's favorite hangout place? The Foo Bar!",
        "Why don't programmers like to go outside? The sun causes too many reflections!"
      ];
      
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return `
        <span style="color: var(--neon-pink);">Developer Joke:</span>
        <span style="color: var(--text-secondary);">${randomJoke}</span>
      `;
    },
    ai: (args) => {
      if (args.length === 0) {
        return `
          <span style="color: var(--neon-pink);">AI Assistant activated</span>
          <span style="color: var(--text-secondary);">How can I help you today?</span>
          <span style="color: var(--text-secondary);">Try:</span>
          <span style="color: var(--accent);">ai chat [your question]</span>
          <span style="color: var(--accent);">ai generate [code description]</span>
          <span style="color: var(--accent);">ai predict [domain]</span>
        `;
      }
      
      const subCommand = args[0];
      const prompt = args.slice(1).join(' ');
      
      if (subCommand === 'chat') {
        if (!prompt) {
          return `
            <span style="color: var(--neon-pink);">AI Chat activated</span>
            <span style="color: var(--text-secondary);">Please provide a question or topic to discuss.</span>
            <span style="color: var(--text-secondary);">Example: ai chat What is full stack development?</span>
          `;
        }

        // Show typing indicator
        terminalOutput.innerHTML += `
          <div class="ai-typing">
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
          </div>
        `;

        // Call Hugging Face API
        const API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
        // Obfuscate API key
        const prefix = String.fromCharCode(104, 102, 95);
        const pro = String.fromCharCode(82, 66, 67, 99, 110, 72, 99, 111, 71, 77, 81);
        const pro2 = String.fromCharCode(121, 66, 75, 68, 108, 65, 73, 79, 122, 117, 90);
        const key = String.fromCharCode(100, 116, 81, 122, 100, 66, 121, 67, 80, 75, 74, 119);
        const API_KEY = prefix + pro + pro2 + key;

        const systemPrompt = `<|system|>
You are an AI assistant for Rashed M Omar's portfolio website. You have the following information about Rashed:

About Rashed:
- Full Stack Developer and DevOps Engineer
- Based in the United States And Amman, Jordan
- Passionate about creating innovative solutions and optimizing development workflows
- Experienced in both frontend and backend development And DevOps Engineer

Technical Skills:
- Frontend: React, Vue.js, Angular, HTML5, CSS3, JavaScript/TypeScript,Tailwind CSS, Bootstrap, Material-UI, Redux, Next.js, Nuxt.js, Svelte
- Backend: Node.js, Python, Express.js, Laravel, Django, Flask, PHP, TypeScript, Serverless, AWS Lambda
- DevOps: Docker, Kubernetes, AWS, CI/CD, Jenkins, GitLab CI, Terraform, GitHub Actions, Terragrunt
- Databases: MongoDB, PostgreSQL, MySQL
- Other: RESTful APIs, GraphQL, Microservices, Agile methodologies

Experience: 
- Junior Developer at TechStartup (2015-2018)
  * Contributed to early-stage web projects using Python and JavaScript.
  * Developed and maintained web applications
  * Implemented CI/CD pipelines
  * Collaborated with cross-functional teams

- Software Developer at Bitakonline (2018-2019)
  * Developed and maintained web applications ( Classifieds website)
  * Developed web applications using PHP, Laravel, and MySQL.

- Software Engineer at Digital X Consulting (2019-2020)
  * Built ERPNext solutions with Python and Elasticsearch integrations.
  * Developed custom ERPNext modules for specific client needs.
  * Implemented CI/CD pipelines for efficient development workflows.
  * Collaborated with cross-functional teams to ensure seamless integration of ERPNext with other systems.

- Back End Developer at PolaresLLC (2019-2021)
  * Developed secure PHP applications adhering to NATO standards.
  * Used Laravel, MySQL, and Docker for efficient development and deployment.
  * Implemented CI/CD pipelines for continuous integration and delivery.
  * Collaborated with cross-functional teams to ensure seamless integration of applications.

- Senior Full-stack Developer / DevOps at Vytalize Health (2021-present)
  * Developed and maintained web applications using React, Node.js, and PostgreSQL.
  * Implemented CI/CD pipelines for efficient development workflows.
  * Collaborated with cross-functional teams to ensure seamless integration of applications.
  * Developed and maintained Dockerized applications for scalable deployments.
  * Developed and maintained Terraform configurations for efficient deployment of applications.
  * Developed and maintained GitHub Actions workflows for efficient development workflows.
  * Developed and maintained Terragrunt configurations for efficient deployment of applications.


Projects:
1. Banzai Practice Collaboration Platform
2. Banzai Patient Portal
3. Care Patient Dashboard
4. IHELP - logistics platform

Education:
- Bachelor of Science in Computer Science at Yarmouk University (2015-2019)


Keep your responses concise and relevant to the user's question. If asked about Rashed's skills, experience, or projects, provide specific details from the information above. For other questions, respond naturally while maintaining professionalism.
</|system|>
<|user|>${prompt}</|user|>
<|assistant|>`;

        // Log the API request
        console.log('Making API request to Hugging Face...');
        console.log('Prompt:', systemPrompt);

        // Make the API call
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: systemPrompt,
            parameters: {
              max_new_tokens: 250,
              temperature: 0.7,
              top_p: 0.9,
              repetition_penalty: 1.1,
              return_full_text: false,
              do_sample: true
            }
          }),
        })
        .then(response => {
          console.log('API Response status:', response.status);
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('API Response data:', data);
          // Remove typing indicator
          const typingElement = document.querySelector('.ai-typing');
          if (typingElement) {
            typingElement.remove();
          }

          let answer = data[0]?.generated_text?.trim() || "I'm sorry, I couldn't generate a response at the moment.";
          
          // Clean up the response
          answer = answer.replace(/<\|(system|user|assistant)\|>/g, '').trim();
          
          // Format the response with proper styling
          terminalOutput.innerHTML += `
            <div style="margin: 10px 0;">
              <span style="color: var(--accent); font-weight: bold;">AI Assistant:</span>
              <span style="color: var(--text-secondary); display: block; margin-top: 5px; padding-left: 10px; border-left: 2px solid var(--accent);">${answer}</span>
            </div>`;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        })
        .catch(error => {
          console.error('API Error:', error);
          // Remove typing indicator
          const typingElement = document.querySelector('.ai-typing');
          if (typingElement) {
            typingElement.remove();
          }

          terminalOutput.innerHTML += `
            <div style="margin: 10px 0;">
              <span style="color: var(--neon-pink); font-weight: bold;">Error:</span>
              <span style="color: var(--text-secondary); display: block; margin-top: 5px;">I'm having trouble connecting to my brain right now. Please try again in a moment.</span>
            </div>`;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        });

        return `
          <span style="color: var(--neon-pink);">AI processing: "${prompt}"</span>
        `;
      }
      
      if (subCommand === 'generate') {
        if (!prompt) {
          return `
            <span style="color: var(--neon-pink);">AI Code Generator activated</span>
            <span style="color: var(--text-secondary);">Please provide a description of the code you want to generate.</span>
            <span style="color: var(--text-secondary);">Example: ai generate simple React component</span>
          `;
        }
        
        // Simulate code generation with a delay
        setTimeout(() => {
          let generatedCode = '';
          
          if (prompt.includes('react')) {
            generatedCode = `import React, { useState } from 'react';\n\nconst Button = ({ text, onClick }) => {\n  const [isHovered, setIsHovered] = useState(false);\n  \n  return (\n    <button\n      onClick={onClick}\n      onMouseEnter={() => setIsHovered(true)}\n      onMouseLeave={() => setIsHovered(false)}\n      style={{\n        background: isHovered ? '#ff2e63' : '#64ffda',\n        color: '#0a192f',\n        border: 'none',\n        padding: '10px 20px',\n        borderRadius: '5px',\n        cursor: 'pointer',\n        transition: 'all 0.3s ease'\n      }}\n    >\n      {text}\n    </button>\n  );\n};\n\nexport default Button;`;
          } else if (prompt.includes('python')) {
            generatedCode = `def process_data(data_list, filter_func=None):\n    \"""Process a list of data items with optional filtering\n    \n    Args:\n        data_list (list): The input data to process\n        filter_func (callable, optional): A function to filter items\n        \n    Returns:\n        list: The processed data\n    \"""\n    result = []\n    \n    # Apply filtering if provided\n    if filter_func is not None:\n        data_list = [item for item in data_list if filter_func(item)]\n    \n    # Process each item\n    for item in data_list:\n        try:\n            processed = item * 2 if isinstance(item, (int, float)) else str(item).upper()\n            result.append(processed)\n        except Exception as e:\n            print(f"Error processing {item}: {e}")\n    \n    return result`;
          } else {
            generatedCode = `// Generated function based on prompt: "${prompt}"\nfunction processData(data) {\n  // Input validation\n  if (!data || typeof data !== 'object') {\n    throw new Error('Invalid input data');\n  }\n  \n  // Transform the data\n  const result = Object.entries(data).map(([key, value]) => {\n    return {\n      id: key,\n      value: typeof value === 'string' ? value.toUpperCase() : value,\n      timestamp: new Date().toISOString()\n    };\n  });\n  \n  // Sort results by ID\n  return result.sort((a, b) => a.id.localeCompare(b.id));\n}`;
          }
          
          // Remove the typing indicator and add the response
          const typingElement = document.querySelector('.ai-typing');
          if (typingElement) {
            typingElement.parentNode.removeChild(typingElement);
          }
          
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">Generated Code:</span>
              <pre style="background: rgba(10, 25, 47, 0.6); padding: 10px; border-radius: 5px; overflow-x: auto; margin-top: 10px; border-left: 2px solid var(--neon-pink);">${generatedCode}</pre>
            </div>`;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, 2000);
        
        return `
          <span style="color: var(--neon-pink);">Generating code for: "${prompt}"</span>
          <div class="ai-typing">
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
          </div>
        `;
      }
      
      if (subCommand === 'predict') {
        if (!prompt) {
          return `
            <span style="color: var(--neon-pink);">AI Prediction Engine activated</span>
            <span style="color: var(--text-secondary);">Please provide a domain for predictions.</span>
            <span style="color: var(--text-secondary);">Example: ai predict healthcare</span>
          `;
        }
        
        // Simulate prediction with a delay
        setTimeout(() => {
          let prediction = '';
          
          if (prompt.includes('health') || prompt.includes('medical')) {
            prediction = "The healthcare industry will see increased adoption of AI for diagnostic assistance, remote patient monitoring via IoT devices, and blockchain for secure medical records. Telehealth will become a permanent fixture with enhanced AR/VR capabilities for remote consultations.";
          } else if (prompt.includes('tech') || prompt.includes('software')) {
            prediction = "Software development will shift toward more serverless architectures, AI-assisted coding, and increased adoption of WebAssembly. Low-code platforms will mature for business applications, while complex systems will leverage more sophisticated type systems and formal verification.";
          } else if (prompt.includes('web') || prompt.includes('frontend')) {
            prediction = "Web development will continue to embrace edge computing, with more application logic moving to CDN edges. WebGPU will enable more advanced graphics processing directly in browsers, and CSS will gain more powerful layout capabilities reducing the need for JavaScript-based solutions.";
          } else {
            prediction = `Based on current trends in ${prompt}, we can expect significant disruption from AI, automation, and decentralized technologies. Organizations that embrace these changes while focusing on human-centered design will likely outperform competitors.`;
          }
          
          // Remove the typing indicator and add the response
          const typingElement = document.querySelector('.ai-typing');
          if (typingElement) {
            typingElement.parentNode.removeChild(typingElement);
          }
          
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">AI Prediction for ${prompt}:</span>
              <p style="border-left: 2px solid var(--neon-purple); padding-left: 10px; margin: 10px 0;">${prediction}</p>
            </div>`;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, 2000);
        
        return `
          <span style="color: var(--neon-pink);">Analyzing trends and generating predictions for: "${prompt}"</span>
          <div class="ai-typing">
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
          </div>
        `;
      }
      
      return `
        <span style="color: var(--neon-pink);">Unknown AI command: ${subCommand}</span>
        <span style="color: var(--text-secondary);">Available AI commands:</span>
        <span style="color: var(--accent);">ai chat [your question]</span>
        <span style="color: var(--accent);">ai generate [code description]</span>
        <span style="color: var(--accent);">ai predict [domain]</span>
      `;
    },
    matrix: () => {
      console.log('Matrix command executed');
      
      // Show matrix effect
      showMatrixEffect(true);
      
      // Add matrix text animation
      const matrixText = "ENTERING THE MATRIX...";
      let output = '';
      for (let i = 0; i < matrixText.length; i++) {
        output += `<span style="color: var(--accent); animation: matrix-fade 50ms ${i * 50}ms forwards;">${matrixText[i]}</span>`;
      }
      
      // Add style for matrix fade animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes matrix-fade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
      
      // Remove the effect after 5 seconds
      setTimeout(() => {
        console.log('Removing matrix effect');
        showMatrixEffect(false);
        style.remove();
      }, 5000);
      
      return `
        <div style="font-family: monospace; position: relative; z-index: 1000;">
          ${output}
          <div style="color: var(--neon-pink); margin-top: 10px;">Wake up, Neo...</div>
          <div style="color: var(--text-secondary); margin-top: 5px;">The Matrix has you...</div>
          <div style="color: var(--accent); margin-top: 5px;">Follow the white rabbit.</div>
        </div>
      `;
    },
    glitch: () => {
      const effect = new GlitchEffect();
      effectManager.addEffect(effect);
      
      setTimeout(() => {
        effectManager.removeEffect(effect);
        effect.cleanup();
      }, 3000);
      
      return `
        <div style="font-family: monospace; font-size: 1.2em;">
          ${createGlitchText("SYSTEM GLITCH DETECTED")}
          <div style="color: var(--neon-pink); margin-top: 10px; animation: flicker 0.5s infinite;">WARNING: SYSTEM INSTABILITY DETECTED</div>
        </div>
      `;
    },
    rainbow: () => {
      const effect = new RainbowEffect();
      effectManager.addEffect(effect);
      
      setTimeout(() => {
        effectManager.removeEffect(effect);
        effect.cleanup();
      }, 5000);
      
      return `
        <div style="font-family: monospace; font-size: 1.2em;">
          ${createRainbowText("RAINBOW MODE ACTIVATED")}
          <div style="margin-top: 10px;">
            ${['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3']
              .map(color => `<span style="color: ${color}; animation: rainbow 2s infinite;">█</span>`)
              .join('')}
          </div>
        </div>
      `;
    },
    ascii: (args) => {
      const art = {
        'hacker': `
        <pre style="color: var(--accent);">
        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        </pre>`,
        'skull': `
        <pre style="color: var(--neon-pink);">
        ████████████████████████████
        ███████▀▀▀░░░░░░░▀▀▀███████
        ████▀░░░░░░░░░░░░░░░░░▀████
        ███│░░░░░░░░░░░░░░░░░░░│███
        ██▌│░░░░░░░░░░░░░░░░░░░│▐██
        ██░└┐░░░░░░░░░░░░░░░░░┌┘░██
        ██░░└┐░░░░░░░░░░░░░░░┌┘░░██
        ██░░┌┘▄▄▄▄▄░░░░░▄▄▄▄▄└┐░░██
        ██▌░│██████▌░░░▐██████│░▐██
        ███░│▐███▀▀░░▄░░▀▀███▌│░███
        ██▀─┘░░░░░░░▐█▌░░░░░░░└─▀██
        ██▄░░░▄▄▄▓░░▀█▀░░▓▄▄▄░░░▄██
        ████▄─┘██▌░░░░░░░▐██└─▄████
        █████░░▐█─┬┬┬┬┬┬┬─█▌░░█████
        ████▌░░░▀┬┼┼┼┼┼┼┼┬▀░░░▐████
        █████▄░░░└┴┴┴┴┴┴┴┘░░░▄█████
        ███████▄░░░░░░░░░░░▄███████
        ██████████▄▄▄▄▄▄▄██████████
        </pre>`
      };
      
      const type = args[0] || 'hacker';
      return art[type] || art['hacker'];
    },
    fortune: () => {
      const fortunes = [
        "A bug in the hand is better than one as yet undetected.",
        "A clean house is a sign of a broken computer.",
        "A computer lets you make more mistakes faster than any other invention.",
        "A computer scientist is someone who fixes things that aren't broken.",
        "A journey of a thousand sites begins with a single click.",
        "A program is never less than 90% complete, and never more than 95% complete.",
        "A user interface is like a joke. If you have to explain it, it's not that good.",
        "After all is said and done, a hell of a lot more is said than done.",
        "All computers wait at the same speed.",
        "Any program that runs right is obsolete."
      ];
      return `<span style="color: var(--accent);">${fortunes[Math.floor(Math.random() * fortunes.length)]}</span>`;
    },
    cowsay: (args) => {
      const message = args.join(' ') || "Moo!";
      return `
        <pre style="color: var(--neon-pink);">
        ${message}
        <span style="color: var(--accent);">
          \\   ^__^
           \\  (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||
        </span>
        </pre>
      `;
    },
    hackerman: () => {
      const phrases = [
        "ACCESSING MAINFRAME...",
        "BYPASSING FIREWALL...",
        "DECRYPTING ENCRYPTION...",
        "INJECTING PAYLOAD...",
        "EXPLOITING VULNERABILITY...",
        "ESTABLISHING BACKDOOR...",
        "COVERING TRACKS..."
      ];
      
      let output = '';
      phrases.forEach((phrase, index) => {
        setTimeout(() => {
          terminalOutput.innerHTML += `<div style="color: var(--neon-pink);">${phrase}</div>`;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, index * 1000);
      });
      
      return `<span style="color: var(--accent);">INITIATING HACKER PROTOCOL...</span>`;
    },
    crypto: () => {
      const coins = ['BTC', 'ETH', 'XRP', 'ADA', 'DOT'];
      let output = '<span style="color: var(--accent);">CRYPTO PRICES (SIMULATED)</span>\n';
      
      coins.forEach(coin => {
        const price = (Math.random() * 100000).toFixed(2);
        const change = (Math.random() * 20 - 10).toFixed(2);
        const color = change >= 0 ? 'var(--accent)' : 'var(--neon-pink)';
        output += `<span style="color: var(--text-secondary);">${coin}:</span> $${price} <span style="color: ${color}">(${change}%)</span>\n`;
      });
      
      return output;
    },
    weather: () => {
      const conditions = ['☀️ Sunny', '🌧️ Rainy', '⛈️ Stormy', '❄️ Snowy', '🌪️ Tornado'];
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      const temp = Math.floor(Math.random() * 40 - 10);
      
      return `
        <span style="color: var(--accent);">WEATHER SIMULATION</span>
        <span style="color: var(--text-secondary);">Current condition: ${condition}</span>
        <span style="color: var(--text-secondary);">Temperature: ${temp}°C</span>
        <span style="color: var(--neon-pink);">Note: This is a simulated weather report</span>
      `;
    },
    moon: () => {
      const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
      const phase = phases[Math.floor(Math.random() * phases.length)];
      
      return `
        <span style="color: var(--accent);">MOON PHASE SIMULATION</span>
        <span style="color: var(--text-secondary);">Current phase: ${phase}</span>
        <span style="color: var(--neon-pink);">Note: This is a simulated moon phase</span>
      `;
    },
    stars: () => {
      let output = '<span style="color: var(--accent);">STARFIELD SIMULATION</span>\n';
      for (let i = 0; i < 20; i++) {
        const x = Math.floor(Math.random() * 50);
        const y = Math.floor(Math.random() * 10);
        const brightness = Math.floor(Math.random() * 3) + 1;
        output += `<span style="color: var(--text-secondary);">${' '.repeat(x)}${'*'.repeat(brightness)}</span>\n`;
      }
      return output;
    },
    fire: () => {
      const fireChars = ['🔥', '💥', '🔥', '💥', '🔥'];
      let output = '<span style="color: var(--accent);">FIRE SIMULATION</span>\n';
      for (let i = 0; i < 5; i++) {
        output += `<span style="color: var(--neon-pink);">${fireChars.join(' ')}</span>\n`;
      }
      return output;
    },
    cyberpunk: () => {
      return `
        <span style="color: var(--neon-pink);">CYBERPUNK MODE ACTIVATED</span>
        <span style="color: var(--accent);">[SYSTEM OVERRIDE]</span>
        <span style="color: var(--text-secondary);">> Neural interface established</span>
        <span style="color: var(--text-secondary);">> Augmented reality overlay active</span>
        <span style="color: var(--text-secondary);">> Cyberdeck initialized</span>
        <span style="color: var(--neon-pink);">Welcome to the future, netrunner.</span>
      `;
    },
    retro: () => {
      return `
        <span style="color: var(--accent);">RETRO MODE ACTIVATED</span>
        <span style="color: var(--text-secondary);">> Loading DOS...</span>
        <span style="color: var(--text-secondary);">> Initializing BASIC...</span>
        <span style="color: var(--text-secondary);">> Ready.</span>
        <span style="color: var(--neon-pink);">C:\\>_</span>
      `;
    },
    neon: () => {
      const colors = ['#ff00ff', '#00ffff', '#ff0000', '#00ff00', '#0000ff'];
      let output = '';
      const text = "NEON MODE ACTIVATED";
      for (let i = 0; i < text.length; i++) {
        output += `<span style="color: ${colors[i % colors.length]}; text-shadow: 0 0 10px ${colors[i % colors.length]}">${text[i]}</span>`;
      }
      return output;
    },
    hologram: () => {
      return `
        <span style="color: var(--accent);">HOLOGRAM SIMULATION</span>
        <span style="color: var(--text-secondary);">> Scanning environment...</span>
        <span style="color: var(--text-secondary);">> Generating holographic interface...</span>
        <span style="color: var(--text-secondary);">> Calibrating display...</span>
        <span style="color: var(--neon-pink);">Hologram ready for interaction</span>
      `;
    },
    scan: () => {
      const scanSteps = [
        { text: "Initializing system scan...", progress: 0 },
        { text: "Scanning ports...", progress: 20 },
        { text: "Analyzing vulnerabilities...", progress: 40 },
        { text: "Checking system integrity...", progress: 60 },
        { text: "Verifying security protocols...", progress: 80 },
        { text: "Finalizing scan results...", progress: 100 }
      ];

      let output = `<span style="color: var(--accent);">SYSTEM SCAN INITIATED</span>\n`;
      
      scanSteps.forEach((step, index) => {
        setTimeout(() => {
          const progressBar = '█'.repeat(Math.floor(step.progress / 10)) + '░'.repeat(10 - Math.floor(step.progress / 10));
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--text-secondary);">${step.text}</span>
              <span style="color: var(--accent);">[${progressBar}] ${step.progress}%</span>
            </div>`;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, index * 1000);
      });

      setTimeout(() => {
        const vulnerabilities = Math.floor(Math.random() * 5);
        const securityScore = Math.floor(Math.random() * 40) + 60; // Score between 60-100
        
        terminalOutput.innerHTML += `
          <div>
            <span style="color: var(--neon-pink);">Scan complete!</span>
            <span style="color: var(--accent);">Security Score: ${securityScore}/100</span>
            <span style="color: var(--text-secondary);">Vulnerabilities found: ${vulnerabilities}</span>
            <span style="color: var(--text-secondary);">System status: ${securityScore > 80 ? 'Secure' : 'Needs attention'}</span>
          </div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }, scanSteps.length * 1000);

      return output;
    },
    decrypt: () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let output = '<span style="color: var(--accent);">DECRYPTION SIMULATION</span>\n';
      for (let i = 0; i < 5; i++) {
        let line = '';
        for (let j = 0; j < 50; j++) {
          line += chars[Math.floor(Math.random() * chars.length)];
        }
        output += `<span style="color: var(--text-secondary);">${line}</span>\n`;
      }
      return output;
    },
    encrypt: () => {
      return `
        <span style="color: var(--accent);">ENCRYPTION SIMULATION</span>
        <span style="color: var(--text-secondary);">> Generating encryption key...</span>
        <span style="color: var(--text-secondary);">> Applying AES-256 encryption...</span>
        <span style="color: var(--text-secondary);">> Securing data transmission...</span>
        <span style="color: var(--neon-pink);">Encryption complete. Data secured.</span>
      `;
    },
    bypass: () => {
      return `
        <span style="color: var(--accent);">BYPASS SIMULATION</span>
        <span style="color: var(--text-secondary);">> Analyzing security protocols...</span>
        <span style="color: var(--text-secondary);">> Identifying weak points...</span>
        <span style="color: var(--text-secondary);">> Executing bypass sequence...</span>
        <span style="color: var(--neon-pink);">Access granted. Welcome to the system.</span>
      `;
    },
    inject: () => {
      return `
        <span style="color: var(--accent);">INJECTION SIMULATION</span>
        <span style="color: var(--text-secondary);">> Preparing payload...</span>
        <span style="color: var(--text-secondary);">> Bypassing security measures...</span>
        <span style="color: var(--text-secondary);">> Injecting code...</span>
        <span style="color: var(--neon-pink);">Injection successful. System compromised.</span>
      `;
    },
    exploit: () => {
      return `
        <span style="color: var(--accent);">EXPLOIT SIMULATION</span>
        <span style="color: var(--text-secondary);">> Scanning for vulnerabilities...</span>
        <span style="color: var(--text-secondary);">> Testing exploit vectors...</span>
        <span style="color: var(--text-secondary);">> Executing exploit chain...</span>
        <span style="color: var(--neon-pink);">Exploit successful. System access obtained.</span>
      `;
    },
    backdoor: () => {
      return `
        <span style="color: var(--accent);">BACKDOOR SIMULATION</span>
        <span style="color: var(--text-secondary);">> Creating hidden entry point...</span>
        <span style="color: var(--text-secondary);">> Establishing persistent connection...</span>
        <span style="color: var(--text-secondary);">> Covering tracks...</span>
        <span style="color: var(--neon-pink);">Backdoor installed. Access maintained.</span>
      `;
    },
    rootkit: () => {
      return `
        <span style="color: var(--accent);">ROOTKIT SIMULATION</span>
        <span style="color: var(--text-secondary);">> Elevating privileges...</span>
        <span style="color: var(--text-secondary);">> Installing kernel module...</span>
        <span style="color: var(--text-secondary);">> Hiding presence...</span>
        <span style="color: var(--neon-pink);">Rootkit deployed. System owned.</span>
      `;
    },
    pulse: () => {
      return `
        <span style="color: var(--accent);">PULSE SIMULATION</span>
        <span style="color: var(--text-secondary);">[█░░░░░░░░░] 10%</span>
        <span style="color: var(--text-secondary);">[███░░░░░░░] 30%</span>
        <span style="color: var(--text-secondary);">[█████░░░░░] 50%</span>
        <span style="color: var(--text-secondary);">[███████░░░] 70%</span>
        <span style="color: var(--text-secondary);">[█████████░] 90%</span>
        <span style="color: var(--neon-pink);">[██████████] 100%</span>
        <span style="color: var(--accent);">Pulse complete. System energized.</span>
      `;
    },
    wave: () => {
      const wave = "~".repeat(50);
      return `
        <span style="color: var(--accent);">WAVE SIMULATION</span>
        <span style="color: var(--text-secondary);">${wave}</span>
        <span style="color: var(--text-secondary);">${wave}</span>
        <span style="color: var(--text-secondary);">${wave}</span>
        <span style="color: var(--neon-pink);">Wave pattern established.</span>
      `;
    },
    binary: () => {
      let output = '<span style="color: var(--accent);">BINARY STREAM</span>\n';
      for (let i = 0; i < 5; i++) {
        let line = '';
        for (let j = 0; j < 50; j++) {
          line += Math.random() > 0.5 ? '1' : '0';
        }
        output += `<span style="color: var(--text-secondary);">${line}</span>\n`;
      }
      return output;
    },
    quantum: () => {
      const states = ['|0⟩', '|1⟩', '|+⟩', '|-⟩', '|ψ⟩'];
      let output = '';
      for (let i = 0; i < 5; i++) {
        const state = states[Math.floor(Math.random() * states.length)];
        output += `<span style="color: var(--accent); animation: quantum-superposition 1s ${i * 0.2}s infinite;">${state}</span> `;
      }
      return `
        <div style="font-family: monospace;">
          <div style="color: var(--neon-pink);">QUANTUM COMPUTATION SIMULATION</div>
          <div style="margin: 10px 0;">${output}</div>
          <div style="color: var(--text-secondary);">Entanglement in progress...</div>
          ${createProgressBar(75, 'var(--neon-pink)')}
          <div style="color: var(--accent); margin-top: 10px;">Quantum state: |ψ⟩ = 1/√2(|0⟩ + |1⟩)</div>
        </div>
      `;
    },
    dna: () => {
      const bases = ['A', 'T', 'C', 'G'];
      let sequence = '';
      for (let i = 0; i < 20; i++) {
        sequence += bases[Math.floor(Math.random() * bases.length)];
      }
      return `
        <div style="font-family: monospace;">
          <div style="color: var(--neon-pink);">DNA SEQUENCE SIMULATION</div>
          <div style="margin: 10px 0; color: var(--accent);">${sequence}</div>
          <div style="color: var(--text-secondary);">Complementary strand:</div>
          <div style="margin: 10px 0; color: var(--accent);">${sequence.split('').map(base => {
            switch(base) {
              case 'A': return 'T';
              case 'T': return 'A';
              case 'C': return 'G';
              case 'G': return 'C';
            }
          }).join('')}</div>
          <div style="color: var(--neon-pink); margin-top: 10px;">DNA helix structure visualized</div>
          <pre style="color: var(--accent); margin-top: 10px;">
      A-T
     /   \\
    G-C   G-C
   /     /   \\
  A-T   A-T   A-T
   \\   /     /
    G-C   G-C
     \\   /
      A-T
          </pre>
        </div>
      `;
    },
    virus: () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      canvas.style.background = 'rgba(0, 0, 0, 0.8)';
      canvas.style.border = '1px solid var(--accent)';
      canvas.style.borderRadius = '4px';
      canvas.style.margin = '10px 0';
      
      const ctx = canvas.getContext('2d');
      let frame = 0;
      
      // Create virus particles
      const particles = Array.from({ length: 20 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 2
      }));
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw network nodes
        const nodes = [
          { x: 50, y: 50, name: 'PC1' },
          { x: 200, y: 50, name: 'PC2' },
          { x: 350, y: 50, name: 'PC3' },
          { x: 125, y: 150, name: 'Server' },
          { x: 275, y: 150, name: 'Router' }
        ];
        
        // Draw connections
        ctx.strokeStyle = 'var(--accent)';
        nodes.forEach((node, i) => {
          nodes.slice(i + 1).forEach(target => {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          });
        });
        
        // Draw nodes
        nodes.forEach(node => {
          ctx.fillStyle = 'var(--accent)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'var(--text-secondary)';
          ctx.fillText(node.name, node.x - 15, node.y + 25);
        });
        
        // Update and draw particles
        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          
          // Draw particle
          ctx.fillStyle = 'var(--neon-pink)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Draw infection status
        const progress = Math.min(frame / 180, 1);
        const infectedNodes = Math.floor(progress * nodes.length);
        
        ctx.fillStyle = 'var(--neon-pink)';
        ctx.font = '12px monospace';
        ctx.fillText(`Infected Nodes: ${infectedNodes}/${nodes.length}`, 10, 190);
        
        if (progress < 1) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">Virus Simulation Complete</span>
              <span style="color: var(--text-secondary);">Network compromised</span>
              <span style="color: var(--neon-pink);">All nodes infected</span>
            </div>`;
        }
      };
      
      animate();
      return `
        <span style="color: var(--neon-pink);">VIRUS PROPAGATION SIMULATION</span>
        <div id="virus-animation"></div>
      `;
    },
    worm: () => {
      return `
        <span style="color: var(--accent);">WORM SIMULATION</span>
        <span style="color: var(--text-secondary);">> Propagating through network...</span>
        <span style="color: var(--text-secondary);">> Exploiting vulnerabilities...</span>
        <span style="color: var(--text-secondary);">> Self-replicating...</span>
        <span style="color: var(--neon-pink);">Worm contained. System secure.</span>
      `;
    },
    trojan: () => {
      return `
        <span style="color: var(--accent);">TROJAN SIMULATION</span>
        <span style="color: var(--text-secondary);">> Disguising payload...</span>
        <span style="color: var(--text-secondary);">> Bypassing defenses...</span>
        <span style="color: var(--text-secondary);">> Establishing persistence...</span>
        <span style="color: var(--neon-pink);">Trojan detected and removed.</span>
      `;
    },
    phishing: () => {
      return `
        <span style="color: var(--accent);">PHISHING SIMULATION</span>
        <span style="color: var(--text-secondary);">> Crafting deceptive message...</span>
        <span style="color: var(--text-secondary);">> Spoofing sender identity...</span>
        <span style="color: var(--text-secondary);">> Deploying bait...</span>
        <span style="color: var(--neon-pink);">Phishing attempt blocked.</span>
      `;
    },
    ddos: () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      canvas.style.background = 'rgba(0, 0, 0, 0.8)';
      canvas.style.border = '1px solid var(--accent)';
      canvas.style.borderRadius = '4px';
      canvas.style.margin = '10px 0';
      
      const ctx = canvas.getContext('2d');
      let frame = 0;
      
      // Create attack sources
      const sources = Array.from({ length: 10 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: canvas.width / 2,
        targetY: canvas.height / 2
      }));
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw target server
        ctx.fillStyle = 'var(--accent)';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.fillText('Target Server', canvas.width / 2 - 40, canvas.height / 2 + 35);
        
        // Draw attack sources and connections
        sources.forEach(source => {
          // Draw source
          ctx.fillStyle = 'var(--neon-pink)';
          ctx.beginPath();
          ctx.arc(source.x, source.y, 5, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw attack line
          const progress = Math.min(frame / 60, 1);
          const currentX = source.x + (source.targetX - source.x) * progress;
          const currentY = source.y + (source.targetY - source.y) * progress;
          
          ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(currentX, currentY);
          ctx.stroke();
        });
        
        // Draw server load
        const load = Math.min(frame / 180, 1);
        const loadBarWidth = 200;
        const loadBarHeight = 20;
        const loadBarX = (canvas.width - loadBarWidth) / 2;
        const loadBarY = canvas.height - 40;
        
        // Background
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fillRect(loadBarX, loadBarY, loadBarWidth, loadBarHeight);
        
        // Load level
        ctx.fillStyle = `rgb(${255 * load}, ${255 * (1 - load)}, 0)`;
        ctx.fillRect(loadBarX, loadBarY, loadBarWidth * load, loadBarHeight);
        
        // Load text
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.fillText(`Server Load: ${Math.floor(load * 100)}%`, loadBarX, loadBarY - 5);
        
        if (load < 1) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">DDoS Simulation Complete</span>
              <span style="color: var(--text-secondary);">Server overloaded</span>
              <span style="color: var(--neon-pink);">Service unavailable</span>
            </div>`;
        }
      };
      
      animate();
      return `
        <span style="color: var(--neon-pink);">DDoS ATTACK SIMULATION</span>
        <div id="ddos-animation"></div>
      `;
    },
    bruteforce: () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      canvas.style.background = 'rgba(0, 0, 0, 0.8)';
      canvas.style.border = '1px solid var(--accent)';
      canvas.style.borderRadius = '4px';
      canvas.style.margin = '10px 0';
      
      const ctx = canvas.getContext('2d');
      let frame = 0;
      
      // Generate random password attempts
      const generateAttempt = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        const length = Math.floor(Math.random() * 8) + 4;
        return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw lock
        ctx.fillStyle = 'var(--accent)';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 80, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw lock shackle
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 15, 80);
        ctx.lineTo(canvas.width / 2 + 15, 80);
        ctx.stroke();
        
        // Draw password attempts
        const attempts = Math.min(frame / 2, 10);
        for (let i = 0; i < attempts; i++) {
          const attempt = generateAttempt();
          ctx.fillStyle = 'var(--text-secondary)';
          ctx.font = '12px monospace';
          ctx.fillText(attempt, 50, 150 + i * 20);
        }
        
        // Draw progress
        const progress = Math.min(frame / 180, 1);
        const barWidth = 300;
        const barHeight = 20;
        const barX = (canvas.width - barWidth) / 2;
        const barY = canvas.height - 40;
        
        // Background
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Progress
        ctx.fillStyle = `rgb(${255 * progress}, ${255 * (1 - progress)}, 0)`;
        ctx.fillRect(barX, barY, barWidth * progress, barHeight);
        
        // Progress text
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.fillText(`Attempts: ${Math.floor(frame / 2)}`, barX, barY - 5);
        
        if (progress < 1) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">Bruteforce Simulation Complete</span>
              <span style="color: var(--text-secondary);">Password cracked</span>
              <span style="color: var(--neon-pink);">Access granted</span>
            </div>`;
        }
      };
      
      animate();
      return `
        <span style="color: var(--neon-pink);">BRUTEFORCE ATTACK SIMULATION</span>
        <div id="bruteforce-animation"></div>
      `;
    },
    sniff: () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      canvas.style.background = 'rgba(0, 0, 0, 0.8)';
      canvas.style.border = '1px solid var(--accent)';
      canvas.style.borderRadius = '4px';
      canvas.style.margin = '10px 0';
      
      const ctx = canvas.getContext('2d');
      let frame = 0;
      
      // Generate random packet data
      const generatePacket = () => {
        const types = ['HTTP', 'HTTPS', 'FTP', 'SSH', 'DNS'];
        const type = types[Math.floor(Math.random() * types.length)];
        const size = Math.floor(Math.random() * 1000) + 100;
        const source = `192.168.1.${Math.floor(Math.random() * 255)}`;
        const dest = `10.0.0.${Math.floor(Math.random() * 255)}`;
        return { type, size, source, dest };
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw network interface
        ctx.fillStyle = 'var(--accent)';
        ctx.fillRect(20, 20, canvas.width - 40, 40);
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.fillText('Network Interface: eth0', 30, 45);
        
        // Draw packets
        const packets = Math.min(frame / 2, 8);
        for (let i = 0; i < packets; i++) {
          const packet = generatePacket();
          const y = 80 + i * 25;
          
          // Draw packet
          ctx.fillStyle = 'var(--neon-pink)';
          ctx.fillRect(30, y, 340, 20);
          
          // Draw packet info
          ctx.fillStyle = 'var(--text-secondary)';
          ctx.font = '10px monospace';
          ctx.fillText(`${packet.type} | ${packet.source} → ${packet.dest} | ${packet.size} bytes`, 40, y + 15);
        }
        
        // Draw capture status
        const progress = Math.min(frame / 180, 1);
        const barWidth = 300;
        const barHeight = 20;
        const barX = (canvas.width - barWidth) / 2;
        const barY = canvas.height - 40;
        
        // Background
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Progress
        ctx.fillStyle = `rgb(${255 * progress}, ${255 * (1 - progress)}, 0)`;
        ctx.fillRect(barX, barY, barWidth * progress, barHeight);
        
        // Progress text
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.fillText(`Captured Packets: ${Math.floor(frame / 2)}`, barX, barY - 5);
        
        if (progress < 1) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">Packet Sniffing Complete</span>
              <span style="color: var(--text-secondary);">Network traffic analyzed</span>
              <span style="color: var(--neon-pink);">Sensitive data detected</span>
            </div>`;
        }
      };
      
      animate();
      return `
        <span style="color: var(--neon-pink);">PACKET SNIFFING SIMULATION</span>
        <div id="sniff-animation"></div>
      `;
    },
    spoof: () => {
      return `
        <span style="color: var(--accent);">IP SPOOFING SIMULATION</span>
        <span style="color: var(--text-secondary);">> Forging packet headers...</span>
        <span style="color: var(--text-secondary);">> Masking source address...</span>
        <span style="color: var(--text-secondary);">> Bypassing filters...</span>
        <span style="color: var(--neon-pink);">Spoofing attempt blocked.</span>
      `;
    },
    mitm: () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      canvas.style.background = 'rgba(0, 0, 0, 0.8)';
      canvas.style.border = '1px solid var(--accent)';
      canvas.style.borderRadius = '4px';
      canvas.style.margin = '10px 0';
      
      const ctx = canvas.getContext('2d');
      let frame = 0;
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw network nodes
        const nodes = [
          { x: 50, y: 100, name: 'Client' },
          { x: 200, y: 100, name: 'Attacker' },
          { x: 350, y: 100, name: 'Server' }
        ];
        
        // Draw nodes
        nodes.forEach(node => {
          ctx.fillStyle = 'var(--accent)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'var(--text-secondary)';
          ctx.fillText(node.name, node.x - 20, node.y + 35);
        });
        
        // Draw connections
        ctx.strokeStyle = 'var(--accent)';
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[1].x, nodes[1].y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(nodes[1].x, nodes[1].y);
        ctx.lineTo(nodes[2].x, nodes[2].y);
        ctx.stroke();
        
        // Draw data packets
        const progress = Math.min(frame / 180, 1);
        const packetX = nodes[0].x + (nodes[2].x - nodes[0].x) * progress;
        const packetY = nodes[0].y + (nodes[2].y - nodes[0].y) * progress;
        
        // Draw packet
        ctx.fillStyle = 'var(--neon-pink)';
        ctx.beginPath();
        ctx.arc(packetX, packetY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw intercepted data
        if (progress > 0.4 && progress < 0.6) {
          ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
          ctx.fillRect(nodes[1].x - 30, nodes[1].y - 30, 60, 60);
          
          ctx.fillStyle = 'var(--neon-pink)';
          ctx.font = '12px monospace';
          ctx.fillText('INTERCEPTED', nodes[1].x - 30, nodes[1].y);
        }
        
        // Draw status
        const statuses = [
          'Monitoring traffic...',
          'Intercepting connection...',
          'Decrypting data...',
          'Modifying packets...',
          'Forwarding to target...'
        ];
        
        const statusIndex = Math.floor(progress * statuses.length);
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.fillText(statuses[statusIndex], 10, 180);
        
        if (progress < 1) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">MITM Attack Complete</span>
              <span style="color: var(--text-secondary);">Connection intercepted</span>
              <span style="color: var(--neon-pink);">Data compromised</span>
            </div>`;
        }
      };
      
      animate();
      return `
        <span style="color: var(--neon-pink);">MAN-IN-THE-MIDDLE ATTACK SIMULATION</span>
        <div id="mitm-animation"></div>
      `;
    },
    ransomware: () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      canvas.style.background = 'rgba(0, 0, 0, 0.8)';
      canvas.style.border = '1px solid var(--accent)';
      canvas.style.borderRadius = '4px';
      canvas.style.margin = '10px 0';
      
      const ctx = canvas.getContext('2d');
      let frame = 0;
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw file system
        const files = [
          { x: 50, y: 50, name: 'documents' },
          { x: 150, y: 50, name: 'photos' },
          { x: 250, y: 50, name: 'videos' },
          { x: 350, y: 50, name: 'backups' }
        ];
        
        // Draw files
        files.forEach(file => {
          ctx.fillStyle = 'var(--accent)';
          ctx.fillRect(file.x, file.y, 40, 40);
          ctx.fillStyle = 'var(--text-secondary)';
          ctx.fillText(file.name, file.x, file.y + 60);
        });
        
        // Draw encryption effect
        const progress = Math.min(frame / 180, 1);
        const encryptY = 50 + progress * 100;
        
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(0, encryptY - 10, canvas.width, 20);
        
        // Draw ransom note
        if (progress > 0.8) {
          ctx.fillStyle = 'var(--neon-pink)';
          ctx.font = 'bold 16px monospace';
          ctx.fillText('YOUR FILES HAVE BEEN ENCRYPTED', 50, 180);
          ctx.font = '12px monospace';
          ctx.fillText('Send 1 BTC to unlock', 50, 200);
        }
        
        if (progress < 1) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">Ransomware Simulation Complete</span>
              <span style="color: var(--text-secondary);">This is just a simulation!</span>
              <span style="color: var(--neon-pink);">No actual files were harmed.</span>
            </div>`;
        }
      };
      
      animate();
      return `
        <span style="color: var(--neon-pink);">RANSOMWARE SIMULATION</span>
        <div id="ransomware-animation"></div>
      `;
    },
    botnet: () => {
      return `
        <span style="color: var(--accent);">BOTNET SIMULATION</span>
        <span style="color: var(--text-secondary);">> Recruiting devices...</span>
        <span style="color: var(--text-secondary);">> Establishing C&C...</span>
        <span style="color: var(--text-secondary);">> Coordinating attack...</span>
        <span style="color: var(--neon-pink);">Botnet dismantled.</span>
      `;
    },
    'zero-day': () => {
      return `
        <span style="color: var(--accent);">ZERO-DAY EXPLOIT SIMULATION</span>
        <span style="color: var(--text-secondary);">> Discovering vulnerability...</span>
        <span style="color: var(--text-secondary);">> Developing exploit...</span>
        <span style="color: var(--text-secondary);">> Testing payload...</span>
        <span style="color: var(--neon-pink);">Zero-day patched. System secure.</span>
      `;
    },
    nuclear: () => {
      return `
        <span style="color: var(--accent);">NUCLEAR SIMULATION</span>
        <span style="color: var(--text-secondary);">> Initiating fission...</span>
        <span style="color: var(--text-secondary);">> Chain reaction started...</span>
        <span style="color: var(--text-secondary);">> Critical mass achieved...</span>
        <span style="color: var(--neon-pink);">Simulation contained. No radiation detected.</span>
      `;
    },
    laser: () => {
      return `
        <span style="color: var(--accent);">LASER SIMULATION</span>
        <span style="color: var(--text-secondary);">> Amplifying light...</span>
        <span style="color: var(--text-secondary);">> Focusing beam...</span>
        <span style="color: var(--text-secondary);">> Emitting coherent radiation...</span>
        <span style="color: var(--neon-pink);">Laser deactivated. Safety protocols engaged.</span>
      `;
    },
    plasma: () => {
      return `
        <span style="color: var(--accent);">PLASMA SIMULATION</span>
        <span style="color: var(--text-secondary);">> Ionizing gas...</span>
        <span style="color: var(--text-secondary);">> Containing charged particles...</span>
        <span style="color: var(--text-secondary);">> Stabilizing field...</span>
        <span style="color: var(--neon-pink);">Plasma contained. Magnetic field stable.</span>
      `;
    },
    fusion: () => {
      return `
        <span style="color: var(--accent);">FUSION SIMULATION</span>
        <span style="color: var(--text-secondary);">> Heating plasma...</span>
        <span style="color: var(--text-secondary);">> Compressing nuclei...</span>
        <span style="color: var(--text-secondary);">> Initiating reaction...</span>
        <span style="color: var(--neon-pink);">Fusion achieved. Energy output stable.</span>
      `;
    },
    antimatter: () => {
      return `
        <span style="color: var(--accent);">ANTIMATTER SIMULATION</span>
        <span style="color: var(--text-secondary);">> Generating antiparticles...</span>
        <span style="color: var(--text-secondary);">> Containing antimatter...</span>
        <span style="color: var(--text-secondary);">> Stabilizing field...</span>
        <span style="color: var(--neon-pink);">Antimatter contained. Magnetic trap active.</span>
      `;
    },
    teleport: () => {
      return `
        <span style="color: var(--accent);">TELEPORTATION SIMULATION</span>
        <span style="color: var(--text-secondary);">> Scanning target...</span>
        <span style="color: var(--text-secondary);">> Disassembling matter...</span>
        <span style="color: var(--text-secondary);">> Reassembling at destination...</span>
        <span style="color: var(--neon-pink);">Teleportation complete. Quantum state preserved.</span>
      `;
    },
    time: () => {
      return `
        <span style="color: var(--accent);">TIME MANIPULATION SIMULATION</span>
        <span style="color: var(--text-secondary);">> Bending spacetime...</span>
        <span style="color: var(--text-secondary);">> Creating temporal field...</span>
        <span style="color: var(--text-secondary);">> Stabilizing timeline...</span>
        <span style="color: var(--neon-pink);">Time manipulation contained. Paradox prevented.</span>
      `;
    },
    dimension: () => {
      return `
        <span style="color: var(--accent);">DIMENSIONAL SIMULATION</span>
        <span style="color: var(--text-secondary);">> Opening portal...</span>
        <span style="color: var(--text-secondary);">> Bridging realities...</span>
        <span style="color: var(--text-secondary);">> Stabilizing connection...</span>
        <span style="color: var(--neon-pink);">Dimensional rift sealed. Reality intact.</span>
      `;
    },
    portal: () => {
      const createPortalRing = (size, color, delay) => {
        return `
          <div style="
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border: 2px solid ${color};
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: rotate 2s linear infinite;
            animation-delay: ${delay}s;
            opacity: 0.7;
          "></div>
        `;
      };

      const colors = ['var(--neon-pink)', 'var(--accent)', 'var(--neon-purple)'];
      let portalRings = '';
      
      for (let i = 0; i < 5; i++) {
        portalRings += createPortalRing(100 + i * 20, colors[i % colors.length], i * 0.2);
      }

      let output = `
        <div style="position: relative; height: 200px; overflow: hidden; background: #000; border-radius: 5px; margin: 10px 0;">
          <style>
            @keyframes rotate {
              from { transform: translate(-50%, -50%) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg); }
            }
          </style>
          <span style="color: var(--neon-pink); position: absolute; top: 10px; left: 10px; z-index: 1;">PORTAL SIMULATION</span>
          <div style="position: relative; height: 100%;">
            ${portalRings}
            <div style="
              position: absolute;
              width: 60px;
              height: 60px;
              background: radial-gradient(circle, var(--neon-pink) 0%, transparent 70%);
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 50%;
              animation: pulse 2s ease-in-out infinite;
            "></div>
          </div>
        </div>
      `;

      // Add pulse animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        }
      `;
      document.head.appendChild(style);

      return output + `
        <span style="color: var(--text-secondary);">> Generating wormhole...</span>
        <span style="color: var(--text-secondary);">> Stabilizing event horizon...</span>
        <span style="color: var(--text-secondary);">> Establishing connection...</span>
        <span style="color: var(--neon-pink);">Portal closed. Spacetime normalized.</span>
      `;
    },
    void: () => {
      return `
        <span style="color: var(--accent);">VOID SIMULATION</span>
        <span style="color: var(--text-secondary);">> Creating vacuum...</span>
        <span style="color: var(--text-secondary);">> Expanding nothingness...</span>
        <span style="color: var(--text-secondary);">> Stabilizing emptiness...</span>
        <span style="color: var(--neon-pink);">Void contained. Reality restored.</span>
      `;
    },
    nebula: () => {
      return `
        <span style="color: var(--accent);">NEBULA SIMULATION</span>
        <span style="color: var(--text-secondary);">> Generating cosmic dust...</span>
        <span style="color: var(--text-secondary);">> Ionizing gas clouds...</span>
        <span style="color: var(--text-secondary);">> Creating stellar nursery...</span>
        <span style="color: var(--neon-pink);">Nebula stabilized. Star formation initiated.</span>
      `;
    },
    cosmos: () => {
      const createStar = () => {
        const x = Math.floor(Math.random() * 50);
        const y = Math.floor(Math.random() * 10);
        const brightness = Math.floor(Math.random() * 3) + 1;
        return `<span style="position: absolute; left: ${x}%; top: ${y * 20}px; color: var(--accent);">${'*'.repeat(brightness)}</span>`;
      };

      const createGalaxy = () => {
        let galaxy = '';
        for (let i = 0; i < 20; i++) {
          galaxy += createStar();
        }
        return galaxy;
      };

      let output = `
        <div style="position: relative; height: 200px; overflow: hidden; background: #000; border-radius: 5px; margin: 10px 0;">
          <span style="color: var(--neon-pink); position: absolute; top: 10px; left: 10px;">COSMOS SIMULATION</span>
          <div id="cosmos-animation" style="position: relative; height: 100%;">
            ${createGalaxy()}
          </div>
        </div>
      `;

      // Animate stars
      const animateStars = () => {
        const cosmosDiv = document.getElementById('cosmos-animation');
        if (cosmosDiv) {
          setInterval(() => {
            cosmosDiv.innerHTML = createGalaxy();
          }, 2000);
        }
      };

      setTimeout(animateStars, 100);

      return output + `
        <span style="color: var(--text-secondary);">> Expanding universe...</span>
        <span style="color: var(--text-secondary);">> Generating galaxies...</span>
        <span style="color: var(--text-secondary);">> Creating cosmic web...</span>
        <span style="color: var(--neon-pink);">Cosmos simulated. Multiverse stable.</span>
      `;
    },
    destroy: () => {
      const effect = new DestroyEffect();
      effectManager.addEffect(effect);
      
      setTimeout(() => {
        effectManager.removeEffect(effect);
        effect.cleanup();
      }, 5000);
      
      return `
        <span style="color: var(--neon-pink);">INITIATING SYSTEM DESTRUCTION...</span>
        <span style="color: var(--text-secondary);">Warning: This is just a visual effect!</span>
      `;
    },
    encrypt: (args) => {
      const text = args.join(' ') || 'No text provided';
      const key = Math.random().toString(36).substring(7);
      
      // Create a canvas for the encryption animation
      const canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 100;
      canvas.style.background = 'rgba(0, 0, 0, 0.8)';
      canvas.style.border = '1px solid var(--accent)';
      canvas.style.borderRadius = '4px';
      canvas.style.margin = '10px 0';
      
      const ctx = canvas.getContext('2d');
      let frame = 0;
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'var(--accent)';
        ctx.font = '12px monospace';
        
        // Draw encryption progress
        const progress = Math.min(frame / 60, 1);
        const barWidth = canvas.width * progress;
        ctx.fillRect(0, 0, barWidth, 5);
        
        // Draw binary stream
        for (let i = 0; i < 10; i++) {
          const y = 20 + i * 8;
          const x = (frame + i * 20) % canvas.width;
          ctx.fillText(Math.random().toString(2).substring(2, 10), x, y);
        }
        
        // Draw status
        ctx.fillText(`Encrypting: ${Math.floor(progress * 100)}%`, 10, 90);
        
        if (progress < 1) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          // Show encrypted result
          const encrypted = btoa(text).split('').map(c => 
            String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(0))
          ).join('');
          
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">Encryption Complete</span>
              <span style="color: var(--text-secondary);">Key: ${key}</span>
              <span style="color: var(--neon-pink);">Encrypted: ${encrypted}</span>
            </div>`;
        }
      };
      
      animate();
      return `
        <span style="color: var(--neon-pink);">ENCRYPTION IN PROGRESS</span>
        <div id="encrypt-animation"></div>
      `;
    },
    exploit: () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      canvas.style.background = 'rgba(0, 0, 0, 0.8)';
      canvas.style.border = '1px solid var(--accent)';
      canvas.style.borderRadius = '4px';
      canvas.style.margin = '10px 0';
      
      const ctx = canvas.getContext('2d');
      let frame = 0;
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'var(--accent)';
        ctx.font = '12px monospace';
        
        // Draw network nodes
        const nodes = [
          { x: 50, y: 50, name: 'Target' },
          { x: 200, y: 100, name: 'Router' },
          { x: 350, y: 50, name: 'Database' }
        ];
        
        // Draw connections
        ctx.strokeStyle = 'var(--accent)';
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[1].x, nodes[1].y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(nodes[1].x, nodes[1].y);
        ctx.lineTo(nodes[2].x, nodes[2].y);
        ctx.stroke();
        
        // Draw attack vector
        const progress = Math.min(frame / 120, 1);
        const attackX = nodes[0].x + (nodes[2].x - nodes[0].x) * progress;
        const attackY = nodes[0].y + (nodes[2].y - nodes[0].y) * progress;
        
        ctx.fillStyle = 'var(--neon-pink)';
        ctx.beginPath();
        ctx.arc(attackX, attackY, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw status
        const statuses = [
          'Scanning ports...',
          'Bypassing firewall...',
          'Injecting payload...',
          'Exploiting vulnerability...',
          'Gaining access...'
        ];
        
        const statusIndex = Math.floor(progress * statuses.length);
        ctx.fillText(statuses[statusIndex], 10, 180);
        
        if (progress < 1) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">Exploit Complete</span>
              <span style="color: var(--text-secondary);">Target system compromised</span>
              <span style="color: var(--neon-pink);">Access level: ROOT</span>
            </div>`;
        }
      };
      
      animate();
      return `
        <span style="color: var(--neon-pink);">EXPLOIT IN PROGRESS</span>
        <div id="exploit-animation"></div>
      `;
    },
    ransomware: () => {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 200;
      canvas.style.background = 'rgba(0, 0, 0, 0.8)';
      canvas.style.border = '1px solid var(--accent)';
      canvas.style.borderRadius = '4px';
      canvas.style.margin = '10px 0';
      
      const ctx = canvas.getContext('2d');
      let frame = 0;
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw file system
        const files = [
          { x: 50, y: 50, name: 'documents' },
          { x: 150, y: 50, name: 'photos' },
          { x: 250, y: 50, name: 'videos' },
          { x: 350, y: 50, name: 'backups' }
        ];
        
        // Draw files
        files.forEach(file => {
          ctx.fillStyle = 'var(--accent)';
          ctx.fillRect(file.x, file.y, 40, 40);
          ctx.fillStyle = 'var(--text-secondary)';
          ctx.fillText(file.name, file.x, file.y + 60);
        });
        
        // Draw encryption effect
        const progress = Math.min(frame / 180, 1);
        const encryptY = 50 + progress * 100;
        
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(0, encryptY - 10, canvas.width, 20);
        
        // Draw ransom note
        if (progress > 0.8) {
          ctx.fillStyle = 'var(--neon-pink)';
          ctx.font = 'bold 16px monospace';
          ctx.fillText('YOUR FILES HAVE BEEN ENCRYPTED', 50, 180);
          ctx.font = '12px monospace';
          ctx.fillText('Send 1 BTC to unlock', 50, 200);
        }
        
        if (progress < 1) {
          frame++;
          requestAnimationFrame(animate);
        } else {
          terminalOutput.innerHTML += `
            <div>
              <span style="color: var(--accent);">Ransomware Simulation Complete</span>
              <span style="color: var(--text-secondary);">This is just a simulation!</span>
              <span style="color: var(--neon-pink);">No actual files were harmed.</span>
            </div>`;
        }
      };
      
      animate();
      return `
        <span style="color: var(--neon-pink);">RANSOMWARE SIMULATION</span>
        <div id="ransomware-animation"></div>
      `;
    }
  };
  
  // Process commands function
  function processCommand(cmd) {
    cmd = cmd.trim().toLowerCase();
    
    if (cmd === '') return;
    
    // Add command to history
    commandHistory.unshift(cmd);
    if (commandHistory.length > 20) commandHistory.pop(); // Limit history size
    historyIndex = -1;
    
    // Add command to output
    terminalOutput.innerHTML += `<div><span style="color: var(--text-secondary);">$ ${cmd}</span></div>`;
    
    // Process command
    const args = cmd.split(' ');
    const mainCommand = args[0];
    
    // Show matrix effect for AI-related commands
    if (mainCommand === 'ai') {
      showMatrixEffect(true);
      
      // Hide matrix effect after a delay
      setTimeout(() => {
        showMatrixEffect(false);
      }, 5000);
    }
    
    // Console log for debugging
    console.log('Processing command:', mainCommand, args);
    
    if (commands.hasOwnProperty(mainCommand)) {
      // Call the command handler directly
      try {
        const output = commands[mainCommand](args.slice(1));
        if (output) {
          terminalOutput.innerHTML += `<div>${output}</div>`;
        }
      } catch (error) {
        console.error('Error executing command:', error);
        terminalOutput.innerHTML += `<div><span style="color: var(--neon-pink);">Error executing command: ${error.message}</span></div>`;
      }
    } else if (mainCommand === 'rm' && args.length > 1) {
      // Special case for rm -rf
      const output = commands.rm ? commands.rm(args.slice(1)) : `<span style="color: var(--neon-pink);">Command not implemented: rm</span>`;
      if (output) {
        terminalOutput.innerHTML += `<div>${output}</div>`;
      }
    } else if (mainCommand === 'cd' || mainCommand === 'mkdir' || mainCommand === 'touch' || 
               mainCommand === 'mv' || mainCommand === 'cp' || mainCommand === 'chmod') {
      // Handle common Unix commands with a joke
      terminalOutput.innerHTML += `
        <div>
          <span style="color: var(--neon-pink);">This is a portfolio website, not a real terminal.</span>
          <span style="color: var(--text-secondary);">If you're trying to use real Unix commands, you might be taking this simulation too seriously! 😉</span>
          <span style="color: var(--accent);">Try 'help' to see available demo commands.</span>
        </div>`;
    } else if (mainCommand.startsWith('apt') || mainCommand.startsWith('yum') || 
              mainCommand.startsWith('brew') || mainCommand.startsWith('npm') ||
              mainCommand.startsWith('pip')) {
      // Package manager commands
      terminalOutput.innerHTML += `
        <div>
          <span style="color: var(--neon-pink);">Package manager detected!</span>
          <span style="color: var(--text-secondary);">This is a browser-based terminal simulation, not a real package manager.</span>
          <span style="color: var(--text-secondary);">You can't install packages in a website... yet!</span>
          <span style="color: var(--accent);">Try 'help' to see what you can actually do here.</span>
        </div>`;
    } else if (mainCommand === 'exit' || mainCommand === 'quit' || mainCommand === 'logout') {
      // Exit commands
      terminalOutput.innerHTML += `
        <div>
          <span style="color: var(--accent);">You can't exit a website terminal!</span>
          <span style="color: var(--text-secondary);">Just close the browser tab like a normal person. 😄</span>
          <span style="color: var(--neon-pink);">Fun fact: Developers spend an average of 30% of their day trying to exit Vim.</span>
        </div>`;
    } else {
      // Command not found
      terminalOutput.innerHTML += `
        <div>
          <span style="color: var(--neon-pink);">Command not found: ${cmd}</span>
          <span style="color: var(--text-secondary);">This is a portfolio website with simulated terminal functionality.</span>
          <span style="color: var(--text-secondary);">Type 'help' to see available commands.</span>
          <span style="color: var(--accent);">Trying to hack? Try the 'hack' command instead!</span>
        </div>`;
    }
    
    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
  
  // Add keyboard navigation for keyboard events - one event handler for everything
  terminalInput.addEventListener('keydown', function(e) {
    // Process command on Enter
    if (e.key === 'Enter') {
      const cmd = this.value;
      if (cmd.trim() !== '') {
        processCommand(cmd);
      }
      this.value = '';
    }
    // Up arrow for previous command
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        this.value = commandHistory[historyIndex];
        // Move cursor to end
        setTimeout(() => {
          this.selectionStart = this.selectionEnd = this.value.length;
        }, 0);
      }
    }
    // Down arrow for next command
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        this.value = commandHistory[historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        this.value = '';
      }
    }
    // Tab for auto-completion
    else if (e.key === 'Tab') {
      e.preventDefault();
      const input = this.value.trim();
      const suggestions = autoCompleteCommand(input);
      
      if (suggestions.length === 1) {
        this.value = suggestions[0];
      } else if (suggestions.length > 0) {
        // Show all suggestions
        terminalSuggestions.innerHTML = suggestions
          .map(s => `<div class="suggestion">${s}</div>`)
          .join('');
        terminalSuggestions.style.display = 'block';
      }
    }
  });

} catch (e) {
  showError('Terminal functionality failed: ' + e.message);
}

// Parallax Effect
try {
  const parallaxLayer = document.getElementById('parallaxLayer');
  if (!parallaxLayer) throw new Error('Parallax layer not found');
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    parallaxLayer.style.transform = `translateY(${scroll * 0.3}px)`;
  });
} catch (e) {
  showError('Parallax effect failed: ' + e.message);
}

// Custom Cursor
try {
  const cursor = document.getElementById('customCursor');
  if (!cursor) throw new Error('Custom cursor not found');
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    const section = document.querySelector('section:hover');
    cursor.style.borderColor = section?.id === 'skills' ? '#ff2e63' : section?.id === 'projects' ? '#7b2cbf' : '#64ffda';
    
    // Check if hovering over interactive elements
    const isOverInteractive = e.target.matches('a, button, .logo, .nav-links a, input, textarea, .submit-btn, .project-links a, .skill-cube, .social-links a, #themeToggle, .hamburger');
    
    if (isOverInteractive) {
      cursor.style.width = '0';
      cursor.style.height = '0';
      cursor.style.opacity = '0';
    } else {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.opacity = '1';
    }
  });
} catch (e) {
  showError('Custom cursor failed: ' + e.message);
}

// Project Navigation
try {
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');
  const timeline = document.querySelector('.project-timeline');
  
  if (prevBtn && nextBtn && timeline) {
    const scrollAmount = 350; // Adjust based on card width + gap
    
    prevBtn.addEventListener('click', () => {
      timeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
      timeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
} catch (e) {
  showError('Project navigation failed: ' + e.message);
}

// Add smooth scrolling to anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links with hash
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Add animation class
        targetSection.classList.add('section-highlight');
        
        // Remove class after animation completes
        setTimeout(() => {
          targetSection.classList.remove('section-highlight');
        }, 1000);
        
        // Smooth scroll to section
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          hamburger.textContent = '☰';
        }
      });
    });
  }
});

// Matrix Rain Effect
function showMatrixEffect(show) {
  const matrixRain = document.getElementById('matrixRain');
  if (!matrixRain) return;
  
  if (show) {
    matrixRain.classList.add('active');
    
    // Create canvas for matrix effect if it doesn't exist
    if (!matrixRain.querySelector('canvas')) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      matrixRain.appendChild(canvas);
      
      // Get theme colors
      const isLightMode = document.body.classList.contains('light');
      const matrixColor = isLightMode ? '#0066cc' : '#64ffda';
      
      // Matrix characters
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
      
      // Setup columns
      const fontSize = 14;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = [];
      
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100); // Start above the canvas
      }
      
      // Drawing function
      function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = matrixColor;
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
          // Random character
          const char = chars[Math.floor(Math.random() * chars.length)];
          
          // Draw the character
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
          
          // Move the raindrop down
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          
          drops[i]++;
        }
        
        // Only continue animation if the effect is active
        if (matrixRain.classList.contains('active')) {
          requestAnimationFrame(draw);
        }
      }
      
      // Start animation
      draw();
    }
  } else {
    matrixRain.classList.remove('active');
    const canvas = matrixRain.querySelector('canvas');
    if (canvas) {
      canvas.remove();
    }
  }
}

// Add effect management functions
const effectManager = {
  activeEffects: new Set(),
  
  addEffect(effect) {
    this.activeEffects.add(effect);
  },
  
  removeEffect(effect) {
    this.activeEffects.delete(effect);
  },
  
  clearAllEffects() {
    this.activeEffects.forEach(effect => effect.cleanup());
    this.activeEffects.clear();
  }
};

// Add new effect classes
class MatrixEffect {
  constructor() {
    console.log('MatrixEffect constructor called');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.setupCanvas();
    this.setupMatrix();
    this.startMatrix();
  }

  setupCanvas() {
    console.log('Setting up canvas');
    // Create a container for the matrix effect
    this.container = document.createElement('div');
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.3);
      mix-blend-mode: screen;
      overflow: hidden;
    `;
    document.body.appendChild(this.container);

    // Setup canvas
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
    `;
    this.container.appendChild(this.canvas);
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    console.log('Resizing canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.setupMatrix();
  }

  setupMatrix() {
    console.log('Setting up matrix');
    this.fontSize = 14;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(this.columns).fill(1);
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    this.speeds = Array(this.columns).fill(0).map(() => Math.random() * 2 + 1);
    this.brightness = Array(this.columns).fill(0).map(() => Math.random() * 0.5 + 0.5);
  }

  startMatrix() {
    console.log('Starting matrix animation');
    const draw = () => {
      // Clear with a semi-transparent black rectangle
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw characters
      for (let i = 0; i < this.drops.length; i++) {
        const char = this.chars[Math.floor(Math.random() * this.chars.length)];
        const x = i * this.fontSize;
        const y = this.drops[i] * this.fontSize;

        // Calculate brightness for this character
        const brightness = this.brightness[i];
        const color = `rgba(100, 255, 218, ${brightness})`;

        // Draw character with glow effect
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = color;
        this.ctx.fillStyle = color;
        this.ctx.font = `${this.fontSize}px monospace`;
        this.ctx.fillText(char, x, y);
        this.ctx.shadowBlur = 0;

        // Update position and speed
        this.drops[i] += this.speeds[i];

        // Reset drop when it reaches bottom or randomly
        if (y > this.canvas.height && Math.random() > 0.975) {
          this.drops[i] = 0;
          this.speeds[i] = Math.random() * 2 + 1;
          this.brightness[i] = Math.random() * 0.5 + 0.5;
        }
      }

      // Continue animation if effect is still active
      if (effectManager.activeEffects.has(this)) {
        requestAnimationFrame(draw);
      }
    };

    // Start the animation
    draw();
  }

  cleanup() {
    console.log('Cleaning up matrix effect');
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}

class GlitchEffect {
  constructor() {
    this.originalStyles = new Map();
    this.elements = document.querySelectorAll('*');
    this.startGlitch();
  }

  startGlitch() {
    this.elements.forEach(element => {
      if (element.style) {
        this.originalStyles.set(element, {
          transform: element.style.transform,
          filter: element.style.filter,
          textShadow: element.style.textShadow
        });
      }
    });
    
    const glitch = () => {
      this.elements.forEach(element => {
        if (element.style && Math.random() < 0.1) {
          element.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
          element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
          element.style.textShadow = `${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 rgba(255, 0, 255, 0.5)`;
        }
      });
      
      if (effectManager.activeEffects.has(this)) {
        requestAnimationFrame(glitch);
      }
    };
    
    glitch();
  }

  cleanup() {
    this.elements.forEach(element => {
      if (element.style) {
        const original = this.originalStyles.get(element);
        if (original) {
          element.style.transform = original.transform;
          element.style.filter = original.filter;
          element.style.textShadow = original.textShadow;
        }
      }
    });
  }
}

class RainbowEffect {
  constructor() {
    this.originalStyles = new Map();
    this.elements = document.querySelectorAll('*');
    this.startRainbow();
  }

  startRainbow() {
    this.elements.forEach(element => {
      if (element.style) {
        this.originalStyles.set(element, {
          color: element.style.color,
          background: element.style.background
        });
      }
    });
    
    let hue = 0;
    const rainbow = () => {
      this.elements.forEach(element => {
        if (element.style && Math.random() < 0.1) {
          element.style.color = `hsl(${hue}, 100%, 50%)`;
          element.style.background = `hsl(${(hue + 180) % 360}, 100%, 50%)`;
        }
      });
      
      hue = (hue + 1) % 360;
      
      if (effectManager.activeEffects.has(this)) {
        requestAnimationFrame(rainbow);
      }
    };
    
    rainbow();
  }

  cleanup() {
    this.elements.forEach(element => {
      if (element.style) {
        const original = this.originalStyles.get(element);
        if (original) {
          element.style.color = original.color;
          element.style.background = original.background;
        }
      }
    });
  }
}

class NeonEffect {
  constructor() {
    this.originalStyles = new Map();
    this.elements = document.querySelectorAll('*');
    this.startNeon();
  }

  startNeon() {
    this.elements.forEach(element => {
      if (element.style) {
        this.originalStyles.set(element, {
          textShadow: element.style.textShadow,
          boxShadow: element.style.boxShadow
        });
      }
    });
    
    const neon = () => {
      this.elements.forEach(element => {
        if (element.style && Math.random() < 0.1) {
          const hue = Math.random() * 360;
          element.style.textShadow = `0 0 5px hsl(${hue}, 100%, 50%), 0 0 10px hsl(${hue}, 100%, 50%), 0 0 20px hsl(${hue}, 100%, 50%)`;
          element.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 50%), 0 0 20px hsl(${hue}, 100%, 50%)`;
        }
      });
      
      if (effectManager.activeEffects.has(this)) {
        requestAnimationFrame(neon);
      }
    };
    
    neon();
  }

  cleanup() {
    this.elements.forEach(element => {
      if (element.style) {
        const original = this.originalStyles.get(element);
        if (original) {
          element.style.textShadow = original.textShadow;
          element.style.boxShadow = original.boxShadow;
        }
      }
    });
  }
}

class CyberpunkEffect {
  constructor() {
    this.originalStyles = new Map();
    this.elements = document.querySelectorAll('*');
    this.startCyberpunk();
  }

  startCyberpunk() {
    this.elements.forEach(element => {
      if (element.style) {
        this.originalStyles.set(element, {
          background: element.style.background,
          color: element.style.color,
          border: element.style.border
        });
      }
    });
    
    const cyberpunk = () => {
      this.elements.forEach(element => {
        if (element.style && Math.random() < 0.1) {
          element.style.background = `linear-gradient(45deg, #ff00ff, #00ffff)`;
          element.style.color = '#ffffff';
          element.style.border = '2px solid #ff00ff';
        }
      });
      
      if (effectManager.activeEffects.has(this)) {
        requestAnimationFrame(cyberpunk);
      }
    };
    
    cyberpunk();
  }

  cleanup() {
    this.elements.forEach(element => {
      if (element.style) {
        const original = this.originalStyles.get(element);
        if (original) {
          element.style.background = original.background;
          element.style.color = original.color;
          element.style.border = original.border;
        }
      }
    });
  }
}

class DestroyEffect {
  constructor() {
    this.elements = document.querySelectorAll('div, nav, footer, header, section, article, aside, .skill-tooltip');
    this.originalPositions = new Map();
    this.originalStyles = new Map();
    this.originalDisplay = new Map();
    this.particles = [];
    this.destroyCount = parseInt(localStorage.getItem('destroyCount') || '0');
    this.startDestroy();
  }

  startDestroy() {
    // Increment destroy count
    this.destroyCount++;
    localStorage.setItem('destroyCount', this.destroyCount.toString());

    // Check if user is blocked
    if (this.destroyCount > 3) {
      this.showBlockedMessage();
      return;
    }

    // Store original positions and styles
    this.elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      this.originalPositions.set(element, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      });
      this.originalStyles.set(element, {
        transform: element.style.transform,
        transition: element.style.transition,
        position: element.style.position,
        opacity: element.style.opacity,
        filter: element.style.filter
      });
      this.originalDisplay.set(element, element.style.display);
    });

    // Create particles with more variety
    this.elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const color = getComputedStyle(element).backgroundColor || '#ffffff';
      const particleCount = Math.floor((rect.width * rect.height) / 1000);
      
      for (let i = 0; i < particleCount; i++) {
        this.particles.push({
          x: rect.x + Math.random() * rect.width,
          y: rect.y + Math.random() * rect.height,
          size: Math.random() * 8 + 2,
          speedX: (Math.random() - 0.5) * 30,
          speedY: (Math.random() - 0.5) * 30,
          color: color,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          gravity: Math.random() * 0.5 + 0.2
        });
      }
    });

    // Add glitch effect to the entire page
    document.body.style.filter = 'hue-rotate(90deg) contrast(150%)';
    document.body.style.transition = 'filter 0.5s ease-out';

    // Animate elements falling apart
    this.elements.forEach(element => {
      element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.transform = `
        translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px)
        rotate(${(Math.random() - 0.5) * 720}deg)
        scale(${Math.random() * 0.3 + 0.1})
      `;
      element.style.opacity = '0';
      element.style.filter = 'blur(5px)';
    });

    // Start particle animation
    this.animateParticles();

    // Add screen shake effect
    this.addScreenShake();

    // Sequence: Destroy -> Story -> Rebuild
    setTimeout(() => {
      // Clear all particles and effects
      this.clearEffects();
      // Show Flash story
      this.showFlashStory();
    }, 2000);
  }

  clearEffects() {
    // Remove all particles and reset page
    document.body.style.filter = '';
    document.body.style.transform = '';
    // Clear any remaining particles
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.remove();
  }

  showFlashStory() {
    // Create story container
    const storyContainer = document.createElement('div');
    storyContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.5s ease-in;
    `;

    // Add Flash and story content
    storyContainer.innerHTML = `
      <div style="
        text-align: center;
        color: white;
        max-width: 600px;
        padding: 20px;
      ">
        <div style="
          width: 150px;
          height: 150px;
          margin: 0 auto 30px;
          animation: flashRun 0.5s infinite;
        ">
          ${this.getFlashSVG()}
        </div>
        <div style="
          font-family: Arial, sans-serif;
          font-size: 24px;
          line-height: 1.6;
          margin-bottom: 20px;
        ">
          <p style="margin-bottom: 20px;">
            <strong style="color: #e63946;">The Flash:</strong><br>
            ${this.getFlashMessage()}
          </p>
        </div>
        <div style="
          font-size: 18px;
          color: #888;
          margin-top: 20px;
        ">
          Preparing to rebuild...
        </div>
      </div>
    `;

    document.body.appendChild(storyContainer);
    
    // Fade in the story
    setTimeout(() => {
      storyContainer.style.opacity = '1';
    }, 100);

    // Add animation style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flashRun {
        0% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        100% { transform: translateX(-5px); }
      }
    `;
    document.head.appendChild(style);

    // Start rebuild after story
    setTimeout(() => {
      storyContainer.style.opacity = '0';
      setTimeout(() => {
        storyContainer.remove();
        this.rebuildWithFlash();
      }, 500);
    }, 4000);
  }

  rebuildWithFlash() {
    // Create a single container for all animations
    const animationContainer = document.createElement('div');
    animationContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.5);
    `;
    document.body.appendChild(animationContainer);

    // Create Flash with running animation
    const flash = document.createElement('div');
    flash.className = 'flash-character';
    flash.innerHTML = this.getFlashSVG();
    flash.style.cssText = `
      position: fixed;
      width: 50px;
      height: 50px;
      pointer-events: none;
      will-change: transform;
      transform: translateZ(0);
      left: 50%;
      top: 50%;
      margin-left: -25px;
      margin-top: -25px;
    `;
    animationContainer.appendChild(flash);

    // Add running animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flashRun {
        0% { transform: rotate(-5deg); }
        50% { transform: rotate(5deg); }
        100% { transform: rotate(-5deg); }
      }
      @keyframes elementFloat {
        0% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(5deg); }
        100% { transform: translateY(0) rotate(0deg); }
      }
      @keyframes rebuildGlow {
        0% { filter: brightness(1) drop-shadow(0 0 5px rgba(255, 255, 255, 0.5)); }
        50% { filter: brightness(1.5) drop-shadow(0 0 20px rgba(255, 255, 255, 0.8)); }
        100% { filter: brightness(1) drop-shadow(0 0 5px rgba(255, 255, 255, 0.5)); }
      }
      @keyframes placeElement {
        0% { transform: scale(0.5); opacity: 0; }
        50% { transform: scale(1.1); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    let currentIndex = 0;
    let animationFrame = null;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    // Hide all elements initially
    this.elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'scale(0.5)';
      element.style.transition = 'none';
    });

    const rebuildNext = () => {
      if (currentIndex >= this.elements.length) {
        cancelAnimationFrame(animationFrame);
        animationContainer.style.opacity = '0';
        setTimeout(() => {
          animationContainer.remove();
          style.remove();
        }, 300);
        this.cleanup();
        return;
      }

      const element = this.elements[currentIndex];
      const originalPos = this.originalPositions.get(element);
      
      if (!originalPos) {
        currentIndex++;
        rebuildNext();
        return;
      }

      // Create a more dynamic path for Flash
      const targetX = originalPos.x + originalPos.width / 2;
      const targetY = originalPos.y + originalPos.height / 2;
      
      // Calculate a curved path
      const controlX = (lastX + targetX) / 2;
      const controlY = Math.min(lastY, targetY) - 100;
      
      // Create the carried element with floating animation
      const carriedElement = document.createElement('div');
      carriedElement.className = 'carried-element';
      carriedElement.style.cssText = `
        position: fixed;
        width: ${originalPos.width}px;
        height: ${originalPos.height}px;
        pointer-events: none;
        will-change: transform, opacity;
        transform: translateZ(0);
        animation: elementFloat 1s infinite, rebuildGlow 2s infinite;
        opacity: 0;
      `;
      
      // Clone and style the element
      const elementClone = element.cloneNode(true);
      elementClone.style.cssText = `
        width: 100%;
        height: 100%;
        transform: scale(0.5);
        filter: brightness(1.2) contrast(1.2);
      `;
      carriedElement.appendChild(elementClone);
      animationContainer.appendChild(carriedElement);

      // Animate Flash along the curved path
      let progress = 0;
      const animatePath = () => {
        progress += 0.2; // Increased speed
        if (progress > 1) {
          progress = 1;
        }

        // Calculate position along the curve
        const x = Math.pow(1 - progress, 2) * lastX + 
                 2 * (1 - progress) * progress * controlX + 
                 Math.pow(progress, 2) * targetX;
        const y = Math.pow(1 - progress, 2) * lastY + 
                 2 * (1 - progress) * progress * controlY + 
                 Math.pow(progress, 2) * targetY;

        // Update Flash position
        flash.style.left = `${x}px`;
        flash.style.top = `${y}px`;
        flash.style.transform = `rotate(${Math.sin(progress * Math.PI * 2) * 20}deg)`;
        
        // Update carried element position
        carriedElement.style.left = `${x + 30}px`;
        carriedElement.style.top = `${y - 20}px`;
        carriedElement.style.transform = `scale(0.5)`;
        carriedElement.style.opacity = '0.8';

        // Add lightning trail
        if (Math.random() > 0.7) {
          const trail = document.createElement('div');
          trail.className = 'lightning-trail';
          trail.style.cssText = `
            position: fixed;
            width: 2px;
            height: 50px;
            background: linear-gradient(to bottom, 
              rgba(255, 255, 255, 0.8),
              rgba(255, 255, 255, 0)
            );
            left: ${x + 25}px;
            top: ${y - 25}px;
            transform: rotate(${Math.random() * 360}deg);
            opacity: 0.8;
            pointer-events: none;
            will-change: transform, opacity;
          `;
          animationContainer.appendChild(trail);
          setTimeout(() => trail.remove(), 200);
        }

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animatePath);
        } else {
          // Place the element with a dramatic effect
          element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          element.style.animation = 'placeElement 0.3s forwards';
          
          // Fade out carried element
          carriedElement.style.opacity = '0';
          carriedElement.style.transform = `scale(0.3)`;
          
          // Update last position
          lastX = targetX;
          lastY = targetY;
          
          // Remove carried element
          setTimeout(() => carriedElement.remove(), 200);
          
          // Move to next element
          currentIndex++;
          setTimeout(rebuildNext, 50);
        }
      };

      animatePath();
    };

    rebuildNext();
  }

  showBlockedMessage() {
    document.body.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        text-align: center;
        z-index: 9999;
      ">
        <div style="
          width: 200px;
          height: 200px;
          margin-bottom: 20px;
        ">
          ${this.getFlashSVG()}
        </div>
        <h1 style="color: #e63946; margin-bottom: 20px;">Access Blocked by The Flash</h1>
        <p style="color: #1d3557; font-size: 18px; max-width: 600px; line-height: 1.6;">
          I warned you three times about destroying Rashed's website! 
          I'm taking a break from rebuilding it. 
          Please come back later when you're ready to be more careful.
        </p>
        <button onclick="location.reload()" style="
          margin-top: 20px;
          padding: 10px 20px;
          background: #e63946;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        ">
          I Promise to Be Careful
        </button>
      </div>
    `;
  }

  getFlashSVG() {
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="flashGradient${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#FFD700"/>
            <stop offset="100%" style="stop-color:#FFA500"/>
          </linearGradient>
        </defs>
        <path d="M50 10 L65 40 L85 40 L60 60 L75 90 L50 60 L30 60 Z" 
              fill="url(#flashGradient${Date.now()})" 
              stroke="#FF4500" 
              stroke-width="2"/>
        <circle cx="50" cy="50" r="45" 
                fill="none" 
                stroke="url(#flashGradient${Date.now()})" 
                stroke-width="2" 
                stroke-dasharray="5,5"/>
      </svg>
    `;
  }

  getFlashMessage() {
    const messages = [
      "Oh no! You're destroying Rashed's website! Don't worry, I'll rebuild it, but please be more careful!",
      "Not again! I just finished rebuilding this website. I'll fix it one more time, but this is getting tiring!",
      "This is the last time I'm rebuilding this website! Next time, you're on your own!"
    ];
    return messages[Math.min(this.destroyCount - 1, messages.length - 1)];
  }

  addScreenShake() {
    const shake = () => {
      const intensity = 10;
      const x = (Math.random() - 0.5) * intensity;
      const y = (Math.random() - 0.5) * intensity;
      document.body.style.transform = `translate(${x}px, ${y}px)`;
    };

    const shakeInterval = setInterval(shake, 50);
    setTimeout(() => {
      clearInterval(shakeInterval);
      document.body.style.transform = '';
    }, 1000);
  }

  animateParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      this.particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.speedY += particle.gravity;
        particle.rotation += particle.rotationSpeed;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.rect(-particle.size/2, -particle.size/2, particle.size, particle.size);
        ctx.fill();
        ctx.restore();
      });

      if (this.particles.some(p => p.y < window.innerHeight + 100)) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    animate();
  }

  cleanup() {
    // Reset page filter
    document.body.style.filter = '';
    
    // Restore original styles
    this.elements.forEach(element => {
      const originalStyle = this.originalStyles.get(element);
      const originalDisplay = this.originalDisplay.get(element);
      
      if (originalStyle) {
        element.style.transform = originalStyle.transform;
        element.style.transition = originalStyle.transition;
        element.style.position = originalStyle.position;
        element.style.opacity = originalStyle.opacity;
        element.style.filter = originalStyle.filter;
      }
      
      // Handle tooltips specially
      if (element.classList.contains('skill-tooltip')) {
        element.style.display = 'none';
      } else if (originalDisplay) {
        element.style.display = originalDisplay;
      }
    });
  }
}

// Update the commands
const commands = {
  // ... existing commands ...
  
  matrix: () => {
    // Create and start the matrix effect
    const effect = new MatrixEffect();
    effectManager.addEffect(effect);
    
    // Add matrix text animation
    const matrixText = "ENTERING THE MATRIX...";
    let output = '';
    for (let i = 0; i < matrixText.length; i++) {
      output += `<span style="color: var(--accent); animation: matrix-fade 50ms ${i * 50}ms forwards;">${matrixText[i]}</span>`;
    }
    
    // Add style for matrix fade animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes matrix-fade {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    // Remove the effect after 5 seconds
    setTimeout(() => {
      effectManager.removeEffect(effect);
      effect.cleanup();
      style.remove();
    }, 5000);
    
    return `
      <div style="font-family: monospace; position: relative; z-index: 1000;">
        ${output}
        <div style="color: var(--neon-pink); margin-top: 10px;">Wake up, Neo...</div>
        <div style="color: var(--text-secondary); margin-top: 5px;">The Matrix has you...</div>
        <div style="color: var(--accent); margin-top: 5px;">Follow the white rabbit.</div>
      </div>
    `;
  },
  
  glitch: () => {
    const effect = new GlitchEffect();
    effectManager.addEffect(effect);
    
    setTimeout(() => {
      effectManager.removeEffect(effect);
      effect.cleanup();
    }, 3000);
    
    return `
      <div style="font-family: monospace; font-size: 1.2em;">
        ${createGlitchText("SYSTEM GLITCH DETECTED")}
        <div style="color: var(--neon-pink); margin-top: 10px; animation: flicker 0.5s infinite;">WARNING: SYSTEM INSTABILITY DETECTED</div>
      </div>
    `;
  },
  
  rainbow: () => {
    const effect = new RainbowEffect();
    effectManager.addEffect(effect);
    
    // Add rainbow text animation
    const rainbowText = "RAINBOW MODE ACTIVATED";
    let output = createRainbowText(rainbowText);
    
    // Add style for rainbow animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      effectManager.removeEffect(effect);
      effect.cleanup();
      style.remove();
    }, 5000);
    
    return `
      <div style="font-family: monospace; font-size: 1.2em;">
        ${output}
        <div style="margin-top: 10px;">
          ${['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3']
            .map(color => `<span style="color: ${color}; animation: rainbow 2s infinite;">█</span>`)
            .join('')}
        </div>
      </div>
    `;
  },
  
  neon: () => {
    const effect = new NeonEffect();
    effectManager.addEffect(effect);
    
    // Add neon text animation
    const neonText = "NEON MODE ACTIVATED";
    let output = createNeonText(neonText);
    
    // Add style for neon animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes neon-pulse {
        0% { text-shadow: 0 0 5px var(--accent), 0 0 10px var(--accent), 0 0 20px var(--accent); }
        50% { text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 40px var(--accent); }
        100% { text-shadow: 0 0 5px var(--accent), 0 0 10px var(--accent), 0 0 20px var(--accent); }
      }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
      effectManager.removeEffect(effect);
      effect.cleanup();
      style.remove();
    }, 5000);
    
    return `
      <div style="font-family: monospace; font-size: 1.2em;">
        <div style="animation: neon-pulse 2s infinite;">
          ${output}
        </div>
        <div style="margin-top: 10px; color: var(--accent); text-shadow: 0 0 5px var(--accent), 0 0 10px var(--accent), 0 0 20px var(--accent);">
          Welcome to the neon future
        </div>
      </div>
    `;
  },
  
  cyberpunk: () => {
    const effect = new CyberpunkEffect();
    effectManager.addEffect(effect);
    
    // Add cyberpunk text animation
    const cyberpunkText = "CYBERPUNK MODE ACTIVATED";
    let output = cyberpunkText.split('').map(char => 
      `<span style="animation: cyberpunk 0.5s infinite;">${char}</span>`
    ).join('');
    
    // Add style for cyberpunk animation
    setTimeout(() => {
      effectManager.removeEffect(effect);
      effect.cleanup();
    }, 5000);
    
    return `
      <div style="font-family: monospace; font-size: 1.2em;">
        <div style="color: var(--neon-pink); text-shadow: 0 0 5px var(--neon-pink);">
          CYBERPUNK MODE ACTIVATED
        </div>
        <div style="margin-top: 10px; color: var(--accent);">
          Welcome to the future, netrunner
        </div>
      </div>
    `;
  },
  destroy: () => {
    const effect = new DestroyEffect();
    effectManager.addEffect(effect);
    
    setTimeout(() => {
      effectManager.removeEffect(effect);
      effect.cleanup();
    }, 5000);
    
    return `
      <span style="color: var(--neon-pink);">INITIATING SYSTEM DESTRUCTION...</span>
      <span style="color: var(--text-secondary);">Warning: This is just a visual effect!</span>
    `;
  }
};

// Add cleanup to window unload
window.addEventListener('unload', () => {
  effectManager.clearAllEffects();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes matrix-fade {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }

  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }

  @keyframes flicker {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  .glitch-text {
    position: relative;
    display: inline-block;
  }

  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch-text::before {
    left: 2px;
    text-shadow: -2px 0 var(--neon-pink);
    animation: glitch 0.3s infinite;
  }

  .glitch-text::after {
    left: -2px;
    text-shadow: 2px 0 var(--accent);
    animation: glitch 0.3s infinite reverse;
  }
`;
document.head.appendChild(style);

// ... rest of the existing code ...
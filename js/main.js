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
  
  // Welcome message
  const welcomeMessage = `
  <span style="color: var(--accent);">Welcome to Rashed Omar's Portfolio Terminal v2.0</span>
  
  <span style="color: var(--neon-pink);">Type 'help' to see available commands</span>
  <span style="color: var(--text-secondary);">Last login: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</span>
  `;
  
  terminalOutput.innerHTML = welcomeMessage;
  
  // Command history
  const commandHistory = [];
  let historyIndex = -1;
  
  // Auto-completion functionality
  const availableCommands = [
    'help', 'about', 'skills', 'projects', 'contact', 'game', 'clear',
    'git log', 'aws status', 'docker ps', 'terraform plan', 'kubernetes status',
    'python --version', 'react start', 'system status', 'hipaa audit',
    'laravel deploy', 'npm run', 'ls', 'whoami', 'sudo npm install',
    'hack nasa', 'hack google', 'hack portfolio', 'ssh user@example.com',
    'ping google.com', 'neofetch', 'uname -a', 'rm -rf /',
    'joke', 'ai chat', 'ai generate', 'ai predict', 'exit'
  ];
  
  // Auto-complete function
  function autoCompleteCommand(input) {
    if (!input) return [];
    return availableCommands.filter(cmd => 
      cmd.toLowerCase().startsWith(input.toLowerCase())
    );
  }
  
  // Show suggestions
  terminalInput.addEventListener('input', function() {
    const input = this.value.trim();
    const suggestions = autoCompleteCommand(input);
    
    if (suggestions.length > 0 && input.length > 0) {
      terminalSuggestions.innerHTML = suggestions
        .map(s => `<div class="suggestion">${s}</div>`)
        .join('');
      terminalSuggestions.style.display = 'block';
    } else {
      terminalSuggestions.style.display = 'none';
    }
  });
  
  // Handle suggestion clicks
  terminalSuggestions.addEventListener('click', function(e) {
    if (e.target.classList.contains('suggestion')) {
      terminalInput.value = e.target.textContent;
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
  
  // Add keyboard navigation for command history
  terminalInput.addEventListener('keydown', function(e) {
    // Up arrow for previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        terminalInput.value = commandHistory[historyIndex];
      }
    }
    // Down arrow for next command
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        terminalInput.value = '';
      }
    }
    // Tab for auto-completion
    else if (e.key === 'Tab') {
      e.preventDefault();
      const input = terminalInput.value.trim();
      const suggestions = autoCompleteCommand(input);
      
      if (suggestions.length === 1) {
        terminalInput.value = suggestions[0];
      } else if (suggestions.length > 0) {
        // Show all suggestions
        terminalSuggestions.innerHTML = suggestions
          .map(s => `<div class="suggestion">${s}</div>`)
          .join('');
        terminalSuggestions.style.display = 'block';
      }
    }
  });
  
  // More advanced commands
  const commands = {
    help: () => {
      return `
        <span style="color: var(--accent);">Available commands:</span>
        <span style="color: var(--text-secondary);">help</span> - Show this help message
        <span style="color: var(--text-secondary);">about</span> - About Rashed Omar
        <span style="color: var(--text-secondary);">skills</span> - List skills and expertise
        <span style="color: var(--text-secondary);">projects</span> - View recent projects
        <span style="color: var(--text-secondary);">contact</span> - Contact information
        <span style="color: var(--text-secondary);">game</span> - Play Network Infiltration game
        <span style="color: var(--text-secondary);">clear</span> - Clear terminal
        <span style="color: var(--accent);">AI commands:</span>
        <span style="color: var(--text-secondary);">ai chat [prompt]</span> - Chat with the AI assistant
        <span style="color: var(--text-secondary);">ai generate [prompt]</span> - Generate code samples
        <span style="color: var(--text-secondary);">ai predict [domain]</span> - Get AI predictions
        <span style="color: var(--accent);">Advanced commands:</span>
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
        <span style="color: var(--text-secondary);">hack</span> - Try a hacking simulation
        <span style="color: var(--text-secondary);">ssh</span> - Connect to remote server
        <span style="color: var(--text-secondary);">ping</span> - Ping a host
        <span style="color: var(--text-secondary);">neofetch</span> - Display system info
        <span style="color: var(--text-secondary);">uname</span> - Print system information
        <span style="color: var(--text-secondary);">rm -rf</span> - Remove files (with caution!)
        <span style="color: var(--text-secondary);">joke</span> - Tell a programmer joke
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
        <span style="color: var(--accent);">Key Skills:</span>
        • Cloud: AWS, Azure, GCP
        • Infrastructure: Docker, Kubernetes, Terraform
        • Frontend: React, TypeScript, Angular
        • Backend: Node.js, Python, PHP/Laravel
        • Database: MySQL, PostgreSQL, MongoDB
        • Security: HIPAA compliance, encryption
        • AI/ML: TensorFlow, PyTorch, NLP
      `;
    },
    projects: () => {
      return `
        <span style="color: var(--accent);">Recent Projects:</span>
        • <span style="color: var(--neon-pink);">Banzai Collaboration Platform</span> - Healthcare collaboration system
        • <span style="color: var(--neon-pink);">Care Patient Dashboard</span> - Patient monitoring dashboard
        • <span style="color: var(--neon-pink);">HealthAI Analytics</span> - AI-driven patient data analysis
        • <span style="color: var(--neon-pink);">SecureFlow Pipeline</span> - CI/CD automation for healthcare
        
        Scroll down to view project details!
      `;
    },
    contact: () => {
      return `
        <span style="color: var(--accent);">Contact Info:</span>
        • Email: <span style="color: var(--neon-pink);">rashed@example.com</span>
        • LinkedIn: <span style="color: var(--neon-pink);">linkedin.com/in/rashed-omar</span>
        • GitHub: <span style="color: var(--neon-pink);">github.com/rashedomar</span>
        
        Feel free to reach out for collaborations or opportunities!
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
          <span style="color: var(--neon-pink);">commit a8f9c21e7d4b5e6f</span> (HEAD -> main)
          Author: Rashed Omar <rashed@example.com>
          Date:   ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
          
              <span style="color: var(--accent);">feat: implement advanced search algorithm</span>
          
          <span style="color: var(--neon-pink);">commit 42d3e5f6a7b8c9d0</span>
          Author: Rashed Omar <rashed@example.com>
          Date:   ${new Date(Date.now() - 86400000).toLocaleDateString()} ${new Date(Date.now() - 86400000).toLocaleTimeString()}
          
              <span style="color: var(--accent);">fix: resolve user authentication edge case</span>
          
          <span style="color: var(--neon-pink);">commit 9f8e7d6c5b4a3210</span>
          Author: Rashed Omar <rashed@example.com>
          Date:   ${new Date(Date.now() - 172800000).toLocaleDateString()} ${new Date(Date.now() - 172800000).toLocaleTimeString()}
          
              <span style="color: var(--accent);">chore: update dependencies</span>
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">git version 2.42.0</span>
          Try 'git log' to see commit history
        `;
      }
    },
    aws: (args) => {
      if (args[0] === 'status') {
        return `
          <span style="color: var(--accent);">AWS Service Status</span>
          
          <span style="color: #4CAF50;">● EC2</span> - All systems operational (99.99%)
          <span style="color: #4CAF50;">● S3</span> - All systems operational (99.99%)
          <span style="color: #4CAF50;">● Lambda</span> - All systems operational (99.99%)
          <span style="color: #FFEB3B;">● DynamoDB</span> - Performance issues in us-east-1 (97.5%)
          <span style="color: #4CAF50;">● RDS</span> - All systems operational (99.99%)
          <span style="color: #4CAF50;">● CloudFront</span> - All systems operational (99.99%)
          
          Last deployment: <span style="color: var(--neon-pink);">12 minutes ago</span>
          Current account budget: <span style="color: var(--accent);">89% remaining</span>
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">aws-cli/2.13.5 Python/3.11.4</span>
          Try 'aws status' to check service health
        `;
      }
    },
    docker: (args) => {
      if (args[0] === 'ps') {
        return `
          <span style="color: var(--accent);">CONTAINER ID        IMAGE                    STATUS              PORTS                  NAMES</span>
          8f7e6d5c4b3a        healthcare-api:latest    Up 3 days           0.0.0.0:3000->3000/tcp   api-service
          2a1b3c4d5e6f        react-frontend:latest    Up 3 days           0.0.0.0:80->80/tcp       web-client
          7g8h9i0j1k2l        postgres:14.5            Up 3 days           0.0.0.0:5432->5432/tcp   database
          3m4n5o6p7q8r        redis:alpine             Up 3 days           0.0.0.0:6379->6379/tcp   cache
          9s0t1u2v3w4x        elasticsearch:8.5.0      Up 3 days           0.0.0.0:9200->9200/tcp   search
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">Docker version 24.0.5, build ced0996</span>
          Try 'docker ps' to see running containers
        `;
      }
    },
    terraform: (args) => {
      if (args[0] === 'plan') {
        return `
          <span style="color: var(--accent);">Terraform Infrastructure Plan</span>
          
          <span style="color: #4CAF50;">+ aws_lambda_function.data_processor</span>
          <span style="color: #4CAF50;">+ aws_api_gateway_rest_api.healthcare_api</span>
          <span style="color: #FFEB3B;">~ aws_security_group.database_sg</span>
          <span style="color: #F44336;">- aws_instance.legacy_server</span>
          
          Plan: <span style="color: #4CAF50;">5 to add</span>, <span style="color: #FFEB3B;">3 to change</span>, <span style="color: #F44336;">1 to destroy</span>
          
          Estimated cost: $352.70/month (+$47.20)
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">Terraform v1.5.7</span>
          Try 'terraform plan' to see infrastructure changes
        `;
      }
    },
    kubernetes: (args) => {
      if (args[0] === 'status') {
        return `
          <span style="color: var(--accent);">Kubernetes Cluster Status</span>
          
          <span style="color: #4CAF50;">● api-gateway</span> - 3/3 replicas running
          <span style="color: #4CAF50;">● auth-service</span> - 2/2 replicas running
          <span style="color: #FFEB3B;">● patient-data</span> - 1/2 replicas running
          <span style="color: #4CAF50;">● analytics</span> - 1/1 replicas running
          <span style="color: #4CAF50;">● monitoring</span> - 2/2 replicas running
          
          Resource usage:
          CPU: 67% | Memory: 58% | Storage: 43%
          
          <span style="color: #FFEB3B;">Alert:</span> patient-data pod restart detected
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">Kubernetes v1.28.0</span>
          Try 'kubernetes status' to check cluster health
        `;
      }
    },
    python: (args) => {
      if (args[0] === '--version') {
        return `
          <span style="color: var(--accent);">Python 3.11.4</span>
          
          <span style="color: var(--text-secondary);">Installed packages:</span>
          tensorflow==2.13.0
          pandas==2.0.3
          scikit-learn==1.3.0
          numpy==1.24.3
          boto3==1.28.17
          flask==2.3.2
          django==4.2.3
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">Python 3.11.4</span>
          Try 'python --version' to see installed packages
        `;
      }
    },
    react: (args) => {
      if (args[0] === 'start') {
        let startupLines = '';
        const steps = [
          'Compiling...',
          'Loading webpack configuration...',
          'Starting development server...',
          'Compiling TypeScript...',
          'Bundling modules...',
          'Compiled successfully!'
        ];
        
        steps.forEach((step, i) => {
          startupLines += `<div style="color: ${i === steps.length - 1 ? '#4CAF50' : 'var(--text-secondary)'};">${step}</div>`;
        });
        
        return `
          <span style="color: var(--accent);">React Development Server</span>
          ${startupLines}
          <span style="color: var(--neon-pink);">Local:</span>            http://localhost:3000
          <span style="color: var(--neon-pink);">On Your Network:</span>  http://192.168.1.5:3000
          
          Note that the development build is not optimized.
          To create a production build, use npm run build.
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">React CLI v18.2.0</span>
          Try 'react start' to start a development server
        `;
      }
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
    hipaa: (args) => {
      if (args[0] === 'audit') {
        return `
          <span style="color: var(--accent);">HIPAA Compliance Audit</span>
          
          <span style="color: #4CAF50;">✓ Authentication & Access Controls</span>
          - Multi-factor authentication enabled
          - Role-based access control validated
          - Password policies compliant
          
          <span style="color: #4CAF50;">✓ Encryption Standards</span>
          - Data at rest: AES-256 encryption
          - Data in transit: TLS 1.3 verified
          - Encryption key management secure
          
          <span style="color: #FFEB3B;">⚠ Audit Logging</span>
          - Missing log rotation policy
          - Recommendation: Implement 90-day retention policy
          
          <span style="color: #4CAF50;">✓ Business Associate Agreements</span>
          - All vendor BAAs up to date
          - Data processing agreements reviewed
          
          <span style="color: #4CAF50;">✓ Backup & Disaster Recovery</span>
          - Daily backups verified
          - Recovery time objectives met
          
          <span style="color: var(--neon-pink);">Overall Compliance Score: 96%</span>
          <span style="color: var(--text-secondary);">Last Full Audit: 26 days ago</span>
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">HIPAA Compliance Tool v3.2</span>
          Try 'hipaa audit' to check compliance status
        `;
      }
    },
    laravel: (args) => {
      if (args[0] === 'deploy') {
        let deployLines = '';
        const steps = [
          'Initiating Laravel deployment process...',
          'Running composer install --no-dev --optimize-autoloader...',
          'Clearing application cache...',
          'Running database migrations...',
          'Optimizing route caching...',
          'Building frontend assets with npm...',
          'Restarting queue workers...',
          'Deployment complete!'
        ];
        
        steps.forEach((step, i) => {
          deployLines += `<div style="color: ${i === steps.length - 1 ? '#4CAF50' : 'var(--text-secondary)'};">${step}</div>`;
        });
        
        return `
          <span style="color: var(--accent);">Laravel Deployment</span>
          ${deployLines}
          
          <span style="color: var(--neon-pink);">Environment:</span> production
          <span style="color: var(--neon-pink);">Application Version:</span> 3.5.2
          <span style="color: var(--neon-pink);">Deployment Time:</span> 127 seconds
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">Laravel Framework v10.2.3</span>
          Try 'laravel deploy' to deploy the application
        `;
      }
    },
    npm: (args) => {
      if (args[0] === 'run') {
        return `
          <span style="color: var(--accent);">NPM Scripts</span>
          
          <span style="color: var(--text-secondary);">Available scripts:</span>
          <span style="color: var(--neon-pink);">dev</span> - Start development server
          <span style="color: var(--neon-pink);">build</span> - Build for production
          <span style="color: var(--neon-pink);">test</span> - Run test suite
          <span style="color: var(--neon-pink);">lint</span> - Lint codebase
          <span style="color: var(--neon-pink);">deploy</span> - Deploy to production
          
          <span style="color: var(--text-secondary);">Usage:</span> npm run [script]
        `;
      } else {
        return `
          <span style="color: var(--text-secondary);">npm v9.8.0</span>
          <span style="color: var(--text-secondary);">node v18.17.1</span>
          Try 'npm run' to see available scripts
        `;
      }
    },
    ls: () => {
      return `
        <span style="color: var(--accent);">Directory Contents</span>
        
        <span style="color: var(--neon-pink);">📂 projects/</span>
        <span style="color: var(--neon-pink);">📂 skills/</span>
        <span style="color: var(--neon-pink);">📂 experience/</span>
        <span style="color: var(--neon-pink);">📂 contact/</span>
        <span style="color: var(--text-secondary);">📄 README.md</span>
        <span style="color: var(--text-secondary);">📄 package.json</span>
        <span style="color: var(--text-secondary);">📄 webpack.config.js</span>
        <span style="color: var(--text-secondary);">📄 tsconfig.json</span>
      `;
    },
    whoami: () => {
      // Browser detection
      const userAgent = navigator.userAgent;
      let browser = "Unknown";
      let os = "Unknown";
      
      // Detect browser
      if (userAgent.indexOf("Firefox") > -1) {
        browser = "Mozilla Firefox";
      } else if (userAgent.indexOf("SamsungBrowser") > -1) {
        browser = "Samsung Browser";
      } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        browser = "Opera";
      } else if (userAgent.indexOf("Trident") > -1) {
        browser = "Internet Explorer";
      } else if (userAgent.indexOf("Edge") > -1) {
        browser = "Microsoft Edge";
      } else if (userAgent.indexOf("Chrome") > -1) {
        browser = "Google Chrome";
      } else if (userAgent.indexOf("Safari") > -1) {
        browser = "Safari";
      }
      
      // Detect OS
      if (userAgent.indexOf("Windows NT 10.0") > -1) os = "Windows 10";
      else if (userAgent.indexOf("Windows NT 6.3") > -1) os = "Windows 8.1";
      else if (userAgent.indexOf("Windows NT 6.2") > -1) os = "Windows 8";
      else if (userAgent.indexOf("Windows NT 6.1") > -1) os = "Windows 7";
      else if (userAgent.indexOf("Windows NT 6.0") > -1) os = "Windows Vista";
      else if (userAgent.indexOf("Windows NT 5.1") > -1) os = "Windows XP";
      else if (userAgent.indexOf("Windows NT 5.0") > -1) os = "Windows 2000";
      else if (userAgent.indexOf("Mac") > -1) os = "macOS";
      else if (userAgent.indexOf("X11") > -1) os = "UNIX";
      else if (userAgent.indexOf("Linux") > -1) os = "Linux";
      else if (userAgent.indexOf("Android") > -1) os = "Android";
      else if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) os = "iOS";
      
      // Get screen resolution
      const screenRes = `${window.screen.width}x${window.screen.height}`;
      
      // Add a random ID that looks like an IP but is just random
      const fakeIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      
      return `
        <span style="color: var(--accent);">User Information</span>
        
        <span style="color: var(--neon-pink);">Username:</span> visitor
        <span style="color: var(--neon-pink);">Full Name:</span> Portfolio Guest
        <span style="color: var(--neon-pink);">Browser:</span> ${browser}
        <span style="color: var(--neon-pink);">Operating System:</span> ${os}
        <span style="color: var(--neon-pink);">Display Resolution:</span> ${screenRes}
        <span style="color: var(--neon-pink);">IP Address:</span> ${fakeIP}
        <span style="color: var(--neon-pink);">Login Time:</span> ${new Date().toLocaleTimeString()}
        <span style="color: var(--neon-pink);">Session ID:</span> ${Math.random().toString(36).substring(2, 10)}
        
        <span style="color: var(--text-secondary);">Note: This is just a fun simulation. No actual system information is being accessed or stored.</span>
      `;
    },
    hack: (args) => {
      if (args.length === 0) {
        return `
          <span style="color: var(--neon-pink);">Usage: hack [target]</span>
          <span style="color: var(--text-secondary);">Example: hack nasa</span>
        `;
      }
      
      const target = args[0].toLowerCase();
      const progressSteps = [10, 25, 40, 60, 75, 90, 100];
      let hackOutput = `<span style="color: var(--accent);">Attempting to hack ${target}...</span>\n`;
      
      // Generate fake hacking sequence
      progressSteps.forEach(progress => {
        hackOutput += `<div>[${progress}%] Exploiting vulnerabilities...</div>`;
      });
      
      // Responses for different targets
      if (target === "nasa" || target === "fbi" || target === "cia" || target === "pentagon") {
        hackOutput += `
          <span style="color: var(--neon-pink);">ACCESS DENIED! This incident has been reported.</span>
          <span style="color: var(--text-secondary);">Just kidding! This is just a portfolio demo. But seriously, don't try to hack government agencies.</span>
          <span style="color: var(--text-secondary);">Fun fact: In the real world, this would be extremely illegal.</span>
        `;
      } else if (target === "google" || target === "facebook" || target === "twitter" || target === "amazon") {
        hackOutput += `
          <span style="color: var(--neon-pink);">Nice try! Their security is pretty good.</span>
          <span style="color: var(--text-secondary);">This is a simulation. Big tech companies have excellent security teams.</span>
          <span style="color: var(--accent);">Did you know? Many of these companies offer bug bounty programs!</span>
        `;
      } else if (target === "portfolio" || target === "rashed" || target === "website") {
        hackOutput += `
          <span style="color: var(--accent);">Success! You've hacked... yourself.</span>
          <span style="color: var(--text-secondary);">Congratulations, you're looking at the 'hacked' website right now! 🎉</span>
        `;
      } else {
        hackOutput += `
          <span style="color: var(--accent);">Simulated hack complete (not really)!</span>
          <span style="color: var(--text-secondary);">This is just a fun demo. No actual hacking is taking place.</span>
          <span style="color: var(--text-secondary);">Remember: Always practice ethical hacking and get proper authorization.</span>
        `;
      }
      
      return hackOutput;
    },
    sudo: (args) => {
      if (args.length === 0) {
        return `
          <span style="color: var(--neon-pink);">Usage: sudo [command]</span>
          <span style="color: var(--text-secondary);">Example: sudo npm install</span>
        `;
      }
      
      // When someone tries to use sudo, give them a funny response
      return `
        <span style="color: var(--neon-pink);">Nice try! 🔒</span>
        <span style="color: var(--text-secondary);">This may come as a shock, but this isn't actually a real terminal.</span>
        <span style="color: var(--text-secondary);">Password incorrect. Also, there's no actual password. It's a website!</span>
        <span style="color: var(--accent);">Joke: "Sudo make me a sandwich." "Ok."</span>
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
    neofetch: () => {
      const userAgent = navigator.userAgent;
      let os = "Unknown OS";
      
      if (userAgent.indexOf("Windows") > -1) os = "Windows";
      else if (userAgent.indexOf("Mac") > -1) os = "macOS";
      else if (userAgent.indexOf("Linux") > -1) os = "Linux";
      else if (userAgent.indexOf("Android") > -1) os = "Android";
      else if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) os = "iOS";
      
      const asciiArt = os === "Windows" ? 
        `<span style="color: var(--neon-pink);">
                      ,--------------,
                    ,'               ,
                   /                  \\
                  |                    |
                  |                    |
                   \\                  /
                    \`._           _,'
                       \`-----------'
        </span>` : 
        `<span style="color: var(--accent);">
                 .:'
             __ :'__
          .'´__\`-'__\`\`.
         :__________.-'
         :_________:
          :_________\`-;
           \`.__.-.__.'
        </span>`;
      
      return `
        ${asciiArt}
        <span style="color: var(--accent);">user@portfolio</span>
        <span style="color: var(--text-secondary);">---------------------</span>
        <span style="color: var(--neon-pink);">OS:</span> ${os} (Browser-based simulation)
        <span style="color: var(--neon-pink);">Host:</span> GitHub Pages
        <span style="color: var(--neon-pink);">Kernel:</span> Browser ${navigator.appVersion.split(' ')[0]}
        <span style="color: var(--neon-pink);">Uptime:</span> ${Math.floor(Math.random() * 60)} mins
        <span style="color: var(--neon-pink);">Packages:</span> ${Math.floor(Math.random() * 1000) + 500} (npm)
        <span style="color: var(--neon-pink);">Shell:</span> portfolio-bash 4.4
        <span style="color: var(--neon-pink);">Terminal:</span> Rashed's Portfolio Terminal
        <span style="color: var(--neon-pink);">CPU:</span> Web Browser @ ${Math.floor(Math.random() * 4) + 1}.${Math.floor(Math.random() * 9)}GHz
        <span style="color: var(--neon-pink);">Memory:</span> ${Math.floor(Math.random() * 8) + 2}GB / 16GB
        
        <span style="color: var(--text-secondary);">Note: This is just a fun simulation of the neofetch command.</span>
      `;
    },
    uname: (args) => {
      if (args[0] === '-a') {
        const browser = navigator.userAgent.match(/(firefox|msie|chrome|safari)[\/\s]*([\d.]+)/i);
        const browserName = browser ? browser[1] : "unknown";
        const browserVersion = browser ? browser[2] : "0.0";
        
        return `
          <span style="color: var(--text-secondary);">Web-Browser ${browserName} ${browserVersion} Portfolio Terminal ${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)} #1 SMP PREEMPT Portfolio ${new Date().toISOString().split('T')[0]} (${Math.floor(Math.random() * 90) + 10}-generic)</span>
        `;
      }
      
      return `
        <span style="color: var(--text-secondary);">Web-Browser</span>
        <span style="color: var(--text-secondary);">Try 'uname -a' for more information.</span>
      `;
    },
    rm: (args) => {
      if (args[0] === '-rf' && args[1] === '/') {
        // When someone tries to delete everything
        return `
          <span style="color: var(--neon-pink);">Nice try! 🔒</span>
          <span style="color: var(--text-secondary);">rm: it is dangerous to operate recursively on '/'</span>
          <span style="color: var(--text-secondary);">rm: use --no-preserve-root to override this failsafe</span>
          <span style="color: var(--accent);">Just kidding! This is a portfolio website, not a real terminal.</span>
          <span style="color: var(--accent);">Your computer is safe! 😄</span>
        `;
      }
      
      return `
        <span style="color: var(--text-secondary);">rm: cannot remove '${args[args.length - 1]}': No such file or directory</span>
        <span style="color: var(--text-secondary);">Note: This is a simulated terminal. No files will be deleted.</span>
      `;
    },
    joke: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why did the developer go broke? Because he used up all his cache!",
        "Why do Java developers wear glasses? Because they don't C#!",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
        "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
        "Why was the JavaScript developer sad? Because he didn't know how to null his feelings!",
        "What's a pirate's favorite programming language? R!",
        "Why did the functions stop calling each other? They had too many arguments!",
        "How do you comfort a JavaScript bug? You console it!",
        "Why did the developer go broke? Because he used up all his cache!",
        "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25!",
        "Why do programmers hate nature? It has too many bugs!",
        "Why don't programmers like to go outside? The sunlight causes too many reflections!",
        "Why do programmers always confuse Halloween and Christmas? Because Oct 31 == Dec 25."
      ];
      
      return `
        <span style="color: var(--accent);">Developer Joke:</span>
        <span style="color: var(--text-secondary);">${jokes[Math.floor(Math.random() * jokes.length)]}</span>
      `;
    },
    ai: (args) => {
      if (args.length === 0) {
        return `
          <span style="color: var(--neon-pink);">Usage: ai [command] [prompt]</span>
          <span style="color: var(--text-secondary);">Commands: chat, generate, predict</span>
          <span style="color: var(--text-secondary);">Example: ai chat Tell me about quantum computing</span>
        `;
      }
      
      const subCommand = args[0];
      const prompt = args.slice(1).join(' ');
      
      if (!prompt) {
        return `
          <span style="color: var(--neon-pink);">Please provide a prompt.</span>
          <span style="color: var(--text-secondary);">Example: ai ${subCommand} Tell me about quantum computing</span>
        `;
      }
      
      let aiOutput = `<span style="color: var(--accent);">AI Assistant (${subCommand}):</span><br>`;
      aiOutput += `<span style="color: var(--text-secondary);">Query: "${prompt}"</span><br>`;
      
      // Show typing animation
      const typingAnimation = `
        <div class="ai-typing">
          <div class="ai-typing-dot"></div>
          <div class="ai-typing-dot"></div>
          <div class="ai-typing-dot"></div>
        </div>
      `;
      
      terminalOutput.innerHTML += `<div>${aiOutput}${typingAnimation}</div>`;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      
      // Simulate AI thinking
      setTimeout(() => {
        // Remove typing animation
        const lastOutput = terminalOutput.lastElementChild;
        if (lastOutput) {
          lastOutput.innerHTML = aiOutput;
        }
        
        let response = '';
        
        if (subCommand === 'chat') {
          // Simulated AI chat responses based on keywords in the prompt
          if (prompt.match(/quantum|physics|computer|computing/i)) {
            response = "Quantum computing leverages quantum mechanics to process information in ways classical computers cannot. Unlike traditional bits, quantum bits (qubits) can exist in multiple states simultaneously through superposition, enabling parallel computation at scale. Current quantum systems are still experimental but show promise for cryptography, optimization problems, and simulating quantum systems.";
          } else if (prompt.match(/machine learning|ml|ai|artificial intelligence|deep learning/i)) {
            response = "Machine learning is a subset of AI that enables systems to learn from data without explicit programming. Deep learning, a specialized form that uses neural networks with many layers, has revolutionized fields like computer vision and natural language processing. The field continues to evolve with techniques like transformers, reinforcement learning, and generative models creating increasingly capable AI systems.";
          } else if (prompt.match(/web|development|code|programming|software/i)) {
            response = "Modern web development encompasses a vast ecosystem of frameworks, languages, and tools. Front-end technologies like React, Vue, and Angular enable dynamic user interfaces, while back-end systems might use Node.js, Python, or Go. Full-stack developers work across both domains, often implementing DevOps practices and cloud services for deployment. Web Assembly, Progressive Web Apps, and serverless architectures represent cutting-edge innovations in the field.";
          } else {
            response = "I'm a simulated AI assistant on this portfolio site. While I can provide information on various topics like technology, science, and programming, I don't have real-time capabilities or access to external data. This is a demonstration of how AI interfaces might work in web applications. For comprehensive AI assistance, consider tools like ChatGPT, Claude, or other dedicated AI platforms.";
          }
        } else if (subCommand === 'generate') {
          // Simulated code generation
          if (prompt.match(/react|component|jsx/i)) {
            response = `<pre style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; overflow-x: auto;">import React, { useState, useEffect } from 'react';

const AIComponent = ({ prompt, temperature = 0.7 }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const generateResponse = async () => {
      if (!prompt) return;
      
      setLoading(true);
      try {
        // In a real component, this would call an AI API
        const result = await fetchAIResponse(prompt, temperature);
        setResponse(result);
      } catch (error) {
        console.error('AI generation failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    generateResponse();
  }, [prompt, temperature]);
  
  return (
    <div className="ai-response-container">
      {loading ? (
        <div className="loading-indicator">Generating response...</div>
      ) : (
        <div className="response">{response}</div>
      )}
    </div>
  );
};

export default AIComponent;</pre>`;
          } else if (prompt.match(/python|machine learning|ml|algorithm/i)) {
            response = `<pre style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; overflow-x: auto;">import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

def train_ai_model(data, labels, test_size=0.2, random_state=42):
    """
    Train a machine learning model on the provided data.
    
    Args:
        data: Features for training
        labels: Target values
        test_size: Proportion of data to use for testing
        random_state: Random seed for reproducibility
    
    Returns:
        Trained model and performance metrics
    """
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        data, labels, test_size=test_size, random_state=random_state
    )
    
    # Initialize and train model
    model = RandomForestClassifier(n_estimators=100, random_state=random_state)
    model.fit(X_train, y_train)
    
    # Evaluate model
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    report = classification_report(y_test, predictions)
    
    return {
        'model': model,
        'accuracy': accuracy,
        'report': report,
        'feature_importance': model.feature_importances_
    }

# Example usage
if __name__ == "__main__":
    # Generate synthetic data
    X = np.random.randn(1000, 10)
    y = (X[:, 0] + X[:, 1] > 0).astype(int)
    
    results = train_ai_model(X, y)
    print(f"Model accuracy: {results['accuracy']:.2f}")
    print(f"\\nClassification report:\\n{results['report']}")</pre>`;
          } else {
            response = "I can generate sample code snippets based on prompts. Try specifying a programming language or framework like \"generate a React component for user authentication\" or \"generate a Python script for data analysis\".";
          }
        } else if (subCommand === 'predict') {
          // Simulated predictions
          if (prompt.match(/stock|market|price|trend|investment/i)) {
            const stockNames = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'META'];
            const randomStock = stockNames[Math.floor(Math.random() * stockNames.length)];
            const currentValue = (Math.random() * 200 + 100).toFixed(2);
            const prediction = (currentValue * (Math.random() * 0.2 + 0.9)).toFixed(2);
            const sentiment = Math.random() > 0.5 ? 'Bullish' : 'Bearish';
            const confidence = (Math.random() * 30 + 70).toFixed(1);
            
            response = `<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 5px;">
  <div style="font-weight: bold; color: var(--accent);">Market Prediction for ${randomStock}</div>
  <div>Current Value: $${currentValue}</div>
  <div>Predicted Value (30 days): $${prediction}</div>
  <div>Sentiment: ${sentiment}</div>
  <div>Confidence: ${confidence}%</div>
  <div style="font-size: 0.8em; margin-top: 10px; color: var(--text-secondary);">
    Note: This is a simulated prediction for demonstration purposes only. Never make investment decisions based on simulated data.
  </div>
</div>`;
          } else if (prompt.match(/weather|temperature|forecast|rain|snow/i)) {
            const cities = ['New York', 'London', 'Tokyo', 'Sydney', 'Paris', 'Berlin'];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const currentTemp = Math.floor(Math.random() * 30 + 5);
            const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy', 'Thunderstorms', 'Snowy', 'Foggy'];
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
            
            response = `<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 5px;">
  <div style="font-weight: bold; color: var(--accent);">Weather Forecast for ${randomCity}</div>
  <div>Current Temperature: ${currentTemp}°C</div>
  <div>Conditions: ${randomCondition}</div>
  <div>Humidity: ${Math.floor(Math.random() * 50 + 30)}%</div>
  <div>Wind: ${Math.floor(Math.random() * 20 + 5)} km/h</div>
  <div style="font-size: 0.8em; margin-top: 10px; color: var(--text-secondary);">
    Note: This is a simulated forecast for demonstration purposes only.
  </div>
</div>`;
          } else {
            response = "I can make predictions in various domains like weather forecasts, market trends, or traffic patterns. Try asking something like \"predict stock market trends\" or \"predict weather for tomorrow\".";
          }
        } else {
          response = "Unknown AI command. Available commands: chat, generate, predict";
        }
        
        // Add response with typing effect
        let i = 0;
        const typeResponse = () => {
          if (i < response.length) {
            const lastOutput = terminalOutput.lastElementChild;
            if (lastOutput) {
              lastOutput.innerHTML = aiOutput + response.substring(0, i + 1);
              terminalOutput.scrollTop = terminalOutput.scrollHeight;
              i++;
              
              // Type faster for longer responses
              const typingSpeed = response.length > 500 ? 5 : 15;
              setTimeout(typeResponse, typingSpeed);
            }
          }
        };
        
        typeResponse();
      }, 1500);
      
      return null; // Return null to prevent default output handling
    },
  };

// Handle input with history
terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value;
    if (cmd.trim() !== '') {
      commandHistory.unshift(cmd);
      commandHistory.push(cmd);
      historyIndex = commandHistory.length;
    }
    processCommand(cmd);
    terminalInput.value = '';
  } else if (e.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--;
      terminalInput.value = commandHistory[historyIndex];
      // Move cursor to end
      setTimeout(() => {
        terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
      }, 0);
    }
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      terminalInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      terminalInput.value = '';
    }
    e.preventDefault();
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

// Process commands
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
  
  if (commands[mainCommand]) {
    const output = commands[mainCommand](args.slice(1));
    if (output) {
      terminalOutput.innerHTML += `<div>${output}</div>`;
    }
  } else if (mainCommand === 'rm' && args.length > 1) {
    // Special case for rm -rf
    const output = commands.rm(args.slice(1));
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
  }
} 
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
  
  // Define command implementations
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
      
      return `
        <span style="color: var(--neon-pink);">HACK SIMULATION: ${targetDisplayName}</span>
        
        <span style="color: var(--text-secondary);">Initializing attack vectors...</span>
        <span style="color: var(--text-secondary);">Scanning for vulnerabilities...</span>
        <span style="color: var(--text-secondary);">Establishing secure connection...</span>
        <span style="color: var(--text-secondary);">Bypassing firewall...</span>
        <span style="color: var(--text-secondary);">Cracking passwords...</span>
        <span style="color: var(--text-secondary);">Gaining system access...</span>
        
        <span style="color: var(--accent);">ACCESS DENIED</span>
        <span style="color: var(--text-secondary);">This is just a simulation! No actual hacking is happening.</span>
        <span style="color: var(--text-secondary);">Hacking is illegal and unethical unless you have explicit permission.</span>
        <span style="color: var(--text-secondary);">This command is just for fun in this portfolio demo.</span>
      `;
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
        
        // Simulate typing response with a delay
        setTimeout(() => {
          const aiResponses = {
            "hello": "Hello! How can I assist you with your software development or technology needs today?",
            "help": "I can help with various topics including programming, cloud infrastructure, healthcare tech, or development practices. Just ask a specific question!",
            "default": `Based on your query about "${prompt}", I'd suggest exploring modern development frameworks and cloud-native architectures. Would you like more specific information about any particular technology?`
          };
          
          let response = aiResponses[prompt.toLowerCase()] || aiResponses.default;
          
          // Remove the typing indicator and add the response
          const typingElement = document.querySelector('.ai-typing');
          if (typingElement) {
            typingElement.parentNode.removeChild(typingElement);
          }
          
          terminalOutput.innerHTML += `<div><span style="color: var(--accent);">AI Assistant:</span> ${response}</div>`;
          terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, 1500);
        
        return `
          <span style="color: var(--neon-pink);">AI processing: "${prompt}"</span>
          <div class="ai-typing">
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
            <div class="ai-typing-dot"></div>
          </div>
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
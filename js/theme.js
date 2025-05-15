document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('themeToggle');
  
  if (toggleBtn) {
    // Apply theme transition effect
    const applyThemeTransition = (isLight) => {
      // Create and append transition overlay
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = isLight ? '#ffffff' : '#0a192f';
      overlay.style.zIndex = '9999';
      overlay.style.pointerEvents = 'none';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease-in-out';
      document.body.appendChild(overlay);
      
      // Trigger transition
      setTimeout(() => {
        overlay.style.opacity = '0.3';
        
        setTimeout(() => {
          // Apply theme
          if (isLight) {
            document.body.classList.add('light');
            document.querySelector('nav')?.classList.add('light');
          } else {
            document.body.classList.remove('light');
            document.querySelector('nav')?.classList.remove('light');
          }
          
          // Fade out overlay
          setTimeout(() => {
            overlay.style.opacity = '0';
            
            // Remove overlay after transition
            setTimeout(() => {
              document.body.removeChild(overlay);
            }, 300);
          }, 200);
        }, 200);
      }, 0);
    };
    
    toggleBtn.onclick = () => {
      const isLight = !document.body.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      applyThemeTransition(isLight);
    };
  }
  
  // Apply saved theme on page load
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
    document.querySelector('nav')?.classList.add('light');
  }
  
  // Add floating particles
  const createFloatingParticles = () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-5';
    document.body.appendChild(particlesContainer);
    
    // Create particles
    const particleCount = 50;
    const colors = ['#64ffda', '#ff2e63', '#7b2cbf'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 5 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      
      // Animation
      const duration = Math.random() * 40 + 20;
      particle.style.animation = `float ${duration}s linear infinite`;
      particle.style.animationDelay = `-${Math.random() * duration}s`;
      
      particlesContainer.appendChild(particle);
    }
    
    // Add keyframes for floating animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% {
          transform: translate(0, 0) rotate(0deg);
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
        }
        100% {
          transform: translate(0, 0) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  };
  
  createFloatingParticles();
}); 
// AI Chat Implementation using Hugging Face API (HugChat)
class PortfolioChat {
    constructor() {
        this.conversationHistory = [];
        this.isTyping = false;
        this.API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
        // Obfuscate API key
        const prefix = String.fromCharCode(104, 102, 95); // 'hf_'
        const key = 'RBCcnHcoGMQyBKDlAIOzuZdtQzdByCPKJw';
        this.API_KEY = prefix + key;
        this.setupCursor();
    }

    setupCursor() {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        // Create cursor trail elements
        const trailElements = Array.from({ length: 5 }, () => {
            const trail = document.createElement('div');
            trail.className = 'custom-cursor-trail';
            document.body.appendChild(trail);
            return trail;
        });

        let mouseX = 0;
        let mouseY = 0;
        let trailX = Array(5).fill(0);
        let trailY = Array(5).fill(0);

        // Update cursor position with smooth movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor movement animation
        function animateCursor() {
            // Update main cursor
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';

            // Update trail elements with delay
            trailElements.forEach((trail, index) => {
                const delay = index * 2;
                setTimeout(() => {
                    trailX[index] += (mouseX - trailX[index]) * 0.3;
                    trailY[index] += (mouseY - trailY[index]) * 0.3;
                    trail.style.left = trailX[index] + 'px';
                    trail.style.top = trailY[index] + 'px';
                    trail.style.opacity = 0.3 - (index * 0.05);
                }, delay);
            });

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Add hover effect
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .chat-container *, .nav-links a, .logo, .submit-btn, .minimize-btn, .send-btn, .chat-input');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                trailElements.forEach(trail => trail.classList.add('hover'));
            });
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                trailElements.forEach(trail => trail.classList.remove('hover'));
            });
        });

        // Add click effect
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
            trailElements.forEach(trail => trail.classList.add('click'));
        });
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
            trailElements.forEach(trail => trail.classList.remove('click'));
        });
    }

    async findAnswer(question) {
        if (this.isTyping) return;
        this.isTyping = true;

        try {
            // Add user message to history
            this.conversationHistory.push({ role: 'user', content: question });

            // Format conversation history for Hugging Face
            const prompt = `<|system|>
You are an AI assistant for Rashed M Omar's portfolio website. You have the following information about Rashed:

About Rashed:
- Full Stack Developer and DevOps Engineer
- Based in the United States
- Passionate about creating innovative solutions and optimizing development workflows
- Experienced in both frontend and backend development

Technical Skills:
- Frontend: React, Vue.js, Angular, HTML5, CSS3, JavaScript/TypeScript
- Backend: Node.js, Python, Java, Spring Boot, Express.js
- DevOps: Docker, Kubernetes, AWS, CI/CD, Jenkins, GitLab CI
- Databases: MongoDB, PostgreSQL, MySQL
- Other: RESTful APIs, GraphQL, Microservices, Agile methodologies

Experience:
- Full Stack Developer at TechCorp (2020-2022)
  * Developed and maintained web applications
  * Implemented CI/CD pipelines
  * Collaborated with cross-functional teams

- DevOps Engineer at CloudSolutions (2018-2020)
  * Managed cloud infrastructure
  * Automated deployment processes
  * Optimized system performance

Projects:
1. E-commerce Platform
   - Built with React and Node.js
   - Features: User authentication, product management, payment integration
   - Technologies: MongoDB, Express.js, Redux

2. Task Management System
   - Vue.js frontend with Spring Boot backend
   - Features: Real-time updates, team collaboration
   - Technologies: WebSocket, JWT authentication

3. Cloud Infrastructure Automation
   - Automated deployment using AWS and Terraform
   - Implemented monitoring and logging solutions
   - Technologies: Docker, Kubernetes, Jenkins

Keep your responses concise and relevant to the user's question. If asked about Rashed's skills, experience, or projects, provide specific details from the information above. For other questions, respond naturally while maintaining professionalism.
</|system|>
${this.conversationHistory
    .map(msg => `<|${msg.role === 'user' ? 'user' : 'assistant'}|>\n${msg.content}</|${msg.role === 'user' ? 'user' : 'assistant'}|>`)
    .join('\n')}
<|assistant|>`;

            // Call the Hugging Face API
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 250,
                        temperature: 0.7,
                        top_p: 0.9,
                        repetition_penalty: 1.1,
                        return_full_text: false,
                        do_sample: true
                    }
                }),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            let answer = data[0]?.generated_text?.trim() || "I'm sorry, I couldn't generate a response at the moment.";
            
            // Clean up the response if it contains any system or user tags
            answer = answer.replace(/<\|(system|user|assistant)\|>/g, '').trim();

            // Add AI response to history
            this.conversationHistory.push({ role: 'assistant', content: answer });
            this.isTyping = false;

            return answer;
        } catch (error) {
            console.error('Error:', error);
            this.isTyping = false;
            return "I'm having trouble connecting to my brain right now. Please try again in a moment.";
        }
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chat = new PortfolioChat();
    
    // Create a floating action button for chat
    const fab = document.createElement('div');
    fab.className = 'chat-fab';
    fab.innerHTML = `
        <div class="fab-content">
            <span class="fab-icon">💬</span>
            <span class="fab-text">Chat</span>
        </div>
    `;
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: #00ff00;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999999;
        box-shadow: 0 4px 20px rgba(0, 255, 0, 0.6);
        transition: all 0.3s ease;
        overflow: hidden;
    `;

    const fabContent = fab.querySelector('.fab-content');
    fabContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 20px;
        white-space: nowrap;
        transition: all 0.3s ease;
    `;

    const fabIcon = fab.querySelector('.fab-icon');
    fabIcon.style.cssText = `
        font-size: 24px;
        color: #000;
    `;

    const fabText = fab.querySelector('.fab-text');
    fabText.style.cssText = `
        font-size: 18px;
        font-weight: bold;
        color: #000;
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s ease;
    `;

    // Expand on hover
    fab.addEventListener('mouseenter', () => {
        fab.style.width = '140px';
        fab.style.borderRadius = '30px';
        fabText.style.opacity = '1';
        fabText.style.transform = 'translateX(0)';
    });

    fab.addEventListener('mouseleave', () => {
        fab.style.width = '60px';
        fab.style.borderRadius = '50%';
        fabText.style.opacity = '0';
        fabText.style.transform = 'translateX(-10px)';
    });

    document.body.appendChild(fab);

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.style.display = 'none';
    chatContainer.innerHTML = `
        <div class="chat-header">
            <h3>AI Assistant</h3>
            <button class="minimize-btn">−</button>
        </div>
        <div class="chat-messages"></div>
        <div class="chat-input-container">
            <input type="text" class="chat-input" placeholder="Ask me anything...">
            <button class="send-btn">Send</button>
        </div>
    `;
    document.body.appendChild(chatContainer);

    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const input = chatContainer.querySelector('.chat-input');
    const sendBtn = chatContainer.querySelector('.send-btn');
    const minimizeBtn = chatContainer.querySelector('.minimize-btn');

    // Handle FAB click
    fab.addEventListener('click', () => {
        if (chatContainer.style.display === 'none') {
            chatContainer.style.display = 'flex';
            fab.style.transform = 'scale(0.8)';
            fab.style.opacity = '0.5';
        } else {
            chatContainer.style.display = 'none';
            fab.style.transform = 'scale(1)';
            fab.style.opacity = '1';
        }
    });

    // Update minimize button
    minimizeBtn.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        fab.style.transform = 'scale(1)';
        fab.style.opacity = '1';
    });

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    async function handleSend() {
        const question = input.value.trim();
        if (question) {
            addMessage(question, true);
            input.value = '';
            
            const typingIndicator = addTypingIndicator();
            const answer = await chat.findAnswer(question);
            typingIndicator.remove();
            addMessage(answer);
        }
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Add welcome message
    setTimeout(() => {
        addMessage("Hi! I'm your AI assistant. You can ask me about Rashed's skills, experience, projects, or anything else!");
    }, 1000);
});
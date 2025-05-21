// AI Chat Implementation using Hugging Face API (HugChat)
class PortfolioChat {
    constructor() {
        this.conversationHistory = [];
        this.isTyping = false;
        this.API_URL = "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta";
        // Obfuscate API key
        const prefix = String.fromCharCode(104, 102, 95);
        const pro = 'RBCcnHcoGMQ';
        const pro2 = 'yBKDlAIOzuZ';
        const key = 'dtQzdByCPKJw';
        this.API_KEY = prefix + pro + pro2 + key;
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
            <|assistant|>`;
            // Format conversation history for Hugging Face
            const prompt = `<|system|>
            ${systemPrompt}
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
            <span class="fab-text">Chat With Rashed Ai</span>
        </div>
    `;
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 80px;
        height: 80px;
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
        font-size: 32px;
        color: #000;
    `;

    const fabText = fab.querySelector('.fab-text');
    fabText.style.cssText = `
        font-size: 11px;
        font-weight: bold;
        color: #000;
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s ease;
    `;

    // Expand on hover
    fab.addEventListener('mouseenter', () => {
        fab.style.width = '200px';
        fab.style.borderRadius = '40px';
        fabText.style.opacity = '1';
        fabText.style.transform = 'translateX(0)';
    });

    fab.addEventListener('mouseleave', () => {
        fab.style.width = '80px';
        fab.style.borderRadius = '50%';
        fabText.style.opacity = '0';
        fabText.style.transform = 'translateX(-10px)';
    });

    document.body.appendChild(fab);

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.style.display = 'flex';
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

    // Hide FAB initially since chat is open
    fab.style.display = 'none';

    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const input = chatContainer.querySelector('.chat-input');
    const sendBtn = chatContainer.querySelector('.send-btn');
    const minimizeBtn = chatContainer.querySelector('.minimize-btn');

    // Handle FAB click
    fab.addEventListener('click', () => {
        if (chatContainer.style.display === 'none') {
            chatContainer.style.display = 'flex';
            fab.style.display = 'none'; // Hide FAB when chat is open
        } else {
            chatContainer.style.display = 'none';
            fab.style.display = 'flex'; // Show FAB when chat is closed
        }
    });

    // Update minimize button
    minimizeBtn.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        fab.style.display = 'flex'; // Show FAB when chat is minimized
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
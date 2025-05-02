const voiceContainer = document.getElementById('voice-assistant-container');
const chatContainer = document.getElementById('chatbot-container');
const toggleVoiceButton = document.getElementById('toggle-voice');
const toggleChatButton = document.getElementById('toggle-chat');
const startVoiceButton = document.getElementById('start-voice');
const voiceOutput = document.getElementById('voice-output');
const chatInput = document.getElementById('chat-input');
const sendChatButton = document.getElementById('send-chat');
const chatLog = document.getElementById('chat-log');
const projectList = document.getElementById('project-list');
const contactForm = document.getElementById('contact-form');
const contactMessageDiv = document.getElementById('contact-message');

// Fallback Project Data (if API fails or is not ready)
const fallbackProjectsData = [
    {
        title: 'Testing for DMRC Integration on IRCTC',
        description: 'Involved testing the integration between the Delhi Metro Rail Corporation (DMRC) and the IRCTC platform.',
        associatedWith: 'IRCTC',
        link: '#'
    },
    {
        title: 'IRCTC Travel Protect Integration Testing',
        description: 'Focused on testing the integration of the Travel Protect feature within the IRCTC system.',
        associatedWith: 'IRCTC',
        link: '#'
    },
    {
        title: 'IRCTC Web Application Model for E-Ticketing',
        description: 'Contributed to the development or analysis of the web application model for IRCTC\'s online E-Ticketing system.',
        associatedWith: 'IRCTC',
        link: '#'
    },
    {
        title: 'IRCTC Database Analysis for Loyalty Programme',
        description: 'Undertook database analysis activities for IRCTC\'s customer loyalty programme.',
        associatedWith: 'IRCTC',
        link: '#'
    },
    {
        title: 'IRCTC Web Page Designed for Loyalty Programme Detailing to Users',
        description: 'Designed a web page to provide detailed information about the IRCTC loyalty programme to users.',
        associatedWith: 'IRCTC',
        link: '#'
    },
    {
        title: 'Study on database support to regularise developing scenarios within systematic norms',
        description: 'Conducted a study on how database support can help regularise the development of scenarios within systematic norms.',
        associatedWith: 'NABENG TECHNO SOLUTIONS PVT. LTD',
        link: '#'
    }
];

// Voice Assistant Functionality
let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
        voiceOutput.innerText = 'Listening...';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        voiceOutput.innerText = `You said: ${transcript}`;
        processVoiceCommand(transcript);
    };

    recognition.onerror = (event) => {
        voiceOutput.innerText = `Error: ${event.error}`;
    };

    recognition.onend = () => {
        voiceOutput.innerText = 'Ready';
    };
} else {
    voiceContainer.innerText = 'Speech recognition not supported in this browser.';
    startVoiceButton.disabled = true;
}

startVoiceButton.addEventListener('click', () => {
    if (recognition) {
        recognition.start();
    }
});

function processVoiceCommand(command) {
    command = command.toLowerCase();

    // --- Navigation commands (including new sections) ---
    if (command.includes('go to') && command.includes('about')) {
        scrollToSection('about');
        speak('Navigating to the about section.');
    } else if (command.includes('go to') && command.includes('home')) {
        scrollToSection('home');
        speak('Navigating to the home page.');
    } else if (command.includes('go to') && command.includes('projects')) {
        scrollToSection('projects');
        speak('Navigating to the projects section.');
    } else if (command.includes('go to') && command.includes('contact')) {
        scrollToSection('contact');
        speak('Navigating to the contact section.');
    } else if (command.includes('go to') && command.includes('education')) {
        scrollToSection('education');
        speak('Navigating to the education section.');
    } else if (command.includes('go to') && command.includes('experience')) {
        scrollToSection('experience');
        speak('Navigating to the experience section.');
    }else if (command.includes('go to') && command.includes("jigyasu's portfolio")) {
        speak("Redirecting to the Jigyasu's Portfolio.");
		window.location.assign("https://jigyasu-vatsa.github.io/jigs-portfolio/")
    }else if (command.includes('go to') && command.includes("jigyasu portfolio")) {
        speak("Redirecting to the Jigyasu's Portfolio.");
		window.location.href=("https://jigyasu-vatsa.github.io/jigs-portfolio/")
    }

    // --- Project-related commands ---
    else if (command.includes('show') && (command.includes('latest') || command.includes('recent')) && (command.includes('projects') || command.includes('work'))) {
        scrollToSection('projects');
        speak('Here are some of my latest projects. You can scroll down to see more details.');
    } else if (command.includes('tell me about') && command.includes('dmrc integration')) {
        scrollToSection('projects');
        speak('The Testing for DMRC Integration on IRCTC project involved ensuring seamless integration between the Delhi Metro Rail Corporation and the IRCTC ticketing system.');
    }
    // ... (other project-related commands) ...

    // --- Skills-related commands ---
    else if (command.includes('what are your skills') || command.includes('tell me about your abilities')) {
        scrollToSection('about');
        const skillsText = document.querySelector('#about p') ? document.querySelector('#about p').textContent.substring(0, 200) + '...' : 'You can find details about my skills in the about section.';
        speak(`My skills include ${skillsText}`);
    }
    // ... (other skills-related commands) ...

    // --- Contact-related commands ---
    else if (command.includes('how can i contact you') || command.includes('get in touch')) {
        scrollToSection('contact');
        speak('You can find my contact information in the contact section below. Feel free to send me a message!');
    }


	// --- Quering Jigs for Chat Bot-related commands ---
    else if (command.includes('Chat Bot') || command.includes('Chat') || command.includes('bot') || command.includes('Jigs A chatbot')) {
        scrollToSection('contact');
        speak('Jigs A Chatbot will starts responding Soon!, As currently Jigs - A Voice Assistant Cum Chat Bot is in learning stage and works hard to grab featuristic responses');
    }


    // --- General commands ---
    else if (command.includes('hello') || command.includes('hi') || command.includes('greetings') || command.includes('Jigs')) {
        speak(`Hello! How can I help you explore my portfolio today?`);
    } else if (command.includes('open') && command.includes('github')) {
        speak('Opening my GitHub profile.');
        window.open('YOUR_GITHUB_PROFILE_URL', '_blank');
    } else if (command.includes('reload') || command.includes('refresh') || command.includes('restart')) {
        speak('Refreshing the portfolio.');
        window.location.reload();
    } else {
        speak('Could you please rephrase your request? I\'m still learning to understand more specific queries.');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    } else {
        speak(`Section "${sectionId}" not found.`);
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    } else {
        voiceOutput.innerText += ' (Speech synthesis not supported)';
    }
}

// Chatbot Toggle (remains the same)
toggleVoiceButton.addEventListener('click', () => {
    voiceContainer.classList.toggle('hidden');
    chatContainer.classList.add('hidden');
    if (recognition && !voiceContainer.classList.contains('hidden')) {
        voiceOutput.innerText = 'Ready';
    } else if (recognition && voiceContainer.classList.contains('hidden')) {
        recognition.stop();
        voiceOutput.innerText = '';
    }
});

toggleChatButton.addEventListener('click', () => {
    chatContainer.classList.toggle('hidden');
    voiceContainer.classList.add('hidden');
    if (recognition && !voiceContainer.classList.contains('hidden')) {
        recognition.stop();
        voiceOutput.innerText = '';
    }
});

// Chatbot Functionality (Placeholder - remains largely the same)
sendChatButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        appendMessage('user', message);
        chatInput.value = '';
        // Placeholder for sending message to backend and receiving response
        console.log('Sending chat message to backend (not implemented in this basic version):', message);
        setTimeout(() => {
            appendMessage('chatbot', 'Responding Soon!, Currently I\'m in learning stage....');
        }, 500);
    }
});

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(`${sender}-message`);
    messageDiv.innerText = text;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Fetch projects from the backend
fetch('/api/projects')
    .then(response => response.json())
    .then(projects => {
        renderProjects(projects);
    })
    .catch(error => {
        console.error('Error fetching projects:', error);
        // If fetching fails, render with fallback data
        renderProjects(fallbackProjectsData);
    });

// Function to dynamically render project cards
function renderProjects(projects) {
    projectList.innerHTML = '';
    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="associated-with"><strong>Associated With:</strong> ${project.associatedWith}</p>
            <a href="${project.link}" class="learn-more">Learn More</a>
        `;
        projectList.appendChild(card);
    });
}

// Handle contact form submission (remains the same)
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        contactMessageDiv.textContent = result.message;
        contactMessageDiv.className = 'success';
        contactMessageDiv.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => {
            contactMessageDiv.classList.add('hidden');
        }, 3000);
    })
    .catch(error => {
        console.error('Error submitting contact form:', error);
        contactMessageDiv.textContent = 'Failed to send message. Please try again later.';
        contactMessageDiv.className = 'error';
        contactMessageDiv.classList.remove('hidden');
    });
});

// Add functionality for the "Back to Top" button
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

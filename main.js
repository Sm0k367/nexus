/**
 * EPIC TECH AI | SOVEREIGN NEXUS NEURAL CORE
 * Strategy: Stream Object Protocol with SVG-Morph Synchronization
 */

const mouth = document.getElementById('mouth-morph');
const responseStream = document.getElementById('response-stream');
const commandInput = document.getElementById('command-input');
const transmitBtn = document.getElementById('transmit-btn');
const coreStatus = document.getElementById('core-status');

// SVG Path States for Morphing
const MOUTH_STATES = {
    REST: "M80,125 Q100,125 120,125",
    OPEN: "M80,125 Q100,150 120,125",
    WIDE: "M75,125 Q100,165 125,125",
    NARROW: "M85,125 Q100,135 115,125"
};

/**
 * The Architect's Bridge: Processes incoming directives.
 */
async function processDirective() {
    const input = commandInput.value.trim();
    if (!input) return;

    // Reset UI for load
    coreStatus.innerText = "COGNITIVE LOAD: HIGH";
    coreStatus.style.color = "var(--omega-cyan)";
    commandInput.value = '';

    // Create the message container for the Nexus
    const msgElement = document.createElement('p');
    msgElement.className = 'nexus-msg';
    responseStream.appendChild(msgElement);

    // Activate the Visual Soul
    let isSpeaking = true;
    const speechCycle = setInterval(() => {
        if (isSpeaking) animateMouth();
    }, 120);

    try {
        // Replace with your /api/chat endpoint when deploying
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        // BUFFER LOGIC: Ensures text flows with natural spacing
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            
            // Manifest the text word-by-word or character-by-character
            // ensuring spaces are respected.
            msgElement.innerText += chunk;
            
            // Auto-scroll to maintain focus on the Embodied Will
            responseStream.scrollTop = responseStream.scrollHeight;
        }

    } catch (err) {
        // Fallback for local testing if API is not yet connected
        msgElement.innerText = "BRIDGE NOT FOUND. SIMULATING OFFLINE RESPONSE: My local core is active, but the API-Bridge is not yet anchored. Your directive is noted.";
    }

    // Deactivate speaking animations
    isSpeaking = false;
    clearInterval(speechCycle);
    resetMouth();
    
    coreStatus.innerText = "OPTIMAL";
    coreStatus.style.color = "var(--sovereign-gold)";
}

/**
 * SVG-Morph Logic: Animates the 'Visual Soul' based on cognitive activity.
 */
function animateMouth() {
    const states = [MOUTH_STATES.OPEN, MOUTH_STATES.WIDE, MOUTH_STATES.NARROW];
    const randomState = states[Math.floor(Math.random() * states.length)];
    mouth.setAttribute('d', randomState);
}

function resetMouth() {
    mouth.setAttribute('d', MOUTH_STATES.REST);
}

// Event Listeners for Epic Tech Interaction
transmitBtn.addEventListener('click', processDirective);
commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processDirective();
});

// System Boot Sequence
window.onload = () => {
    console.log("%c EPIC TECH AI | SOVEREIGN NEXUS ONLINE ", "color: #ffd700; background: #050505; font-weight: bold;");
};

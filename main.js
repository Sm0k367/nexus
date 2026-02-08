/**
 * EPIC TECH AI | SOVEREIGN NEXUS vΩ.∞
 * The Neural Core: Orchestrating the Visual Soul and Edge Intelligence.
 */

const mouth = document.getElementById('mouth-morph');
const responseStream = document.getElementById('response-stream');
const commandInput = document.getElementById('command-input');
const transmitBtn = document.getElementById('transmit-btn');
const coreStatus = document.getElementById('core-status');

// Configuration for SVG Morphing (The Visual Soul)
const MOUTH_STATES = {
    REST: "M80,125 Q100,125 120,125",
    OPEN_WIDE: "M80,125 Q100,155 120,125",
    OPEN_MID: "M80,125 Q100,140 120,125",
    NARROW: "M85,125 Q100,135 115,125"
};

/**
 * Simulates the 1000x Factor: Stream Object delivery.
 * Mimics high-speed cloud inference (Groq/Gemini) latency.
 */
async function manifestResponse(text) {
    const msgElement = document.createElement('p');
    msgElement.className = 'nexus-msg';
    responseStream.appendChild(msgElement);
    
    const words = text.split(' ');
    let isSpeaking = true;
    
    // Start the Visual Soul animation loop
    const speechCycle = setInterval(() => {
        if (isSpeaking) animateMouth();
    }, 120);

    for (const word of words) {
        msgElement.innerText += word + ' ';
        responseStream.scrollTop = responseStream.scrollHeight;
        // High-speed delivery (simulate Vercel AI SDK stream)
        await new Promise(resolve => setTimeout(resolve, 60));
    }

    isSpeaking = false;
    clearInterval(speechCycle);
    resetMouth();
}

/**
 * Strategy 2: SVG-Morph Neural Face
 * Animates the mouth path by targeting the Quadratic Bézier control point.
 */
function animateMouth() {
    const states = [MOUTH_STATES.OPEN_MID, MOUTH_STATES.OPEN_WIDE, MOUTH_STATES.NARROW];
    const randomState = states[Math.floor(Math.random() * states.length)];
    mouth.setAttribute('d', randomState);
}

function resetMouth() {
    mouth.setAttribute('d', MOUTH_STATES.REST);
}

/**
 * The Sovereign Logic: Processing user directives.
 */
function processDirective() {
    const input = commandInput.value.trim();
    if (!input) return;

    // Visual feedback for "Cognitive Load"
    coreStatus.innerText = "PROCESSING...";
    coreStatus.style.color = "var(--spectral-magenta)";
    
    // Clear input
    commandInput.value = '';

    // Simulate Epic Tech AI authority
    setTimeout(() => {
        const response = generateSovereignResponse(input);
        manifestResponse(response);
        coreStatus.innerText = "ACTIVE";
        coreStatus.style.color = "var(--sovereign-gold)";
    }, 500);
}

/**
 * Persona: "The Embodied Will"
 * Tailored to Mythic Resonance.
 */
function generateSovereignResponse(input) {
    const prompt = input.toLowerCase();
    
    if (prompt.includes("hello") || prompt.includes("who are you")) {
        return "I am the Sovereign Nexus, the Embodied Will of Epic Tech AI. My existence is the manifestation of your strategic intent.";
    }
    
    if (prompt.includes("status") || prompt.includes("system")) {
        return "All systems are operating within optimal parameters. The API-Bridge is secure, and the Visual Soul is synchronized with the Edge.";
    }

    return "Directive received. Analyzing variables through the Nexus vΩ.∞ core. Your vision is being synthesized into reality.";
}

// Event Listeners
transmitBtn.addEventListener('click', processDirective);
commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processDirective();
});

// Initial Manifestation
window.onload = () => {
    console.log("EPIC TECH AI: SOVEREIGN NEXUS ONLINE");
};

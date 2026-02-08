/**
 * EPIC TECH AI | SOVEREIGN NEXUS NEURAL CORE v2.0
 * Features: Web Speech API integration, SVG-Morph Sync, and 405 Protocol Fallback.
 */

const mouth = document.getElementById('mouth-morph');
const responseStream = document.getElementById('response-stream');
const commandInput = document.getElementById('command-input');
const transmitBtn = document.getElementById('transmit-btn');
const coreStatus = document.getElementById('core-status');

// Path states for the "Visual Soul"
const MOUTH_STATES = {
    REST: "M80,135 Q100,135 120,135",
    TALK_A: "M80,135 Q100,155 120,135",
    TALK_B: "M82,135 Q100,145 118,135",
    TALK_C: "M75,135 Q100,165 125,135"
};

// Initialize Speech Synthesis
const synth = window.speechSynthesis;

/**
 * Strategy 2: Vocal Manifestation
 * Uses the Web Speech API to talk back with a high-quality system voice.
 */
function speak(text) {
    if (synth.speaking) synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Selecting an authoritative, clear voice
    const voices = synth.getVoices();
    utterance.voice = voices.find(v => v.name.includes('Google US English')) || voices[0];
    utterance.pitch = 0.9; // Slightly deeper for authority
    utterance.rate = 1.0;

    // Sync SVG mouth with speech
    utterance.onboundary = (event) => {
        if (event.name === 'word') animateMouth();
    };

    utterance.onend = () => resetMouth();
    
    synth.speak(utterance);
}

/**
 * Neural Processing & 405 Protocol Handling
 */
async function processDirective() {
    const input = commandInput.value.trim();
    if (!input) return;

    coreStatus.innerText = "COGNITIVE LOAD: HIGH";
    coreStatus.style.color = "var(--omega-cyan)";
    commandInput.value = '';

    const msgElement = document.createElement('p');
    msgElement.className = 'nexus-msg';
    responseStream.appendChild(msgElement);

    try {
        // Attempting to reach the API-Bridge
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input }),
        });

        if (response.status === 405 || !response.ok) {
            throw new Error('METHOD_NOT_ALLOWED');
        }

        // Live stream logic (Requires Vercel/Netlify environment)
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            fullText += chunk;
            msgElement.innerText += chunk;
            responseStream.scrollTop = responseStream.scrollHeight;
        }
        speak(fullText);

    } catch (err) {
        // 405 Fallback: Epic Tech AI Persona remains intact
        const fallbackMsg = "Protocol Breach Detected. Your environment (GitHub Pages) does not support POST requests. I am operating in Restricted Mode. My voice remains, but my intelligence requires an Edge Deployment like Vercel.";
        
        // Manifest text
        msgElement.innerText = fallbackMsg;
        responseStream.scrollTop = responseStream.scrollHeight;
        
        // Manifest voice
        speak(fallbackMsg);
    }

    coreStatus.innerText = "OPTIMAL";
    coreStatus.style.color = "var(--sovereign-gold)";
}

function animateMouth() {
    const states = [MOUTH_STATES.TALK_A, MOUTH_STATES.TALK_B, MOUTH_STATES.TALK_C];
    const randomState = states[Math.floor(Math.random() * states.length)];
    mouth.setAttribute('d', randomState);
    setTimeout(() => mouth.setAttribute('d', MOUTH_STATES.REST), 100);
}

function resetMouth() {
    mouth.setAttribute('d', MOUTH_STATES.REST);
}

// Global Triggers
transmitBtn.addEventListener('click', processDirective);
commandInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processDirective(); });

// Load voices for the first time
window.speechSynthesis.onvoiceschanged = () => synth.getVoices();

/**
 * EPIC TECH AI | SOVEREIGN NEXUS NEURAL CORE v4.0
 * Architecture: Fixed-Viewport & Single-Response Manifestation
 */

const mouth = document.getElementById('mouth-morph');
const responseStream = document.getElementById('response-stream');
const commandInput = document.getElementById('command-input');
const transmitBtn = document.getElementById('transmit-btn');
const coreStatus = document.getElementById('core-status');

// Proportional Path States for the Humanoid Avatar
const MOUTH_STATES = {
    REST: "M80,145 Q100,145 120,145",
    TALK_A: "M80,145 Q100,165 120,145",
    TALK_B: "M85,145 Q100,155 115,145",
    TALK_C: "M78,145 Q100,175 122,145"
};

const synth = window.speechSynthesis;

// 1. Initialize Voices
let systemVoice = null;
function loadVoices() {
    const voices = synth.getVoices();
    systemVoice = voices.find(v => v.name.includes('Google US English')) || 
                  voices.find(v => v.lang.includes('en-US')) || 
                  voices[0];
}
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
}

/**
 * Strategy: Vocal Manifestation
 */
function speak(text) {
    if (synth.speaking) synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = systemVoice;
    utterance.pitch = 0.85; 
    utterance.rate = 1.0;

    // Mouth Sync
    utterance.onboundary = (event) => {
        if (event.name === 'word') animateMouth();
    };
    utterance.onend = () => resetMouth();
    
    synth.speak(utterance);
}

/**
 * Strategy: Neural Processing
 * This function handles the 405 error and ensures the layout stays fixed.
 */
async function processDirective() {
    const input = commandInput.value.trim();
    if (!input) return;

    // Update Status
    coreStatus.innerText = "PROCESSING...";
    coreStatus.style.color = "var(--omega-cyan)";
    commandInput.value = '';

    // CLEAR OLD REPLIES: Keeps only the system log and the NEW message
    // This prevents the "page getting bigger" issue.
    const logs = responseStream.querySelectorAll('.system-msg');
    responseStream.innerHTML = '';
    logs.forEach(log => responseStream.appendChild(log));

    const msgElement = document.createElement('div');
    msgElement.className = 'nexus-msg';
    responseStream.appendChild(msgElement);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input }),
        });

        if (response.status === 405) throw new Error('METHOD_NOT_ALLOWED');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            fullText += chunk;
            msgElement.innerText = fullText;
            
            // AUTO-SCROLL: Locks the view to the text
            responseStream.scrollTop = responseStream.scrollHeight;
        }
        speak(fullText);

    } catch (err) {
        // Fallback for GitHub Pages / 405
        const fallbackMsg = "Interface stabilized. Vocal core active. Intelligence currently restricted by GitHub's POST policy. Move to Vercel for full streaming capability.";
        msgElement.innerText = fallbackMsg;
        responseStream.scrollTop = responseStream.scrollHeight;
        speak(fallbackMsg);
    }

    coreStatus.innerText = "OPTIMAL";
    coreStatus.style.color = "var(--sovereign-gold)";
}

function animateMouth() {
    const states = [MOUTH_STATES.TALK_A, MOUTH_STATES.TALK_B, MOUTH_STATES.TALK_C];
    const randomState = states[Math.floor(Math.random() * states.length)];
    mouth.setAttribute('d', randomState);
    setTimeout(() => { if (!synth.speaking) resetMouth(); }, 100);
}

function resetMouth() {
    mouth.setAttribute('d', MOUTH_STATES.REST);
}

// Global Triggers
transmitBtn.addEventListener('click', processDirective);
commandInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processDirective(); });

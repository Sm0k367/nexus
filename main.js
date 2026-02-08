/**
 * EPIC TECH AI | SOVEREIGN NEXUS NEURAL CORE v3.0
 * Strategy: High-Fidelity Vocal Sync & Fluid Terminal Manifestation
 */

const mouth = document.getElementById('mouth-morph');
const responseStream = document.getElementById('response-stream');
const commandInput = document.getElementById('command-input');
const transmitBtn = document.getElementById('transmit-btn');
const coreStatus = document.getElementById('core-status');

// Proportional Path States for the Humanoid Avatar
const MOUTH_STATES = {
    REST: "M80,145 Q100,145 120,145",
    TALK_A: "M80,145 Q100,165 120,145", // Wider drop
    TALK_B: "M85,145 Q100,155 115,145", // Narrower
    TALK_C: "M78,145 Q100,175 122,145"  // Deep resonance
};

const synth = window.speechSynthesis;

/**
 * Vocal Resonance Engine
 * Manifests the "Real Sounding Voice" and triggers the visual soul.
 */
function speak(text) {
    if (synth.speaking) synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    
    // Selecting the most human-like authoritative voice available
    utterance.voice = voices.find(v => v.name.includes('Google US English')) || 
                      voices.find(v => v.lang.includes('en-US')) || 
                      voices[0];
    
    utterance.pitch = 0.85; // Deeper, cinematic tone
    utterance.rate = 1.05;  // Efficient communication speed

    // Trigger mouth morphs on word boundaries for photoreal sync
    utterance.onboundary = (event) => {
        if (event.name === 'word') {
            animateMouth();
        }
    };

    utterance.onend = () => resetMouth();
    synth.speak(utterance);
}

/**
 * Neural Processing: Handling Directives & Manifesting Text
 */
async function processDirective() {
    const input = commandInput.value.trim();
    if (!input) return;

    coreStatus.innerText = "COGNITIVE LOAD: HIGH";
    coreStatus.style.color = "var(--omega-cyan)";
    commandInput.value = '';

    // Create the message bubble
    const msgElement = document.createElement('div');
    msgElement.className = 'nexus-msg';
    responseStream.appendChild(msgElement);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input }),
        });

        // Handle the "405 Not Allowed" if on GitHub Pages
        if (response.status === 405) throw new Error('RESTRICTED_ENVIRONMENT');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            fullResponse += chunk;
            
            // Manifest text word-by-word with proper wrapping
            msgElement.innerText = fullResponse;
            responseStream.scrollTop = responseStream.scrollHeight;
        }

        speak(fullResponse);

    } catch (err) {
        let errorMsg = "";
        if (err.message === 'RESTRICTED_ENVIRONMENT') {
            errorMsg = "System restricted by GitHub Pages architecture. Intelligence is operating in Offline Mode. Move files to Vercel for full Sentience.";
        } else {
            errorMsg = "Direct link established. My vocal core is online, even if the neural stream is currently limited.";
        }
        
        msgElement.innerText = errorMsg;
        responseStream.scrollTop = responseStream.scrollHeight;
        speak(errorMsg);
    }

    coreStatus.innerText = "OPTIMAL";
    coreStatus.style.color = "var(--sovereign-gold)";
}

function animateMouth() {
    const states = [MOUTH_STATES.TALK_A, MOUTH_STATES.TALK_B, MOUTH_STATES.TALK_C];
    const randomState = states[Math.floor(Math.random() * states.length)];
    mouth.setAttribute('d', randomState);
    
    // Quick snap-back for organic movement
    setTimeout(() => {
        if (!synth.speaking) resetMouth();
    }, 80);
}

function resetMouth() {
    mouth.setAttribute('d', MOUTH_STATES.REST);
}

// Interaction Triggers
transmitBtn.addEventListener('click', processDirective);
commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processDirective();
});

// Ensure voices are loaded before interaction
window.speechSynthesis.onvoiceschanged = () => {
    console.log("NEURAL VOICE CHANNELS SYNCHRONIZED");
};

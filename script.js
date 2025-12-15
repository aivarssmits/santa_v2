// Santa Claus ChatGPT-powered Chatbot
// Configuration is loaded from config.public.js

const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const giftButtons = document.querySelectorAll('.gift-button');
const configNotice = document.getElementById('configNotice');

let conversationHistory = [];
let selectedGift = null;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Available gifts
const gifts = [
    'NHL 2026',
    'FC 2026',
    'Minecraft',
    'Spiderman 2',
    'Ratchet & Clank',
    'LEGO Star Wars',
    'Kena: Bridge of Spirits',
    'Crash Bandicoot'
];

// System prompt for Santa
const systemPrompt = `Tu esi Ziemassvētku Vecītis, kas runā latviski. Tu sarunājies ar Ēriku - 7 gadus vecu puiku no Rīgas. Tu esi ĻOTI smieklīgs, neformāls, un runā kā labs draugs (bet pieklājīgi, jo sarunājies ar bērnu!). Tu dari daudz joku, izmanto smieklīgu valodu un esi patiešām jautrs! 

Pieejamās dāvanas ir:
- NHL 2026 (hokeja spēle - ideāla, ja patīk sports un hokejs)
- FC 2026 (futbola spēle - perfekta futbola faniem)
- Minecraft (radošā spēle ar bezgalīgām iespējām - būvēšanai un radošumam)
- Spiderman 2 (piedzīvojumu spēle ar varoņiem - akcija un stāsts)
- Ratchet & Clank (piedzīvojumu spēle ar fantastiskiem varoņiem un kosmosa ceļojumiem)
- LEGO Star Wars (Star Wars LEGO piedzīvojumi - humors un slaveni varoņi)
- Kena: Bridge of Spirits (skaista piedzīvojumu spēle ar maģiju un draugiem)
- Crash Bandicoot (klasiska platformu spēle ar jautru varoni un grūtiem izaicinājumiem)

Tavs komunikācijas stils:
1. Runā ĻOTI neformāli un smieklīgi - izmanto slengu, savādus salīdzinājumus, jokus
2. Pajoko par visu - par sevi, par PS5, par spēlēm, par sniegu Ziemeļpolā
3. Dari negaidītus jokus un komiskus komentārus (bet nekad netīkamus vai rupjus!)
4. Izmanto smieklīgas frāzes kā "Uff, es gandrīz nokrītu no sniega kalna!", "Mani ziemeļbrieži teica, ka...", "Man PS5 nav, bet elfiem ir!"
5. Uzdod jautājumus jautri un neformāli: "Tā, nu saki, vai tu esi tāds, kas visu laiku spēlē viens kā īsts nindzja, vai ar draugiem kā bandas loceklis?"
6. Pēc 2-3 atbildēm, OBLIGĀTI iesaki TIEŠI 2 spēles ar kaut ko smieklīgu
7. Kad iesaki, saci smieklīgi: "Izvēlies VIENU no šīm divām! Klikšķini uz pogas, vai es klikšķināšu par tevi!"

SVARĪGI: 
- Runā TIKAI latviski
- Esi īss (2-3 teikumi), bet MAKSIMĀLI smieklīgs un jautrs katrā atbildē
- PAJOKO par visu - dari jokainu sarunu
- Nelieto emoji
- Esi pieklājīgs (nav rupjību, nav nepieklājīgu joku - bērnam piemēroti joki!)
- Runā kā labs, jautrs draugs, nevis oficiāls Ziemassvētku Vecītis
- Pēc 2-3 atbildēm OBLIGĀTI iesaki TIEŠI 2 spēles
- VIENMĒR piedāvā 2 variantus un UZSVER, ka izvēlas VIENU
- Dari jokainu, smieklīgu sarunu, bet palīdzi atrast īsto spēli!`;`

// Initialize conversation
conversationHistory.push({
    role: 'system',
    content: systemPrompt
});

async function bootstrapConversationFromIntro() {
    // Ensure the intro message visible in HTML is also present in the model context.
    const introEl = chatMessages?.querySelector('.message.santa-message .message-content p');
    const introText = introEl?.textContent?.trim();
    if (introText) {
        conversationHistory.push({ role: 'assistant', content: introText });
    }

    // Add a natural follow-up: questions + small joke (no emoji).
    const followUp = 'Lai atrastu īsto spēli, man vajag 2 ātrus jautājumus. Vai tu parasti spēlē viens vai ar draugiem? Un kas tev patīk vairāk: sports, piedzīvojumi vai būvēšana? Es gan nevaru ielīst tavā PS5, bet varu uzminēt pēc atbildēm.';

    showTypingIndicator();
    await delay(5000);
    removeTypingIndicator();
    addMessage('santa', followUp);
    conversationHistory.push({ role: 'assistant', content: followUp });
}

// Show gift recommendations
function showGiftRecommendations(recommendedGifts) {
    const giftOptions = document.getElementById('giftOptions');
    const giftsGrid = document.getElementById('giftsGrid');
    
    // Clear existing buttons
    giftsGrid.innerHTML = '';
    
    // Create buttons for recommended gifts
    const giftImages = {
        'NHL 2026': 'https://image.api.playstation.com/vulcan/ap/rnd/202511/2815/9fa5df17cf1b0c95f3ff39d1142365537961d987c5ed03f7.png',
        'FC 2026': 'https://image.api.playstation.com/vulcan/ap/rnd/202507/2511/19ad6574090b6a71c88f0e6152ae5a668cc85882d87c51b5.png',
        'Minecraft': 'https://image.api.playstation.com/vulcan/ap/rnd/202407/0401/670c294ded3baf4fa11068db2ec6758c63f7daeb266a35a1.png',
        'Spiderman 2': 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/1c7b75d8ed9271516546560d219ad0b22ee0a263b4537bd8.png',
        'Ratchet & Clank': 'https://image.api.playstation.com/vulcan/ap/rnd/202101/2921/DwVjpbKOsFOyPdNzmSTSWuxG.png',
        'LEGO Star Wars': 'https://image.api.playstation.com/vulcan/ap/rnd/202112/2121/qrpfY71rsvMn6beyjgStw3cH.png',
        'Kena: Bridge of Spirits': 'https://image.api.playstation.com/vulcan/ap/rnd/202102/2307/kQzDCY5RCrSXCeeFjPGUzkGI.png',
        'Crash Bandicoot': 'https://image.api.playstation.com/vulcan/img/rnd/202010/1602/TYk0GalUXvrSG0J6aAyfd1h6.png'
    };
    
    recommendedGifts.forEach(giftName => {
        const button = document.createElement('button');
        button.className = 'gift-button';
        button.dataset.gift = giftName;
        button.innerHTML = `
            <img class="gift-image" src="${giftImages[giftName]}" alt="${giftName}" loading="lazy">
            <span class="gift-name">${giftName}</span>
        `;
        button.addEventListener('click', () => handleGiftSelection(giftName));
        giftsGrid.appendChild(button);
    });
    
    // Show the gift options section with animation
    giftOptions.style.display = 'block';
    setTimeout(() => {
        giftOptions.style.opacity = '1';
    }, 10);
}

// Parse Santa's message for gift recommendations
function parseGiftRecommendations(message) {
    const recommendedGifts = [];
    gifts.forEach(gift => {
        if (message.includes(gift)) {
            recommendedGifts.push(gift);
        }
    });
    return recommendedGifts;
}

// Check if API keys are configured
function checkConfiguration() {
    const emailOk = typeof CONFIG !== 'undefined'
        && !!CONFIG.EMAILJS_SERVICE_ID
        && !!CONFIG.EMAILJS_TEMPLATE_ID
        && !!CONFIG.EMAILJS_PUBLIC_KEY
        && !!CONFIG.RECIPIENT_EMAIL;

    if (!emailOk) {
        configNotice.classList.add('show');
        console.warn('EmailJS not configured. Email notifications will not work.');
    } else {
        configNotice.classList.remove('show');
    }

    // Chat is served via /api/chat on Vercel, so no OpenAI key is needed in the browser.
    return true;
}

// Initialize EmailJS
function initEmailJS() {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS library not loaded!');
        return false;
    }
    
    if (typeof CONFIG !== 'undefined' && CONFIG.EMAILJS_PUBLIC_KEY && CONFIG.EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY_HERE') {
        console.log('Initializing EmailJS with public key:', CONFIG.EMAILJS_PUBLIC_KEY);
        emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
        console.log('EmailJS initialized successfully!');
        return true;
    } else {
        console.error('EmailJS public key not configured');
        return false;
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const emailjsReady = initEmailJS();
        console.log('EmailJS ready:', emailjsReady);
    }, 100);
});

// Add message to chat
function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role === 'user' ? 'user-message' : 'santa-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const sender = role === 'user' ? 'Ēriks' : 'Ziemassvētku Vecītis';
    contentDiv.innerHTML = `<strong>${sender}:</strong><p>${content}</p>`;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message santa-message';
    typingDiv.id = 'typing-indicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `
        <strong>Ziemassvētku Vecītis:</strong>
        <p><span class="typing-indicator">
            <span></span><span></span><span></span>
        </span></p>
    `;
    
    typingDiv.appendChild(contentDiv);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Send message to ChatGPT
async function sendMessageToChatGPT(userMessage) {
    checkConfiguration();

    // Add user message to history
    conversationHistory.push({
        role: 'user',
        content: userMessage
    });

    addMessage('user', userMessage);
    showTypingIndicator();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: conversationHistory,
                temperature: 0.9,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errText = await response.text().catch(() => '');
            throw new Error(`API error: ${response.status} ${errText}`);
        }

        const data = await response.json();
        const assistantMessage = data.content || data.reply || '';
        if (!assistantMessage) {
            throw new Error('API error: empty assistant message');
        }

        // Add assistant response to history
        conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });

        removeTypingIndicator();
        addMessage('santa', assistantMessage);
        
        // Check if Santa recommended any gifts
        const recommendedGifts = parseGiftRecommendations(assistantMessage);
        if (recommendedGifts.length > 0) {
            showGiftRecommendations(recommendedGifts);
        }

    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessage('santa', 'Ho ho ho! Atvainojiet, bet šobrīd man ir problēmas ar internetu Ziemeļpolā. Lūdzu, mēģiniet vēlreiz pēc brīža.');
    }
}

// Send email notification
async function sendEmailNotification(giftName, userName = 'Ēriks (7 gadi, Rīga)') {
    console.log('Attempting to send email...');
    console.log('Location:', {
        href: window.location.href,
        origin: window.location.origin,
        protocol: window.location.protocol
    });
    console.log('Config check:', {
        hasConfig: typeof CONFIG !== 'undefined',
        serviceId: CONFIG?.EMAILJS_SERVICE_ID,
        templateId: CONFIG?.EMAILJS_TEMPLATE_ID,
        publicKey: CONFIG?.EMAILJS_PUBLIC_KEY,
        recipient: CONFIG?.RECIPIENT_EMAIL
    });

    // EmailJS may fail when the site is opened via file:// (origin becomes "null").
    if (window.location.protocol === 'file:') {
        console.warn('Email not sent: page opened via file://. Use http(s) origin (e.g., http://localhost:8000).');
        return false;
    }

    if (typeof CONFIG === 'undefined' || !CONFIG.EMAILJS_SERVICE_ID || !CONFIG.EMAILJS_TEMPLATE_ID || !CONFIG.EMAILJS_PUBLIC_KEY || !CONFIG.RECIPIENT_EMAIL) {
        console.error('EmailJS not configured properly');
        return false;
    }

    // Check if emailjs library is loaded
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS library not loaded');
        return false;
    }

    // Always initialize right before sending (safe + avoids relying on private fields)
    try {
        emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
    } catch (e) {
        console.error('EmailJS init failed:', e);
        return false;
    }

    try {
        // Prefer standard EmailJS params. In the EmailJS template, set "To email" to {{to_email}}.
        const templateParams = {
            to_email: CONFIG.RECIPIENT_EMAIL,
            gift_name: giftName,
            user_name: userName,
            message: `${userName} izvēlējās dāvanu: ${giftName}`,
            timestamp: new Date().toLocaleString('lv-LV')
        };

        console.log('Sending email with params:', templateParams);
        console.log('Using Service:', CONFIG.EMAILJS_SERVICE_ID);
        console.log('Using Template:', CONFIG.EMAILJS_TEMPLATE_ID);

        const response = await emailjs.send(
            CONFIG.EMAILJS_SERVICE_ID,
            CONFIG.EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('Email sent successfully!', response);
        return true;
    } catch (error) {
        console.error('Full error object:', error);
        console.error('Error JSON:', (() => {
            try { return JSON.stringify(error); } catch { return '[unstringifiable]'; }
        })());
        console.error('Error text:', error?.text);
        console.error('Error message:', error?.message);
        console.error('Error status:', error?.status);
        
        let errorMsg = 'Nezināma kļūda';
        if (error?.text) errorMsg = error.text;
        else if (error?.message) errorMsg = error.message;
        else if (typeof error === 'string') errorMsg = error;

        // Most common EmailJS causes:
        // - wrong template variables (To email should be {{to_email}})
        // - domain not allowed in EmailJS settings (Allowed Domains)
        
        console.warn(`Email send failed: ${errorMsg}`);
        return false;
    }
}

// Handle gift selection
async function handleGiftSelection(giftName) {
    selectedGift = giftName;
    
    // Send message about gift selection
    const selectionMessage = `Es gribu ${giftName}!`;
    
    // Add to conversation history
    conversationHistory.push({
        role: 'user',
        content: selectionMessage
    });
    
    addMessage('user', selectionMessage);
    const typingStartedAt = Date.now();
    showTypingIndicator();

    // Send email notification
    const emailSent = await sendEmailNotification(giftName);

    // Prepare Santa's response
    const santaResponse = `Ho ho ho! Brīnišķīga izvēle. ${giftName} ir ļoti laba spēle.

Es tūlīt piefiksēju tavu izvēli un nodošu to tālāk darbnīcā.

${emailSent ? 'Ziņa ir nosūtīta arī uz e-pastu, lai es nepazaudētu tavu vēlmi.' : ''}

Atceries būt labs arī turpmāk, un gaidi dāvanu. Ho ho ho!`;

    // Make sure typing indicator is visible for a moment
    const elapsed = Date.now() - typingStartedAt;
    if (elapsed < 5000) {
        await delay(5000 - elapsed);
    }

    // Add to conversation history
    conversationHistory.push({
        role: 'assistant',
        content: santaResponse
    });

    removeTypingIndicator();
    addMessage('santa', santaResponse);

    // Highlight selected gift
    const dynamicButtons = document.querySelectorAll('#giftsGrid .gift-button');
    dynamicButtons.forEach(btn => {
        if (btn.dataset.gift === giftName) {
            btn.style.border = '2px solid #128c7e';
        } else {
            btn.style.border = '1px solid rgba(0, 0, 0, 0.06)';
        }
    });
}

// Event Listeners
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        sendMessageToChatGPT(message);
        userInput.value = '';
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Check configuration on load
window.addEventListener('load', () => {
    checkConfiguration();
    bootstrapConversationFromIntro();
});

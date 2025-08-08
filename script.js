// DOM Elements
const boxColorBtn = document.getElementById('boxColorBtn');
const boxColorPicker = document.getElementById('boxColorPicker');
const shadowColorBtn = document.getElementById('shadowColorBtn');
const shadowColorPicker = document.getElementById('shadowColorPicker');
const shadowDensity = document.getElementById('shadowDensity');
const shadowOffsetX = document.getElementById('shadowOffsetX');
const shadowOffsetY = document.getElementById('shadowOffsetY');
const shadowBlur = document.getElementById('shadowBlur');
const bgColorBtn = document.getElementById('bgColorBtn');
const bgColorPicker = document.getElementById('bgColorPicker');
const gradientColor1Btn = document.getElementById('gradientColor1Btn');
const gradientColor1Picker = document.getElementById('gradientColor1Picker');
const gradientColor2Btn = document.getElementById('gradientColor2Btn');
const gradientColor2Picker = document.getElementById('gradientColor2Picker');
const gradientAngle = document.getElementById('gradientAngle');
const solidBgBtn = document.getElementById('solidBgBtn');
const gradientBgBtn = document.getElementById('gradientBgBtn');
const shadowBox = document.getElementById('shadowBox');
const resetBtn = document.getElementById('resetBtn');
const copyCssBtn = document.getElementById('copyCssBtn');
const body = document.body;

// State
let bgType = 'gradient'; // 'solid' or 'gradient'

// Load saved settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('shadowSettings')) || {};
    
    if (settings.boxColor) boxColorPicker.value = settings.boxColor;
    if (settings.shadowColor) shadowColorPicker.value = settings.shadowColor;
    if (settings.shadowDensity) shadowDensity.value = settings.shadowDensity;
    if (settings.shadowOffsetX) shadowOffsetX.value = settings.shadowOffsetX;
    if (settings.shadowOffsetY) shadowOffsetY.value = settings.shadowOffsetY;
    if (settings.shadowBlur) shadowBlur.value = settings.shadowBlur;
    if (settings.bgColor) bgColorPicker.value = settings.bgColor;
    if (settings.gradientColor1) gradientColor1Picker.value = settings.gradientColor1;
    if (settings.gradientColor2) gradientColor2Picker.value = settings.gradientColor2;
    if (settings.gradientAngle) gradientAngle.value = settings.gradientAngle;
    if (settings.bgType) bgType = settings.bgType;
    
    updateUI();
}

// Save settings
function saveSettings() {
    const settings = {
        boxColor: boxColorPicker.value,
        shadowColor: shadowColorPicker.value,
        shadowDensity: shadowDensity.value,
        shadowOffsetX: shadowOffsetX.value,
        shadowOffsetY: shadowOffsetY.value,
        shadowBlur: shadowBlur.value,
        bgColor: bgColorPicker.value,
        gradientColor1: gradientColor1Picker.value,
        gradientColor2: gradientColor2Picker.value,
        gradientAngle: gradientAngle.value,
        bgType: bgType
    };
    localStorage.setItem('shadowSettings', JSON.stringify(settings));
}

// Update UI based on current settings
function updateUI() {
    const boxColor = boxColorPicker.value;
    const shadowColor = shadowColorPicker.value;
    const density = shadowDensity.value;
    const offsetX = shadowOffsetX.value;
    const offsetY = shadowOffsetY.value;
    const blur = shadowBlur.value;
    const angle = gradientAngle.value;

    // Box styles
    shadowBox.style.backgroundColor = boxColor;
    shadowBox.style.boxShadow = `${offsetX}px ${offsetY}px ${blur}px ${hexToRgba(shadowColor, density)}`;

    // Clear both background image and color first
    body.style.backgroundImage = '';
    body.style.backgroundColor = '';

    // Background style
    if (bgType === 'solid') {
        body.style.backgroundColor = bgColorPicker.value;
        solidBgBtn.classList.add('bg-pink-600');
        gradientBgBtn.classList.add('bg-pink-400');
        gradientBgBtn.classList.remove('bg-pink-600');
    } else {
        body.style.backgroundImage = `linear-gradient(${angle}deg, ${gradientColor1Picker.value}, ${gradientColor2Picker.value})`;
        gradientBgBtn.classList.add('bg-pink-600');
        solidBgBtn.classList.add('bg-pink-400');
        solidBgBtn.classList.remove('bg-pink-600');
    }

    // Update small button colors
    boxColorBtn.style.backgroundColor = boxColor;
    shadowColorBtn.style.backgroundColor = shadowColor;
    bgColorBtn.style.backgroundColor = bgColorPicker.value;
    gradientColor1Btn.style.backgroundColor = gradientColor1Picker.value;
    gradientColor2Btn.style.backgroundColor = gradientColor2Picker.value;

    saveSettings();
}

// Event Listeners
[boxColorBtn, shadowColorBtn, bgColorBtn, gradientColor1Btn, gradientColor2Btn].forEach((btn, i) => {
    const pickers = [boxColorPicker, shadowColorPicker, bgColorPicker, gradientColor1Picker, gradientColor2Picker];
    btn.addEventListener('click', () => pickers[i].click());
});

[boxColorPicker, shadowColorPicker, shadowDensity, shadowOffsetX, shadowOffsetY, shadowBlur,
 bgColorPicker, gradientColor1Picker, gradientColor2Picker, gradientAngle]
.forEach(el => el.addEventListener('input', updateUI));

solidBgBtn.addEventListener('click', () => { bgType = 'solid'; updateUI(); });
gradientBgBtn.addEventListener('click', () => { bgType = 'gradient'; updateUI(); });

resetBtn.addEventListener('click', (e) => {
    if (e.detail === 2) { // double click clears localStorage
        localStorage.removeItem('shadowSettings');
    }
    // Reset box controls
    boxColorPicker.value = '#ff8fab';
    shadowColorPicker.value = '#ff8fab';
    shadowDensity.value = 0.4;
    shadowOffsetX.value = 10;
    shadowOffsetY.value = 10;
    shadowBlur.value = 30;
    // Reset background controls
    bgColorPicker.value = '#f5f6ff';
    gradientColor1Picker.value = '#fce4ec';
    gradientColor2Picker.value = '#f3e5ff';
    gradientAngle.value = 135;
    bgType = 'gradient';
    updateUI();
});

copyCssBtn.addEventListener('click', () => {
    const css = `
/* Box */
background-color: ${boxColorPicker.value};
box-shadow: ${shadowBox.style.boxShadow};
/* Background */
${bgType === 'solid' 
? `background-color: ${bgColorPicker.value};`
: `background-image: linear-gradient(${gradientAngle.value}deg, ${gradientColor1Picker.value}, ${gradientColor2Picker.value});`}
    `.trim();
    navigator.clipboard.writeText(css);
    alert('CSS copied to clipboard!');
});

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Collapse state in localStorage
function saveCollapseState(id, isOpen) {
    const state = JSON.parse(localStorage.getItem('collapseState')) || {};
    state[id] = isOpen;
    localStorage.setItem('collapseState', JSON.stringify(state));
}
function loadCollapseState(id) {
    const state = JSON.parse(localStorage.getItem('collapseState')) || {};
    return state[id] !== false; // default true
}
function toggleSection(headerEl, contentEl) {
    const arrow = headerEl.querySelector('.arrow');
    const isOpen = contentEl.classList.contains('expanded');
    if (isOpen) {
        contentEl.classList.remove('expanded');
        contentEl.classList.add('collapsed');
        arrow.classList.remove('rotate-180');
        saveCollapseState(contentEl.id, false);
    } else {
        contentEl.classList.remove('collapsed');
        contentEl.classList.add('expanded');
        arrow.classList.add('rotate-180');
        saveCollapseState(contentEl.id, true);
    }
}

// Init collapsibles
const boxShadowHeader = document.getElementById('boxShadowHeader');
const boxShadowContent = document.getElementById('boxShadowContent');
const backgroundHeader = document.getElementById('backgroundHeader');
const backgroundContent = document.getElementById('backgroundContent');

[ [boxShadowHeader, boxShadowContent], [backgroundHeader, backgroundContent] ].forEach(([header, content]) => {
    if (!loadCollapseState(content.id)) {
        content.classList.remove('expanded');
        content.classList.add('collapsed');
        header.querySelector('.arrow').classList.remove('rotate-180');
    } else {
        content.classList.add('expanded');
        header.querySelector('.arrow').classList.add('rotate-180');
    }
    header.addEventListener('click', () => toggleSection(header, content));
});


function toggleSection(headerEl, contentEl) {
    const arrow = headerEl.querySelector('.arrow');
    const isOpen = contentEl.classList.contains('expanded');

    if (isOpen) {
        // Closing
        contentEl.style.maxHeight = contentEl.scrollHeight + 'px'; // set current height
        requestAnimationFrame(() => {
            contentEl.style.maxHeight = '0px';
            contentEl.style.opacity = '0';
        });
        arrow.classList.remove('rotate-180');
        saveCollapseState(contentEl.id, false);
        setTimeout(() => contentEl.classList.remove('expanded'), 400);
    } else {
        // Opening
        contentEl.classList.add('expanded');
        contentEl.style.maxHeight = '0px';
        contentEl.style.opacity = '0';
        requestAnimationFrame(() => {
            contentEl.style.maxHeight = contentEl.scrollHeight + 'px';
            contentEl.style.opacity = '1';
        });
        arrow.classList.add('rotate-180');
        saveCollapseState(contentEl.id, true);
    }
}

// Initialize
loadSettings();

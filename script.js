// DOM Elements
const boxColorBtn = document.getElementById('boxColorBtn');
const boxColorPicker = document.getElementById('boxColorPicker');
const shadowColorBtn = document.getElementById('shadowColorBtn');
const shadowColorPicker = document.getElementById('shadowColorPicker');
const shadowDensity = document.getElementById('shadowDensity');
const bgColorBtn = document.getElementById('bgColorBtn');
const bgColorPicker = document.getElementById('bgColorPicker');
const gradientColor1Btn = document.getElementById('gradientColor1Btn');
const gradientColor1Picker = document.getElementById('gradientColor1Picker');
const gradientColor2Btn = document.getElementById('gradientColor2Btn');
const gradientColor2Picker = document.getElementById('gradientColor2Picker');
const solidBgBtn = document.getElementById('solidBgBtn');
const gradientBgBtn = document.getElementById('gradientBgBtn');
const shadowBox = document.getElementById('shadowBox');
const resetBtn = document.getElementById('resetBtn');
const body = document.body;

// State
let bgType = 'gradient'; // 'solid' or 'gradient'

// Load saved settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('shadowSettings')) || {};
    
    if (settings.boxColor) boxColorPicker.value = settings.boxColor;
    if (settings.shadowColor) shadowColorPicker.value = settings.shadowColor;
    if (settings.shadowDensity) shadowDensity.value = settings.shadowDensity;
    if (settings.bgColor) bgColorPicker.value = settings.bgColor;
    if (settings.gradientColor1) gradientColor1Picker.value = settings.gradientColor1;
    if (settings.gradientColor2) gradientColor2Picker.value = settings.gradientColor2;
    if (settings.bgType) bgType = settings.bgType;
    
    updateUI();
}

// Save settings
function saveSettings() {
    const settings = {
        boxColor: boxColorPicker.value,
        shadowColor: shadowColorPicker.value,
        shadowDensity: shadowDensity.value,
        bgColor: bgColorPicker.value,
        gradientColor1: gradientColor1Picker.value,
        gradientColor2: gradientColor2Picker.value,
        bgType: bgType
    };
    localStorage.setItem('shadowSettings', JSON.stringify(settings));
}

// Update UI based on current settings
function updateUI() {
    const boxColor = boxColorPicker.value;
    const shadowColor = shadowColorPicker.value;
    const density = shadowDensity.value;

    // Box styles
    shadowBox.style.backgroundColor = boxColor;
    shadowBox.style.boxShadow = `10px 10px 30px ${hexToRgba(shadowColor, density)}`;

    // Clear both background image and color first
    body.style.backgroundImage = '';
    body.style.backgroundColor = '';

    // Background style
    if (bgType === 'solid') {
        body.style.backgroundColor = bgColorPicker.value;
        solidBgBtn.classList.add('bg-pink-600');
        solidBgBtn.classList.remove('bg-pink-400');
        gradientBgBtn.classList.add('bg-pink-400');
        gradientBgBtn.classList.remove('bg-pink-600');
    } else {
        body.style.backgroundImage = `linear-gradient(to bottom right, ${gradientColor1Picker.value}, ${gradientColor2Picker.value})`;
        gradientBgBtn.classList.add('bg-pink-600');
        gradientBgBtn.classList.remove('bg-pink-400');
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
boxColorBtn.addEventListener('click', () => boxColorPicker.click());
shadowColorBtn.addEventListener('click', () => shadowColorPicker.click());
bgColorBtn.addEventListener('click', () => bgColorPicker.click());
gradientColor1Btn.addEventListener('click', () => gradientColor1Picker.click());
gradientColor2Btn.addEventListener('click', () => gradientColor2Picker.click());

boxColorPicker.addEventListener('input', updateUI);
shadowColorPicker.addEventListener('input', updateUI);
shadowDensity.addEventListener('input', updateUI);
bgColorPicker.addEventListener('input', updateUI);
gradientColor1Picker.addEventListener('input', updateUI);
gradientColor2Picker.addEventListener('input', updateUI);

solidBgBtn.addEventListener('click', () => {
    bgType = 'solid';
    updateUI();
});

gradientBgBtn.addEventListener('click', () => {
    bgType = 'gradient';
    updateUI();
});

resetBtn.addEventListener('click', () => {
    // Reset box controls
    boxColorPicker.value = '#ff8fab';
    shadowColorPicker.value = '#ff8fab';
    shadowDensity.value = 0.4;

    // Reset background controls
    bgColorPicker.value = '#f5f6ff';
    gradientColor1Picker.value = '#fce4ec';
    gradientColor2Picker.value = '#f3e5ff';
    bgType = 'gradient';

    // Clear any background manually
    body.style.backgroundImage = '';
    body.style.backgroundColor = '';

    updateUI();
});

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Initialize
loadSettings();

const button = document.getElementById('color-button');
const cells = document.querySelectorAll('.cell');

// Define image URLs for button background
const imageUrls = [
    'shorts.jpg',      // Image for Action 2
    'medium_cold.jpg',
    'comfy_warm.jpg',   // Image for Warm and Cozy
    'autumn_leaves.jpg', // Image for Autumn Vibes
];

// Define text for each cell in Warm and Cozy style
const outfitPickerTexts = [
    'I\'m chilly!',  // Text for the first cell
    'Just right',      // Text for the second cell
    'Cool me down!',// Text for the third cell
];

const homeScreenTexts= [
    '18° ⇿ 25°',
    'low pollen',
    'possible rain',
]
// Define text for Celsius and Fahrenheit
const tempCheckerTexts = {
    'tempChecker': '22°',
    'outfitPicker': ''
};

// Initial state
let currentState = 'welcome'; // Set initial state to welcome
let user_decided = 1;

function applyTempChecker() {
    document.body.classList.add('applyTempChecker');
    document.body.classList.remove('applyOutfitPicker');

    cells.forEach((cell, index) => {
        cell.style.visibility = 'visible'; // Show cells
        cell.querySelector('.cell-text').textContent = homeScreenTexts[index] || 'Default Text'; // Set unique text for each button
        cell.classList.add('no-click'); // Add class to disable clicks
    });

    button.style.backgroundImage = `url('${imageUrls[3]}')`; // Set button background to tempChecker image
    button.textContent = tempCheckerTexts['tempChecker']; // Set button text for tempChecker

}


// Function to apply the "outfitPicker" style
function applyOutfitPicker() {
    document.body.classList.add('applyOutfitPicker');
    document.body.classList.remove('applyTempChecker');

    cells.forEach((cell, index) => {
        cell.style.visibility = 'visible'; // Show cells
        cell.querySelector('.cell-text').textContent = outfitPickerTexts[index] || 'Default Text'; // Set unique text for each button
        cell.classList.remove('no-click'); // Remove class to enable clicks
    });
    button.style.backgroundImage = `url('${imageUrls[user_decided]}')`; // Set button background to Warm and Cozy image
    button.textContent = tempCheckerTexts['outfitPicker']; // Set button text for Warm and Cozy
    button.style.border = '0px solid var(--autumn_red)';

    button.classList.add('no-pulse'); // Stop the button from pulsing

    // Hide the gradient box
    const gradientBox = document.querySelector('.gradient-box');
    if (gradientBox) {
        gradientBox.style.opacity = '0'; // Make the gradient box transparent
    }
}

// Function to handle the button click and toggle between the two styles
function toggleStyles() {
    if (currentState === 'welcome' || currentState === 'tempChecker') {
        applyOutfitPicker(); // Apply "Warm and Cozy"
        currentState = 'outfitPicker'; // Update the state
    } else {
        applyTempChecker(); // Apply "Autumn Vibes"
        currentState = 'tempChecker'; // Update the state
    }
}

// Add click event handlers to each cell button
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(index);
    });
});

// Function to handle clicks on the cell buttons
function handleCellClick(index) {
    user_decided = index
    switch(index) {
        case 0:
            button.style.backgroundImage = `url('${imageUrls[0]}')`; // Change to Action 1 image
            applyPulseAnimation(); // Trigger the pulse animation for button 2
            break;
        case 1:
            button.style.backgroundImage = `url('${imageUrls[1]}')`; // Change to Action 2 image
            applyPulseAnimation(); // Trigger the pulse animation for button 2
            break;
        case 2:
            button.style.backgroundImage = `url('${imageUrls[2]}')`; // Change to Action 3 image
            applyPulseAnimation(); // Trigger the pulse animation for button 2
            break;
        default:
            console.log('Unknown action');
            break;
    }
}

// Function to apply pulse animation
function applyPulseAnimation() {
    button.classList.add('pulse-animation');
    setTimeout(() => {
        button.classList.remove('pulse-animation'); // Remove animation class after animation duration
    }, 1000); // Match the duration with the animation duration in CSS
}

// Apply the "Autumn Vibes" style on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTempChecker(); // Set initial state to Autumn Vibes
    console.log(`Initial state: ${currentState}`); // Debugging line to check initial state
});

// Add event listener to toggle styles when the button is clicked
button.addEventListener('click', toggleStyles);

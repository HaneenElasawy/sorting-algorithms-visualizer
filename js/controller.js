// =============================================
// controller.js — The "connector" of the app
// Listens for user actions and coordinates
// between the model (data) and the view (UI)
// =============================================


// --- Get Controls from the DOM ---

const algorithmSelect = document.getElementById("algorithm-select");
const arraySizeSlider = document.getElementById("array-size");
const speedSlider = document.getElementById("speed-control");
const startBtn = document.getElementById("btn-start");
const generateBtn = document.getElementById("btn-generate");
const resetBtn = document.getElementById("btn-reset");


// --- Animation State ---

// This ID lets us cancel a running animation with clearTimeout()
let animationTimeoutId = null;

// Track whether sorting is currently running
let isSorting = false;


// --- Helper: Generate and Display a New Array ---

// Creates a new random array and draws the bars on screen
function generateAndRender() {
    let size = parseInt(arraySizeSlider.value);
    let arr = generateArray(size);  // from model.js
    renderBars(arr);                 // from view.js
}


// --- Helper: Stop Any Running Animation ---

function stopAnimation() {
    if (animationTimeoutId !== null) {
        clearTimeout(animationTimeoutId);
        animationTimeoutId = null;
    }
    isSorting = false;
    setButtonsDisabled(false); // re-enable buttons
}


// --- Animation Loop ---

// Plays the recorded sorting steps one by one with a time delay
// steps  = array of step objects from model.js
// index  = current step we're on (starts at 0)
// delay  = milliseconds between each step
function animateSteps(steps, index, delay) {
    // If we've played all steps, we're done!
    if (index >= steps.length) {
        // Mark every bar as sorted (green) when finished
        let finalArr = steps[steps.length - 1].array;
        markAllSorted(finalArr);    // from view.js
        setButtonsDisabled(false);  // re-enable buttons
        isSorting = false;
        return;
    }

    // Apply the current step to the visual bars
    applyStep(steps[index]); // from view.js

    // Schedule the next step after the delay
    animationTimeoutId = setTimeout(function () {
        animateSteps(steps, index + 1, delay);
    }, delay);
}


// --- Event: "Generate New Array" Button ---

generateBtn.addEventListener("click", function () {
    stopAnimation();         // stop any running sort
    generateAndRender();     // create and draw new array
});


// --- Event: "Start" Button ---

startBtn.addEventListener("click", function () {
    if (isSorting) return; // don't start again if already sorting

    let algoKey = algorithmSelect.value;      // e.g. "bubble"
    let speedValue = parseInt(speedSlider.value); // 1, 2, or 3
    let delay = getDelay(speedValue);        // ms from view.js

    // Run the selected algorithm — records all steps
    let sortingSteps = runSort(algoKey); // from model.js

    if (sortingSteps.length === 0) return; // nothing to animate

    isSorting = true;
    setButtonsDisabled(true); // disable buttons during sort

    // Start the animation from step 0
    animateSteps(sortingSteps, 0, delay);
});


// --- Event: "Reset" Button ---

resetBtn.addEventListener("click", function () {
    stopAnimation();     // cancel the running sort
    generateAndRender(); // draw a fresh random array
});


// --- Event: Array Size Slider ---

arraySizeSlider.addEventListener("input", function () {
    updateSizeDisplay(arraySizeSlider.value); // update the number label

    if (!isSorting) {
        generateAndRender(); // auto-regenerate array when size changes
    }
});


// --- Event: Speed Slider ---

speedSlider.addEventListener("input", function () {
    updateSpeedDisplay(speedSlider.value); // update Slow/Medium/Fast label
});


// --- Event: Algorithm Selector ---

algorithmSelect.addEventListener("change", function () {
    let info = getAlgoInfo(algorithmSelect.value); // from model.js
    updateAlgoInfo(info);                          // from view.js

    if (!isSorting) {
        generateAndRender(); // show a fresh array for the new algorithm
    }
});

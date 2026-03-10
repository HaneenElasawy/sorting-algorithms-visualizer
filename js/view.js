// =============================================
// view.js — The "display" of the app
// Handles all DOM updates: bars, info, buttons
// =============================================


// --- Get DOM Elements ---
// We grab all the elements we'll need to update

const barContainer = document.getElementById("bar-container");
const algoTitle = document.getElementById("algo-title");
const algoDescription = document.getElementById("algo-description");
const algoTimeEl = document.getElementById("algo-time");
const algoSpaceEl = document.getElementById("algo-space");
const algoStableEl = document.getElementById("algo-stable");
const sizeDisplay = document.getElementById("size-display");
const speedDisplay = document.getElementById("speed-display");
const btnStart = document.getElementById("btn-start");
const btnGenerate = document.getElementById("btn-generate");
const btnReset = document.getElementById("btn-reset");


// --- Speed Labels ---
// Maps slider value (1, 2, 3) to a human-readable label and delay in ms
const speedMap = {
    1: { label: "Slow", delay: 300 },
    2: { label: "Medium", delay: 80 },
    3: { label: "Fast", delay: 10 },
};


// --- Bar Rendering ---

// Draw all bars on screen based on the given array of values
// Each bar's height is a % of the container height
function renderBars(arr) {
    barContainer.innerHTML = ""; // clear old bars

    let maxValue = Math.max(...arr); // find the tallest bar value

    arr.forEach(function (value) {
        let bar = document.createElement("div");
        bar.classList.add("bar");

        // Height as a percentage of the container (so bars scale nicely)
        let heightPercent = (value / maxValue) * 100;
        bar.style.height = heightPercent + "%";

        barContainer.appendChild(bar);
    });
}

// Apply color states to bars for a specific animation step
// step = { array, indices, sorted, type }
function applyStep(step) {
    // First render the bar heights for this snapshot
    renderBars(step.array);

    // Get all bar elements after rendering
    let bars = barContainer.querySelectorAll(".bar");

    // Color the sorted bars green
    step.sorted.forEach(function (i) {
        if (bars[i]) bars[i].classList.add("sorted");
    });

    // Color the active bars (compared or swapped)
    step.indices.forEach(function (i) {
        if (!bars[i]) return;
        if (step.type === "compare") {
            bars[i].classList.add("compare"); // orange
        } else if (step.type === "swap") {
            bars[i].classList.add("swap");    // red
        }
    });
}

// Mark all bars as sorted (green) — called when sorting is done
function markAllSorted(arr) {
    renderBars(arr);
    let bars = barContainer.querySelectorAll(".bar");
    bars.forEach(function (bar) {
        bar.classList.add("sorted");
    });
}


// --- Algorithm Info Section ---

// Update the info panel with the selected algorithm's details
function updateAlgoInfo(info) {
    algoTitle.textContent = info.title;
    algoDescription.textContent = info.description;
    algoTimeEl.textContent = info.time;
    algoSpaceEl.textContent = info.space;
    algoStableEl.textContent = info.stable;
}


// --- Controls UI Updates ---

// Show the current array size number next to the slider
function updateSizeDisplay(value) {
    sizeDisplay.textContent = value;
}

// Show the speed label (Slow / Medium / Fast) next to the speed slider
function updateSpeedDisplay(value) {
    speedDisplay.textContent = speedMap[value].label;
}

// Get the delay in ms for the current speed slider value
function getDelay(speedValue) {
    return speedMap[speedValue].delay;
}


// --- Button State Management ---
// Disable buttons while sorting is running so the user can't interfere

function setButtonsDisabled(sorting) {
    btnStart.disabled = sorting;
    btnGenerate.disabled = sorting;
    // Reset is always available so the user can cancel
    btnReset.disabled = false;
}

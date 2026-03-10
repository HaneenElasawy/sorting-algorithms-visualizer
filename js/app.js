// =============================================
// app.js — The entry point of the application
// This file starts everything up when the
// page finishes loading
// =============================================


// Wait for the HTML page to fully load before doing anything.
// This makes sure all the elements exist before we try to use them.
document.addEventListener("DOMContentLoaded", function () {

    // --- Set initial display values ---

    // Show the starting array size number (matches the slider's default value)
    updateSizeDisplay(document.getElementById("array-size").value);

    // Show the starting speed label (matches the slider's default value)
    updateSpeedDisplay(document.getElementById("speed-control").value);

    // --- Load initial algorithm info ---

    // Show info for the default selected algorithm (Bubble Sort)
    let defaultAlgo = document.getElementById("algorithm-select").value;
    let info = getAlgoInfo(defaultAlgo); // from model.js
    updateAlgoInfo(info);                // from view.js

    // --- Generate the first array ---

    // Create a random array and draw it as bars right away
    generateAndRender(); // from controller.js

    // That's it! The app is ready. 🎉
    console.log("Sorting Algorithms Visualizer is ready!");
});

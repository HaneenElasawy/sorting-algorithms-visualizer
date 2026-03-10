// =============================================
// model.js — The "brain" of the app
// Stores the array data and all sorting logic
// =============================================


// --- State Variables ---

// The main array of numbers we will sort
let array = [];

// Stores every sorting step so we can animate them
let steps = [];

// Info about each algorithm (shown in the info section)
const algoInfo = {
    bubble: {
        title: "Bubble Sort",
        description:
            "Bubble Sort repeatedly compares two adjacent elements and swaps them " +
            "if they are in the wrong order. It keeps doing this until the array is " +
            "fully sorted. Simple, but slow for large arrays.",
        time: "O(n²)",
        space: "O(1)",
        stable: "Yes",
    },
    selection: {
        title: "Selection Sort",
        description:
            "Selection Sort finds the smallest element in the unsorted part of the " +
            "array and places it at the beginning. It repeats this process for each " +
            "position until the array is sorted.",
        time: "O(n²)",
        space: "O(1)",
        stable: "No",
    },
    insertion: {
        title: "Insertion Sort",
        description:
            "Insertion Sort builds the sorted array one element at a time. It picks " +
            "each element and inserts it into its correct position among the already " +
            "sorted elements — like sorting a hand of playing cards.",
        time: "O(n²)",
        space: "O(1)",
        stable: "Yes",
    },
};


// --- Array Functions ---

// Generate a new random array for the visualization
// Each number represents the height of a bar
// Values range from 10 to 100 so all bars are visible
function generateArray(size) {
    array = [];
    for (let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 91) + 10; // random number 10–100
        array.push(value);
    }
    steps = []; // clear any old animation steps
    return array;
}

// Return a copy of the current array
function getArray() {
    return array.slice(); // slice() makes a copy so we don't expose the original
}

// Return algorithm info object for the given key (e.g. 'bubble')
function getAlgoInfo(algoKey) {
    return algoInfo[algoKey];
}


// --- Sorting Step Recorders ---
// These functions don't sort visually — they record each comparison
// and swap as a "step" object, which the view will animate later.

// Record a "compare" step (two bars being compared)
function recordCompare(arr, i, j, sorted) {
    steps.push({
        type: "compare",
        array: arr.slice(),     // snapshot of array at this moment
        indices: [i, j],        // which two bars are highlighted
        sorted: sorted.slice(), // which indices are already in final position
    });
}

// Record a "swap" step (two bars swapping positions)
function recordSwap(arr, i, j, sorted) {
    steps.push({
        type: "swap",
        array: arr.slice(),
        indices: [i, j],
        sorted: sorted.slice(),
    });
}

// Record a "sorted" step (one or more bars are now in final position)
function recordSorted(arr, sorted) {
    steps.push({
        type: "sorted",
        array: arr.slice(),
        indices: [],
        sorted: sorted.slice(),
    });
}


// --- Sorting Algorithms ---
// Each algorithm works on a copy of the array and records steps.
// It does NOT touch the DOM — that's the view's job.

// Bubble Sort algorithm logic
// Compares adjacent elements and "bubbles" the largest value to the end
function bubbleSort() {
    let arr = array.slice(); // work on a copy so we don't change original early
    let sorted = [];         // tracks positions that are completely sorted
    let n = arr.length;

    // Loop through the entire array multiple times
    for (let i = 0; i < n - 1; i++) {

        // Loop through the unsorted portion of the array
        for (let j = 0; j < n - i - 1; j++) {

            // Record this step: highlight bars being compared
            recordCompare(arr, j, j + 1, sorted);

            // Check if they are in the wrong order
            if (arr[j] > arr[j + 1]) {

                // Record this step: highlight bars being swapped
                recordSwap(arr, j, j + 1, sorted);

                // Swap the values in the array
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }

        // After each full pass, the last unsorted element naturally falls into its sorted place
        sorted.push(n - 1 - i);
        recordSorted(arr, sorted);
    }

    // After all passes finish, the first element is also guaranteed sorted
    sorted.push(0);
    recordSorted(arr, sorted);

    // Return the list of all recorded animation frames
    return steps;
}


// Selection Sort
// Finds the minimum element and places it at the start each pass
function selectionSort() {
    let arr = array.slice();
    let sorted = [];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i; // assume the first unsorted element is the smallest

        for (let j = i + 1; j < n; j++) {
            // Compare current element with the current minimum
            recordCompare(arr, minIndex, j, sorted);

            if (arr[j] < arr[minIndex]) {
                minIndex = j; // found a new minimum
            }
        }

        if (minIndex !== i) {
            // Swap the found minimum into its correct position
            recordSwap(arr, i, minIndex, sorted);
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }

        // This position is now in its final sorted place
        sorted.push(i);
        recordSorted(arr, sorted);
    }

    // Last element is also in place
    sorted.push(n - 1);
    recordSorted(arr, sorted);

    return steps;
}


// Insertion Sort
// Picks each element and inserts it into the correct spot in the sorted part
function insertionSort() {
    let arr = array.slice();
    let sorted = [];
    let n = arr.length;

    // The first element is already "sorted" on its own
    sorted.push(0);
    recordSorted(arr, sorted);

    for (let i = 1; i < n; i++) {
        let key = arr[i]; // the element we want to insert
        let j = i - 1;

        // Shift elements that are greater than key one position to the right
        while (j >= 0 && arr[j] > key) {
            recordCompare(arr, j, j + 1, sorted);
            recordSwap(arr, j, j + 1, sorted);
            arr[j + 1] = arr[j];
            j--;
        }

        // Place the key in its correct position
        arr[j + 1] = key;

        // Everything up to index i is now sorted
        sorted.push(i);
        recordSorted(arr, sorted);
    }

    return steps;
}


// Run the chosen algorithm and return the recorded steps
function runSort(algoKey) {
    steps = []; // reset steps before each sort
    if (algoKey === "bubble") return bubbleSort();
    if (algoKey === "selection") return selectionSort();
    if (algoKey === "insertion") return insertionSort();
    return [];
}

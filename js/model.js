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
    merge: {
        title: "Merge Sort",
        description:
            "Merge Sort is a divide-and-conquer algorithm that recursively splits the array in half " +
            "until each sub-array has one element, and then merges them back together in sorted order.",
        time: "O(n log n)",
        space: "O(n)",
        stable: "Yes",
    },
    quick: {
        title: "Quick Sort",
        description:
            "Quick Sort picks a 'pivot' element and partitions the array into elements smaller and larger " +
            "than the pivot. It recursively sorts the sub-arrays. Very fast in practice.",
        time: "O(n log n)",
        space: "O(log n)",
        stable: "No",
    },
    heap: {
        title: "Heap Sort",
        description:
            "Heap Sort visualizes the array as a binary tree. It builds a 'max heap' where the largest element is " +
            "at the root, moves it to the end, and repeats the process on the remaining elements.",
        time: "O(n log n)",
        space: "O(1)",
        stable: "No",
    },
    shell: {
        title: "Shell Sort",
        description:
            "Shell Sort is an optimization over Insertion Sort. It compares elements that are far apart " +
            "separated by a 'gap', and then progressively shrinks the gap down to 1.",
        time: "O(n log n)",
        space: "O(1)",
        stable: "No",
    },
    counting: {
        title: "Counting Sort",
        description:
            "Counting Sort is a non-comparison algorithm that counts the frequency of each distinct element, " +
            "and then writes the elements back into the array in sorted order. Fast for limited ranges.",
        time: "O(n + k)",
        space: "O(k)",
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


// Merge Sort algorithm logic
// Recursively divides the array, sorts the halves, and merges them back together
function mergeSort() {
    let arr = array.slice();
    let sorted = [];
    let n = arr.length;

    function sortMerge(start, end) {
        if (start >= end) return;

        let mid = Math.floor((start + end) / 2);
        sortMerge(start, mid);
        sortMerge(mid + 1, end);

        let left = start;
        let right = mid + 1;

        if (arr[mid] <= arr[right]) {
            return;
        }

        // Merge in place to visualize easily
        while (left <= mid && right <= end) {
            recordCompare(arr, left, right, sorted);

            if (arr[left] <= arr[right]) {
                left++;
            } else {
                let value = arr[right];
                let index = right;

                // Shift elements right to make room
                while (index !== left) {
                    recordSwap(arr, index - 1, index, sorted);
                    arr[index] = arr[index - 1];
                    index--;
                }
                arr[left] = value;

                left++;
                mid++;
                right++;
            }
        }
    }

    sortMerge(0, n - 1);

    for (let i = 0; i < n; i++) {
        sorted.push(i);
    }
    recordSorted(arr, sorted);

    return steps;
}


// Quick Sort algorithm logic
// Picks a pivot and partitions the array into smaller and larger elements
function quickSort() {
    let arr = array.slice();
    let sorted = [];
    let n = arr.length;

    function sortQuick(low, high) {
        if (low < high) {
            let pivotIndex = partition(low, high);

            sorted.push(pivotIndex);
            recordSorted(arr, sorted);

            sortQuick(low, pivotIndex - 1);
            sortQuick(pivotIndex + 1, high);
        } else if (low === high) {
            sorted.push(low);
            recordSorted(arr, sorted);
        }
    }

    function partition(low, high) {
        let pivot = arr[high]; // choose last element as pivot
        let i = low - 1;

        for (let j = low; j < high; j++) {
            recordCompare(arr, j, high, sorted);

            if (arr[j] < pivot) {
                i++;
                recordSwap(arr, i, j, sorted);
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        recordSwap(arr, i + 1, high, sorted);
        let temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }

    sortQuick(0, n - 1);

    return steps;
}


// Heap Sort algorithm logic
// Builds a max heap and repeatedly extracts the maximum to build the sorted array
function heapSort() {
    let arr = array.slice();
    let sorted = [];
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        recordSwap(arr, 0, i, sorted);
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        sorted.push(i);
        recordSorted(arr, sorted);

        heapify(i, 0);
    }

    sorted.push(0);
    recordSorted(arr, sorted);

    function heapify(size, rootIndex) {
        let largest = rootIndex;
        let left = 2 * rootIndex + 1;
        let right = 2 * rootIndex + 2;

        if (left < size) {
            recordCompare(arr, left, largest, sorted);
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }

        if (right < size) {
            recordCompare(arr, right, largest, sorted);
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }

        if (largest !== rootIndex) {
            recordSwap(arr, rootIndex, largest, sorted);
            let temp = arr[rootIndex];
            arr[rootIndex] = arr[largest];
            arr[largest] = temp;

            heapify(size, largest);
        }
    }

    return steps;
}


// Shell Sort algorithm logic
// A variation of insertion sort that allows exchanges of far apart elements
function shellSort() {
    let arr = array.slice();
    let sorted = [];
    let n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j;

            recordCompare(arr, i, i - gap, sorted);

            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                recordSwap(arr, j, j - gap, sorted);
                arr[j] = arr[j - gap];
                if (j - gap >= gap) {
                    recordCompare(arr, j - gap, j - gap - gap, sorted);
                }
            }

            if (j !== i) {
                arr[j] = temp;
                recordSwap(arr, j, j, sorted); // Highlight the bar being written to
            }
        }
    }

    for (let i = 0; i < n; i++) {
        sorted.push(i);
    }
    recordSorted(arr, sorted);

    return steps;
}


// Counting Sort algorithm logic
// Counts frequencies, then writes values back using step recording
function countingSort() {
    let arr = array.slice();
    let sorted = [];
    let n = arr.length;

    if (n === 0) return steps;

    let max = arr[0];
    let min = arr[0];

    for (let i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
        if (arr[i] < min) min = arr[i];
    }

    let range = max - min + 1;
    let count = new Array(range).fill(0);

    for (let i = 0; i < n; i++) {
        recordCompare(arr, i, i, sorted);
        count[arr[i] - min]++;
    }

    let index = 0;
    for (let i = 0; i < range; i++) {
        while (count[i] > 0) {
            let val = i + min;
            arr[index] = val;

            recordSwap(arr, index, index, sorted);

            sorted.push(index);
            recordSorted(arr, sorted);

            index++;
            count[i]--;
        }
    }

    return steps;
}


// Run the chosen algorithm and return the recorded steps
function runSort(algoKey) {
    steps = []; // reset steps before each sort
    if (algoKey === "bubble") return bubbleSort();
    if (algoKey === "selection") return selectionSort();
    if (algoKey === "insertion") return insertionSort();
    if (algoKey === "merge") return mergeSort();
    if (algoKey === "quick") return quickSort();
    if (algoKey === "heap") return heapSort();
    if (algoKey === "shell") return shellSort();
    if (algoKey === "counting") return countingSort();
    return [];
}

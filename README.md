# 📊 Sorting Algorithms Visualizer

An interactive web app that lets you **watch sorting algorithms work in real time** — step by step, bar by bar!

Built with plain **HTML**, **CSS**, and **Vanilla JavaScript** as a beginner-friendly lab project.

---

## ✨ Features

- 🎨 **Visual bar chart** — each bar represents an array element
- 🔴🟠🟢 **Color-coded states** — see which bars are being compared, swapped, or sorted
- 🌗 **Dark / Light Mode** — toggle the theme (saves automatically to your browser via `localStorage`)
- ⚙️ **8 Sorting Algorithms** — Bubble, Selection, Insertion, Merge, Quick, Heap, Shell, and Counting Sort
- 🎚️ **Adjustable array size** — from 5 to 80 elements
- ⚡ **Adjustable speed** — Slow, Medium, or Fast
- 📘 **Algorithm info panel** — shows time complexity, space complexity, and stability
- 🔄 **Generate New Array** — randomize at any time
- ↺ **Reset button** — stop and start fresh

---

## 🧠 Sorting Algorithms

| Algorithm      | Time Complexity | Space | Stable |
|----------------|-----------------|-------|--------|
| Bubble Sort    | O(n²)           | O(1)  | ✅ Yes |
| Selection Sort | O(n²)           | O(1)  | ❌ No  |
| Insertion Sort | O(n²)           | O(1)  | ✅ Yes |

### How each one works:

**Bubble Sort** — Repeatedly compares two adjacent elements and swaps them if out of order. The largest values "bubble up" to the end.

**Selection Sort** — Finds the smallest remaining element and places it in the next sorted position.

**Insertion Sort** — Picks each element and inserts it into its correct spot among already-sorted elements — like sorting playing cards in your hand.

---

## 📁 Project Structure

```
sorting-algorithms-visualizer/
│
├── .github/
│   └── copilot-instructions.md   ← Copilot coding guidelines
│
├── .vscode/
│   ├── settings.json             ← Editor settings (tabs, format on save)
│   └── extensions.json           ← Recommended VS Code extensions
│
├── css/
│   └── style.css                 ← All styles for the app
│
├── js/
│   ├── model.js                  ← Array data + sorting algorithms
│   ├── view.js                   ← DOM rendering and UI updates
│   ├── controller.js             ← Event handling + animation loop
│   └── app.js                    ← Entry point, starts everything
│
├── index.html                    ← Main HTML page
└── README.md                     ← You are here!
```

### MVC Pattern Explained

| Layer | File | Responsibility |
|-------|------|----------------|
| **Model** | `model.js` | Stores the array, runs sorting algorithms, records steps |
| **View** | `view.js` | Draws bars, applies colors, updates info panel |
| **Controller** | `controller.js` | Listens for button clicks, runs the animation loop |
| **App** | `app.js` | Initializes everything when the page loads |

---

## 🚀 How to Run Locally

You only need a browser and a code editor — no installation needed!

### Option 1: Use VS Code + Live Server (Recommended)

1. Open the project folder in **VS Code**
2. Install the **Live Server** extension (or it's in `.vscode/extensions.json`)
3. Right-click `index.html` and choose **"Open with Live Server"**
4. Your browser will open automatically at `http://127.0.0.1:5500`

### Option 2: Open Directly in Browser

1. Navigate to the project folder
2. Double-click `index.html`
3. It opens directly in your browser — done! ✅

---

## 🎮 Example Usage

1. Open the app in your browser
2. Use the **Algorithm** dropdown to choose a sorting method
3. Adjust the **Array Size** slider to control how many bars appear
4. Set the **Speed** to Slow if you want to follow each step carefully
5. Click **▶ Start** to begin the animation
6. Watch the bars change color as they get compared, swapped, and sorted!
7. Click **↺ Reset** to stop and generate a fresh array

---

## 🔮 Future Improvements

Here are some ideas to extend the project after the lab:

- [ ] Add **Merge Sort** and **Quick Sort**
- [ ] Show a **step counter** and **comparison counter**
- [ ] Add **sound effects** that match bar height (like a xylophone)
- [ ] Support **dark mode** with a toggle button
- [ ] Allow the user to **draw their own array** by clicking bars
- [ ] Add **pause / resume** functionality during sorting

---

## 🛠️ Built With

- **HTML5** — Semantic structure
- **CSS3** — Flexbox layout, clean design, no frameworks
- **Vanilla JavaScript** — Pure JS, no libraries, MVC pattern

---

> 💡 *This project was built as a student lab exercise to practice DOM manipulation, algorithm logic, and MVC architecture using only plain web technologies.*

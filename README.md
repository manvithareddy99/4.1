# Premium Interactive Portfolio Website

A high-fidelity, modern, and fully responsive developer portfolio website designed for **Nomula Manvitha Reddy** (B.Tech Computer Science - Data Science Student). 

## 🌐 Live Preview
* **Vercel / GitHub Pages**: Deploy and paste your live URL here!
* **Local Server**: Run a server locally to view the interactive animations.

---

## ⚡ Features & Interactive Mechanics

This portfolio goes beyond a traditional static website, implementing advanced mathematical and vector animations in pure Vanilla JavaScript:

1. **Interactive Particle Network Background**:
   - An HTML5 `<canvas>` rendering dynamic data nodes.
   - Nodes connect to one another with proximity-based vector lines.
   - Points interact with the mouse pointer, pushing away dynamically on mouse movement.

2. **Custom Trailing Glow Cursor**:
   - Replaces the default browser cursor on desktop screen sizes.
   - A crisp center dot coupled with a trailing blurred glowing aura that smoothly tracks the coordinates.
   - Expands, hollows out, and glows with transitions when hovering over links, buttons, and form elements.

3. **3D Card Parallax Tilt & Glare Reflections**:
   - Hovering over grid cards (projects, certifications, info blocks) rotates them in 3D space (`rotateX`, `rotateY`).
   - Glare reflection overlays track pointer positions inside cards.

4. **Dynamic Typewriter Script**:
   - Hero header rotates titles ("Data Science Systems.", "Predictive Models.", "Interactive Analytics.", "Statistical Pipelines.").

---

## 🛠️ Technology Stack
* **Structure**: HTML5 (Semantic elements & SEO-optimized)
* **Styling**: CSS3 Custom variables, Flexbox, CSS Grid, custom scrollbars, and keyframe animations
* **Logic**: Vanilla JavaScript (Intersection Observer API, HTML5 Canvas Rendering Context 2D)
* **Icons**: FontAwesome v6.4.0

---

## 📂 Project Structure
```text
PORTFOLIO/
├── index.html   # Main homepage layout & metadata structure
├── styles.css   # Premium glassmorphism design variables & variables
├── script.js    # Canvas particle loops & mouse tracking lerp formulas
└── README.md    # Project overview documentation
```

---

## 🚀 How to Run Locally
1. Clone or download this repository.
2. Run a local web server (e.g. Python's built-in HTTP server):
   ```bash
   python -m http.server 8000
   ```
3. Open **`http://localhost:8000`** in your browser.

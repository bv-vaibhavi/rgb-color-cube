# 🟢 ChromaSpace — RGB Color Model 3D Visualization

> An interactive 3D visualization of the RGB Color Model built with Three.js.  
> Explore how colors map to 3D space through rotation transformation.

**Made by Vaibhavi Sharma**  
Computer Graphics & Animation · B.Tech CSE

---

## 🌐 Live Demo

🔗 [View Website](https://rgb-color-cube-vaibhavi.netlify.app)

---

## 📸 Preview

The website features an interactive RGB Color Cube where every point in 3D space represents a unique color. Users can rotate, zoom, explode and inspect the cube in real time.

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How to Run Locally](#how-to-run-locally)
- [Sections](#sections)
- [Topic Context](#topic-context)

---

## 📖 About

This project is a web-based 3D visualization of the **RGB Color Model** — a core concept from Unit 5 of Computer Graphics & Animation. The cube represents all 16.7 million possible RGB colors as points in three-dimensional space, with the X, Y and Z axes corresponding to the Red, Green and Blue channels respectively.

A **3D Rotation Transformation** (applied via a 4×4 homogeneous rotation matrix in Three.js / WebGL) is used to interactively explore the color space from any angle.

---

## ✨ Features

- 🎲 **Interactive 3D RGB Color Cube** — drag to rotate, scroll to zoom
- 💥 **Explode Mode** — blasts the cube apart to reveal internal color structure
- 🔊 **Sound Effects** — crystal pearl sounds on explode, chime on collapse
- 📊 **Live RGB Channel Bars** — real-time R, G, B readout as the cube rotates
- 🃏 **Clickable Theory Cards** — pop-up modal with detailed info per concept
- 🌐 **Particle Network Background** — animated floating particle canvas
- 🖱️ **Custom Glow Cursor**
- ✨ **Scroll Reveal Animations** — sections animate in as you scroll
- 📐 **Rotation Matrix Display** — shows the actual 4×4 homogeneous matrix used
- 📱 **Responsive Design** — works on mobile and desktop

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| **HTML5** | Structure and content |
| **CSS3** | Styling, animations, scroll reveal |
| **JavaScript (ES6)** | Logic, interactivity, sound synthesis |
| **Three.js r128** | 3D rendering, WebGL, OrbitControls |
| **Web Audio API** | Synthesized sound effects (no external files) |
| **Google Fonts** | Syne + Space Mono typography |
| **Netlify** | Hosting and deployment |

All tools used are **100% open source** and free.

---

## 📁 Project Structure

```
rgb-color-cube/
│
├── index.html      # Main HTML — all sections and structure
├── style.css       # All styles, animations, responsive design
├── main.js         # Three.js cube, particle canvas, sound, modal logic
└── README.md       # This file
```

---

## 🚀 How to Run Locally

No build tools or npm required. Just:

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/rgb-color-cube.git

# 2. Navigate into the folder
cd rgb-color-cube

# 3. Open in browser
# Simply double-click index.html
# OR use VS Code Live Server extension for best results
```

> ⚠️ Three.js is loaded via CDN — an internet connection is required even for local preview.

---

## 📄 Sections

| Section | Description |
|---------|-------------|
| **Hero** | Title, tagline, key stats |
| **Interactive 3D Cube** | Main Three.js visualization with controls |
| **How the RGB Cube Works** | 6 clickable theory cards with modals |
| **How It Works** | 4-step mechanism explanation |
| **8 Vertices** | All 8 corner colors of the RGB cube |
| **3D Rotation Matrix** | Mathematical transformation used |
| **Applications** | 6 real-world use cases |
| **Conclusion** | Summary and key takeaways |
| **Made by Vaibhavi Sharma** | Credit section with ring animation |

---

## 🎓 Topic Context

**Subject:** Computer Graphics & Animation  
**Unit:** 5 — Computer Animation and Color Models  
**Topic:** RGB Color Model — Properties of light, Color model types, Color model conversion  
**Transformation Used:** 3D Rotation (homogeneous coordinates, 4×4 matrix)  
**Open Source Tool:** Three.js (WebGL-based 3D library)

---

## 🔢 The RGB Color Cube

```
         White (1,1,1)
            /|
           / |
    Cyan--/  |
         /   |
        /    Green (0,1,0)
       /    /
      /    /
  Blue----/
  (0,0,1)
         \
          \
           Red (1,0,0)
            \
             Black (0,0,0)
```

Every point inside this cube is a unique color in RGB space.

---

## 👩‍💻 Author

**Vaibhavi Sharma**  
B.Tech CSE · Computer Graphics & Animation  

---

## 📜 License

This project is open source and free to use for educational purposes.

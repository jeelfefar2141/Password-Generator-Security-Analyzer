# Password-Generator-Security-Analyzer

A responsive password generator built with vanilla HTML, CSS, and JavaScript. Beyond generating strong random passwords, it estimates password strength, calculates entropy, tracks history, and lets users analyze their own passwords — all with dark/light theme support.

**🔗 Live Demo:** [Add your GitHub Pages link here]

---

## ✨ Features

- **Password Generator** — customizable length (1–20) with uppercase, lowercase, number, and symbol options
- **Strength Indicator** — real-time visual feedback (weak / reasonable / strong)
- **Password Entropy** — calculates entropy in bits based on selected character sets
- **Estimated Crack Time** — estimates how long a brute-force attack would take, from seconds to billions of years
- **Password History** — keeps the last 5 generated passwords, viewable on a separate page, click to copy
- **Real Password Analysis** — test any password and get specific feedback (e.g. "No uppercase letters", "Too short")
- **Pronounceable Password Mode** — generates easy-to-remember passwords like `Blue@Tiger92`
- **Export Options** — download the current password as `.txt` or the full history as `.csv`
- **Dark / Light Mode** — theme choice is saved and stays consistent across all pages
- **Fully Responsive** — works smoothly on both desktop and mobile

---

## 📸 Screenshots

1. Main Page(Password Generator)
<img width="1918" height="1092" alt="image" src="https://github.com/user-attachments/assets/222479ec-31ee-4d14-a0ba-4147301a33d0" />

2. Generated Password History
<img width="1919" height="1097" alt="image" src="https://github.com/user-attachments/assets/9ed0d33f-a4ef-43e1-837c-4f4acb8ad7a8" />

3. Our Password Analyzer
<img width="1919" height="1100" alt="image" src="https://github.com/user-attachments/assets/09f58ae2-172c-4d14-990a-9da9ef327b4e" />

---

## 🛠️ Built With

- HTML5
- CSS3 (custom properties / CSS variables for theming)
- Vanilla JavaScript (no frameworks or libraries)
- Browser `localStorage` for persisting theme and password history

---

## 📁 Project Structure

```
password-generator/
├── index.html        # Main password generator page
├── history.html       # Password history page
├── analysis.html       # Real password analyzer page
├── style.css          # Shared styling for all pages
├── script.js          # Logic for the generator page
├── history.js          # Logic for the history page
├── analysis.js          # Logic for the analyzer page
└── asset/
    └── Copy.png        # Copy icon
```

---

## 🚀 How to Run

No build steps or dependencies needed.

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/password-generator.git
   ```
2. Open `index.html` in any browser

That's it — everything runs entirely on the client side.

---

## 🧠 What I Learned

- Estimating password entropy and crack time using character pool size and Math.log2
- Persisting state (theme, history) across multiple pages using `localStorage`
- Structuring a multi-page vanilla JS project without a framework
- Writing regex-based password validation for real-time feedback

---

## 👤 Author

**Jeel Patel**

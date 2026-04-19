# AI Lotto Predictor - Blueprint

## Overview
A modern, framework-less web application that predicts lottery numbers using a simulated neural network probability engine. The application features a sleek, dark/light mode UI, interactive animations, and a contact form.

## Project Structure
- `index.html`: Entry point and main layout.
- `style.css`: Modern Vanilla CSS using custom properties, flexbox/grid, and animations.
- `main.js`: Main application logic and Web Component definitions.

## Implemented Features & Design
- **Theme Support**: Seamless dark and light mode toggle.
- **AI Analysis Simulation**: A visual loader with a scanning animation to simulate data processing.
- **Weighted Number Generation**: Logic based on historical win frequencies to generate sets of numbers.
- **Interactive UI**: Responsive cards, "lifting" shadows, and glowing effects for buttons.
- **Web Components**:
    - `<lotto-ball>`: Individual lottery ball with color-coded gradients.
    - `<theme-toggle>`: Functional dark mode switch.
    - `<lotto-display>`: Container for showing the generated results.
    - `<contact-section>`: Form for inquiries with validation.
- **Visual Effects**:
    - Scanning line animation.
    - Multi-layered drop shadows.
    - Perceptually uniform color gradients (using `oklch` or standard HEX/RGB with modern spacing).
    - Responsive layout (mobile-first).

## Current Plan & Steps
1. **HTML Structure**: Define the main shell in `index.html`, linking to `style.css` and `main.js`.
2. **Global Styles**: Implement the core design system in `style.css` (typography, color palettes, animations).
3. **Web Components**: Define the custom elements in `main.js` to encapsulate UI logic.
4. **App Logic**: Implement the lotto generation algorithm and form handling in `main.js`.
5. **Validation**: Ensure accessibility, responsiveness, and error-free execution across themes.

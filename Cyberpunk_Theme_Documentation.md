
# Theme Documentation: Cyberpunk Design for AI-Powered Learning Platform

## 1. Core Design Principles
- **Aesthetic**: A cyberpunk, futuristic design emphasizing neon visuals and smooth interactions.
- **Key Features**:
  - Neon gradients, glowing effects, and dark atmospheric backgrounds.
  - Smooth animations and interactive feedback.
  - Minimalist UI with modern, clean components.

## 2. Colors
Extracted from code and components:
- **Primary Colors**:
  - Neon Blue (`#00F6FF`)
  - Neon Pink (`#FF2E97`)
- **Accent Colors**:
  - Dark Purple (`#1A0B2E`)
  - White (`#FFFFFF`)
- **Background Colors**:
  - Gradient from (`#0A0F1B`) to (`#1A0B2E`)
- **Highlight Colors**:
  - Cyan Glow (`#66FFFF`)

## 3. Fonts
- **Primary Font (Headings)**: Orbitron - A geometric sans-serif with a strong futuristic feel
  - Used for all headings (h1-h6)
  - Bold weights for emphasis
  - Often paired with uppercase and neon glowing effects
- **Secondary Font (Body)**: Exo 2 - A contemporary geometric sans-serif
  - Default font for all body text
  - Excellent readability while maintaining the tech aesthetic
  - Used for form elements, paragraphs, and general text
- **Font Implementation**:
  - Applied globally through CSS base layer
  - Utility classes available: `font-orbitron`, `font-exo`
  - Default weights included: 400 (regular), 600 (semibold)

## 4. Animations
- **Hover Effects**:
  - Buttons scale up slightly with glowing borders.
  - Icons and text change color with transitions.
- **Glitch Effects**:
  - Titles animate with repeated glowing glitches (text-shadow alternation).
- **Interactive Particles**:
  - Background particles and streams react to mouse movement.
  - Explosion effects for transitions between states.
- **Loading Screen**:
  - Spinning gradient ring transitioning smoothly into the main UI.

## 5. UI Components
- **Buttons**:
  - Neon gradient backgrounds (`#FF2E97` to `#00F6FF`).
  - Rounded edges and hover animations (scale and glow).
- **Forms**:
  - Transparent inputs with neon-focused outlines on hover/focus.
  - Checkbox and toggles with gradient fills when active.
- **Modals and Containers**:
  - Semi-transparent dark backgrounds with glowing borders.
  - Subtle drop shadows and gradient outlines.

## 6. Backgrounds
- **Enhanced Cyberpunk Background**:
  - Particle systems with `Three.js`, including:
    - Floating particles in a field.
    - Streaming data effects (streams that flow and reset).
  - Mouse-interactive camera movements.
- **Explosion Effects**:
  - Particles transition outward with alternating blue/pink colors.
  - Blends opacity changes and directional velocities for realism.

## 7. Tools and Frameworks
- **Frontend**:
  - `React` for dynamic UI.
  - `Framer Motion` for animations.
  - `Three.js` for 3D background effects.
- **Styling**:
  - `Tailwind CSS` for utility-first CSS design.
- **Routing**:
  - `React Router DOM` for navigation and route transitions.

## 8. Key Interactions
- **Login/Registration**:
  - Neon hover effects on buttons.
  - Explosions triggered on form submission.
  - Remember Me and toggleable password visibility.
- **Navigation**:
  - Smooth transitions between pages using `AnimatePresence`.
- **Background Animations**:
  - Interactive mouse-controlled movements.
  - Data streams and particle effects continuously animated.

## 9. Reusable Components
- **Buttons**: Gradient-filled, hover-animated.
- **Forms**: Glowing input fields and validation checks.
- **Icons**: Interactive neon-themed using `lucide-react`.

# Aurora Particle Lab

An interactive WebGL particle instrument built with Three.js shaders. It renders tens of thousands of glowing particles that morph between three GPU-driven fields, react to pointer gestures, bloom with shockwaves, and pulse with live microphone input.

## Highlights

- 28,000 shader particles on desktop, with a lighter mobile profile
- Five live presets: Aurora, Signal, Void, Solar, and Deep
- Pointer distortion, click shockwaves, keyboard shortcuts, and prism color phase shifts
- Optional audio-reactive mode powered by the Web Audio API
- URL-shareable preset state with `?preset=solar`
- ACES tone mapping, additive particles, and Unreal Bloom post-processing
- Responsive full-screen demo UI with telemetry

## Controls

- Move pointer: distort the particle field
- Hold pointer: charge the field
- Release pointer: trigger a soft shockwave
- `Pulse`: fire a center shockwave
- `Prism`: cycle color systems
- `Audio`: enable microphone-reactive particles
- `1` to `5`: switch presets
- `C`: cycle color systems
- `Space`: trigger a stronger pulse

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Build

```bash
npm run build
```

## Stack

- Vite
- Three.js
- GLSL shaders
- Web Audio API

## Project Status

This is a visual demo first. The next useful upgrades are exportable clips, preset sharing through URL parameters, and a lightweight performance panel for tuning particles, bloom, speed, and audio gain.

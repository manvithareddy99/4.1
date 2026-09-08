# Week 6: Explain It Like You Built It
**FlyRank AI Internship — Own What You Shipped**

> **Author:** Nomula Manvitha Reddy  
> **Portfolio Repository:** [https://github.com/manvithareddy99/4.1](https://github.com/manvithareddy99/4.1)  
> **Curriculum Reference:** [FlyRank Week 06 · Explain Your Build](https://aifluency.flyrank.ai/week-06.html#explain-it-like-you-built-it)

---

## 1. The Piece of the Build I Picked

When AI first generated the interactive portfolio site, one feature looked like pure magic: the **custom neon glowing mouse cursor**. Instead of a standard Windows arrow cursor, my site displays a sharp cyan dot accompanied by a soft, glowing aura that smoothly glides and trails behind the mouse like a comet.

When I looked at the code in `script.js`, I saw these lines:

```javascript
// Lerp animation loop for smooth trailing cursor
function animateCursor() {
    // Smooth positioning (lerp)
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    dotX += (mouseX - dotX) * 0.25;
    dotY += (mouseY - dotY) * 0.25;

    if (cursorGlow) {
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
    }
    if (cursorDot) {
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
    }

    requestAnimationFrame(animateCursor);
}
```

And in `styles.css`:

```css
body {
    cursor: none; /* Hide default cursor to enable custom cursor */
}

.cursor-glow {
    position: fixed;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.05) 45%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9998;
}

.cursor-dot {
    position: fixed;
    width: 8px;
    height: 8px;
    background-color: #06b6d4;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
```

At first, I didn't write this math myself—AI did. I could tell what it looked like on screen, but I couldn't explain *why* `* 0.08` worked, what `lerp` meant, or why `requestAnimationFrame` was needed. Here is what I learned by breaking it down.

---

## 2. Plain-Words Explanation (Teaching a Friend Who Has Never Built a Site)

Imagine you are walking a dog on a stretchy rubber leash:
- Where your hand is represents the **real mouse pointer**.
- The dog represents the **glowing circle**.

If you sprint forward, the dog doesn't instantly teleport into your shoes. The leash stretches, and the dog accelerates toward you. As the dog gets closer, the tension decreases, and it slows down gently right until it reaches your heels.

That is exactly what this code does on a computer screen.

### Step-by-Step Breakdown:

1. **Hiding the Default Arrow (`cursor: none`):**  
   By default, the operating system paints an arrow cursor. We turn it off with `cursor: none` so our custom HTML elements (`#cursor-dot` and `#cursor-glow`) can take its place. We also set `pointer-events: none` on both elements so the glowing circles don't block clicks on buttons underneath them.

2. **Listening to the Mouse:**  
   ```javascript
   window.addEventListener('mousemove', (e) => {
       mouseX = e.clientX;
       mouseY = e.clientY;
   });
   ```
   Every time the user nudges their mouse, the browser fires an event. We record the coordinates: `mouseX` and `mouseY`.

3. **The Rubber Band Math ("Lerp"):**  
   ```javascript
   glowX += (mouseX - glowX) * 0.08;
   ```
   If we just wrote `glowX = mouseX`, the glow would snap rigidly to the pointer with zero lag—it would look like a stiff sticker.  
   Instead, we use a trick called **Lerp** (Linear Interpolation):
   - `(mouseX - glowX)` calculates the distance between the target (mouse) and where the glow currently sits.
   - We multiply that gap by `0.08` (which is 8%).
   - We add that 8% to the current position:
     - When you make a sudden swipe across the screen, the distance is huge (e.g. 500 pixels). 8% of 500 is 40 pixels, so the glow takes a huge, fast leap.
     - As the glow approaches your pointer and is only 10 pixels away, 8% is only 0.8 pixels. It gently glides to a stop.
   - This creates natural physical easing without needing heavy physics engines.

4. **Two Speeds for Two Layers:**  
   Notice the dot uses `* 0.25` (25% per step) while the glow uses `* 0.08` (8% per step).
   - The dot travels fast (closing 25% of the gap per frame) so your clicks feel responsive and precise.
   - The big 350px glow aura is lazy (closing only 8% per frame), creating an atmospheric, floating trail behind the pointer.

5. **Why `requestAnimationFrame` Instead of a Timer:**  
   ```javascript
   requestAnimationFrame(animateCursor);
   ```
   Beginners often use `setInterval(..., 16)`. But timers run on arbitrary intervals that don't match when the monitor actually refreshes, causing stuttering and wasting battery. `requestAnimationFrame` tells the browser: *"Whenever you are about to refresh the screen (usually 60 times a second), calculate the next 8% step."* If the user switches tabs, the browser automatically pauses the loop, saving CPU and GPU power.

6. **Mobile Friendly Fallback:**  
   On phones and tablets (`max-width: 1024px`), there is no mouse hover—fingers tap directly on glass. Our CSS media query hides both circles (`display: none`) and resets `cursor: default`, preventing ghost cursors from lagging behind taps.

---

## 3. Two Checkpoint Questions to Prove Understanding

### Question 1: What would happen if we changed `0.08` to `1.0` in `glowX += (mouseX - glowX) * 1.0`?
**Answer:** `(mouseX - glowX) * 1.0` means the glow takes 100% of the remaining distance on the very first frame. The trailing lag and smooth deceleration would completely disappear, and the glow would instantly snap to the cursor coordinates, behaving identically to `glowX = mouseX`.

### Question 2: Why do we use `e.clientX` instead of `e.pageX` to track the cursor?
**Answer:** Both cursor elements have `position: fixed` in CSS, which means their positions are calculated relative to the visible browser window (viewport), not the entire scrollable page height. `e.clientX / e.clientY` measure coordinates inside the visible window. If we used `e.pageX / e.pageY`, scrolling down the page would add scroll offset to the cursor, causing the glow to drift far below the actual mouse.

---

## 4. Key Takeaway

Before this exercise, the custom cursor was "mystery code" that AI generated to make the site look cool. Now, I can explain every line, the mathematics behind the smooth glide, and the browser rendering lifecycle that keeps it at 60 frames per second. I am genuinely the human in the loop.

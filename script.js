document.addEventListener("DOMContentLoaded", () => {
  // State variables
  let playMusic = false;
  let sequenceStarted = false;

  // DOM Elements
  const musicDialog = document.getElementById("musicDialog");
  const musicPlayer = document.getElementById("musicPlayer");
  const countdownSection = document.getElementById("countdownSection");
  const countdown = document.getElementById("countdown");
  const firstMessage = document.getElementById("firstMessage");
  const secondMessage = document.getElementById("secondMessage");
  const nameMeaningMessage = document.getElementById("nameMeaningMessage");
  const birthdayText = document.getElementById("birthdayText");
  const greetingSection = document.getElementById("greetingSection");
  const finalMessage = document.getElementById("finalMessage");
  const specialMessage = document.getElementById("specialMessage");
  const becauseMessage = document.getElementById("becauseMessage");
  const youAreSpecialMessage = document.getElementById("youAreSpecialMessage");
  const soLine1Message = document.getElementById("soLine1Message");
  const soLine2Message = document.getElementById("soLine2Message");
  const finalSceneContainer = document.getElementById("finalSceneContainer");
  const birthdayImage = document.getElementById("birthdayImage");
  const birthdayHat = document.getElementById("birthdayHat");
  const finalWishesMessage = document.getElementById("finalWishesMessage");
  const detailedMessageContainer = document.getElementById(
    "detailedMessageContainer"
  );
  const comeBackMessageContainer = document.getElementById(
    "comeBackMessageContainer"
  );
  const comeBackMessage = document.getElementById("comeBackMessage");
  const replayButton = document.getElementById("replayButton");
  const bgMusic = document.getElementById("bgMusic");
  const toggleMusicBtn = document.getElementById("toggleMusicBtn");
  const volumeIcon = document.getElementById("volumeIcon");
  const muteIcon = document.getElementById("muteIcon");
  const greetingText = document.getElementById("greetingText");
  const sendBtn = document.getElementById("sendBtn");
  const mainBackground = document.querySelector(".min-h-screen");

  // Music Dialog Buttons
  const noMusicBtn = document.getElementById("noMusicBtn");
  const yesMusicBtn = document.getElementById("yesMusicBtn");

  // Full greeting message
  const fullGreetingMessage =
    "Happy Birthday, bro! You're one of the coolest people I know. Grateful for all the laughs, late-night talks, and stupid things we’ve done together. Here’s to more fun, success, and food! Have an awesome one!";

  // Full detailed message
  const fullDetailedMessage =
  "Yo bro, it’s your day! Just wanna say you mean a lot to me, and I’m lucky to have a friend like you. Cheers to more laughs, late-night talks, and epic memories. Happy Birthday, legend! 🎉🔥👊";

  // **** START: Add Delay Helper ****
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  // **** END: Add Delay Helper ****

  // **** ADD: Confetti function ****
  function launchConfetti() {
    // Basic burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    // A few more bursts for good measure
    setTimeout(
      () =>
        confetti({
          particleCount: 80,
          spread: 50,
          origin: { y: 0.7 },
          angle: 60,
        }),
      200
    );
    setTimeout(
      () =>
        confetti({
          particleCount: 80,
          spread: 50,
          origin: { y: 0.7 },
          angle: 120,
        }),
      400
    );
  }

  // **** ADD: Balloon functions ****
  let balloonInterval = null; // To store the interval ID
  const balloonColors = [
    "rgba(255,99,71,0.8)",
    "rgba(65,105,225,0.8)",
    "rgba(255,215,0,0.8)",
    "rgba(50,205,50,0.8)",
    "rgba(218,112,214,0.8)",
  ]; // Tomato, RoyalBlue, Gold, LimeGreen, Orchid

  function createAndLaunchBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    // Random horizontal position and color
    const randomLeft = Math.random() * 90; // 0% to 90% to keep it within screen width
    const randomColor =
      balloonColors[Math.floor(Math.random() * balloonColors.length)];

    balloon.style.left = `${randomLeft}vw`;
    balloon.style.backgroundColor = randomColor;

    // Random animation duration variation (makes it look more natural)
    const randomDuration = Math.random() * 2 + 5; // 5s to 7s
    balloon.style.animationDuration = `${randomDuration}s`;

    document.body.appendChild(balloon);

    // Remove balloon from DOM after animation finishes + a buffer
    setTimeout(() => {
      balloon.remove();
    }, randomDuration * 1000 + 500);
  }

  function startBalloons() {
    if (balloonInterval) clearInterval(balloonInterval); // Clear previous interval if any
    // Launch initial burst
    for (let i = 0; i < 5; i++) {
      // Launch 5 immediately
      setTimeout(createAndLaunchBalloon, Math.random() * 500);
    }
    // Launch periodically
    balloonInterval = setInterval(createAndLaunchBalloon, 700); // Launch one every 700ms
  }

  function stopBalloons() {
    if (balloonInterval) clearInterval(balloonInterval);
    balloonInterval = null;
  }

  // **** ADD: Heart effect functions ****
  let heartInterval = null;

  function createHeart() {
    try {
      const heart = document.createElement("span"); // Use span or div
      heart.className = "heart";
      heart.innerHTML = "❤️"; // Or "♡", "💖", etc.

      // Randomize horizontal start slightly more than balloons
      const randomOffset = (Math.random() - 0.5) * 30; // -15vw to +15vw deviation from center
      heart.style.left = `calc(50% + ${randomOffset}vw)`;

      // Randomize animation duration slightly
      const randomDuration = Math.random() * 1 + 3; // 3s to 4s
      heart.style.animationDuration = `${randomDuration}s`;

      // Randomize start delay slightly to stagger them
      const randomDelay = Math.random() * 0.5; // 0s to 0.5s delay
      heart.style.animationDelay = `${randomDelay}s`;

      document.body.appendChild(heart);

      // Remove heart after animation finishes
      setTimeout(() => {
        if (heart.parentNode) {
          heart.remove();
        }
      }, (randomDuration + randomDelay) * 1000 + 100); // Add delay + duration buffer
    } catch (error) {
      console.error("Error creating heart:", error);
    }
  }

  function startHeartEffect(durationMs = 3000, frequencyMs = 300) {
    stopHeartEffect(); // Clear any existing interval

    // Launch initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(createHeart, Math.random() * 200); // Immediate-ish burst
    }

    // Launch periodically
    heartInterval = setInterval(createHeart, frequencyMs); // Launch one every frequencyMs

    // Stop launching new hearts after specified duration
    setTimeout(stopHeartEffect, durationMs);
  }

  function stopHeartEffect() {
    if (heartInterval) {
      clearInterval(heartInterval);
      heartInterval = null;
    }
  }
  // **** END: Heart effect functions ****

  // Functions

  // --- SIMPLIFIED handleMusicChoice function ---
// This is mainly called by the NoMusicBtn now, or defensively
function handleMusicChoice(choice) {
     // choice is true/false indicating user's raw choice (might differ from final playMusic state if playback failed)
     console.log(`handleMusicChoice received initial choice: ${choice}`);

     if(sequenceStarted) return; // Avoid double execution if called somehow after sequence started
     sequenceStarted = true; // Lock sequence
     playMusic = choice; // Set based on this button's click


     // If NO music was chosen directly:
     if (!playMusic) {
          console.log("No Music chosen directly, starting sequence.");

           // 1. Hide Dialog
           if (musicDialog) musicDialog.classList.add("hidden");
           // 2. Show player controls (optional, maybe hide if no music?)
           if (musicPlayer) musicPlayer.classList.remove("hidden");
           // 3. Set icons
           if (volumeIcon) volumeIcon.classList.add("hidden");
           if (muteIcon) muteIcon.classList.remove("hidden");
           // 4. Start Countdown
           if (countdownSection) {
              countdownSection.classList.remove("hidden");
              startCountdown(5);
           } else {
               console.error("Countdown section not found!");
           }
     } else {
          // This branch should ideally not be reached if the yesMusicBtn handler works correctly,
          // but log it just in case.
          console.warn("handleMusicChoice called with 'true', but yesMusicBtn listener should have handled it.");
          // You might want to call the `startSequenceUI(true)` function here as a fallback if needed
          // startSequenceUI(true); // Redundant if yesMusicBtn works
     }
}
// --- END of SIMPLIFIED handleMusicChoice function ---

  function startCountdown(seconds) {
    let timeLeft = seconds;
    countdown.textContent = timeLeft;

    const timer = setInterval(() => {
      timeLeft--;
      countdown.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        handleCountdownComplete();
      }
    }, 1000);
  }

  async function handleCountdownComplete() {
    // Make the function async
    // Hide countdown
    countdownSection.classList.add("hidden");

    // Start message sequence with delays
    await delay(500); // Wait 500ms
    showElement(firstMessage);

    await delay(500); // Wait 500ms (first message visible for 500ms)
    showElement(secondMessage);

    await delay(3000); // Wait 3000ms (both messages visible)

    // --- START: Modified Fade Out ---
    hideElement(firstMessage); // Start hiding first message
    hideElement(secondMessage); // Start hiding second message AT THE SAME TIME
    // --- END: Modified Fade Out ---

    // **** START: Show NEW Name Meaning Message & Change Background ****
    if (mainBackground) {
      console.log("Changing background to night theme.");
      mainBackground.classList.remove("bg-gradient-to-br"); // Remove original
      mainBackground.classList.add("bg-gradient-night"); // Add night theme
    } else {
      console.error("Main background element not found for class toggle.");
    }

    await delay(500); // Short delay *after* BG starts changing, before text appears
    console.log("Showing name meaning message.");
    showElement(nameMeaningMessage);

    const nameMeaningVisibleDuration = 4000;
    await delay(nameMeaningVisibleDuration);

    // **** START: Change Background Back & Hide Message ****
    if (mainBackground) {
      console.log("Changing background back to original theme.");
      mainBackground.classList.remove("bg-gradient-night"); // Remove night
      mainBackground.classList.add("bg-gradient-to-br"); // Add original back
    }
    console.log("Hiding name meaning message.");
    hideElement(nameMeaningMessage);
    // **** END: Change Background Back & Hide Message ****

    // Wait for background transition *and* message fade-out
    // Use the longer of the two (BG transition = var(--duration-bg-change), message fade = var(--duration-fade))
    // Get the duration from CSS variable (if needed dynamically) or use the known value
    const bgTransitionDurationMs = 2000; // Match the value in --duration-bg-change (2s)
    await delay(bgTransitionDurationMs); // Wait for BG to transition back

    // --- Birthday Text Section ---
    showElement(birthdayText); // Start fade-in (takes 1000ms)

    // Wait for the fade-in animation to complete
    await delay(1000);

    // === Trigger Effects AFTER fade-in ===
    console.log("Birthday text visible, triggering effects.");

    // 1. Find the specific word "Birthday"
    const birthdayWordSpan = document.querySelector(
      "#birthdayText .birthday-word"
    );

    // 2. Add the pop-out class to trigger animation
    if (birthdayWordSpan) {
      console.log("Applying pop-out class to 'Birthday'.");
      birthdayWordSpan.classList.add("pop-out");
    } else {
      console.warn("Could not find span with class 'birthday-word'.");
    }

    // 3. Start the heart effect
    console.log("Starting heart effect.");
    startHeartEffect(3000, 250); // Launch hearts for 3 seconds, one every 250ms

    // === Wait for the desired duration AFTER effects start ===
    // Total desired visibility = 5000ms (for example).
    // We already waited 1000ms for fade-in.
    // So, wait an additional 4000ms.
    const birthdayTextVisibleDuration = 4000; // <-- ADJUST THIS: Time AFTER fade-in completes
    await delay(birthdayTextVisibleDuration);

    // Optional: Remove pop-out class just before fade-out to return to normal smoothly
    if (birthdayWordSpan) {
      birthdayWordSpan.classList.remove("pop-out");
      await delay(100); // Tiny delay for style change to register
    }

    // --- Hide Birthday Text ---
    console.log("Hiding birthday text.");
    hideElement(birthdayText); // Start fade-out (takes 1000ms)
    stopHeartEffect(); // Stop any remaining heart interval just in case

    // Wait for birthday text fade-out BEFORE showing greeting
    await delay(1000);

    // Important: Wait for birthday text to finish fading *before* showing greeting
    await delay(1000);
    showGreeting();
  }

  function showElement(element) {
    if (!element) {
      console.error("showElement called with null element");
      return;
    }
    // Force remove opacity-0 and hidden FIRST, then trigger fade
    element.classList.remove("hidden", "opacity-0");
    element.classList.add("visible"); // Sets opacity: 1 directly via CSS potentially

    // Use requestAnimationFrame to ensure styles apply before adding fade class
    requestAnimationFrame(() => {
      element.classList.add("fade-in");
    });
  }

  function hideElement(element) {
    if (!element) return; // Safety check
    element.classList.remove("visible");
    element.classList.add("fade-out");
    setTimeout(() => {
      element.classList.add("hidden");
      element.classList.add("opacity-0"); // Add opacity-0 when fully hidden
    }, 1000); // Matches fade-out duration
  }

  function showGreeting() {
    greetingSection.classList.remove("hidden");

    // Typing effect for greeting text
    typeGreeting(0);
  }

  function typeGreeting(index) {
    if (index <= fullGreetingMessage.length) {
      greetingText.innerHTML = fullGreetingMessage.slice(0, index);
      setTimeout(() => typeGreeting(index + 1), 50);
    } else {
      // Show send button after typing is complete
      setTimeout(() => {
        sendBtn.style.display = "inline-flex";

        // Auto-click send button after 5 seconds
        setTimeout(() => {
          if (!sendBtn.clicked) {
            sendBtn.click();
          }
        }, 2000); // <<< CHANGED from 5000 to 3000
      }, 1000);
    }
  }

  // Function to type the detailed message (returns a Promise) - Refined Recursion
  function typeDetailedMessage(targetElement, text, index, speed) {
    return new Promise(async (resolve) => {
      // Make inner function async for await delay
      if (!targetElement) {
        console.error("Target element for detailed message typing not found!");
        resolve();
        return;
      }

      if (index <= text.length) {
        targetElement.innerHTML = text.slice(0, index);
        await delay(speed); // Use the existing delay helper instead of setTimeout directly
        await typeDetailedMessage(targetElement, text, index + 1, speed); // Await the next step
        resolve(); // Resolve after the entire chain completes
      } else {
        console.log("Detailed message typing complete.");
        showElement(finalWishesMessage); // Show wishes
        // Small delay to ensure 'showElement' takes visual effect before promise resolves
        await delay(50);
        resolve(); // Typing finished, wishes shown, resolve the promise
      }
    });
  }

  async function handleGreetingComplete() {
    hideElement(greetingSection);

    await delay(1000);
    showElement(finalMessage);

    await delay(3000);
    hideElement(finalMessage);

    await delay(1000);
    showElement(specialMessage);

    await delay(1000);
    hideElement(specialMessage);

    await delay(1000);
    showElement(becauseMessage);

    await delay(1000);
    hideElement(becauseMessage);

    await delay(1000);
    showElement(youAreSpecialMessage);
    const specialSpan = document.querySelector(
      "#youAreSpecialMessage .highlight-special"
    );

    // Wait slightly after fade-in starts before highlighting
    await delay(500);
    if (specialSpan) {
      specialSpan.classList.add("highlighted");
    }

    // Total visible time for "You Are Special" is 2000ms
    // Highlight should be visible for 2000ms - 500ms = 1500ms
    await delay(2000);

    // Remove highlight just before starting fade-out
    if (specialSpan) {
      specialSpan.classList.remove("highlighted");
    }
    // Small delay to allow highlight removal transition before fade-out starts
    await delay(500);
    hideElement(youAreSpecialMessage); // Start hiding (takes 1000ms)

    // --- START: Updated "So..." Sequence ---
    await delay(1000); // Wait after previous hides
    showElement(soLine1Message); // Show "So..." (large)

    await delay(2000); // Short delay
    showElement(soLine2Message); // Show "I made this site." (small)

    await delay(2500); // Keep both visible for 2.5 seconds

    // Hide both simultaneously
    hideElement(soLine1Message);
    hideElement(soLine2Message);

    await delay(1000); // Wait for their fade-out
    // --- END: Updated "So..." Sequence ---

    // --- FINAL SCENE LOGIC ---
    console.log("Starting final scene...");

    // Make the scene container visible (it holds everything)
    finalSceneContainer.classList.remove("hidden");
    finalImageContainer.classList.remove("hidden");

    // Make messages visible (remove hidden/opacity) - Appear instantly
    // detailedMessageContainer.classList.remove("hidden", "opacity-0");
    // detailedMessageContainer.classList.add("visible"); // Ensure opacity 1
    // finalWishesMessage.classList.remove("hidden", "opacity-0");
    // finalWishesMessage.classList.add("visible"); // Ensure opacity 1

    // Make detailed message container visible but content empty initially
    detailedMessageContainer.classList.remove("hidden", "opacity-0"); // Make the box appear
    detailedMessageContainer.classList.add("visible"); // Ensure its styles are applied

    const detailedMessageParagraph =
      detailedMessageContainer.querySelector("p"); // Get the actual <p> tag inside
    if (detailedMessageParagraph) {
      detailedMessageParagraph.innerHTML = ""; // Clear any initial static text
    }

    // KEEP finalWishesMessage hidden initially
    finalWishesMessage.classList.add("hidden", "opacity-0");
    finalWishesMessage.classList.remove("visible"); // Ensure it's not visible

    launchConfetti();
    startBalloons();

    // --- START Typing Detailed Message ---
    const typingSpeed = 75; // Default speed: 75ms per character
    if (detailedMessageParagraph) {
      await delay(500); // Optional wait before typing
      console.log("Starting detailed message typing...");
      await typeDetailedMessage(
        detailedMessageParagraph,
        fullDetailedMessage,
        0,
        typingSpeed
      ); // <<< AWAIT the promise here
      console.log("Detailed message typing finished, wishes shown.");
    } else {
      console.error(
        "Could not find the <p> tag inside detailedMessageContainer."
      );
      // Fallback: Still show wishes if P tag failed but container exists
      if (detailedMessageContainer) showElement(finalWishesMessage);
      await delay(500); // Small delay even in fallback
    }

    // --- Wait 3 seconds AFTER wishes appear ---
    console.log("Waiting 3 seconds for final viewing...");
    await delay(3000); // <<< ADDED 3 SECOND DELAY HERE

    // --- Stop effects and Start Hiding ---
    console.log("Stopping new balloons."); // <<< MOVED stopBalloons here
    stopBalloons();

    console.log("Hiding final scene..."); // <<< Hiding starts AFTER the 3-second delay
    finalSceneContainer.classList.remove("visible");
    finalSceneContainer.classList.add("fade-out");
    detailedMessageContainer.classList.remove("visible");
    detailedMessageContainer.classList.add("fade-out");
    finalWishesMessage.classList.remove("visible");
    finalWishesMessage.classList.add("fade-out");

    await delay(1000); // Wait for fade-out animation
    // ... (rest of hiding and showing "Come back" message logic remains the same) ...

    console.log("Stopping new balloons.");
    stopBalloons();

    // --- HIDE FINAL SCENE ---
    console.log("Hiding final scene...");
    finalSceneContainer.classList.remove("visible");
    finalSceneContainer.classList.add("fade-out");
    detailedMessageContainer.classList.remove("visible"); // Ensure these also start fading
    detailedMessageContainer.classList.add("fade-out");
    finalWishesMessage.classList.remove("visible");
    finalWishesMessage.classList.add("fade-out");

    await delay(1000); // Wait for fade-out
    finalSceneContainer.classList.add("hidden");
    detailedMessageContainer.classList.add("hidden", "opacity-0");
    finalWishesMessage.classList.add("hidden", "opacity-0");
    console.log("Final scene hidden.");

    if (comeBackMessageContainer && comeBackMessage) {
      comeBackMessageContainer.classList.remove("hidden"); // Show container first
      // Add small delay before starting fade on inner element
      await delay(50);
      showElement(comeBackMessage); // Target INNER message for fade-in
      console.log("Come back message shown.");
    } else {
      console.error(
        "Come back message container or inner message element not found!"
      );
    }
    // Message remains visible
  } // End of handleGreetingComplete

  function toggleMusic() {
    if (bgMusic.paused) {
      bgMusic.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      volumeIcon.classList.remove("hidden");
      muteIcon.classList.add("hidden");
    } else {
      bgMusic.pause();
      volumeIcon.classList.add("hidden");
      muteIcon.classList.remove("hidden");
    }
  }

  function showToast(title, message, variant = "error") {
    // Simple toast implementation
    const toast = document.createElement("div");
    toast.className = `toast toast-${variant}`;
    toast.innerHTML = `
      <div class="toast-header">
        <strong>${title}</strong>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `;

    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add("toast-hiding");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 500);
    }, 3000);
  }

  // Event Listeners
  noMusicBtn.addEventListener("click", () => handleMusicChoice(false));

  // --- REVISED yesMusicBtn Event Listener ---
yesMusicBtn.addEventListener("click", () => {
  // Prevent starting the sequence multiple times if clicked again quickly
  if (sequenceStarted) {
      console.log("Sequence already started, ignoring second click.");
      return;
  }

  playMusic = true; // Set the flag indicating user wants music

  // --- Define function to start the UI Sequence (to avoid repetition) ---
  const startSequenceUI = (musicSuccess) => {
      console.log(`Starting UI sequence with Music ON = ${musicSuccess}`);
      playMusic = musicSuccess; // Update the global flag based on outcome

      // Check if already started (defensive check)
      if (sequenceStarted) {
           console.warn("Sequence UI starting, but sequenceStarted was already true.");
      }
       sequenceStarted = true; // Lock the sequence

      // --- Perform UI updates NOW ---
      // 1. Hide Dialog
      if (musicDialog) musicDialog.classList.add("hidden");

      // 2. Show Player controls
      if (musicPlayer) musicPlayer.classList.remove("hidden");

      // 3. Set icon state based on final 'playMusic' status
      if (playMusic) {
           if (volumeIcon) volumeIcon.classList.remove("hidden");
           if (muteIcon) muteIcon.classList.add("hidden");
      } else {
           if (volumeIcon) volumeIcon.classList.add("hidden");
           if (muteIcon) muteIcon.classList.remove("hidden");
      }

      // 4. Show & Start Countdown
      if (countdownSection) {
           countdownSection.classList.remove("hidden");
           startCountdown(5); // Countdown starts AFTER play attempt resolves
      } else {
          console.error("Countdown section not found!");
          // Potentially trigger next step directly if countdown fails? handleCountdownComplete();
      }
  };

  // --- Attempt to Play Audio Immediately ---
  if (bgMusic) {
      console.log("Attempting to play music from button click...");
      const playPromise = bgMusic.play();

      if (playPromise !== undefined) {
          playPromise.then(() => {
              // --- Playback Started Successfully ---
              console.log("Audio playback started successfully. Starting UI sequence.");
              // Now call the function to handle UI changes and start countdown
              startSequenceUI(true);
          }).catch(error => {
              // --- Playback Failed ---
              console.error("Audio playback failed on button click:", error);
              showToast("Audio Error", "Could not start music automatically.");
               // Now call the function to handle UI changes (music off) and start countdown
              startSequenceUI(false);
          });
      } else {
           // Fallback for browsers without promise support
           console.warn(".play() did not return a promise. Assuming playback might work, proceeding.");
           startSequenceUI(true); // Start UI optimistically
      }
  } else {
      // --- Audio Element Not Found ---
      console.error("bgMusic element not found when trying to play.");
      showToast("Error", "Music player element is missing.");
       startSequenceUI(false); // Start UI without music
  }
});
// --- END of REVISED yesMusicBtn Event Listener ---

  toggleMusicBtn.addEventListener("click", toggleMusic);

  sendBtn.addEventListener("click", function () {
    this.clicked = true;

    // Add button press animation
    this.classList.add("btn-pressed");

    setTimeout(() => {
      this.classList.remove("btn-pressed");

      setTimeout(() => {
        handleGreetingComplete();
      }, 500);
    }, 300);
  });

  // **** ADD Replay Button Listener ****
  if (replayButton) {
    replayButton.addEventListener("click", () => {
      console.log("Replay button clicked");
      location.reload(); // Reloads the current page
    });
  } else {
    console.error("Replay button not found!");
  }

  // Additional CSS for toast notifications
  const toastStyles = document.createElement("style");
  toastStyles.textContent = `
    .toast {
      position: fixed;
      top: 1rem;
      right: 1rem;
      max-width: 350px;
      background-color: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.375rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      z-index: 1000;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .toast-error {
      border-left: 4px solid #e53e3e;
    }

    .toast-success {
      border-left: 4px solid #38a169;
    }

    .toast-header {
      padding: 0.5rem 1rem;
      background-color: #f7fafc;
      border-bottom: 1px solid #edf2f7;
    }

    .toast-body {
      padding: 0.75rem 1rem;
    }

    .toast-hiding {
      opacity: 0;
      transform: translateX(100%);
    }

    .btn-pressed {
      transform: scale(0.95) !important;
      background-color: #be185d !important;
      box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05) !important;
    }
  `;

  document.head.appendChild(toastStyles);

  // Initialize: Display the music dialog by default
  sendBtn.style.display = "none";

  // Ensure dynamic sections are hidden on load
  if (soLine1Message) soLine1Message.classList.add("hidden", "opacity-0"); // Initialize new elements
  if (soLine2Message) soLine2Message.classList.add("hidden", "opacity-0"); // Initialize new elements
  if (finalSceneContainer) finalSceneContainer.classList.add("hidden");
  if (detailedMessageContainer)
    detailedMessageContainer.classList.add("hidden", "opacity-0");
  if (finalWishesMessage)
    finalWishesMessage.classList.add("hidden", "opacity-0");
  if (nameMeaningMessage)
    nameMeaningMessage.classList.add("hidden", "opacity-0");
  if (comeBackMessageContainer)
    comeBackMessageContainer.classList.add("hidden");
  // Ensure inner comeBackMessage starts transparent even if container isn't hidden yet
  if (comeBackMessage) comeBackMessage.classList.add("opacity-0");

  // Ensure the dynamic span classList is clear initially if page reloads weirdly
  const initialBirthdaySpan = document.querySelector(
    "#birthdayText .birthday-word"
  );
  if (initialBirthdaySpan) {
    initialBirthdaySpan.classList.remove("pop-out");
  }
});

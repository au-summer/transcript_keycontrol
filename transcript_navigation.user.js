// ==UserScript==
// @name         Transcript Navigation
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Navigate transcript using keyboard
// @author       ausummer
// @match        *://leccap.engin.umich.edu/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Configurable keys
  const keyNext = "."; // Key to go to the next transcript line
  const keyPrev = ","; // Key to go to the previous transcript line

  // Function to simulate a click event
  function simulateClick(element) {
    if (element) {
      element.click();
    }
  }

  // Listen for keydown events
  document.addEventListener("keydown", function (event) {
    if (event.key === keyNext || event.key === keyPrev) {
      // Get the currently active transcript row
      const activeRow = document.querySelector(".transcript-row.active");
      if (activeRow) {
        let targetRow;
        if (event.key === keyPrev) {
          // Get the previous sibling row
          targetRow = activeRow.previousElementSibling;
        } else if (event.key === keyNext) {
          // Get the next sibling row
          targetRow = activeRow.nextElementSibling;
        }

        // If the target row exists, simulate a click on it
        if (targetRow && targetRow.classList.contains("transcript-row")) {
          simulateClick(targetRow);

          // change caption text
          const transcriptTextElement =
            targetRow.querySelector(".transcript-text");
          const captionElement = document.getElementById("captions");
          if (transcriptTextElement && captionElement) {
            const innerCaption = captionElement.querySelector("div");
            if (innerCaption) {
              innerCaption.innerText = transcriptTextElement.innerText;
            }
          }
        }
      }
    }
  });
})();

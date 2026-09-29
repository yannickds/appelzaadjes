(() => {
  "use strict";

  const storageKey = "appelzaadjes.lens";

  const allowedLenses = new Set([
    "grief",
    "presence",
    "self-awareness",
    "gut-feeling",
    "acceptance",
    "compassion",
    "authenticity",
    "confidence",
    "non-judgement",
    "curiosity",
    "playfulness"
  ]);

  function normalise(value) {
    return allowedLenses.has(value) ? value : "grief";
  }

  let selectedLens = "grief";

  try {
    selectedLens = normalise(localStorage.getItem(storageKey));
  } catch (_) {
    // The original palette is used if storage is unavailable.
  }

  function applyLens(value) {
    selectedLens = normalise(value);
    document.documentElement.dataset.lens = selectedLens;

    const select = document.getElementById("site-lens");

    if (select) {
      select.value = selectedLens;
    }
  }

  // Apply the saved colours before the page is displayed.
  applyLens(selectedLens);

  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("site-lens");

    if (!select) return;

    select.value = selectedLens;
    select.closest(".lens-control").hidden = false;

    select.addEventListener("change", () => {
      applyLens(select.value);

      try {
        localStorage.setItem(storageKey, selectedLens);
      } catch (_) {
        // Changing the lens still works on the current page.
      }
    });
  });

  // Keep other open tabs in sync.
  window.addEventListener("storage", (event) => {
    if (event.key === storageKey || event.key === null) {
      applyLens(event.newValue);
    }
  });
})();

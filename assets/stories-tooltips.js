// ✅ Debug flag toggle
// utilise isDev déjà défini dans base.js
function debug(...args) {
  if (isDev) console.debug('[Stories Tooltip]', ...args);
}

document.addEventListener("DOMContentLoaded", function () {
  // Detecte si on est sur mobile (pas de hover)
  const isMobile = window.matchMedia("(hover: none)").matches;
  debug("isMobile:", isMobile);

  document.querySelectorAll(".animated-stories-link").forEach(link => {
    const tooltip = link.querySelector(".tooltip-bubble");
    if (!tooltip) return;

    if (!isMobile) {
      // Desktop : affichage au survol
      link.addEventListener("mouseenter", () => {
        tooltip.classList.add("hover-visible");
        debug("Hover enter on", link);
        // Ajuste la position après affichage
        setTimeout(() => adjustTooltipPosition(tooltip), 0);
      });

      link.addEventListener("mouseleave", () => {
        tooltip.classList.remove("hover-visible");
        debug("Hover leave on", link);
        resetTooltipPosition(tooltip);
      });
    } else {
      // Mobile : affichage au clic + navigation différée 2s
      link.addEventListener("click", e => {
        e.preventDefault();
        debug("Click on", link);

        // Cache toutes les autres infobulles actives
        document.querySelectorAll(".tooltip-bubble.tap-visible").forEach(el => {
          el.classList.remove("tap-visible");
        });

        tooltip.classList.add("tap-visible");

        setTimeout(() => {
          tooltip.classList.remove("tap-visible");
          const targetHref = link.getAttribute("href");
          if (targetHref) {
            debug("Navigating to", targetHref);
            window.location.href = targetHref;
          }
        }, 2000);
      });
    }
  });
});

// Ajuste la position horizontale de l'infobulle pour éviter débordements
function adjustTooltipPosition(tooltip) {
  const rect = tooltip.getBoundingClientRect();
  const vw = window.innerWidth;

  tooltip.style.left = "50%";
  tooltip.style.transform = "translateX(-50%)";

  if (rect.left < 0) {
    const shift = Math.abs(rect.left) + 10;
    tooltip.style.left = `${shift}px`;
    tooltip.style.transform = "none";
  } else if (rect.right > vw) {
    const overflow = rect.right - vw + 10;
    tooltip.style.left = `calc(50% - ${overflow}px)`;
    tooltip.style.transform = "translateX(-50%)";
  }
}

// Reset position tooltip centrée
function resetTooltipPosition(tooltip) {
  tooltip.style.left = "50%";
  tooltip.style.transform = "translateX(-50%)";
}
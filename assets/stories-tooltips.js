document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.matchMedia("(hover: none)").matches;

  document.querySelectorAll(".animated-stories-link").forEach(link => {
    const tooltip = link.querySelector(".tooltip-bubble");
    if (!tooltip) return;

    if (!isMobile) {
      // Desktop : infobulle au survol
      link.addEventListener("mouseenter", () => {
        tooltip.classList.add("hover-visible");
        setTimeout(() => adjustTooltipPosition(tooltip), 0);
      });

      link.addEventListener("mouseleave", () => {
        tooltip.classList.remove("hover-visible");
        resetTooltipPosition(tooltip);
      });
    } else {
      // Mobile : clic = infobulle + redirection différée
      link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelectorAll(".tooltip-bubble.tap-visible").forEach(el => {
          el.classList.remove("tap-visible");
        });

        tooltip.classList.add("tap-visible");

        setTimeout(() => {
          tooltip.classList.remove("tap-visible");
          window.location.href = link.getAttribute("href");
        }, 2000);
      });
    }
  });
});

// Corrige la position horizontale si déborde à gauche/droite
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
    tooltip.style.left = `calc(100% - ${overflow}px)`;
    tooltip.style.transform = "translateX(-100%)";
  }
}

// Remet l’infobulle centrée
function resetTooltipPosition(tooltip) {
  tooltip.style.left = "50%";
  tooltip.style.transform = "translateX(-50%)";
}
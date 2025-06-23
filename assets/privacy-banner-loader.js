document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("cookieAccepted")) return;

  // Langue dynamique injectée par Shopify
  const locale = document.documentElement.lang || "en";

  // Textes selon la langue
  const translations = {
    fr: {
      message: "Ce site utilise des cookies pour améliorer votre expérience.",
      button: "OK"
    },
    en: {
      message: "This website uses cookies to enhance your experience.",
      button: "OK"
    },
    de: {
      message: "Diese Website verwendet Cookies, um Ihr Erlebnis zu verbessern.",
      button: "OK"
    }
  };

  const t = translations[locale] || translations["en"];

  const banner = document.createElement("div");
  banner.id = "privacy-banner";
  banner.style.position = "fixed";
  banner.style.bottom = "0";
  banner.style.left = "0";
  banner.style.width = "100%";
  banner.style.background = "#000";
  banner.style.color = "#fff";
  banner.style.padding = "12px";
  banner.style.textAlign = "center";
  banner.style.fontSize = "14px";
  banner.style.zIndex = "9999";
  banner.style.boxShadow = "0 -2px 10px rgba(0,0,0,0.3)";
  banner.innerHTML = `
    ${t.message}
    <button id="accept-cookies" style="
      margin-left: 12px;
      background: #fff;
      color: #000;
      padding: 6px 12px;
      border: none;
      cursor: pointer;
      font-weight: bold;
    ">${t.button}</button>
  `;

  document.body.appendChild(banner);

  document.getElementById("accept-cookies").addEventListener("click", function () {
    localStorage.setItem("cookieAccepted", "true");
    banner.remove();
  });
});
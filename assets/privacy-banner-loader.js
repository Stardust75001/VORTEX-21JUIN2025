document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("cookieAccepted")) return;

  const locale = document.documentElement.lang || "en";

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
  banner.style.background = "#ba986e";
  banner.style.color = "#fff";
  banner.style.padding = "14px 20px";
  banner.style.textAlign = "center";
  banner.style.fontSize = "15px";
  banner.style.zIndex = "9999";
  banner.style.boxShadow = "0 -2px 8px rgba(0,0,0,0.2)";
  banner.style.display = "flex";
  banner.style.justifyContent = "center";
  banner.style.alignItems = "center";
  banner.style.flexWrap = "wrap";
  banner.innerHTML = `
    <span style="margin-bottom: 10px;">${t.message}</span>
    <button id="accept-cookies" style="
      margin-left: 16px;
      background: #000;
      color: #fff;
      padding: 6px 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    ">${t.button}</button>
  `;

  document.body.appendChild(banner);

  document.getElementById("accept-cookies").addEventListener("click", function () {
    localStorage.setItem("cookieAccepted", "true");
    banner.remove();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("cookieAccepted")) return;

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
    Ce site utilise des cookies pour améliorer votre expérience. 
    <button id="accept-cookies" style="
      margin-left: 12px;
      background: #fff;
      color: #000;
      padding: 6px 12px;
      border: none;
      cursor: pointer;
      font-weight: bold;
    ">OK</button>
  `;

  document.body.appendChild(banner);

  document.getElementById("accept-cookies").addEventListener("click", function () {
    localStorage.setItem("cookieAccepted", "true");
    banner.remove();
  });
});
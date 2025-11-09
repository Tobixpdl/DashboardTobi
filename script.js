(function () {
  const subtitle = document.querySelector(".dashboard__subtitle");
  if (!subtitle) return;

  const quotes = [
    "Chart your own narrative and let curiosity be the compass.",
    "A spark of inspiration can set the entire day aglow.",
    "Momentum begins the moment you decide to move forward.",
    "Celebrate every small insight—it all compounds into brilliance."
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  subtitle.textContent = quotes[randomIndex];
})();

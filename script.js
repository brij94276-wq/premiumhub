// ===============================
// EDIT THESE 3 SETTINGS
// ===============================
const WHATSAPP_NUMBER = "919278068677";
const UPI_ID = "brij94276@okhdfcbank";
const STORE_NAME = "PremiumHub";

// Add/change prices here.
// IMPORTANT: only list accounts/subscriptions you are authorized to resell.
const products = [
  ["Crunchyroll", 50], ["TradingView", 50], ["Grammarly", 50],
  ["Scribd", 50], ["Skillshare", 50], ["FAP House 18+", 50],
  ["QuillBot", 50], ["Perplexity", 50], ["Apple TV+", 50],
  ["Apple Music", 50], ["Kuku FM", 50], ["FanCode", 50],
  ["Jasper", 50], ["Relume", 50], ["Sony LIV", 50],
  ["YouTube Premium", 50], ["Prime Video", 50], ["ZEE5", 50],
  ["JioHotstar", 50], ["Duolingo", 50], ["Gemini", 50], ["Tidal", 50]
];

const grid = document.getElementById("productsGrid");
const search = document.getElementById("search");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const whatsappBtn = document.getElementById("whatsappBtn");
const paymentDoneBtn = document.getElementById("paymentDoneBtn");
const upiText = document.getElementById("upiText");

function icon(name) {
  return name.replace(/[^A-Za-z0-9]/g, "").slice(0,2).toUpperCase();
}

function render(filter = "") {
  grid.innerHTML = "";
  products.filter(([name]) => name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(([name, price]) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="icon">${icon(name)}</div>
        <h3>${name}</h3>
        <p>Premium account</p>
        <div class="card-bottom">
          <span class="price">₹${price}</span>
          <button class="buy" data-name="${name}" data-price="${price}">Buy</button>
        </div>`;
      card.querySelector(".buy").addEventListener("click", () => openOrder(name, price));
      grid.appendChild(card);
    });
}

function openOrder(name, price) {
  modalTitle.textContent = name;
  modalPrice.textContent = `₹${price}`;
  upiText.textContent = `UPI: ${UPI_ID}`;
  const message = `Hello, I want to order ${name} for ₹${price}. I have completed the payment. I will send the payment screenshot here.`;
  whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  whatsappBtn.hidden = true;
  paymentDoneBtn.hidden = false;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

paymentDoneBtn.addEventListener("click", () => {
  paymentDoneBtn.hidden = true;
  whatsappBtn.hidden = false;
});

document.getElementById("closeModal").onclick = () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
};
modal.addEventListener("click", e => {
  if (e.target === modal) document.getElementById("closeModal").click();
});
search.addEventListener("input", e => render(e.target.value));

render();

let hp = 30;

function createParticle(x, y, text, color) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.textContent = text;
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  particle.style.color = color;

  const randomX = Math.random() * 200 - 100;
  const randomY = Math.random() * -180 - 40;

  particle.style.setProperty("--x", randomX + "px");
  particle.style.setProperty("--y", randomY + "px");

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 1000);
}

function healHP(event) {
  const hpFill = document.getElementById("hpFill");
  const hpText = document.getElementById("hpText");
  const healMessage = document.getElementById("healMessage");
  const button = event.currentTarget;

  if (hp >= 100) {
    return;
  }

  hp += 10;

  if (hp >= 100) {
    hp = 100;
    button.disabled = true;
    button.textContent = "HP полностью восстановлено";

    healMessage.textContent = "Всё-всё, ты уже идеально вылечен. Максимальное здоровье достигнуто.";
  } else {
    const messages = [
      "Лечение успешно. Пациент стабилизирован.",
      "Температура испугалась и отступает.",
      "Ты получил хил от любимого человека.",
      "Иммунитет получил бафф.",
      "Критическое лечение активировано."
    ];

    healMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
  }

  hpFill.style.width = hp + "%";
  hpText.textContent = "HP: " + hp + " / 100";

  const hpTexts = ["+1 HP", "+10 HP", "+25 HP", "+50 HP"];

  for (let i = 0; i < 12; i++) {
    createParticle(
      event.clientX,
      event.clientY,
      hpTexts[Math.floor(Math.random() * hpTexts.length)],
      "#72ff9f"
    );
  }
}

function magicHeal(event) {
  const magicText = document.getElementById("magicText");
  const magicButton = document.getElementById("magicButton");

  magicText.textContent = "Вся проклятая энергия перешла в ваше здоровье.";

  magicButton.disabled = true;
  magicButton.textContent = "Техника уже активирована";

  const magicParticles = ["+100 HP", "HEAL", "РЕГЕН", "ЭНЕРГИЯ → HP"];

  for (let i = 0; i < 20; i++) {
    createParticle(
      event.clientX,
      event.clientY,
      magicParticles[Math.floor(Math.random() * magicParticles.length)],
      "#9dfff7"
    );
  }
}

function addToCart(productName) {
  let cart = JSON.parse(localStorage.getItem("healCart")) || [];

  cart.push(productName);

  localStorage.setItem("healCart", JSON.stringify(cart));

  alert(productName + " добавлено в лечебную корзину");
}

function showCart() {
  const cartList = document.getElementById("cartList");
  const totalPrice = document.getElementById("totalPrice");

  if (!cartList) {
    return;
  }

  let cart = JSON.parse(localStorage.getItem("healCart")) || [];

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Корзина пока пустая. Срочно добавить вкусняшки.</li>";

    if (totalPrice) {
      totalPrice.textContent = "";
    }

    return;
  }

  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    cartList.appendChild(li);
  });

  if (totalPrice) {
    totalPrice.textContent = "Итоговая стоимость: 10 поцелуйчиков";
  }
}

function sendOrder() {
  const orderText = document.getElementById("orderText");
  orderText.textContent = "Заказ принят. Курьер любви уже выехал.";
}

showCart();
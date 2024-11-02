document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll(".product button");
  const cartTableBody = document.querySelector("#cart-table tbody");
  const cartTotal = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout");
  const paymentSection = document.getElementById("payment");
  const cartSection = document.getElementById("cart");
  const homeLink = document.querySelector('a[href="#home"]');
  const productsLink = document.querySelector('a[href="#products"]');
  const cartLink = document.querySelector('a[href="#cart"]');
  const popup = document.getElementById("popup");
  let cart = [];

  cartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productElement = event.target.closest(".product");
      const productName = productElement.querySelector("h3").textContent;
      const productPrice = parseFloat(
        productElement.querySelector("p").textContent.replace("$", "")
      );
      const existingProduct = cart.find((item) => item.name === productName);

      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        cart.push({ name: productName, amount: 1, price: productPrice });
      }

      updateCart();
      showPopup("Item added to the cart!");
    });
  });

  function updateCart() {
    cartTableBody.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.amount * item.price;
      total += itemTotal;
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.amount}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="remove-button" data-index="${index}">Remove</button></td>
            `;
      cartTableBody.appendChild(row);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    addRemoveListeners();
  }

  function addRemoveListeners() {
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        updateCart();
        showPopup("Item removed from the cart.");
      });
    });
  }

  function showPopup(message) {
    popup.textContent = message;
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 3000);
  }

  checkoutButton.addEventListener("click", () => {
    cartSection.style.display = "none";
    paymentSection.style.display = "block";
  });

  homeLink.addEventListener("click", () => {
    cartSection.style.display = "block";
    paymentSection.style.display = "none";
  });

  productsLink.addEventListener("click", () => {
    cartSection.style.display = "block";
    paymentSection.style.display = "none";
  });

  cartLink.addEventListener("click", () => {
    cartSection.style.display = "block";
    paymentSection.style.display = "none";
  });

  const paymentForm = document.getElementById("payment-form");
  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Payment successful! Thank you for your purchase.");
    cart = [];
    updateCart();
    cartSection.style.display = "block";
    paymentSection.style.display = "none";
    showPopup("Payment successful!");
  });
});

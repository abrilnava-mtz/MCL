document.addEventListener("DOMContentLoaded", () => {
  const lightboxLinks = document.querySelectorAll(".lightbox");
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeLightboxButton = document.getElementById("close-lightbox");

  lightboxLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const imageSrc = link.getAttribute("href");
      lightboxImage.setAttribute("src", imageSrc);
      lightboxOverlay.classList.remove("hidden");
    });
  });

  closeLightboxButton.addEventListener("click", () => {
    lightboxOverlay.classList.add("hidden");
  });

  lightboxOverlay.addEventListener("click", (e) => {
    if (e.target === lightboxOverlay) {
      lightboxOverlay.classList.add("hidden");
    }
  });
});


// Variables globales
let cart = [];

// Función para actualizar el carrito en la interfaz
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button class="remove-item" data-id="${item.id}">Eliminar</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    cartTotal.textContent = total.toFixed(2);

    // Agregar evento de eliminación a los botones
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Función para agregar productos al carrito
function addToCart(event) {
    const product = event.target.closest('.product');
    const productId = product.dataset.id;
    const productName = product.dataset.name;
    const productPrice = parseFloat(product.dataset.price);

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

// Función para eliminar productos del carrito
function removeFromCart(event) {
    const productId = event.target.dataset.id;
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Agregar eventos a los botones de "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

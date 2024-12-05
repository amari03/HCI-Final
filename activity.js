document.addEventListener("DOMContentLoaded", function () {
  const mealTypeSelector = document.getElementById("meal-type");
  const menuContainer = document.querySelector(".menu");
  const filterSpans = document.querySelectorAll(".filter span");

  // Function to load and filter menu items
  function loadMenu(selectedMealType, selectedProtein = "all") {
    fetch("menu.json")
      .then((response) => response.json())
      .then((menuItems) => {
        // Clear the current menu
        menuContainer.innerHTML = "";

        // Filter items based on the selected meal type and protein
        const filteredItems = menuItems.filter((item) => {
          const mealMatch = item.mealType === selectedMealType;
          const proteinMatch = selectedProtein === "all" || item.protein === selectedProtein;
          return mealMatch && proteinMatch;
        });

        // Render the filtered menu items
        filteredItems.forEach((item) => {
          const menuItem = document.createElement("div");
          menuItem.classList.add("menu-item");

          menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="details">
              <h2>${item.name}</h2>
              <p class="price">$${item.price}</p>
              <p class="description">${item.description}</p>
            </div>
          `;

          // Add click event to store data and navigate
          menuItem.addEventListener("click", () => {
            localStorage.setItem("selectedItem", JSON.stringify(item));
            window.location.href = "item-details.html";
          });

          menuContainer.appendChild(menuItem);
        });
      })
      .catch((error) => console.error("Error loading menu:", error));
  }

  // Event listener for meal type selection
  mealTypeSelector.addEventListener("change", (e) => {
    const selectedMeal = e.target.value;
    const activeProtein = document.querySelector(".filter span.active")?.dataset.protein || "all";
    loadMenu(selectedMeal, activeProtein);
  });

  // Event listeners for protein filter
  filterSpans.forEach((span) => {
    span.addEventListener("click", () => {
      filterSpans.forEach((s) => s.classList.remove("active")); // Clear previous selection
      span.classList.add("active");

      const selectedMeal = mealTypeSelector.value;
      const selectedProtein = span.dataset.protein;
      loadMenu(selectedMeal, selectedProtein);
    });
  });

  // Load default menu on page load
  loadMenu(mealTypeSelector.value);

  // Quantity Control Logic
  const decreaseBtn = document.getElementById("decrease");
  const increaseBtn = document.getElementById("increase");
  const quantityValue = document.getElementById("quantity-value");
  const orderPrice = document.getElementById("order-price");

  if (decreaseBtn && increaseBtn && quantityValue && orderPrice) {
    let quantity = 1;
    const basePrice = parseFloat(orderPrice.dataset.basePrice || 0);

    function updatePrice() {
      orderPrice.textContent = (basePrice * quantity).toFixed(2);
    }

    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
        updatePrice();
      }
    });

    increaseBtn.addEventListener("click", () => {
      quantity++;
      quantityValue.textContent = quantity;
      updatePrice();
    });
  }
});

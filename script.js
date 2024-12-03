const menuItems = [
    {
      name: "Chicken Fried Taquitos",
      price: "$10.20",
      description: "Corn tortillas filled with chicken and seasonings, served with dipping sauce.",
      image: "taquitos.jpg",
      meal: "appetizers",
      protein: "chicken",
    },
    {
      name: "Spicy Chicken Wings",
      price: "$12.50",
      description: "Juicy chicken wings tossed in a spicy sauce.",
      image: "wings.jpg",
      meal: "appetizers",
      protein: "chicken",
    },
    {
      name: "Beef Tacos",
      price: "$11.00",
      description: "Three beef tacos with fresh salsa and guacamole.",
      image: "beef-tacos.jpg",
      meal: "appetizers",
      protein: "beef",
    },
    {
      name: "Vegetarian Salad",
      price: "$9.50",
      description: "A mix of fresh greens, veggies, and house-made dressing.",
      image: "salad.jpg",
      meal: "lunch",
      protein: "vegetarian",
    },
  ];
  
  // DOM elements
  const mealSelector = document.getElementById("meal-type");
  const filterSpans = document.querySelectorAll(".filter span");
  const menuSection = document.querySelector(".menu");
  const mainMenu = document.getElementById("main-menu");
  const detailsPage = document.getElementById("details-page");
  const backButton = document.getElementById("back-button");
  const detailsTitle = document.getElementById("details-title");
  const detailsImage = document.getElementById("details-image");
  const detailsDescription = document.getElementById("details-description");
  const detailsPrice = document.getElementById("details-price");
  const addToCartButton = document.getElementById("add-to-cart");
  
  // Function to render menu items based on selected filters
  function renderMenu(selectedMeal, selectedProtein) {
    menuSection.innerHTML = ""; // Clear existing items
  
    const filteredItems = menuItems.filter((item) => {
      return (
        (selectedMeal === "all" || item.meal === selectedMeal) &&
        (selectedProtein === "all" || item.protein === selectedProtein)
      );
    });
  
    // Populate menu with filtered items
    if (filteredItems.length > 0) {
      filteredItems.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="details">
            <h2>${item.name}</h2>
            <p class="price">${item.price}</p>
            <p class="description">${item.description}</p>
          </div>
        `;
  
        // Add click event to show details page
        menuItem.addEventListener("click", () => {
          showDetailsPage(item);
        });
  
        menuSection.appendChild(menuItem);
      });
    } else {
      menuSection.innerHTML = "<p>No items found for the selected filters.</p>";
    }
  }
  
  // Function to show details page
  function showDetailsPage(item) {
    mainMenu.style.display = "none";
    detailsPage.style.display = "block";
  
    detailsTitle.textContent = item.name;
    detailsImage.src = item.image;
    detailsImage.alt = item.name;
    detailsDescription.textContent = item.description;
    detailsPrice.textContent = `Price: ${item.price}`;
  }
  
  // Event listener for back button
  backButton.addEventListener("click", () => {
    detailsPage.style.display = "none";
    mainMenu.style.display = "block";
  });
  
  // Event listener for meal selector dropdown
  mealSelector.addEventListener("change", (e) => {
    const selectedMeal = e.target.value;
    const activeProtein = document.querySelector(".filter span.active")?.dataset.protein || "all";
    renderMenu(selectedMeal, activeProtein);
  });
  
  // Event listeners for protein filter
  filterSpans.forEach((span) => {
    span.addEventListener("click", () => {
      filterSpans.forEach((s) => s.classList.remove("active")); // Clear previous selection
      span.classList.add("active");
  
      const selectedMeal = mealSelector.value;
      const selectedProtein = span.dataset.protein;
      renderMenu(selectedMeal, selectedProtein);
    });
  });
  
  // Initial render
  renderMenu("all", "all");
  
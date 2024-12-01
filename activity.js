
const menuItems = [
    {
      name: "Chicken Fried Taquitos",
      price: "$10.20",
      description: "One Dozen",
      image: "taquitos.jpg",
      meal: "appetizers",
      protein: "chicken",
    },
    {
      name: "Spicy Chicken Wings",
      price: "$12.50",
      description: "8 Pieces",
      image: "wings.jpg",
      meal: "appetizers",
      protein: "chicken",
    },
    {
      name: "Beef Tacos",
      price: "$11.00",
      description: "3 Pieces",
      image: "beef-tacos.jpg",
      meal: "appetizers",
      protein: "beef",
    },
    {
      name: "Vegetarian Salad",
      price: "$9.50",
      description: "Fresh Greens",
      image: "salad.jpg",
      meal: "lunch",
      protein: "vegetarian",
    },
    // Add more mock items here
  ];

  // DOM elements
  const mealSelector = document.getElementById("meal-type");
  const filterSpans = document.querySelectorAll(".filter span");
  const menuSection = document.querySelector(".menu");

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
        menuSection.innerHTML += `
          <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="details">
              <h2>${item.name}</h2>
              <p class="price">${item.price}</p>
              <p class="description">${item.description}</p>
            </div>
          </div>
        `;
      });
    } else {
      menuSection.innerHTML = "<p>No items found for the selected filters.</p>";
    }
  }

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
  renderMenu("appetizers", "all");

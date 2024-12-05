document.addEventListener('DOMContentLoaded', () => {
  const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));

  if (selectedItem) {
    document.getElementById('item-name').textContent = selectedItem.name;
    document.getElementById('item-image').src = selectedItem.image;
    document.getElementById('item-description').textContent = selectedItem.description;
    document.getElementById('item-price').textContent = `Price per item: BZD ${selectedItem.price}`;
  }

  const quantityInput = document.getElementById('quantity');
  const addToOrderButton = document.getElementById('add-to-order');
  const pricePerItem = parseFloat(selectedItem.price);

  const updateButtonPrice = () => {
    const quantity = parseInt(quantityInput.value) || 1;
    const totalPrice = (pricePerItem * quantity).toFixed(2);
    addToOrderButton.textContent = `Add Order BZD ${totalPrice}`;
  };

  quantityInput.addEventListener('input', updateButtonPrice);

  addToOrderButton.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value) || 1;
    const specialRequests = document.getElementById('special-requests').value;

    // Retrieve existing orders from localStorage or initialize an empty array
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Add the new order
    orders.push({
      name: selectedItem.name,
      image: selectedItem.image,
      price: pricePerItem.toFixed(2),
      quantity,
      totalPrice: (pricePerItem * quantity).toFixed(2),
      specialRequests,
    });

    // Save updated orders to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));

    alert("Order added successfully!");
  });

  // Initialize button price
  updateButtonPrice();
});

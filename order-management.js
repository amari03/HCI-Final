document.addEventListener('DOMContentLoaded', () => {
    const orderContainer = document.querySelector('.order-container');
    const headerContent = document.querySelector('.header-content h1');
    const subtotalPrice = document.querySelector('.subtotal-price');
    const undoBtn = document.querySelector('.undo-btn');
    const removedItems = [];

    // Function to calculate the total
    function calculateTotal() {
        const prices = Array.from(document.querySelectorAll('.order-item .price'))
            .map(el => parseFloat(el.textContent.replace('BZD ', '')));
        const total = prices.reduce((sum, price) => sum + price, 0);
        subtotalPrice.textContent = `BZD ${total.toFixed(2)}`;
    }

    // Function to update the order count
    function updateOrderCount() {
        const itemCount = document.querySelectorAll('.order-item').length;
        headerContent.textContent = `My Order (${itemCount})`;
    }

    // Add event listener for remove buttons
    document.querySelectorAll('.order-item .actions button.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const orderItem = this.closest('.order-item');
            removedItems.push({
                element: orderItem,
                index: Array.from(orderItem.parentNode.children).indexOf(orderItem)
            });
            orderItem.remove();
            calculateTotal();
            updateOrderCount();
            undoBtn.style.display = 'block';
        });
    });

    // Undo button functionality
    undoBtn.addEventListener('click', () => {
        if (removedItems.length) {
            const lastRemoved = removedItems.pop();
            const parentElement = document.querySelector('.order-container .order-items-container');
            if (lastRemoved.index < parentElement.children.length) {
                parentElement.insertBefore(lastRemoved.element, parentElement.children[lastRemoved.index]);
            } else {
                parentElement.appendChild(lastRemoved.element);
            }
            calculateTotal();
            updateOrderCount();
            if (removedItems.length === 0) {
                undoBtn.style.display = 'none';
            }
        }
    });

    // Delegate the edit button click event
    orderContainer.addEventListener('click', function(event) {
        if (event.target && event.target.matches('.edit-btn')) {
            showEditModal(event);
        }
    });

    // Show the edit modal for quantity updates
    function showEditModal(event) {
        const orderItem = event.target.closest('.order-item');
        const itemNameElement = orderItem.querySelector('.item-details span:first-child');
        const priceElement = orderItem.querySelector('.price');

        const itemNameParts = itemNameElement.textContent.split(' ');
        const currentQuantity = parseInt(itemNameParts[0]);
        const currentPrice = parseFloat(priceElement.textContent.replace('BZD ', ''));

        const editModal = document.createElement('div');
        editModal.classList.add('edit-modal');

        const editInput = document.createElement('input');
        editInput.type = 'number';
        editInput.value = currentQuantity;

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.addEventListener('click', () => {
            const newQuantity = parseInt(editInput.value);
            updateOrderItem(orderItem, itemNameElement, priceElement, newQuantity, currentPrice);
            editModal.remove();
            calculateTotal();
        });

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            editModal.remove();
        });

        editModal.appendChild(editInput);
        editModal.appendChild(okButton);
        editModal.appendChild(cancelButton);
        document.body.appendChild(editModal);
    }

    // Update the order item with new quantity and price
    function updateOrderItem(orderItem, itemNameElement, priceElement, newQuantity, currentPrice) {
        const itemNameParts = itemNameElement.textContent.split(' ');
        const itemName = itemNameParts.slice(1).join(' ');
        itemNameElement.textContent = `${newQuantity} ${itemName}`;

        const unitPrice = currentPrice / parseInt(itemNameParts[0]);
        const newPrice = unitPrice * newQuantity;
        priceElement.textContent = `BZD ${newPrice.toFixed(2)}`;
    }
});
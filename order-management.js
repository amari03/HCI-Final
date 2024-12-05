document.addEventListener('DOMContentLoaded', () => {
    const orderContainer = document.querySelector('.order-container');
    const headerContent = document.querySelector('.header-content h1');
    const subtotalPrice = document.querySelector('.subtotal-price');
    const undoBtn = document.querySelector('.undo-btn');
    const removedItems = [];

    // Function to calculate total
    function calculateTotal() {
        const prices = Array.from(document.querySelectorAll('.order-item .price'))
            .map(el => parseFloat(el.textContent.replace('BZD ', '')));

        const total = prices.reduce((sum, price) => sum + price, 0);
        subtotalPrice.textContent = `BZD ${total.toFixed(2)}`;
    }

    // Function to update order count
    function updateOrderCount() {
        const itemCount = document.querySelectorAll('.order-item').length;
        headerContent.textContent = `My Order (${itemCount})`;
    }

    // Function to render item in order container
    function renderOrderItem(item) {
        const orderItemHTML = `
            <div class="order-item">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-description">${item.description}</span>
                </div>
                <div class="price">BZD ${item.price}</div>
                <div class="actions">
                    <button class="remove-btn">Remove</button>
                </div>
            </div>
        `;
        
        // Convert HTML to a DOM element and add to the order container
        const orderItemElement = document.createElement('div');
        orderItemElement.innerHTML = orderItemHTML;
        orderContainer.appendChild(orderItemElement.firstElementChild);

        // Attach remove button functionality
        const removeBtn = orderItemElement.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            const orderItem = this.closest('.order-item');
            const itemName = orderItem.querySelector('.item-name').textContent;
            const itemPrice = orderItem.querySelector('.price').textContent;

            // Store removed item details
            removedItems.push({
                element: orderItem,
                index: Array.from(orderItem.parentNode.children).indexOf(orderItem)
            });

            // Remove the item
            orderItem.remove();

            // Update total and order count
            calculateTotal();
            updateOrderCount();

            // Show undo button
            undoBtn.style.display = 'block';
        });
    }

    // Add item to order (for example, from the menu JSON)
    // This could be triggered by adding items from a menu page, like clicking "Add to Cart"
    function addItemToOrder(item) {
        renderOrderItem(item);
        calculateTotal();
        updateOrderCount();
    }

    // Undo button functionality
    undoBtn.addEventListener('click', () => {
        if (removedItems.length) {
            const lastRemoved = removedItems.pop();
            const parentElement = document.querySelector('.order-container');
            
            // Insert the item back to its original position
            if (lastRemoved.index < parentElement.children.length) {
                parentElement.insertBefore(lastRemoved.element, 
                    parentElement.children[lastRemoved.index + 1]);
            } else {
                parentElement.appendChild(lastRemoved.element);
            }

            // Recalculate total and order count
            calculateTotal();
            updateOrderCount();

            // Hide undo button if no more items to undo
            if (removedItems.length === 0) {
                undoBtn.style.display = 'none';
            }
        }
    });

    // Example of adding an item dynamically (for testing, can be replaced with actual data flow)
    // Fetch the menu items and add them to the order container
    fetch('menu.json')
        .then(response => response.json())
        .then(data => {
            const menuItems = data.menu;  // Assuming 'menu.json' contains an array of items
            menuItems.forEach(item => {
                addItemToOrder(item);  // Add each menu item to the order
            });
        })
        .catch(error => {
            console.error('Error loading menu items:', error);
        });
});

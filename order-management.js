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

    // Attach remove functionality to all remove buttons
    document.querySelectorAll('.order-item .actions button.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const orderItem = this.closest('.order-item');
            const itemName = orderItem.querySelector('.item-details span').textContent;
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
    });

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
});
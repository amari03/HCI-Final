document.addEventListener('DOMContentLoaded', () => {
    const ordersContainer = document.getElementById('orders-container');
    const orderCount = document.getElementById('order-count');
    const subtotalElement = document.getElementById('subtotal');
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    const updateSubtotal = () => {
        const subtotal = orders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);
        subtotalElement.textContent = `BZD ${subtotal.toFixed(2)}`;
        orderCount.textContent = `(${orders.length})`;
    };

    const renderOrders = () => {
        ordersContainer.innerHTML = ''; // Clear container

        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p>No orders placed yet.</p>';
            updateSubtotal();
            return;
        }

        orders.forEach((order, index) => {
            const orderDiv = document.createElement('div');
            orderDiv.className = 'order-item';
            orderDiv.dataset.index = index; // Store index in a data attribute

            orderDiv.innerHTML = `
                <div>
                    <h3>${order.quantity} ${order.name}</h3>
                    <p>BZD ${order.totalPrice}</p>
                </div>
                <div class="order-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="remove-btn">Remove</button>
                </div>
            `;
        

            ordersContainer.appendChild(orderDiv);
        });

        updateSubtotal();
    };

    const editOrder = (index) => {
        const newQuantity = prompt('Enter new quantity:', orders[index].quantity);
        if (newQuantity && !isNaN(newQuantity)) {
            orders[index].quantity = parseInt(newQuantity);
            orders[index].totalPrice = (orders[index].price * orders[index].quantity).toFixed(2);
            localStorage.setItem('orders', JSON.stringify(orders));
            renderOrders();
        }
    };

    const removeOrder = (index) => {
        if (confirm('Are you sure you want to remove this item?')) {
            orders.splice(index, 1); // Remove item
            localStorage.setItem('orders', JSON.stringify(orders));
            renderOrders();
        }
    };

    // Event delegation for edit and remove buttons
    ordersContainer.addEventListener('click', (e) => {
        const target = e.target;
        const parentOrder = target.closest('.order-item');

        if (parentOrder) {
            const index = parseInt(parentOrder.dataset.index);

            if (target.classList.contains('edit-btn')) {
                editOrder(index);
            } else if (target.classList.contains('remove-btn')) {
                removeOrder(index);
            }
        }
    });

    document.getElementById('checkout').addEventListener('click', () => {
        if (orders.length === 0) {
            alert('No orders to checkout.');
            return;
        }

        const orderNotes = document.getElementById('order-notes').value;
        alert(`Order placed!\n\nNotes: ${orderNotes}\n\nTotal: ${subtotalElement.textContent}`);
        localStorage.removeItem('orders');
        orders = [];
        renderOrders();
    });

    renderOrders();
});

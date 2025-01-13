document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889';

    // Fetch cart data from API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            renderCart(data.items);
            calculateTotals(data.items);
        })
        .catch(err => console.error('Error fetching data:', err));

    // Render cart items dynamically
    function renderCart(items) {
        const cartContent = document.querySelector('#cart-content tbody');
        cartContent.innerHTML = ''; // Clear table

        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.title}" width="50">
                    <span>${item.title}</span>
                </td>
                <td>₹${(item.price / 100).toFixed(2)}</td>
                <td>
                    <input type="number" class="quantity-input" data-id="${item.id}" value="${item.quantity}" min="1">
                </td>
                <td>₹${((item.price * item.quantity) / 100).toFixed(2)}</td>
                <td>
                    <button class="remove-btn" data-id="${item.id}">🗑 Remove</button>
                </td>
            `;
            cartContent.appendChild(row);
        });

        // Add event listeners for quantity update and item removal
        setupEventListeners(items);
    }

    // Set up event listeners
    function setupEventListeners(items) {
        const quantityInputs = document.querySelectorAll('.quantity-input');
        const removeButtons = document.querySelectorAll('.remove-btn');

        // Update quantity
        quantityInputs.forEach(input => {
            input.addEventListener('change', event => {
                const id = parseInt(event.target.dataset.id);
                const newQuantity = parseInt(event.target.value);

                const updatedItems = items.map(item => {
                    if (item.id === id) item.quantity = newQuantity;
                    return item;
                });

                renderCart(updatedItems);
                calculateTotals(updatedItems);
            });
        });

        // Remove item
        removeButtons.forEach(button => {
            button.addEventListener('click', event => {
                const id = parseInt(event.target.dataset.id);
                const updatedItems = items.filter(item => item.id !== id);

                renderCart(updatedItems);
                calculateTotals(updatedItems);
            });
        });

        // Add event listener for checkout button
        const checkoutButton = document.getElementById('checkout-button');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', function () {
                // Placeholder functionality for checkout
                alert('Proceeding to checkout!');
                // Add your checkout functionality here
            });
        }
    }

    // Calculate totals dynamically
    function calculateTotals(items) {
        let subtotal = 0;

        items.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        const total = subtotal / 100;

        document.getElementById('subtotal').innerText = `₹${total.toFixed(2)}`;
        document.getElementById('total').innerText = `₹${total.toFixed(2)}`;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Quantity Input Update
    const quantityInputs = document.querySelectorAll('input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener("change", (e) => {
            const quantity = parseInt(e.target.value);
            const itemId = e.target.closest('tr').dataset.id; // Use the row's data-id for the item ID
            const price = parseFloat(e.target.closest('tr').querySelector('td:nth-child(2)').textContent.replace('Rs. ', '').replace(',', ''));

            const subtotalElement = document.querySelector(`.subtotal[data-id='${itemId}']`);
            const subtotal = price * quantity;
            subtotalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;

            updateTotal(); // Recalculate the total after quantity update
        });
    });

    // Trash Icon Remove Item with Confirmation
    const trashIcons = document.querySelectorAll('.fa-trash');
    trashIcons.forEach(icon => {
        icon.addEventListener("click", (e) => {
            const itemId = e.target.getAttribute("data-id");
            const itemRow = e.target.closest('tr');
            
            // Show confirmation dialog
            const confirmDelete = window.confirm("Are you sure you want to delete this item?");
            
            if (confirmDelete) {
                itemRow.remove(); // Remove item row from cart
                updateTotal(); // Recalculate the total after item removal
            } else {
                console.log("Item not deleted"); // If user cancels
            }
        });
    });

    // Update Total Price
    function updateTotal() {
        let total = 0;
        const subtotals = document.querySelectorAll('.subtotal');
        subtotals.forEach(subtotal => {
            const subtotalValue = parseFloat(subtotal.textContent.replace('Rs. ', '').replace(',', ''));
            total += subtotalValue;
        });

        const totalElement = document.querySelector('.total-amount');
        totalElement.textContent = `Rs. ${total.toFixed(2)}`;
    }

    // Checkout Button
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            alert("Proceeding to checkout!");
            console.log("Checkout button clicked");
        });
    } else {
        console.error("Checkout button not found!");
    }
});

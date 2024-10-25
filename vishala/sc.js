document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const id = product.dataset.id;
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            addItemToCart(id, name, price);
        });
    });

    function addItemToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCart();
    }

    function removeItemFromCart(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }
        updateCart();
    }

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => removeItemFromCart(item.id));
            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
        });

        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }
});

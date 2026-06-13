import { menu } from "./data.js";

const storeSelectedItem = [];


function renderMenu() {
    return menu.map(food => `
        <section class="food-card">
            <div class="food-container">
                <div class="food-image" role="img" aria-label="${food.foodName}">
                    <p aria-hidden="true">${food.image}</p>
                </div>

                <div class="price-text">
                    <h2>${food.foodName}</h2>
                    <p class="price">${food.ingredients}</p>
                    <p>$${food.price}</p>
                </div>

                <button class="addCart" data-item="${food.uuid}" aria-label="Add ${food.foodName} to cart">+</button>
            </div>
        </section>
    `).join('');
}

function renderCart() {
    if (storeSelectedItem.length === 0) return ''; 

    const totalPrice = storeSelectedItem.reduce((sum, item) => sum + item.price, 0);

    return `
        <div class="order-container" aria-live="polite">
            <h3>Your order</h3>
            ${storeSelectedItem.map((item, index) => `
                <div class="selectedItem">
                    <h4 class="selectItem">${item.foodName}</h4>
                    <button class="remove" data-remove="${index}" aria-label="Remove ${item.foodName} from cart">remove</button>
                    <p class="itemPrice">$${item.price}</p>
                </div>
            `).join('')}

            <hr>

            <div class="totalPrice">
                <h4>Total price:</h4>
                <p>$${totalPrice}</p>
            </div>

            <button class="comfirmBtn">Complete order</button>
        </div>
    `;
}


document.getElementById('container').innerHTML = `
    <div id="menu-container">${renderMenu()}</div>
    <div id="cart-container"></div>
`;


document.addEventListener('click', function(e) {
    if (e.target.dataset.item) {
        selectItem(e.target.dataset.item);
    } else if (e.target.dataset.remove) {
        removeItem(e.target.dataset.remove);
    } else if (e.target.classList.contains('comfirmBtn')) {
        showPaymentForm();
    }
});


document.addEventListener('submit', function(e) {
    if (e.target.id === 'payment-form') {
        e.preventDefault(); 
        successPayment();
    }
});


function selectItem(itemId) {
    
    const selectedFood = menu.find(item => item.uuid === itemId);
    
    if (selectedFood) {
        storeSelectedItem.push(selectedFood);
         document.getElementById('cart-container').innerHTML = renderCart();
    }
}

function removeItem(itemIndex) {
    storeSelectedItem.splice(itemIndex, 1);
    document.getElementById('cart-container').innerHTML = renderCart();
}

function showPaymentForm() {
    document.getElementById('payment').innerHTML = `
        <div class="input-container" role="dialog" aria-modal="true" aria-labelledby="form-title">
            <h4 id="form-title">Enter card details</h4>
            <form id="payment-form">
                <input type="text" name="name" id="name" required placeholder="Enter your name" aria-label="Enter your name">
                <input type="number" name="card-number" required placeholder="Enter card number" aria-label="Enter card number">
                <input type="number" name="card-cvc" required placeholder="Enter CVV" aria-label="Enter CVV">
                
                <button type="submit" class="payBtn">Pay</button>
            </form>
        </div>
    `;
    
    document.getElementById('name').focus();
}

function successPayment() {
    const username = document.getElementById('name').value;
    document.getElementById('cart-container').innerHTML = "";
    document.getElementById('payment').innerHTML = "";
    storeSelectedItem.length = 0; 
    document.getElementById('thank-you').innerHTML = `
        <div role="status">
            <h5>Thanks, ${username}! Your order is on its way!</h5>
        </div>
    `;
}
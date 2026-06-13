import { menu } from "./data.js";

document.addEventListener('click' , function(e){
  if(e.target.dataset.item){
    selectItem(e.target.dataset.item)
    document.getElementById('container').innerHTML = render()
  }else if(e.target.dataset.remove){
    removeItem(e.target.dataset.remove)
     document.getElementById('container').innerHTML = render()
  } else if (e.target.classList.contains('comfirmBtn')) {
        showPaymentForm()
    }
})

const storeSelectedItem=[]

function selectItem(itemId){
    const findSelect=menu.filter(function(item){
        return itemId === item.uuid
    })[0]
           if(findSelect){
     storeSelectedItem.push(findSelect)
    }
}

function render() {
    const renderItem = menu.map(posts => `
        <section class="food-card">
            <div class="food-container">

                <div class="food-image">
                    <p>${posts.image}</p>
                </div>

                <div class="price-text">
                    <h2>${posts.foodName}</h2>
                    <p class="price">${posts.ingredients}</p>
                    <p >$${posts.price}</p>
                </div>

                <button class="addCart" data-item="${posts.uuid}" type="submit">+</button>

            </div>
        </section>
    `).join('')

   let selectedItem = ''

    if (storeSelectedItem.length) {
        const totalPrice = storeSelectedItem.reduce((sum, item) => sum + item.price, 0)

        selectedItem = `
            <h3>Your order</h3>

            ${storeSelectedItem.map((item, index) => `
                <div class="selectedItem">
                    <h4 class="selectItem">${item.foodName}</h4>
                    <button class="remove" data-remove="${index}">remove</button>
                    <p class="itemPrice">$${item.price}</p>
                 </div>
            `).join('')}

            <hr>

            <div class="totalPrice">
                <h4>Total price:</h3>
                <p>$${totalPrice}</p>
            </div>

            <button class="comfirmBtn">Complete order</button>
        `
    }

     return renderItem + selectedItem
}

document.getElementById('container').innerHTML = render()

function removeItem(itemIndex){
 storeSelectedItem.splice(itemIndex,1)
}

function showPaymentForm() {
    document.getElementById('payment').innerHTML += `
        <div class="input-container">
            <h4>Enter card details</h4>
            <form>
                <input type="text" name="name" required placeholder="Enter your name">
                <input type="number" name="card-number" required placeholder="Enter card number">
                <input type="number" name="card-cvc" required placeholder="Enter CVV">
                <button class="payBtn">Pay</button>
            </form>
        </div>
    `
}
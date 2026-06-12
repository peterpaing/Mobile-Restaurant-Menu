import { menu } from "./data.js";

document.addEventListener('click' , function(e){
  if(e.target.dataset.item){
    selectItem(e.target.dataset.item)
    document.getElementById('container').innerHTML = render()
  }else if(e.target.dataset.remove){
    removeItem(e.target.dataset.remove)
     document.getElementById('container').innerHTML = render()
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
     if(storeSelectedItem.length){
         selectedItem = `<h2>Your order</h2>${storeSelectedItem.map((item, index)=>
            `<div class="selectedItem">
            <p class="selectItem">${item.foodName}</p>
            <button class="remove" data-remove="${index}">remove</button>
            </div>
             <p class="itemPrice">$${item.price}</p>
             `
        ).join('')}

        <hr>

        <div class="totalPrice">
        <h3>Total price:</h3>
        <p>$${storeSelectedItem.reduce((current ,total)=> current+total.price,0)}</p>
        </div>
        
        <button class="comfirm">Complete order</button>`
     }

     return renderItem + selectedItem
}

document.getElementById('container').innerHTML = render()

function removeItem(itemIndex){
 storeSelectedItem.splice(itemIndex,1)
}
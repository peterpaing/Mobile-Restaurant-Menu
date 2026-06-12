import { menu } from "./data.js";

document.addEventListener('click' , function(e){
  if(e.target.dataset.item){
    selectItem(e.target.dataset.item)
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
         selectedItem = `<h2>Your order</h2>${storeSelectedItem.map(item=>
            `<div class="selectedItem">
            <p class="selectItem">${item.foodName}</p>
             <p class="itemPrice">${item.price}</p>
             </div>`
        ).join('')}`
     }

     return renderItem + selectedItem
}

document.getElementById('container').innerHTML = render()
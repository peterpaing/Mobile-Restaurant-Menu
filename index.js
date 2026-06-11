import { menu } from "./data.js";


function render(){
    return menu.map(posts=>
        ` <div class="food-container">
         <div class="food-image">
         <p> ${posts.image}</p>
         </div>

         <div class="price-text">
         <p>${posts.foodName}</p>
         <p>${posts.ingredients}</p>
         <p>${posts.price}</p>
         </div>
         
         <div id="addCart"> +</div>`
      ).join('')
}

document.getElementById('container').innerHTML = render()

import { menu } from "./data.js";


function render() {
    return menu.map(posts => `
        <section class="food-card">
            <div class="food-container">

                <div class="food-image">
                    <p>${posts.image}</p>
                </div>

                <div class="price-text">
                    <h2>${posts.foodName}</h2>
                    <p>${posts.ingredients}</p>
                    <p class="price">$${posts.price}</p>
                </div>

                <div class="addCart">+</div>

            </div>
        </section>
    `).join('');
}

document.getElementById('container').innerHTML = render()

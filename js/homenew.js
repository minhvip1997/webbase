fetch('http://localhost:3000/newproducts')
    .then(response => response.json())
    .then(productsArray => renderAllProducts(productsArray))

function renderAllProducts(productsArray) {
    productsArray.forEach(product => renderOneProduct(product))
}

fetch('http://localhost:3000/listproduct')
    .then(response => response.json())
    .then(cartItemsArray => {
        cartArray = cartItemsArray;
        renderAllCartItems(cartArray)
    })

function renderAllCartItems(cartItemsArray) {
    cartItemsArray.forEach(cartItem => renderCartItems(cartItem))
}

const findDiv = document.querySelector('#new');
const findListOfItem = document.querySelector('#itemproduct');

function renderOneProduct(product) {
    const newElement = document.createElement('div');
    newElement.className = 'content';
    newElement.innerHTML = `
<div class="item">
                        <div class="item-image img-sizer-container">
                            <img src="images/item-images/${product.image}" alt="Image">
                        </div>
                        <h2 class="item-title">${product.name}</h2>
                        <h2 class="item-price">€.${product.price}</h2>
                        <button class='add-item'>add to cart</button>
                        <input type='hidden' id='${product.id}'>
                        <a href="productpage.html?id=${product.id}" class="view-product">View product</a>
        </div>
        `
    findDiv.append(newElement);

    var addButton = newElement.querySelector('.add-item');
    addButton.addEventListener('click', event => {
        //findListOfItem.innerHTML = ''
        fetch('http://localhost:3000/listproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                product_id: product.id,
                price: product.price,
                quantity: 1,
                total: product.price
            })
        })
            .then(response => response.json())
            .then(newCartItem => {
                cartArray.push(newCartItem);
                renderAllCartItems(cartArray)
            })
    })
}

function renderCartItems(cartItem) {

    const newLi = document.createElement('tr');
    newLi.innerHTML = `
   
                                    <tr id="${cartItem.id}" class="row cart-row">
                                        <td>                                        
                                            <div class="img-sizer-container"><img src="images/item-images/${cartItem.image}" alt="img"></div>
                                        </td>
                                        <td class="item-description">
                                            <h2>Peeky cropped</h2>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </td>
                                        <td class="checkout-price"  id="checkout-price">${cartItem.price}</td>                   
                                        <td class="qty">
                                        <button class="update-button-minus">Minus</button>
                                        <input type="number" class="form-control item-count" id="id_form-0-quantity" min="0" step="1" value="${cartItem.quantity}">${cartItem.quantity}
                                        <button class="update-button-add">Add</button>
                                        </td>
                                        </td>
                                        <td class="checkout-total">€. ${cartItem.price * cartItem.quantity}</td>
                                        <td>
                                        <button class="delete-button">delete</button>
                                        </td>
                                    </tr>
                                    
    `;
    findListOfItem.append(newLi)

    const removeButton = newLi.querySelector('.delete-button')

    removeButton.addEventListener('click', event => {
        newLi.remove()
        fetch(`http://localhost:3000/listproduct/${cartItem.id}`, {
            method: 'DELETE',

        })
            .then(response => response.json())
            .then(results => {
                cartArray = results
                newLi.innerHTML = ''
                renderAllCartItems(cartItem)
            })
    });

    const addButton = newLi.querySelector('.update-button-add')
    const minusButton = newLi.querySelector('.update-button-minus')



    addButton.addEventListener('click', event => {
        fetch(`http://localhost:3000/listproduct/${cartItem.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                quantity: cartItem.quantity + 1,
                total: newLi.getElementsByClassName('checkout-price')[0].innerHTML * (cartItem.quantity + 1)
            }),

        })
            .then(response => response.json())
            .then(results => {
                newLi.innerHTML = ''
                renderAllCartItems(cartItem)
            })
    });

    minusButton.addEventListener('click', event => {
        if (cartItem.quantity > 1) {
            fetch(`http://localhost:3000/listproduct/${cartItem.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    quantity: cartItem.quantity - 1,
                    total: newLi.getElementsByClassName('checkout-price')[0].innerHTML * (cartItem.quantity - 1)
                }),

            })
                .then(response => response.json())
                .then(results => {
                    newLi.innerHTML = ''
                    renderAllCartItems(cartItem)
                })
        } else {
            alert('quantity minimun is 1')
        }

    });

}
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.general-info.clearfix');
console.log(container);
const renderDetails = async () => {
    const res = await fetch('http://localhost:3000/newproducts/' + id);
    const post = await res.json();

    const template = `
    <h2 class="title">${post.name}</h2>
                            <div class="clearfix">
                                <ul class="rating">
                                <li><a href="#fake-link"><img src="images/star-blacked.png" alt="Star"></a></li>
                                <li><a href="#fake-link"><img src="images/star-blacked.png" alt="Star"></a></li>
                                <li><a href="#fake-link"><img src="images/star-blacked.png" alt="Star"></a></li>
                                <li><a href="#fake-link"><img src="images/star-blacked.png" alt="Star"></a></li>
                                <li><a href="#fake-link"><img src="images/star-gray.png" alt="Star"></a></li>
                                </ul>
                                <div class="add-review">
                                   <h3>1 Review(s) |  <a href="#fake-link">Add Your Review</a></h3>
                                </div>
                            </div>  
                            <div class="price-info clearfix">
                                <h2 class="detail-price">€.${post.price}</h2>
                                <div class="item-code">
                                    <h2>Product code: <span>257</span></h2>
                                    <h2>Availability: <span>In stock</span></h2>
                                </div>
                            </div>
                            <div class="gray-line"></div>
                            <div class="quck-overview roboto-gray-12">
                                <h2>Quick Overview:</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. When an unknown printer took a galley of type.</p>
                            </div>
                            <div class="gray-line"></div>
                            <div class="size">
                                <h2 class="roboto-gray-12">SIZE</h2>
                                <ul>
                                    <li><a href="#fake-link">25</a></li>
                                    <li><a href="#fake-link">26</a></li>
                                    <li><a href="#fake-link">27</a></li>
                                    <li><a href="#fake-link" class="active">28</a></li>
                                    <li><a href="#fake-link">29</a></li>
                                    <li><a href="#fake-link">30</a></li>
                                    <li><a href="#fake-link">31</a></li>
                                    <li><a href="#fake-link">32</a></li>
                                    <li><a href="#fake-link">33</a></li>
                                </ul>
                            </div>
                            <div class="gray-line"></div>
                            <div class="length">
                                <h2 class="roboto-gray-12">LEngTH</h2>
                                <ul>
                                    <li><a href="#fake-link">32</a></li>
                                    <li><a href="#fake-link" class="active">34</a></li>
                                </ul>
                            </div>
                            <div class="gray-line"></div>
                            <div class="add-to-cart clear-fix">
                                <div class="clearfix roboto-gray-12">
                                   
                                    <input type="submit" value="add to cart" class="btn-add-to-cart"> 
                                    
                                    <ul>
                                        <li><a href="#fake-link">+ Add to Whishlist</a></li>
                                        <li><a href="#fake-link">+ Add to Compare</a></li>
                                        <li><a href="#fake-link">+ Email to a Friend</a></li>
                                    </ul>
                                </div>
                            </div>
    `
    container.innerHTML = template;
    var addButton = container.querySelector('.btn-add-to-cart');
    addButton.addEventListener('click', event => {
        //findListOfItem.innerHTML = ''
        fetch('http://localhost:3000/listproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                product_id: post.id,
                price: post.price,
                quantity: 1,
                total: post.price
            })
        })
            .then(response => response.json())
            .then(newCartItem => {
                cartArray.push(newCartItem);
                renderAllCartItems(cartArray)
            })
    })
}

window.addEventListener('DOMContentLoaded', () => renderDetails());





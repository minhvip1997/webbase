fetch('http://localhost:3000/newproducts')
    .then(response => response.json())
    .then(productsArray => renderAllProducts(productsArray))

function renderAllProducts(productsArray) {
    productsArray.forEach(product => renderOneProduct(product))
}

fetch('http://localhost:3000/listproduct')
.then(response =>response.json())
.then(cartItemsArray => {
    cartArray = cartItemsArray;
    renderAllCartItems(cartArray)
})

function renderAllCartItems(cartItemsArray){
    cartItemsArray.forEach(cartItem=> renderCartItems(cartItem))
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
                        <a href="productpage.html" class="view-product">View product</a>
        </div>
        `
    findDiv.append(newElement);
    
    var addButton = newElement.querySelector('.add-item');
    addButton.addEventListener('click', event => {
        //findListOfItem.innerHTML = ''
        fetch('http://localhost:3000/listproduct', {
            method : 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                cart_id: 1,
                product_id: product.id,
                price: product.price,
                quantity: 1,
                price: product.price
            })
        })
        .then(response =>response.json())
        .then(newCartItem => {
            cartArray.push(newCartItem);
            renderAllCartItems(cartArray)
        })
    })   
}

function renderCartItems(cartItem){
    const newLi =document.createElement('table');
    newLi.innerHTML = `
    <tr>
                                        <th></th>
                                        <th>PRODUCT NAME</th>
                                        <th>UNIT PRICE</th>
                                        <th>QTY</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                    <tr id="itemproduct">
                                        <td>                                        
                                            <div class="img-sizer-container"><img src="images/item-images/img1-small.jpg" alt="img"></div>
                                        </td>
                                        <td class="item-description">
                                            <h2>Peeky cropped</h2>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                        </td>
                                        <td class="checkout-price">€. ${cartItem.price}</td>
                                        <td class="qty"><span></span><div>${cartItem.quantity}</div><span></span></td>
                                        <td class="checkout-price">€. ${cartItem.total}</td>
                                        <td><a href="#fake-link"><img src="images/close-red.png" alt="Delete"></a></td>
                                    </tr>
    `;
    findListOfItem.append(newLi)
}




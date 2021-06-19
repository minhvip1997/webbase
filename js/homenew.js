var courseApi = 'http://localhost:3000/newproducts';
var courseApiCart = 'http://localhost:3000/listproduct';

function start() {
    getCourses(function (courses) {
        renderCourses(courses);
    });


}

function startCart() {

    getCart(function (cart) {
        renderCart(cart);
    });

}
start();
startCart();

function getCourses(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);

}

function getCart(callback) {
    fetch(courseApiCart)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
        /*fetch(courseApiCart)
        .then(function (response) {
            return response.json();
        })
        .then(cartItemsArray =>{
            cartArray = cartItemsArray;
            renderAllCartItems(cartArray)*/
}




function renderCourses(courses) {
    const listCoursesBlock = document.querySelector('#new');
    var htmls = courses.map(function (courses) {
        return `
        <div class="item">
                        <div class="item-image img-sizer-container">
                            <img src="images/item-images/${courses.image}" alt="Image">
                        </div>
                        <h2 class="item-title">${courses.name}</h2>
                        <h2 class="item-price">€.${courses.price}</h2>
                        <button class='addcart'>add to cart</button>
                        <input type='hidden' id='${courses.id}'>
                        <a href="productpage.html" class="view-product">View product</a>
        </div>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
    var carts = listCoursesBlock.querySelectorAll('.addcart');
    for(let i=0;carts.length;i++){
        console.log("loop");
    }
    const addButton = listCoursesBlock.querySelectorAll('.addcart')
    const findproduct = document.querySelector('#itemproduct');
    


    addButton.addEventListener('click', event => {
        findproduct.innerHTML = ""

        fetch("http://localhost:3000/listproduct", {
            method: "POST",
            headers: {
                "ContentType": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "product_id": courses.id,
                "product_name": courses.name,
                "price": courses.price,
                "quantity": 1,
                "total": courses.price
            })
        })
        .then(response=>response.json())
        .then(callback);
        
    })
    console.log(body);


}


function renderCart(cart) {
    var listCoursesBlock = document.querySelector('#itemproduct');
    var htmls = cart.map(function (cart) {
        return `
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
                                        <td class="checkout-price">€. ${cart.price}</td>
                                        <td class="qty"><span></span><div>${cart.quantity}</div><span></span></td>
                                        <td class="checkout-price">€. ${cart.total}</td>
                                        <td><a href="#fake-link"><img src="images/close-red.png" alt="Delete"></a></td>
                                    </tr>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
    //var cart = listCoursesBlock.querySelector('.addcart');
    //console.log(cart);
}


/*fetch(courseApiCart)
        .then(function (response) {
            return response.json();
        })
        .then(cartItemsArray =>{
            cartArray = cartItemsArray;
            renderAllCartItems(cartArray)
});*/


/*function renderAllCartItems(cartItemsArray){
    cartItemsArray.forEach(cartItem => renderCartItem(cartItem))
}*/

/*function renderCartItem(cartItem){
    const newLi = '';
    const findproduct = document.querySelector("#itemproduct");
    newLi.innerHTML =`
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
    `
    findproduct.append(newLi);
}*/

/*function addToCart(id){

    console.log(`Yo ${id}`);

    var options ={
        method: "POST",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            cart_id:1,
            product_id: id
        })
    };
    console.log(options);
    fetch(courseApiCart+'/'+id,options)
    .then(function(response){
        response.json();
    })
    .then(callback);

}*/



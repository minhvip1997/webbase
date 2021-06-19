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

function getCourses(courses) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(data=>renderCourses(data));

}

function getCart(cart) {
    fetch(courseApiCart)
        .then(function (response) {
            return response.json();
        })
        .then(data=>renderCart(data));

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

    var add = listCoursesBlock.querySelector('.addcart');
    add.addEventListener('click', event =>{
        fetch('http://localhost:3000/listproduct', {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product_id: 2,
            product_name: "",
            price: 0,
            quantity: 0,
            total: 0
        })
        })
        .then(function (response) {
            return response.json();
        })
        .then(data =>{
            const dataArr =[];
            dataArr.push(data);
            renderCart(dataArr);
        });
        console.log(dataArr);
    })
}


function renderCart(cart) {
    const listCartBlock = document.querySelector('#itemproduct');
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
    listCartBlock.innerHTML = htmls.join('');
    //var cart = listCoursesBlock.querySelector('.addcart');
    //console.log(cart);
}




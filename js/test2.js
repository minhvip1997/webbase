fetch('http://localhost:3000/listproduct')
.then(response =>response.json())
.then(cartItemsArray => {
    cartArray = cartItemsArray;
    renderAllCartItems(cartArray)
})

function renderAllCartItems(cartItemsArray){
    cartItemsArray.forEach(cartItem=> renderCartItems(cartItem))
}

const findListOfItem = document.querySelector('#itemproduct')

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
    `
    findListOfItem.append(newLi)
}
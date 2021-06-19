
const addButton = newElement.querySelector(".add-item");
addButton.addEventListener('click', event => {
    findListOfItem.innerText = ""
    fetch("http://localhost:3000/listproduct",{
        method = 'POST',
        header:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            cart_id: 1,
            product_id: product.id
        })
    })
    .then(response =>response.json())
    .then(newCartItem => {
        cartArray.push(newCartItem);
        renderAllCartItems(cartArray)
    })
})


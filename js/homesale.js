var courseApiSale = 'http://localhost:3000/saleproducts';

function startSale() {
    getCoursesSale(function(coursesSale){
        renderCoursesSale(coursesSale);
    });
}

startSale();

function getCoursesSale(callback) {
    fetch(courseApiSale)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

function renderCoursesSale(coursesSale) {
    var listCoursesBlock = document.querySelector('#sale');
    var htmls = coursesSale.map(function(coursesSale){
        return `
        <div class="item">
                        <div class="item-image img-sizer-container">
                            <img src="images/item-images/${coursesSale.image}" alt="Image">
                        </div>
                        <h2 class="item-title">${coursesSale.name}</h2>
                        <h2 class="item-price">€.${coursesSale.price}</h2>
                        <a href="productpage.html" class="view-product">View product</a>
        </div>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('')
}
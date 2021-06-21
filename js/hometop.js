var courseApiTop = 'http://localhost:3000/topproducts';

function startTop() {
    getCoursesTop(function(coursesTop){
        renderCoursesTop(coursesTop);
    });
}

startTop();
function getCoursesTop(callback) {
    fetch(courseApiTop)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

function renderCoursesTop(coursesTop) {
    var listCoursesBlock = document.querySelector('#top');
    var htmls = coursesTop.map(function(coursesTop){
        return `
        <div class="item">
                        <div class="item-image img-sizer-container">
                            <img src="images/item-images/${coursesTop.image}" alt="Image">
                        </div>
                        <h2 class="item-title">${coursesTop.name}</h2>
                        <h2 class="item-price">€.${coursesTop.price}</h2>
                        
        </div>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('')
}
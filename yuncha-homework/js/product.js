// product.js

window.onload = function() {
    initCategoryMenu();
};

function initCategoryMenu() {
    let categoryUl = document.querySelector('#product>ul');
    while (categoryUl.firstChild) categoryUl.removeChild(categoryUl.firstChild);
    let products = RESOURCES.product;

    let productCategory = new Set();
    for (let i of products) {
        productCategory.add(i.category);
    }
    productCategory.forEach((i) => {
        let categoryLi = document.createElement('li');
        categoryLi.className = 'sub-nav-item';
        categoryLi.textContent = i;
        categoryLi.onclick = updateProductPreview;
        categoryUl.appendChild(categoryLi);
    });
    categoryUl.firstChild.onclick();
}

function updateProductPreview() {
    let productPreview = document.getElementById('product-preview');
    while (productPreview.firstChild) productPreview.removeChild(productPreview.firstChild);

    let productItem = new Array();
    let products = RESOURCES.product;
    for (let i of products) {
        if (i.category == this.textContent) productItem.push(i);
    }

    productItem.forEach((i) => {
        let item = document.createElement('div');
        item.className = 'product-item';
        item.title = i.title;
        item.dataset.id = i.id;
        item.style.backgroundImage = "url(" + i.img + ")";
        item.style.backgroundSize = "cover";
        item.onclick = updateDetail;
        productPreview.appendChild(item);
    })
    productPreview.firstChild.onclick();
}

function updateDetail() {
    let productId = this.dataset.id;
    let products = RESOURCES.product;

    let detailPicture = document.getElementById('detail-picture');
    let detailTitle = document.getElementById('detail-title');
    let detailPrice = document.getElementById('detail-price');
    let detailText = document.getElementById('detail-text');
    for (let i of products) {
        if (i.id == productId) {
            detailPicture.style.backgroundImage = "url(" + i.img + ")";
            detailPicture.style.backgroundSize = "cover";
            detailTitle.textContent = i.title;
            detailPrice.textContent = i.price;
            detailText.textContent = i.text;
            return;
        }
    }
}
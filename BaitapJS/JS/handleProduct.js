let products = getDataLocalStorage(keyLocalStorageListSP);

(function() {
    products.map(product => {
        return document.querySelector('.content').innerHTML += `<div class="product">
        <div class="product-main">
            <div class="product-img">
                <img src="${product.img} " alt="anhdaidien">
            </div>
            <i class="fa-solid fa-cart-shopping" onclick ="addToCart(${product.id})"></i>
            <div class="product-detail">
                <p class="product-name"> ${product.name}</p>
                <div class="product-content">
                    <p class="product-price"> <small>$</small>${product.price}</p>
                    <p class="product-quantity"> <small>Quantity: </small>${product.quantity}</p>
                </div>
            </div>
        </div>
    </div>`
    })

})()
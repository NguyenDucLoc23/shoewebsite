listCart = [];

if (!localStorage.getItem(keyLocalStorageItemCart)) {
    saveDataLocalStorage(keyLocalStorageItemCart, JSON.stringify(listCart));
}

let shopCart = getDataLocalStorage(keyLocalStorageItemCart)

let tongSp = countTotalQuantity();
document.querySelector('.valueCart').innerHTML = `<span class="valueCart"> ${tongSp}</span>`

function openCart() {
    document.querySelector('.cart-main').style.display = 'block';
    document.querySelector('.content').style.display = 'none';
    renderCart();
    updateCart();

    if (shopCart.length === 0) {
        emptyCart();
    } else {
        document.querySelector('.empty-cart').style.display = 'none'
        document.querySelector('.cart-main').style.display = 'block';
        document.querySelector('.content').style.display = 'none';
        document.querySelector('.list-header').style.display = 'flex';
        document.querySelector('.totalBuy-detail').style.display = 'block';
    }

    if (shopCart.length === 0)
        document.querySelector('.buy').style.display = 'none'
    else
        document.querySelector('.buy').style.display = 'block'
}

function emptyCart() {
    document.querySelector('.empty-cart').style.display = 'flex'
    document.querySelector('.cart-main').style.display = 'block';
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.list-header').style.display = 'none';
    document.querySelector('.totalBuy-detail').style.display = 'none';
}

function back() {
    document.querySelector('.cart-main').style.display = 'none';
    document.querySelector('.content').style.display = 'flex';
}

function goToHome() {
    document.querySelector('.cart-main').style.display = 'none';
    document.querySelector('.content').style.display = 'flex';
}

function buy() {
    if (shopCart.length > 0) {
        document.querySelector('.modal').style.display = 'flex';
        document.querySelector('.auth-form').style.display = 'block'
        document.querySelector('.auth-form-confirm').style.display = 'none'

        document.querySelector('.input-firstName').value = '';
        document.querySelector('.input-lastName').value = '';
        document.querySelector('.input-email').value = '';
        document.querySelector('.input-number').value = '';
        document.querySelector('.input-phone').value = '';
        document.getElementById('Province').value = '0';
        document.getElementById('District').value = '0';
        document.getElementById('Ward').value = '0';

        document.querySelector('.errorFirstName').innerHTML = '';
        document.querySelector('.errorLastName').innerHTML = '';
        document.querySelector('.errorEmail').innerHTML = '';
        document.querySelector('.errorPhone').innerHTML = '';
        document.querySelector('.errorProvince').innerHTML = '';
        document.querySelector('.errorDistrict').innerHTML = '';
        document.querySelector('.errorWard').innerHTML = '';
        document.querySelector('.loiNumber').innerHTML = '';
    }
}

function backToCart() {
    document.querySelector('.modal').style.display = 'none';
}

function updateCart() {
    resetPriceProduct();

    let totalBuy = countTotal();
    let totalCartQuantity = shopCart.length;

    document.querySelector('.totalBuy-detail').innerHTML = `<p class="totalBuy-detail">Total: $${totalBuy}</p>`
    document.querySelector('.valueCart').innerHTML = `<span class="valueCart"> ${totalCartQuantity}</span>`

    if (shopCart.length === 0)
        document.querySelector('.buy').style.display = 'none'
    else
        document.querySelector('.buy').style.display = 'block'

    renderCart();

    saveDataLocalStorage(keyLocalStorageItemCart, JSON.stringify(shopCart));
    shopCart = getDataLocalStorage(keyLocalStorageItemCart)
}

function resetPriceProduct() {
    for (let i = 0; i < shopCart.length; i++) {
        shopCart[i].total = shopCart[i].soLuong * shopCart[i].price;
    }
}

function countTotal() {
    let sumTotal = 0;
    for (let i = 0; i < shopCart.length; i++) {
        sumTotal += shopCart[i].total;
    }
    return sumTotal;
}

function countTotalQuantity() {
    return shopCart.length;
}

function renderCart() {

    document.querySelector('.cart-detail').innerHTML = "";
    if (shopCart.length === 0) {
        emptyCart();
    }
    shopCart.map(item => {
        return document.querySelector('.cart-detail').innerHTML +=`<div class="detail-item">
        <div class="img-and-name">
            <div class="cart-product-img">
                <img src="${item.img}" alt="cartProductImg">
            </div>
            <div class="cart-product-name">
                <p class="cpn-name">${item.name}</p>
                <p class="cpn-quantity">Quantity: ${item.quantity}</p>
            </div>
        </div>
    
        <div class="cart-product-quantity">
            <i class="fa-solid fa-minus ${item.idSp}" onclick="minusNumber(${item.idSp})"></i>
            <p>${item.soLuong}</p>
            <i class="fa-solid fa-plus ${item.idSp}" onclick="addNumber(${item.idSp})"></i>
        </div>
    
        <div class="cart-product-sub">
            <p>$ ${item.price}</p>
        </div>
    
        <div class="cart-product-total">
            <p>$ ${item.total}</p>
        </div>
    
        <div class="cart-product-clear">
            <i class="fa-regular fa-circle-xmark" onclick="removeItem(${item.idSp})"></i>
        </div>
    </div>`
    })
    
}

function addToCart(id) {
    let test = products.filter(function(m) { return m.id == id })

    if (test[0].quantity > 0) {
        var check = shopCart.some(function(cart) { return cart.idSp === id })

        if (check) {
            addNumber(id)
        } else {
            let item = products.find(function(product) {
                return product.id === id;
            })
            shopCart.push({
                idSp: id,
                soLuong: 1,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                img: item.img,
                total: item.price
            })
        }
        updateCart();
    }
}

function minusNumber(id) {
    shopCart = shopCart.map(function(cart) {
        let numberQuantity = cart.soLuong;
        if (cart.idSp === id) {


            if (numberQuantity == 1) {
                confirm();

                document.querySelector('.auth-form-confirm').innerHTML = `
                    <div class="confirm-header">
                        <p>Bạn có muốn xóa sản phẩm không?</p>
                    </div>      
                    
                    <div class="confirm-content">
                        <button class="confirm-del" onclick="confirmDel(${id})">Xóa</button>
                        <button class="confirm-back" onclick="clearConfirm()">Quay lại</button>
                    </div>`
            }

            if (numberQuantity > 1) numberQuantity--;
        }

        return {...cart, soLuong: numberQuantity }
    })
    updateCart();
}

function addNumber(id) {
    shopCart = shopCart.map(function(cart) {
        let numberQuantity = cart.soLuong;
        if (cart.idSp === id) {
            if (numberQuantity == cart.quantity) {
                confirm();

                document.querySelector('.auth-form-confirm').innerHTML = `
                    <div class="confirm-header">
                        <p>Bạn đã đặt hết hàng trong kho</p>
                    </div>      
                    
                    <div class="confirm-content">
                        <button class="confirm-back" onclick="clearConfirm()">Quay lại</button>
                    </div>`
            }
            if (numberQuantity < cart.quantity) { numberQuantity++ };
        }

        return {...cart, soLuong: numberQuantity }
    })
    updateCart();
}

function removeItem(id) {
    confirm();

    document.querySelector('.auth-form-confirm').innerHTML = `
    <div class="confirm-header">
        <p>Bạn có muốn xóa sản phẩm không?</p>
    </div>      
    
    <div class="confirm-content">
        <button class="confirm-del" onclick="confirmDel(${id})">Xóa</button>
        <button class="confirm-back" onclick="clearConfirm()">Quay lại</button>
    </div>`
}

function clearConfirm() {
    document.querySelector('.modal').style.display = 'none';
}

function confirm() {
    document.querySelector('.modal').style.display = 'flex'
    document.querySelector('.auth-form').style.display = 'none'
    document.querySelector('.auth-form-confirm').style.display = 'block'
}

function confirmDel(idPro) {
    shopCart = shopCart.filter((item) => item.idSp !== idPro)
    updateCart();
    document.querySelector('.modal').style.display = 'none'
}
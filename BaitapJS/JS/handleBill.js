function openDetail(id) {
    document.querySelector('.modal').style.display = 'flex';
    renderListProduct(id)
}

function backToBill() {
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.body-billDetail').innerHTML = '';
}

const listBillApi = 'http://localhost:3000/listDonHang';
startBill();

function startBill() {
    fetch(listBillApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(listBill) {
            renderBill(listBill);
        })
        .catch(function(err) {
            console.log(err);
        })
}

function renderBill(data) {
    for (let i = 0; i < data.length; i++) {
        let dataItem = [];
        dataItem = data[i].gioHang;

        let totalPrice = 0;
        let totalQuantity = 0;

        dataItem.map(item => {
            totalPrice += item.total;
            totalQuantity += item.soLuong;
        })

        document.querySelector('.bill-container-item').innerHTML += `<div class="bill-detail">
        <div class="detail">
            <p>${data[i].id}</p>
            <p class="openDetail" onclick="openDetail('${data[i].id}')">detail</p>
        </div>

        <div class="detail">
            <p>${data[i].ten}</p>
        </div>

        <div class="detail">
            <p>${data[i].date}</p>
        </div>

        <div class="detail">
            <button class="returnStock" onclick="returnStock('${data[i].id}')">Return</button>
        </div>

        <div class="detail">
            <p> ${totalQuantity}</p>
        </div>

        <div class="detail">
            <p>$ ${totalPrice}</p>
        </div>
        </div>`
    }

}

function deleteBill(id) {
    let options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch(listBillApi + '/' + id, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(list) {
            renderBill(list);
        })
}


function renderListProduct(id) {
    fetch(listBillApi + '/' + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(listBillItem) {
            document.querySelector('.modal').style.display = 'flex';
            document.querySelector('.confirm-del-modal').style.display = 'none';
            document.querySelector('.body-billDetail').style.display = 'block';
            document.querySelector('.header-billDetail').style.display = 'block';
            document.querySelector('.auth-form-header').style.display = 'flex';

            let data = listBillItem.gioHang;

            data.map(item => {
                return document.querySelector('.body-billDetail').innerHTML += `<div class="billDetail-item">
                <div class="billDetail-item-1">
                    <p>${item.name}</p>
                </div>
        
                <div class="billDetail-item-1">
                    <p>${item.soLuong}</p>
                </div>
        
                <div class="billDetail-item-1">
                    <p>$ ${item.price}</p>
                </div>
                </div>`
            })

        })
        .catch(function(err) {
            console.log(err);
        })
}

function returnStock(id) {

    document.querySelector('.modal').style.display = 'flex';
    document.querySelector('.confirm-del-modal').style.display = 'block';
    document.querySelector('.body-billDetail').style.display = 'none';
    document.querySelector('.header-billDetail').style.display = 'none';
    document.querySelector('.auth-form-header').style.display = 'none';

    document.querySelector('.confirm-del-modal').innerHTML = `<div class="confirm-header">
        <p>Bạn có muốn trả lại sản phẩm không?</p>
        </div>      
        
        <div class="confirm-content-bill">
            <button class="confirm-del" onclick="confirmDelForm('${id}')">Xóa</button>
            <button class="confirm-back" onclick="clearConfirmDel()">Quay lại</button>
        </div>`
}

function clearConfirmDel() {
    document.querySelector('.modal').style.display = 'none';
}

function confirmDelForm(id) {
    fetch(listBillApi + '/' + id)
        .then(function(response) {
            return response.json();
        })
        .then(function(listBillItem) {
            let data = listBillItem.gioHang;
            let products = JSON.parse(localStorage.getItem('DanhSachSP'));

            products.map(item => {
                data.map(cart => {
                    if (item.id === cart.idSp)
                        item.quantity += cart.soLuong;
                })

            })

            localStorage.setItem('DanhSachSP', JSON.stringify(products));
            deleteBill(id)

        })
        .catch(function(err) {
            console.log(err);
        })

}
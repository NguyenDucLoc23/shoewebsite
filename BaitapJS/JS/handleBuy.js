const listBillApi = 'http://localhost:3000/listDonHang';
start();

function start(){
    handleCreateBill();
}

function handleCreateBill(){
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth() +1;
    let year = d.getFullYear()
    let time = '';
    time = day + '/' + month + '/' + year;

    let createBtn = document.querySelector('.footer-accept');

    createBtn.onclick = function() {
        if(validate())
        {
            let formData = {
                id: genId(6),
                ho: document.querySelector('.input-firstName').value,
                ten: document.querySelector('.input-lastName').value,
                email: document.querySelector('.input-email').value,
                sdt: document.querySelector('.input-phone').value,
                idTinh: document.getElementById('Province').value,
                idHuyen: document.getElementById('District').value,
                idXa: document.getElementById('Ward').value,
                soNha: document.querySelector('.input-number').value,
                mess: document.querySelector('.input-mess').value,
                date: time,
                gioHang: shopCart
            }
            
            updateStock();
            createBill(formData);
            document.querySelector('.modal').style.display = 'none';
            saveDataLocalStorage(keyLocalStorageItemCart, JSON.stringify([]));
        }
    }
}

function createBill(data) {
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    };

    fetch(listBillApi, options)
        .then(function(response){
            return response.json();
        })
}

function updateStock(){
    let listStockNew = products;

    listStockNew.map(item => {
        shopCart.map(cart => {
            if(item.id === cart.idSp)
                item.quantity = item.quantity - cart.soLuong;
        })

    }) 
    products = listStockNew;
    saveDataLocalStorage(keyLocalStorageListSP, JSON.stringify(products));
}

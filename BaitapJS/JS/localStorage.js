const keyLocalStorageListSP = 'DanhSachSP';
const keyLocalStorageItemCart = 'DanhSachItemCart';

function saveDataLocalStorage(key, value) {
    if (typeof JSON.parse(value) === "object")
        localStorage.setItem(key, value);
}

if (!localStorage.getItem(keyLocalStorageListSP)) {
    saveDataLocalStorage(keyLocalStorageListSP, JSON.stringify(listData));
}

function getDataLocalStorage(key) {
    let data = JSON.parse(localStorage.getItem(key));
    return data
}
function validate() {
    let firstName = document.querySelector('.input-firstName').value;
    let lastName = document.querySelector('.input-lastName').value;
    let email = document.querySelector('.input-email').value;
    let phone = document.querySelector('.input-phone').value;
    let selectProvince = document.getElementById('Province').value;
    let selectDistrict = document.getElementById('District').value;
    let selectCommune = document.getElementById('Ward').value;
    let numberAddress = document.querySelector('.input-number').value;

    let errorFirstName = document.querySelector('.errorFirstName');
    let errorLastName = document.querySelector('.errorLastName');
    let errorEmail = document.querySelector('.errorEmail');
    let errorPhone = document.querySelector('.errorPhone');
    let errorProvince = document.querySelector('.errorProvince');
    let errorDistrict = document.querySelector('.errorDistrict');
    let errorCommune = document.querySelector('.errorWard');
    let errorNumberAddress = document.querySelector('.loiNumber');

    let error = false;

    errorFirstName.innerHTML = '';
    errorLastName.innerHTML = '';
    errorEmail.innerHTML = '';
    errorPhone.innerHTML = '';
    errorProvince.innerHTML = '';
    errorDistrict.innerHTML = '';
    errorCommune.innerHTML = '';
    errorNumberAddress.innerHTML = '';

    if (firstName.trim().length === 0 || firstName === 'null') {
        errorFirstName.innerHTML = 'Hãy nhập họ';
        error = true;
    }

    if (lastName.trim().length === 0 || lastName === 'null') {
        errorLastName.innerHTML = 'Hãy nhập tên';
        error = true;
    }

    if (email.trim().length === 0 || email === 'null') {
        errorEmail.innerHTML = 'Hãy nhập email';
        error = true;
    }

    if (!/[a-zA-Z]/.test(lastName)) {
        errorLastName.innerHTML = 'Tên chỉ được nhập chữ cái in hoa và in thường';
        error = true;
    }

    if (!/[a-zA-Z]/.test(firstName)) {
        errorFirstName.innerHTML = 'Họ chỉ được nhập chữ cái in hoa và in thường';
        error = true;
    }

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
        errorEmail.innerHTML = 'Email sai định dạng';
        error = true;
    }

    if (phone.trim().length === 0 || phone === 'null') {
        errorPhone.innerHTML = 'Hãy nhập số điện thoại';
        error = true;
    }

    const regex = /^0\d{9}$/;
    if (!regex.test(phone)) {
        errorPhone.innerHTML = 'Hãy nhập số điện thoại có 10 số và bắt đầu bằng 0';
        error = true;
    }

    if (selectProvince === '0') {
        errorProvince.innerHTML = 'Hãy chọn tỉnh/thành phố';
        error = true;
    }

    if (selectDistrict === '0') {
        errorDistrict.innerHTML = 'Hãy chọn huyện/quận';
        error = true;
    }

    if (selectCommune === '0') {
        errorCommune.innerHTML = 'Hãy chọn phường/xã';
        error = true;
    }

    if (numberAddress.trim().length === 0 || numberAddress === 'null') {
        errorNumberAddress.innerHTML = 'Hãy nhập số nhà';
        error = true;
    }

    if (isNaN(numberAddress)) {
        errorNumberAddress.innerHTML = 'Số nhà phải nhập số';
        error = true;
    }

    if (!error) return true;
    else return false
}
const urlAddress = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'

fetch(urlAddress)
    .then(function(response) {
        return response.json();
    })
    .then(function(address) {
        renderAddress(address)
    })
    .catch(function(err) {
        console.log(err);
    })

function renderAddress(address) {
    let provinces = document.getElementById('Province');
    let districts = document.getElementById('District');
    let wards = document.getElementById('Ward');

    address.map(item => provinces.innerHTML += `<option value="${item.Id}" 
    class="selectProvince" id="${item.Id}">${item.Name}</option>`)
    
    provinces.onchange = function() {
        districts.length = 1;
        wards.length = 1;

        if (this.value !== "") {
            let idTinh = this.value;

            let tinhDetail = address.filter(function(tinh) {
                return tinh.Id === idTinh;
            });

            for (let item of tinhDetail[0].Districts) {
                districts.innerHTML += `<option value="${item.Id}" 
                class="selectDistrict" id="${item.Id}">${item.Name}</option>`
            }
        }
    };
    districts.onchange = function() {
        wards.length = 1;

        let dataCitys = address.filter(function(dataCity) {
            return dataCity.Id === provinces.value;
        })

        if (this.value !== "") {
            let idHuyen = this.value;

            let huyenDetail = dataCitys[0].Districts.filter(function(test) { return test.Id === idHuyen; });

            for (const item of huyenDetail[0].Wards) {
                wards.innerHTML += `<option value="${item.Id}" 
                class="selectWard" id="${item.Id}">${item.Name}</option>`
            }
        }
    }
}

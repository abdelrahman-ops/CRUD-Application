let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("crBtn");


let mood = 'create'
let tmp;


// CALCULATE TOTAL
function calcTotal() {
    // console.log("done")
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green'
    }
    else {
        total.innerHTML = '';
        total.style.background = 'red'
    }

}


// create product
let proData;
if (localStorage.product != null) {
    proData = JSON.parse(localStorage.product)
} else { proData = [] }

create.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    // save local storage

    if (title.value != ''
        && price.value != ''
        && category.value != ''
        && newPro.count < 100) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    proData.push(newPro)
                }
            }
            else {
                proData.push(newPro)
            }
        }
        else {
            proData[tmp] = newPro;
            mood = 'create';
            create.innerHTML = "Create";
            count.style.display = 'block';
        }
        clearData()
    }


    localStorage.setItem('product', JSON.stringify(proData))


    showData()
}


// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// SHOW DATA
function showData() {
    calcTotal()
    let table = '';
    for (let i = 0; i < proData.length; i++) {
        table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${proData[i].title}</td>
                        <td>${proData[i].price}</td>
                        <td>${proData[i].taxes}</td>
                        <td>${proData[i].ads}</td>
                        <td>${proData[i].discount}</td>
                        <td>${proData[i].total}</td>
                        <td>${proData[i].category}</td>
                        <td><button onclick=(updateData(${i})) id="update">update</button></td>
                        <td><button onclick=(deleteData(${i})) id="delete">delete</button></td>
                    </tr>
                `
        proData[i];

    }
    document.getElementById("tBody").innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (proData.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${proData.length})</button>`
    }
    else {
        btnDelete.innerHTML = '';
    }
}
showData()


// delete data
function deleteData(i) {

    proData.splice(i, 1);
    localStorage.product = JSON.stringify(proData);
    showData()
}


// delete  ALL data
function deleteAll() {
    localStorage.clear()
    proData.splice(0);
    showData()
}


// update

function updateData(i) {
    title.value = proData[i].title
    price.value = proData[i].price
    taxes.value = proData[i].taxes
    ads.value = proData[i].ads
    discount.value = proData[i].discount
    calcTotal()
    count.style.display = 'none'
    category.value = proData[i].category
    create.innerHTML = 'Update';
    mood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}





// search
let searchMood = 'title';


function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;

    search.focus()
    search.value = '';
    showData()
}

function searchData(value) {
    let table = '';

    // LOOP ON PRODUCTS
    for (let i = 0; i < proData.length; i++) {
        // SEARCH BY TITLE
        if (searchMood == 'title') {
            if (proData[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${proData[i].title}</td>
                        <td>${proData[i].price}</td>
                        <td>${proData[i].taxes}</td>
                        <td>${proData[i].ads}</td>
                        <td>${proData[i].discount}</td>
                        <td>${proData[i].total}</td>
                        <td>${proData[i].category}</td>
                        <td><button onclick=(updateData(${i})) id="update">update</button></td>
                        <td><button onclick=(deleteData(${i})) id="delete">delete</button></td>
                    </tr>
                `
            }
        }
        // SEARCH BY CATEGORY
        else {
            if (proData[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${proData[i].title}</td>
                        <td>${proData[i].price}</td>
                        <td>${proData[i].taxes}</td>
                        <td>${proData[i].ads}</td>
                        <td>${proData[i].discount}</td>
                        <td>${proData[i].total}</td>
                        <td>${proData[i].category}</td>
                        <td><button onclick=(updateData(${i})) id="update">update</button></td>
                        <td><button onclick=(deleteData(${i})) id="delete">delete</button></td>
                    </tr>
                `
            }
        }
    }

    document.getElementById("tBody").innerHTML = table;
}


// function toggleLightMode() {
//     document.body.classList.toggle('light-mode');
// }
// function toggleLightMode() {
//     document.body.classList.toggle('light-mode');
//     const isLightMode = document.body.classList.contains('light-mode');
//     localStorage.setItem('LightMode', isLightMode ? 'enabled' : 'disabled');
// }

// window.onload = function () {
//     const LightMode = localStorage.getItem('LightMode');
//     if (LightMode === 'enabled') {
//         document.body.classList.add('light-mode');
//     }
// }

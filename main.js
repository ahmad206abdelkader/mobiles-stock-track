// fn get total ////is done
//fn creat product  ////is done
//local storage //done
//clear inputs //done
//read  done
//count   done
//delete   done
//update   done
// search
//clean data

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let id;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "";
  }
}

/////////////creat
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (
    title.value != "" &&
    price.value < 2000 &&
    taxes.value < 10 &&
    ads.value < 10 &&
    discount.value < 100 &&
    count.value < 100 &&
    category.value != ""
  ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[id] = newProduct;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  }

  localStorage.setItem("product", JSON.stringify(dataProduct));

  clearData();
  showData();
};

///clear

showData();

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
        <tr>
                <th>${i}</th>
                <th>${dataProduct[i].title}</th>
                <th>${dataProduct[i].price}</th>
                <th>${dataProduct[i].taxes} </th>
                <th>${dataProduct[i].ads}</th>
                <th>${dataProduct[i].discount}</th>
                <th>${dataProduct[i].total}</th>
                <th>${dataProduct[i].category}</th>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `;
  }

  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataProduct.length})</button>
      `;
  } else {
    btnDelete.innerHTML = "";
  }
}

/////delete

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  clearData();
  showData();
  mood = "create";
  submit.innerHTML = "create";
  count.style.display = "block";
}
// deleteAll();

////////////////////count

///////update
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  taxes.value = dataProduct[i].taxes;
  category.value = dataProduct[i].category;
  count.style.display = "none";
  getTotal();
  submit.innerHTML = "update";

  mood = "update";
  id = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//////search

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "search Title";
  } else {
    searchMood = "category";
    search.placeholder = "search Category";
  }
  search.focus();
  search.value = "";
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.includes(value)) {
        table += `
        <tr>
                <th>${i}</th>
                <th>${dataProduct[i].title}</th>
                <th>${dataProduct[i].price}</th>
                <th>${dataProduct[i].taxes} </th>
                <th>${dataProduct[i].ads}</th>
                <th>${dataProduct[i].discount}</th>
                <th>${dataProduct[i].total}</th>
                <th>${dataProduct[i].category}</th>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `;
      }
      document.getElementById("tbody").innerHTML = table;
    }
  } else {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].category.includes(value)) {
        table += `
                <tr>
                        <th>${i}</th>
                        <th>${dataProduct[i].title}</th>
                        <th>${dataProduct[i].price}</th>
                        <th>${dataProduct[i].taxes} </th>
                        <th>${dataProduct[i].ads}</th>
                        <th>${dataProduct[i].discount}</th>
                        <th>${dataProduct[i].total}</th>
                        <th>${dataProduct[i].category}</th>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                `;
      }
      document.getElementById("tbody").innerHTML = table;
    }
  }
}


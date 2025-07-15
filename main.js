let title = document.getElementById("title");
let price = document.getElementById("price");
let code = document.getElementById("code");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
function getTotal() {
  if (price.value != "") {
    let result = +ads.value - +price.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
function getcode() {
  if (price.value != "") {
    let pr = Math.floor(price.value * 1.3);
    let tot = pr + price.value;
    code.innerHTML = tot;
    code.style.background = "#040";
  } else {
    total.innerHTML = "";
    code.style.background = "#a00d02";
  }
}
getcode();
//creat
let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    code: code.innerHTML,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }
  dataPro.push(newPro);
  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
};
//clear input
function clearData() {
  title.value = "";
  price.value = "";
  code.innerHTML = "";
  let tot = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].code}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">تعديل</button></td>
        <td><button onclick="deleteDta(${i})" id="delete">حذف</button></td>
      </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
        <button onclick="deleteAll()">(${dataPro.length})حذف الكل</button>
        `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

//delete
function deleteDta(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
//deleteall
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
//update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  code.value = dataPro[i].code;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "تعديل";
  category.value = dataPro[i].category;
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searhTitle") {
    searchMood = "title";
    search.placeholder = "ابحث عن طريق الاسم";
  } else {
    searchMood = "category";
    search.placeholder = "ابحث عن طريق الصنف";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value)) {
        table += `
                <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].code}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">تعديل</button></td>
                <td><button onclick="deleteDta(${i})" id="delete">حذف</button></td>
            </tr>
                `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value)) {
        table += `
                <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].code}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">تعديل</button></td>
                <td><button onclick="deleteDta(${i})" id="delete">حذف</button></td>
            </tr>
                `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

let products = [
  { id: 1, name: 'iPhone x', price: 400 },
  { id: 2, name: 'iPhone 11', price: 450 },
  { id: 3, name: 'iPhone 12', price: 500 },
  { id: 4, name: 'iPhone 13', price: 550 },
  { id: 5, name: 'iPhone 14', price: 600 },
];

let cart = [
  { id: 1, name: 'iPhone x', price: 400, qty: 3 },
  { id: 2, name: 'iPhone 11', price: 450, qty: 5 },
];

let totalSpan = document.querySelector('#totalSpan');
let table = document.querySelector('table tbody');
let productsDiv = document.querySelector('#productsDiv');
let modal=document.querySelector('.mymodal')
let phonename=document.querySelector('#phonename')
let phoneprice=document.querySelector('#phoneprice')

let showProducts = () => {
  products.forEach((el,index) => {
    productsDiv.innerHTML += `
        <div class="col-12 p-3 bg-white shadow rounded border">
        <div class="d-flex justify-content-between">
        <h1>${el.name}</h1>
        <button class="col-1 btn btn-danger align-self-end mb-3" onclick="deletephonelist(${index})" class="btn btn-danger">X</button>
        </div>
        <div class="d-flex align-items-center justify-content-between">
        <p class="mb-0">Price : ${el.price} $</p>
        <button class="btn btn-success" onclick="addToCart(${el.id})">Add To Cart</button>
        </div>
        </div>
    `;
  });
};

let getTotal = () => {
  let final = 0;
  cart.forEach((el) => {
    final += el.price * el.qty;
  });
  totalSpan.innerText = final;
};

let showCart = () => {
  cart.forEach((el, index) => {
    table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${el.name}</td>
                <td>${el.price} $</td>
                <td>
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <button class="btn btn-danger"onclick="decrease(${index})">-</button>
                        <p class="mb-0">${el.qty}</p>
                        <button class="btn btn-success" onclick="increase(${index})">+</button>
                    </div>
                </td>
                <td>
                    ${el.qty * el.price} $
                </td>
                <td>
                    <button onclick="deletephone(${index})" class="btn btn-danger">Del</button>
                </td>
            </tr>
        `;
  });
  getTotal();
};

let addToCart = function(Productsid) {
  let product = products.find(function(product) {
    return product.id === Productsid;
  });

  let productInCartIndex = cart.findIndex(function(el) {
    return el.id === product.id;
  });

  if (productInCartIndex === -1) {
    product = { ...product, qty: 1 };
    cart.push(product);
  } else {
    cart[productInCartIndex].qty++;
  }
  table.innerHTML=""
  showCart();
};

let increase= (index) => {
  cart[index].qty++;
  table.innerHTML=""
  showCart();
};

let decrease= (index) => {
  if (cart[index].qty > 1) {
    cart[index].qty--;
  }
  table.innerHTML=""
  showCart();
};

let togglemodal=()=>{
  modal.classList.toggle('d-none')
  modal.classList.toggle('d-flex')
}

let closemodal=()=>{
  modal.classList.toggle('d-flex')
  modal.classList.toggle('d-none')
}

let add=()=>{
  if(phonename.value=="" || phoneprice.value==""){
    alert(`You can't leave empty values`)
  }else{
  let phonenamee = phonename.value
  let phonepricee = +phoneprice.value
  let finaladd = { name: phonenamee , price: phonepricee }
  products.push(finaladd)
  phonename.value=""
  phoneprice.value=""
  closemodal()
  productsDiv.innerHTML=""
showProducts();
}
}

let deletephone=(index)=>{
cart.splice(index,1)
table.innerHTML=""
showCart();
}

let deletephonelist=(index)=>{
products.splice(index,1)
productsDiv.innerHTML=""
showProducts();
}

showProducts();
showCart();

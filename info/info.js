let title = document.querySelector('.title');
let id = localStorage.getItem('info');

let closeCardModal = document.querySelector(".closeCardModal");

let alertP = document.querySelector(".alert")
let arr = JSON.parse(localStorage.getItem("card")) || [];
alertP.innerHTML = arr.length;

let corzin = document.querySelector(".card");

let cardModal = document.querySelector(".cardModal")

let bag = document.querySelector(".bag");

let totalPrise = document.querySelector(".totalPrise");
let checkTotal = document.querySelector(".check-total");
let sum = 0;
let bagModal = document.querySelector(".bagModal");

checkTotal.onclick = ()=>{
    bagModal.showModal();
    let data = JSON.parse(localStorage.getItem("card"));
    let closeBtn = document.createElement("button");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "❌";
    closeBtn.onclick = () => {
        bagModal.close();
        bagModal.innerHTML = "";
    }
    let buy = document.createElement("button");
    buy.classList.add("buy-btn");
    buy.innerHTML = `Buy ${sum}`;
    buy.onclick = () => {
        alert("You has buy all of this products")
        localStorage.setItem("card", JSON.stringify([]));
        openCardModal()
        bagModal.close();
        alertP.innerHTML = 0;
    }
    bagModal.append(closeBtn, buy)
    data.forEach((el)=>{
        let cart = document.createElement("div");
        cart.classList.add("cart-item");
        let img = document.createElement("img");
        let div = document.createElement("div");
        let name = document.createElement("h3");
        let price = document.createElement("p");
        let status = document.createElement("p");
        let category = document.createElement("p");
        name.innerHTML = el.name;
        price.innerHTML = `$${el.price}`;
        status.innerHTML = el.status? "In Stock" : "Out of Stock";
        category.innerHTML = "BY "+el.category.toUpperCase();
        img.src = el.image;
        div.append(name, price, category, status);
        cart.append(img,div);
        bagModal.append(cart)
    })
}

totalPrise.innerHTML = sum;

corzin.onclick = () => {
    openCardModal();
}

function openCardModal() {
    bag.innerHTML = "";
    sum=0;
    let products = JSON.parse(localStorage.getItem("card"))
    totalPrise.innerHTML = "";
    products.forEach((el) => {
        let priceSum = (Number(el.counter)*Number(el.price))
        sum+=priceSum;
        totalPrise.innerHTML = sum;
        let box = document.createElement("div")
        box.classList.add("card-box")
        let img = document.createElement("img")
        img.src = el.image;
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("card-main");
        let div = document.createElement("div");
        div.classList.add("name-line");
        let name = document.createElement("p");
        name.innerHTML = el.name;
        let delBtn = document.createElement("button");
        delBtn.innerHTML = "X";
        delBtn.onclick = () => {
            let newProducts = products.filter((elem) => elem.id!== el.id);
            localStorage.setItem("card", JSON.stringify(newProducts));
            alertP.innerHTML = JSON.parse(localStorage.getItem("card")).length;
            openCardModal();
        }
        div.append(name, delBtn)
        let price = document.createElement("p");
        price.classList.add("price");
        price.innerHTML = `$${priceSum}`;
        let cnt = document.createElement("div");
        let count = document.createElement("p");
        count.innerHTML = el.counter;
        cnt.classList.add("cnt-line");
        let plus = document.createElement("button");
        plus.innerHTML = "+";
        plus.onclick = () => {  
            plusCnt(el);
        }
        let minus = document.createElement("button");
        minus.innerHTML = "--";
        minus.onclick = () => {
            if(el.counter<=1){
                let newProducts = products.filter((elem) => elem.id!== el.id);
                localStorage.setItem("card", JSON.stringify(newProducts));
                alertP.innerHTML = JSON.parse(localStorage.getItem("card")).length;
                openCardModal()
            }else{
                minusCnt(el);
            }
        }
        cnt.append(plus,count,minus);
        mainDiv.append(div, price, cnt);
        box.append(img, mainDiv);
        bag.append(box);
        cardModal.showModal();
    });
}

function plusCnt(el){
    let products = JSON.parse(localStorage.getItem("card"));
    products.map((elem)=>{
        if(elem.id==el.id){
            elem.counter++;
            return el;
        }
        return el;
    });
    localStorage.setItem("card", JSON.stringify(products)); 
    openCardModal();
}

function minusCnt(el){
    let products = JSON.parse(localStorage.getItem("card"));
    products.map((elem)=>{
        if(elem.id==el.id){
            elem.counter--;
            return el;
        }
        return el;
    });
    localStorage.setItem("card", JSON.stringify(products)); 
    openCardModal();
}

closeCardModal.onclick = () => {
    cardModal.close();
}

const API = "http://localhost:3000/products";

let box = document.querySelector("main")

async function get(){
    try {
        let response = await fetch(API);
        let data = await response.json();
        getById(data);
    } catch (error) {
        console.error(error);
    }
}

get()

function getById(data){
    data.map((el)=>{
        if(el.id==id){
            showInfo(el);
        }
        return el;
    })
}

function showInfo(elem){
    title.innerHTML = `Home / ${elem.name}`;
    let img = document.createElement('img');
    img.src = elem.image;
    let right = document.createElement('div');
    right.classList.add('right');
    let name = document.createElement('h1');
    name.classList.add("name");
    name.innerHTML = elem.name;
    let category = document.createElement("p");
    category.classList.add("category");
    category.innerHTML = `BY ${elem.category.toUpperCase()}`;
    let lineColor = document.createElement("div");
    lineColor.classList.add("line-color");
    let price = document.createElement("p");
    price.classList.add("price");
    price.innerHTML = `$${elem.price}`;
    let description = document.createElement("p");
    description.classList.add("description");
    description.innerHTML = elem.description;
    let addToCart = document.createElement("button");
    addToCart.innerHTML = "ADD TO CART";
    addToCart.onclick = ()=>{
        let prToCard = JSON.parse(localStorage.getItem("card"));        
            let check = prToCard.filter((el)=>el.id==elem.id)
            if(check[0]){
                prToCard = prToCard.map((el)=>{
                    if(el.id==elem.id){
                        el.counter++;
                    }
                    return el
                })
            }else{
                prToCard.push({...elem, counter: 1});
            }
            localStorage.setItem("card", JSON.stringify(prToCard))
            alertP.innerHTML = JSON.parse(localStorage.getItem("card")).length;
    }
    let colorDiv = document.createElement("div");
    colorDiv.classList.add("color-div");

    elem.color.forEach((el)=>{
        let color = document.createElement("div");
        color.classList.add("color");
        color.style.backgroundColor = el;
        colorDiv.append(color);
    })

    lineColor.append(price, colorDiv)
    right.append(name, category, lineColor, description, addToCart);
    box.append(img, right);
}

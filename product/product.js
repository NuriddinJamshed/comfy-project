let box = document.querySelector(".box");

let inpSearch = document.querySelector(".inpSearch");

let all = document.querySelector(".allCategory");
let ikea = document.querySelector(".Ikea");
let marcos = document.querySelector(".Marcos");
let caressa = document.querySelector(".Caressa");
let liddy = document.querySelector(".Liddy");
let rengePrise = document.querySelector(".rangePrise");
let rengValue = document.querySelector(".value");
let bagModal = document.querySelector(".bagModal");
let closeCardModal = document.querySelector(".closeCardModal");

let alertP = document.querySelector(".alert")
alertP.innerHTML = JSON.parse(localStorage.getItem("card")).length;

let corzin = document.querySelector(".card");

let cardModal = document.querySelector(".cardModal")

let bag = document.querySelector(".bag");

let totalPrise = document.querySelector(".totalPrise");
let checkTotal = document.querySelector(".check-total");
let sum = 0;


checkTotal.onclick = ()=>{
    bagModal.showModal();
    let data = JSON.parse(localStorage.getItem("card"));
    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "❌";
    closeBtn.onclick = () => {
        bagModal.close();
    }
    bagModal.appendChild(closeBtn);
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

rengValue.innerHTML = `Value: ${rengePrise.value}`;

rengePrise.oninput=()=>{
    rengValue.innerHTML = `Value: ${rengePrise.value}`;
    getByPrise(rengePrise.value)
}

async function getByPrise(prise){
    try {
        let {data} = await axios.get(API);
        data = data.filter((el)=>{
            return el.price <= Number(prise)
        })
        console.log(data);
        getProducts(data)
    } catch (error) {
        console.error(error);
    }
}

inpSearch.oninput=async()=>{
    try {
        let {data} = await axios.get(`${API}?name=${inpSearch.value}`)
        getProducts(data)
    } catch (error) {
        console.error(error);
    }
}

async function get(){
    try {
        let {data} = await axios.get(API);
        getProducts(data)
    } catch (error) {
        console.error(error);
    }
}

get();

all.onclick = () => {
    get();
}

ikea.onclick = () => {
    selectCategory("IKEA");
}

marcos.onclick = () => {
    selectCategory("MARCOS");
}

caressa.onclick = () => {
    selectCategory("CARESSA");
}

liddy.onclick = () => {
    selectCategory("LIDDY");
}

async function selectCategory(value){
        let {data} = await axios.get(`${API}?category=${value}`);
        getProducts(data);
}

function getProducts(products){
    box.innerHTML = "";
    products.forEach(el => {
        let card = document.createElement("div");
        card.classList.add("container");
        let img = document.createElement("img");
        img.classList.add("card-img");
        img.src = el.image;
        let name = document.createElement("h1");
        name.classList.add("card-name");
        name.innerHTML = el.name;
        let price = document.createElement("h2");
        price.innerHTML = `$${el.price}`;
        let infoSpan = document.createElement("span");
        infoSpan.classList.add("infoSpan")
        infoSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>';
        infoSpan.onclick=()=>{
            localStorage.setItem('info', el.id);
            window.location.href = "/info/info.html";
        }
        let cardSpan = document.createElement("span");
        cardSpan.classList.add("cardSpan");
        cardSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>'
        cardSpan.onclick = () =>{
            let prToCard = JSON.parse(localStorage.getItem("card"));        
            let check = prToCard.filter((elem)=>elem.id==el.id)
            console.log(check);
            
            if(check[0]){
                prToCard = prToCard.map((elem)=>{
                    if(elem.id==el.id){
                        elem.counter++;
                    }
                    return elem
                })
            }else{
                prToCard.push({...el, counter: 1});
            }
            localStorage.setItem("card", JSON.stringify(prToCard))
            alertP.innerHTML = JSON.parse(localStorage.getItem("card")).length;
            console.log(prToCard);
            
        }
        card.append(img, name, price, infoSpan, cardSpan);
        box.appendChild(card);
    });
}

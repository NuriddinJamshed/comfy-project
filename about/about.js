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
    alert("Your card has been checked")
}

totalPrise.innerHTML = sum;

corzin.onclick = () => {
    openCardModal();
}

function openCardModal() {
    bag.innerHTML = "";
    sum=0;
    let products = JSON.parse(localStorage.getItem("card"))
    products.forEach((el) => {
        totalPrise.innerHTML = "";
        sum+=+el.price;
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
        price.innerHTML = `$${el.price}`;
        let cnt = document.createElement("div");
        cnt.classList.add("cnt-line");
        let plus = document.createElement("button");
        plus.innerHTML = "+";
        plus.onclick = () => {
            el.counter++
            count.innerHTML = el.counter;
        }
        let count = document.createElement("p");
        count.innerHTML = el.counter;
        let minus = document.createElement("button");
        minus.innerHTML = "-";
        minus.onclick = () => {
            el.counter--;
            count.innerHTML = el.counter;
        }
        cnt.append(plus,count,minus);
        mainDiv.append(div, price, cnt);
        box.append(img, mainDiv);
        bag.append(box);
        cardModal.showModal();
    });
}

closeCardModal.onclick = () => {
    cardModal.close();
}
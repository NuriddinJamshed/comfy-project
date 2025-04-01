let box = document.querySelector(".box");

let addProduct = document.querySelector(".addProduct");
let addModal = document.querySelector(".addModal");
let addForm = document.querySelector(".addForm");
let closeAdd = document.querySelector(".closeAdd");
let addColor = document.querySelector(".addColor");

let editModal = document.querySelector(".editModal");
let editForm = document.querySelector(".editForm"); 
let closeEdit = document.querySelector(".closeEdit");
let editColor = document.querySelector(".editColor");

let idx = null;

import {addProductFunc, delProduct, editProduct} from "./api.js"

addProduct.onclick=()=>{
    addModal.showModal();
}

let colors = [];

addColor.onclick=()=>{
    colors.push(addForm.addColor.value)
    console.log(colors);
    
}

addForm.onsubmit=(event)=>{
    event.preventDefault();
    let form = event.target;
    let newProduct = {
        image: form.addImg.value,
        name: form.addName.value,
        price: form.addPrice.value,
        description: form.addDescription.value,
        category: form.addCategory.value,
        status: form.addStatus.value,
        color: colors,
    }
    addColor.onclick =()=>{
        newProduct.color.push(form.addColor.value)
    }
    console.log(form.addColor.value);
    
    addProductFunc(newProduct);
    addForm.reset();
    addModal.close()
}

closeAdd.onclick=()=>{
    addModal.close();
    addForm.reset();
}

editColor.onclick=()=>{
    colors.push(editForm.addColor.value);
}

function openEditModal(el){
    editModal.showModal()
    editForm.addImg.value = el.image;
    editForm.addName.value = el.name;
    editForm.addPrice.value = el.price;
    editForm.addDescription.value = el.description;
    editForm.addCategory.value = el.category;
    editForm.addStatus.value = el.status;
    colors = el.color;
    idx=el.id;
}

editForm.onsubmit=(event)=>{
    event.preventDefault();
    let form = event.target;
    let updatedProduct = {
        id: idx,
        image: form.addImg.value,
        name: form.addName.value,
        price: form.addPrice.value,
        description: form.addDescription.value,
        category: form.addCategory.value,
        status: form.addStatus.value,
        color: colors
    }
    
    editColor.onclick =()=>{
        console.log(form.addColor.value);
        
        updatedProduct["color"].push(form.addColors.value)
    }
    console.log(updatedProduct);
    editProduct(updatedProduct);
    editModal.close();
}

closeEdit.onclick=()=>{
    editModal.close();
    editForm.reset();
}

function getProducts(products){
    box.innerHTML = "";
    products.forEach(el => {
        let card = document.createElement("div");
        card.classList.add("card");
        let img = document.createElement("img");
        img.classList.add("card-img");
        img.src = el.image;
        let name = document.createElement("h1");
        name.classList.add("card-name");
        name.innerHTML = el.name;
        let price = document.createElement("h2");
        price.innerHTML = `$${el.price}`;
        let delBtn = document.createElement("button");
        delBtn.classList.add("delete-btn");
        delBtn.innerHTML = "Delete";
        delBtn.onclick = ()=>{
            delProduct(el.id);
        }
        let editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.innerHTML = "Edit";
        editBtn.onclick = ()=>{
            openEditModal(el);
        }
        card.append(img, name, price, delBtn, editBtn);
        box.appendChild(card);
    });
}

export {getProducts};
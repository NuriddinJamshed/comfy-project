let API = "http://localhost:3000/products";

import {getProducts} from "./dom.js";

async function get(){
    try {
        let response = await fetch(API);
        let products = await response.json();
        getProducts(products);        
    } catch (error) {
        console.error(error);
    }
}

async function delProduct(id){
    try {
        await fetch(`${API}/${id}`,{
            method: "DELETE"
        });
        get();
    } catch (error) {
        console.error(error);
    }
}

async function editProduct(product){
    try {
        await fetch(`${API}/${product.id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(product)
        })
        get();
    } catch (error) {
        console.error(error);
    }
}
async function addProductFunc(product){
    try {
        await fetch(API,{
            method: "POST",
            headers: {"Content-Type":"aplication/json"},
            body: JSON.stringify(product)
        })
        get();
    } catch (error) {
        console.error(error);
    }
}

export {get, addProductFunc, delProduct, editProduct};

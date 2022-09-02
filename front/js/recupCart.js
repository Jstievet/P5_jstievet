import cartItem from './tmpl/cartItem.js'

//au clique sur panier récupéré les données stockées dans localstorage
//vérifier le nombre déléments de local storage pour une boucle for et crée les différentes lignes de produits

//création de la ligne produits
const storageArticles = JSON.parse(localStorage.getItem("products"));
let articles = [];
let recupQuantity = [];
let recupTotalPrice = [];
storageArticles.forEach(article => {
    const urlProducts = "http://localhost:3000/api/products/" + article.id;
    fetchData(urlProducts)
        .then(
            function recuperationById(dataResult) {

                let price = dataResult["price"];
                let name = dataResult["name"];
                let alt = dataResult["altTxt"];
                let imageUrl = dataResult["imageUrl"];
                let articleCartItem = document.createElement('article');
                let totalProductsPrice = price * article.quantity;
                articleCartItem.classList.add("cart__item");
                articleCartItem.setAttribute('data-id', article.id);
                articleCartItem.setAttribute('data-color', article.color);
                articleCartItem.innerHTML = cartItem;
                articleCartItem.querySelector('.cart__item__img__content').src = imageUrl;
                articleCartItem.querySelector('.cart__item__img__content').setAttribute('alt', alt);
                articleCartItem.querySelector('.cart__item__title').innerText = name;
                articleCartItem.querySelector('.cart__item__color').innerText = article.color;
                articleCartItem.querySelector('.cart__item__price').innerText = price;
                articleCartItem.querySelector('.itemQuantity').value = article.quantity;
                document.querySelector('#cart__items').appendChild(articleCartItem);
                articles.push(dataResult);
                recupQuantity.push(article.quantity);
                recupTotalPrice.push(price);


            }

        )
        .catch(function (err) {
            // Une erreur est survenue
        });

});
console.log('tableau quantiy', recupQuantity);
// gestion du prix total
let totalQuantity = recupQuantity.reduce((a, b) => a + b, 0);
console.log('totalQuantity', totalQuantity);
let emplacementTotalQuantity = document.getElementById('totalQuantity');
emplacementTotalQuantity.innerText = totalQuantity;
let totalPrice = recupQuantity.reduce((a, b) => a + b, 0);
console.log('totalPrice', totalPrice);
let emplacementTotalPrice = document.getElementById('totalPrice');
emplacementTotalPrice.innerText = totalPrice;
//on gére la validation de la commande en vérifiant les informations entre puis en intégrant au local storage un objet Client
const buttonSubmit = document.getElementById('order');
buttonSubmit.addEventListener('click', function () {
    let firstName = document.getElementById("firstName").value;
    let name = document.getElementById('lastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let mail = document.getElementById('email');
    let idProducts = document.getElementsByClassName('cart__item');
    if (idProducts) {
        let dataId = idProducts.data.id;
    }

    // localStorage.clear();

});
//buttonDelete permet à l'utilisateur de supprimer la ligne concernée
// const buttonDelete = document.getElementsByClassName('deleteItem');
// console.log('buttonDelete', buttonDelete);
// if (buttonDelete) {
//     buttonDelete.addEventListener('click', function () {

//     });
// }







import cartItem from './tmpl/cartItem.js'

//au clique sur panier récupéré les données stockées dans localstorage
//vérifier le nombre déléments de local storage pour une boucle for et crée les différentes lignes de produits

//création de la ligne produits
const storageArticles = JSON.parse(localStorage.getItem("products"));
let articles = [];
let recupQuantity = [];
let recupTotalPrice = [];
console.log('storageArticles', storageArticles);
storageArticles.forEach((article, idx) => {
    const urlProducts = "http://localhost:3000/api/products/" + article.id;
    fetchData(urlProducts)
        .then(
            function recuperationById(dataResult) {

                let price = dataResult["price"];
                let name = dataResult["name"];
                let alt = dataResult["altTxt"];
                let imageUrl = dataResult["imageUrl"];
                let articleCartItem = document.createElement('article');
                let totalProductPrice = price * article.quantity;
                articleCartItem.classList.add("cart__item");
                articleCartItem.setAttribute('data-id', `${article.id}_${article.color}`);
                articleCartItem.setAttribute('data-color', article.color);
                articleCartItem.innerHTML = cartItem;
                articleCartItem.querySelector('.cart__item__img__content').src = imageUrl;
                articleCartItem.querySelector('.cart__item__img__content').setAttribute('alt', alt);
                articleCartItem.querySelector('.cart__item__title').innerText = name;
                articleCartItem.querySelector('.cart__item__color').innerText = article.color;
                articleCartItem.querySelector('.cart__item__price').innerText = price;
                articleCartItem.querySelector('.itemQuantity').value = article.quantity;
                document.querySelector('#cart__items').appendChild(articleCartItem);
                articleCartItem.querySelector('.itemQuantity').setAttribute('data-id', `${article.id}_${article.color}`);
                articles.push(dataResult);
                recupQuantity.push(article.quantity);
                recupTotalPrice.push(totalProductPrice);
                console.log('index', storageArticles[idx]);
                //changement de la quantité
                let inputQuantity = articleCartItem.querySelector('.itemQuantity');
                inputQuantity.addEventListener('change', function (e) {
                    let newQuantity = e.target.value;
                    console.log('newquantity', newQuantity);
                    //id du products selectionner pour localstorage.setItem('id','quantity')
                    console.log('e', e.target.getAttribute('data-id'));
                    //vérification si la quantité est comprise entre 0 et 100 
                    if (newQuantity > 0 && newQuantity < 101) {
                        let cartProducts = JSON.parse(localStorage.getItem('products'))
                        console.log('cartProducts', cartProducts.id);
                        let idProductsModifie = article.id;
                        let color = article.color;
                        let newProducts = {
                            id: idProductsModifie,
                            color: color,
                            quantity: parseInt(newQuantity)
                        };

                        for (let i = 0; cartProducts.length > i; i++) {
                            let quantityModified = cartProducts[i];
                            console.log(('newProducts', newProducts));
                            if (idProductsModifie === quantityModified.id) {

                                if (color === quantityModified.color) {
                                    console.log('newProducts', newProducts);
                                    cartProducts.splice(i, 1, newProducts);
                                    // localStorage.removeItem('products')
                                    localStorage.setItem('products', JSON.stringify(cartProducts));
                                    window.location.reload();
                                }

                            }
                        }
                        recuperationById(dataResult);
                    }
                })
                //buttonDelete permet à l'utilisateur de supprimer la ligne concernée
                let buttonDelete = articleCartItem.querySelector('.deleteItem')
                if (buttonDelete) {
                    buttonDelete.addEventListener('click', function (e) {
                        let cartProducts = JSON.parse(localStorage.getItem('products'))
                        console.log('cartProducts', cartProducts);
                        let idProductsModifie = article.id;
                        let color = article.color;
                        for (let i = 0; cartProducts.length > i; i++) {
                            let verifIdColor = cartProducts[i];
                            if (idProductsModifie === verifIdColor.id) {

                                if (color === verifIdColor.color) {
                                    console.log('verifIdColor', verifIdColor);
                                    cartProducts.splice(i, 1);
                                    localStorage.removeItem('products')
                                    localStorage.setItem('products', JSON.stringify(cartProducts));
                                    window.location.reload();
                                }

                            } else {
                                // pas le bon id 
                            }
                        }
                    });
                }
                //récuperer la taille du panier lacalsotrage puis l'index de l'occurence 
                if (storageArticles.length === idx + 1) {
                    total();
                }
            }

        )
        .catch(function (err) {
            // Une erreur est survenue
        });

});

// gestion du prix total
function total() {

    console.log('recupQuantityFinal', recupQuantity)
    let totalQuantity = recupQuantity.reduce((a, b) => a + b);
    let emplacementTotalQuantity = document.getElementById('totalQuantity');
    emplacementTotalQuantity.innerText = totalQuantity;
    let totalPrice = recupTotalPrice.reduce((a, b) => a + b, 0);
    let emplacementTotalPrice = document.getElementById('totalPrice');
    emplacementTotalPrice.innerText = totalPrice;
}

//on gére la validation de la commande en vérifiant les informations entre puis en intégrant au local storage un objet contact
const buttonSubmit = document.getElementById('order');
buttonSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    let idProducts = [];
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let mail = document.getElementById('email').value;
    const localProducts = JSON.parse(localStorage.getItem('products'));
    localProducts.map(product => {
        idProducts.push(product.id);
    })
    console.log('idProducts', idProducts);
    let bodyData = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            mail: mail
        },
        products: idProducts

    };
    let emplacementIdCommand = document.getElementById('orderId');
    console.log('body', JSON.stringify(bodyData));
    const dateSend = JSON.stringify(bodyData);
    const optionsPost = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: dateSend
    }
    //requete POST pour envoyer l'objet contact
    console.log('optionPost', optionsPost);
    fetch("http://localhost:3000/api/products/order", optionsPost)
        .then((response) => {
            console.log('response', response);
        }

            // function pageConfirmation(responseCommand) {
            //     if (responseCommand.ok) {
            //         let orderId = responseCommand.orderId;
            //         let infosContact = responseCommand.contact;
            //         let infosProducts = responseCommand.idProducts;
            //         // const idPageConfirmation = "http://localhost:3000/api/products/" + orderId;
            //         // window.location.href = idPageConfirmation;
            //         // emplacementIdCommand.innerText(orderId);
            //     } else {
            //         //erreur dans la promise fournis
            //     }
            // }
        )
        .catch(function (err) {
            console.log('err', err);
        });
});







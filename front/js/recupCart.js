import cartItem from './tmpl/cartItem.js'

//au clique sur panier récupéré les données stockées dans localstorage
//vérifier le nombre déléments de local storage pour une boucle for et crée les différentes lignes de produits

//création de la ligne produits
const storageArticles = JSON.parse(localStorage.getItem("products"));
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
                articleCartItem.classList.add("cart__item");
                articleCartItem.setAttribute('data-id', article.id);
                articleCartItem.setAttribute('data-color', article.color);
                articleCartItem.innerHTML = cartItem;
                articleCartItem.querySelector('.cart__item__img__content').src = imageUrl;
                articleCartItem.querySelector('.cart__item__img__content').setAttribute('alt', alt);
                articleCartItem.querySelector('.cart__item__title').innerText = name;
                articleCartItem.querySelector('.cart__item__color').innerText = article.color;
                articleCartItem.querySelector('.cart__item__price').innerText = price;
                articleCartItem.querySelector('.cart__item__quantity').innerText = article.quantity;
                document.querySelector('#cart__items').appendChild(articleCartItem);

            }
        )
        .catch(function (err) {
            // Une erreur est survenue
        });

    let priceTotal = document.getElementsByClassName('cart__item__price');

    console.log('priceTotal', priceTotal);


});





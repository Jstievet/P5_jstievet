const urlTest = window.location.search;
const urlParams = new URLSearchParams(urlTest);
const idProductsSelection = urlParams.get('id');
//On vérifie si l'id existe dans l'api
const urlApi = "http://localhost:3000/api/products/" + idProductsSelection;
fetchData(urlApi)
    .then(
        function recuperationId(dataResult) {
            //si idProductsSelection est vide et/ou si pas d'id , ou si l'id contient plus ou moins de 32 caractère alors le produit n'existe pas
            if (idProductsSelection === "" || idProductsSelection.length != 32) {
                const erreur = 'E001';
                error(erreur);
            }
            //si tout est bon on affiche le produit
            else {
                let priceProducts = dataResult["price"];
                let colorProducts = dataResult["colors"];
                let descriptionProducts = dataResult["description"];
                let altProducts = dataResult["altTxt"];
                let imageUrlProducts = dataResult["imageUrl"];
                let nameProducts = dataResult["name"];
                document.title = nameProducts;
                let emplacementTitle = document.getElementById('title');
                emplacementTitle.innerText = nameProducts;
                let emplacementImgProducts = document.getElementById("item__img");
                let urlImgProducts = document.createElement("img");
                urlImgProducts.setAttribute("src", imageUrlProducts);
                urlImgProducts.setAttribute("alt", altProducts);
                emplacementImgProducts.appendChild(urlImgProducts);
                let emplacementDescriptionProducts = document.getElementById('description');
                emplacementDescriptionProducts.innerText = descriptionProducts;
                let emplacementPriceProducts = document.getElementById('price');
                emplacementPriceProducts.innerText = priceProducts;
                let emplacementColorProducts = document.getElementById('colors');
                let nombreCouleurs = colorProducts.length;

                for (i = 0; i < nombreCouleurs; i++) {
                    let optionColors = document.createElement("option");
                    optionColors.setAttribute("value", colorProducts[i]);
                    emplacementColorProducts.appendChild(optionColors);
                    optionColors.innerHTML = colorProducts[i];
                }
            }
        }
    )
    .catch(function (err) {
        const erreur = 'E006';
        error(erreur);
    });

const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', function () {

    let colorProduct = document.getElementById('colors').value;
    let quantityProduct = parseInt(document.getElementById('quantity').value);
    let emplacementError = document.getElementById('ErrorMsg');
    let cart = JSON.parse(localStorage.getItem('products'))
    let emplacementMessageProductPanier = document.getElementById("MessageValidation");
    //vérification changement après premiere achats

    if (colorProduct.length === 0) {
        if (emplacementMessageProductPanier.value = ! null) {
            let videError = "";
            emplacementMessageProductPanier.innerText = videError;
        };
        const erreur = 'E003';
        error(erreur);
    } else {
        if (verifQuantity(quantityProduct, idProductsSelection) === true) {
            if (emplacementMessageProductPanier.value = ! null) {
                let videError = "";
                emplacementMessageProductPanier.innerText = videError;
            };
            const erreur = 'E002';
            error(erreur);
        }
        else {
            const nameProduct = document.getElementById('title');
            let nameProductValue = nameProduct.textContent;
            emplacementError.innerText = "";
            let messageValidation = `Votre article ${nameProductValue} de couleur ${colorProduct} à été ajouté dans votre panier`;
            emplacementMessageProductPanier.innerText = messageValidation;
            if (cart?.find(item => item.id === idProductsSelection && item.color === colorProduct && quantityProduct != 0)) {
                cart = cart.map(item => {
                    if (item.id === idProductsSelection && item.color === colorProduct) {
                        item.quantity += parseInt(quantityProduct);
                    }
                    return item;
                })
                localStorage.setItem('products', JSON.stringify(cart));
            } else {
                const productsSelectionne = {
                    id: idProductsSelection,
                    color: colorProduct,
                    quantity: parseInt(quantityProduct)
                }
                if (cart) {
                    cart.push(productsSelectionne);
                } else {
                    cart = [productsSelectionne];
                }
                localStorage.setItem('products', JSON.stringify(cart));
            }
        }
    }
});







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
                confirm("Un soucis est survenue le produit n'as pas été trouve retour à la page produit");
                window.location.href = "http://127.0.0.1:5500/front/html/index.html";
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
        // confirm("Un soucis est survenue retour à la page produit");
        // window.location.href = "http://127.0.0.1:5500/front/html/index.html";
    });

const addToCart = document.getElementById('addToCart');
if (addToCart) {

    addToCart.addEventListener('click', function () {

        let colorProduct = document.getElementById('colors').value;
        let quantityProduct = parseInt(document.getElementById('quantity').value);

        let cart = JSON.parse(localStorage.getItem('products'))
        if (verifQuantity(quantityProduct, idProductsSelection) === true) {
            console.log('erreur sur la Quantité', quantityProduct);
            const errQuantity = "La Quantité dois être comprise entre 0 et 100";
            let emplacementError = document.getElementById("firstNameErrorMsg");
            emplacementError.innerText = errQuantity;
        } else {
            if (colorProduct.length === 0) {
                console.log('erreur sur la couleur', colorProduct.length);
                const errColor = "Aucune Couleur n'as été choisie Veuillez selectionne une couleur";
                let emplacementError = document.getElementById("firstNameErrorMsg");
                console.log('firstNameErrorMsg', emplacementError);
                emplacementError.innerText = errColor;
            }
            else {
                console.log('la couleur est présente',)

                if (cart?.find(item => item.id === idProductsSelection && item.color === colorProduct && quantityProduct != 0)) {
                    cart = cart.map(item => {
                        if (item.id === idProductsSelection && item.color === colorProduct) {
                            if ((item.quantity + quantityProduct) <= 100) {
                                item.quantity += parseInt(quantityProduct);
                            } else {
                                const errMaxProduct = "pas plus de 100 articles";
                                let emplacementError = document.getElementById("firstNameErrorMsg");
                                console.log('firstNameErrorMsg', emplacementError);
                                item.quantity = 100;
                            }
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
                    console.log('cart', cart);
                }
            }

        }

    });
} else {
    console.log('erreur', 'bouton non détecter');
}






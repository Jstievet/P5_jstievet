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
        const erreur = 'E006';
        error(erreur);
    });

const addToCart = document.getElementById('addToCart');
if (addToCart) {

    addToCart.addEventListener('click', function () {

        let colorProduct = document.getElementById('colors').value;
        let quantityProduct = parseInt(document.getElementById('quantity').value);

        let cart = JSON.parse(localStorage.getItem('products'))
        if (verifQuantity(quantityProduct, idProductsSelection) === true) {
            const erreur = 'E002';
            error(erreur);
        } else {
            if (colorProduct.length === 0) {
                const erreur = 'E003';
                error(erreur);
            }
            else {
                console.log('la couleur est présente',)
                console.log('checkitemexistant', cart?.find(item => item.id === idProductsSelection && item.color === colorProduct && quantityProduct != 0));
                if (cart?.find(item => item.id === idProductsSelection && item.color === colorProduct && quantityProduct != 0)) {
                    cart = cart.map(item => {
                        if (item.id === idProductsSelection && item.color === colorProduct) {
                            if ((item.quantity + quantityProduct) <= 100) {
                                item.quantity += parseInt(quantityProduct);
                            } else {
                                const erreur = 'E004';
                                error(erreur);
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
    const erreur = 'E005';
    error(erreur);

}






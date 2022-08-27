const urlTest = window.location.search;
const urlParams = new URLSearchParams(urlTest);
const idProductsSelection = urlParams.get('id');
//On vérifie si l'id existe dans l'api
const urlApi = "http://localhost:3000/api/products/" + idProductsSelection;
fetchData(urlApi)
    .then(
        function recuperationId(dataResult) {
            //vérification si l'id conteint des caractère spéciaux
            // const specialCaractere = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
            // if (idProductsSelection.search(specialCaractere) = ! -1) {
            //     confirm("l'identifiant du produit n'existe pas");
            // }
            //si idProductsSelection est vide c'est si pas d'id , ou si l'id contient plus ou moins de 32 caractère alors le produit n'existe pas
            if (idProductsSelection === "" || idProductsSelection.length != 32) {
                console.log('Le produit n existe pas');
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
                console.log('urlImgProducts', urlImgProducts);
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
        // Une erreur est survenue
    });

const addToCart = document.getElementById('addToCart');
if (addToCart) {

    addToCart.addEventListener('click', function () {

        let checkColorProducts = document.getElementById('colors').value;
        let checkQuantityProducts = document.getElementById('quantity').value;
        let cart = JSON.parse(localStorage.getItem('products'))
        if (cart?.find(item => item.id === idProductsSelection && item.color === checkColorProducts)) {
            cart = cart.map(item => {
                if (item.id === idProductsSelection && item.color === checkColorProducts) {
                    item.quantity += parseInt(checkQuantityProducts);
                }
                return item;
            })
        } else {
            const productsSelectionne = {
                id: idProductsSelection,
                color: checkColorProducts,
                quantity: parseInt(checkQuantityProducts)
            }
            if (cart) {
                cart.push(productsSelectionne);
            } else {
                cart = [productsSelectionne];
            }
        }

        localStorage.setItem('products', JSON.stringify(cart));
        confirm("le produit est enregistrer");
        console.log('cart', cart);
    });
} else {
    console.log('erreur', 'bouton non détecter');
}







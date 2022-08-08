function recuperationId() {
    //Vérifications du contenu de l'url pour vérifier si elle contient une id
    const urlTest = window.location.search;
    const urlParams = new URLSearchParams(urlTest);
    const idProductsSelection = urlParams.get('id');
    const specialCaractere = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    console.log('id selectionné :', idProductsSelection);
    //si idProductsSelection est vide c'est si pas d'id , ou si l'id contient plus ou moins de 32 caractère alors le produit n'existe pas
    if (idProductsSelection === "" || idProductsSelection.length != 32 || String.idProductsSelection(specialCaractere) == true) {
        console.log('Le produit n existe pas');
    } else if (String.idProductsSelection(specialCaractere) == false) {
        //On vérifie si l'id existe dans l'api
        if (getAllProducts.indexOf(idProductsSelection) === 1) {
            console.log('le produit existe');
            for (i = 0; i < getAllProducts.length; i++) {
                if (getAllProducts[i] == idProductsSelection) {
                    let idValue = i;
                    let priceProducts = allProducts["price"];
                    let colorProducts = allProducts["colors"];
                    let descriptionProducts = allProducts["description"];
                    let altProducts = allProducts["altTxt"];
                    let imageUrlProducts = allProducts["imageUrl"];
                    let nameProducts = allProducts["name"];
                    let emplacementImgProducts = document.getElementsByClassName('item__img');
                    emplacementImgProducts.innerHTML = "<article><img src=" + imageUrlProducts + "alt=" + altProducts + ">";
                    let emplacementNameProducts = document.getElementById('description');
                    emplacementNameProducts.innerText = nameProducts;
                    let emplacementPriceProducts = document.getElementById('price');
                    emplacementPriceProducts.innerText = priceProducts;
                    let emplacementColorProducts = document.getElementById('colors');
                    let optionColors = document.createElement("option");
                    optionColors.setAttribute('value =' + colorProducts[0] + ',' + colorProducts[1] + ',' + colorProducts[2]);
                    emplacementColorProducts.appendChild(optionColors);

                }
            }
        }
        else {
            console.log('L id du produit n est pas reconnue');
        }

    }
}

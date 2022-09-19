
function error(err) {
    if (err === 'E001') {
        confirm("Un soucis est survenue le produit n'as pas été trouve retour à la page produit");
    } else if (err === 'E002') {
        const errQuantity = "La Quantité dois être comprise entre 0 et 100";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = errQuantity;
    } else if (err === 'E003') {
        const errColor = "Aucune Couleur n'as été choisie Veuillez selectionne une couleur";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = errColor;
    } else if (err === 'E004') {
        const errMaxProduct = "pas plus de 100 articles";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = errMaxProduct;
        item.quantity = 100;
    } else if (err === 'E005') {
        const err = "Un Problèmes est survenu dans l'affichage des produits";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = err;
    } else if (err === 'E006') {
        const err = "Un Problèmes est survenu dans l'affichage des produits";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = err;
    }
}
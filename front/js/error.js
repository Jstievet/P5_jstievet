
function error(err) {
    if (err === 'E001') {
        const errUrlProduct = "Un souci est survenu, le produit n'as pas été trouvé";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = errUrlProduct;
    } else if (err === 'E002') {
        const errQuantity = "La Quantité doit être comprise entre 1 et 100";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = errQuantity;
    } else if (err === 'E003') {
        const errColor = "Aucune Couleur n'a été choisie. Veuillez selectionner une couleur";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = errColor;
    } else if (err === 'E004') {
        const errMaxProduct = "la quantité totale de l'article sélectionné ne peut dépasser 100, la quantité maximale à été mise à jour à 100 articles";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = errMaxProduct;
        item.quantity = 100;
    } else if (err === 'E005') {
        const err = "Un Problème est survenu dans l'affichage des produits";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = err;
    } else if (err === 'E006') {
        const err = "Un Problème est survenu dans l'affichage des produits. Veuillez réessayer ultérieurement";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = err;
    } else if (err === 'E007') {
        const err = "une erreur dans le formulaire à empecher la validation de la commande";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = err;
    } else if (err === 'E008') {
        const err = "Votre Prénom ne doit comporter que des lettres";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = err;
    } else if (err === 'E009') {
        const err = "Votre Nom ne doit comporter que des lettres";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = err;
    } else if (err === 'E010') {
        const err = "Le nom de votre ville ne doit comporter que des lettres";
        let emplacementError = document.getElementById("firstNameErrorMsg");
        emplacementError.innerText = err;
    }
}
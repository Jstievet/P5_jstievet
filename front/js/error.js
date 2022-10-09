
function error(err) {
    let errVide = 'Le champs est vide';
    let emplacementError = document.getElementById("ErrorMsg");
    switch (err) {
        case 'E001':
            const errUrlProduct = "Un souci est survenu, le produit n'as pas été trouvé";
            emplacementError.innerText = errUrlProduct;
            break;
        case 'E002':
            const errQuantity = "La Quantité doit être comprise entre 1 et 100";
            emplacementError.innerText = errQuantity;
            break;
        case 'E003':
            const errColor = "Aucune Couleur n'a été choisie. Veuillez selectionner une couleur";
            emplacementError.innerText = errColor;
            break;
        case 'E004':
            const errMaxProduct = "la quantité totale de l'article sélectionné ne peut dépasser 100";
            emplacementError.innerText = errMaxProduct;
            break;
        case 'E005':
            const err = "Un Problème est survenu dans l'affichage des produits";
            emplacementError.innerText = err;
            break;
        case 'E006':
            const errAffichageProducts = "Un Problème est survenu dans l'affichage des produits. Veuillez réessayer ultérieurement";
            emplacementError.innerText = errAffichageProducts;
            break;
        case 'E007':
            const errorForm = "une erreur dans le formulaire à empecher la validation de la commande";
            emplacementError.innerText = errAffichageProducts;
            break;
        case 'E008':
            const errorName = "Votre Prénom ne doit comporter que des lettres sans accent";
            let emplacementErrorName = document.getElementById("firstNameErrorMsg");
            emplacementErrorName.innerText = errorName;
            break;
        case 'E009':
            const errorLastName = "Votre nom ne doit comporter que des lettres sans accent";
            let emplacementErrorLastName = document.getElementById("lastNameErrorMsg");
            emplacementErrorLastName.innerText = errorLastName;
            break;
        case 'E010':
            const errorCity = "Le nom de votre ville ne doit comporter que des lettres sans accent";
            let emplacementErrorCity = document.getElementById("cityErrorMsg");
            emplacementErrorCity.innerText = errorCity;
            break;
        case 'E011':
            let emplacementEmptyName = document.getElementById("firstNameErrorMsg");
            emplacementEmptyName.innerText = errVide;
            break;
        case 'E012':
            let emplacementEmptyLastName = document.getElementById("lastNameErrorMsg");
            emplacementEmptyLastName.innerText = errVide;
            break;
        case 'E013':
            let emplacementEmptyAdress = document.getElementById("addressErrorMsg");
            emplacementEmptyAdress.innerText = errVide;
            break;
        case 'E014':
            let emplacementEmptyCity = document.getElementById("cityErrorMsg");
            emplacementEmptyCity.innerText = errVide;
            break;
        case 'E015':
            let emplacementEmptyMail = document.getElementById("emailErrorMsg");
            emplacementEmptyMail.innerText = errVide;
            break;
        case 'E016':
            const errorEmptyArticle = "Pour votre commande vous devez sélectionner des articles";
            let emplacementEmptyArticle = document.getElementById("ErrorMsg");
            emplacementEmptyArticle.innerText = errorEmptyArticle;
            break;
        case 'E017':
            const errorEmptyMail = "L'adresse mail n'as pas de @";
            let emplacementMailArticle = document.getElementById("emailErrorMsg");
            emplacementMailArticle.innerText = errorEmptyMail;
            break;
        case 'E018':
            const errorFormValidation = "Le formulaire n'est pas remplie correctement";
            let emplacementErrorForm = document.getElementById("ErrorMsg");
            emplacementErrorForm.innerText = errorFormValidation;
            break;
        default:


            break;
    }
}
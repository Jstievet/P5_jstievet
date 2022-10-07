//vérifie si il y a des caractére numérique ou des caractère spéciaux
function verifInputChange(value) {
    const regexVerifNumber = new RegExp("[0-9]");
    const regexVerifSpecial = new RegExp(/\W|_/g);
    let verifName = value.match(regexVerifNumber);
    let verifNameSpecial = value.match(regexVerifSpecial);
    if (verifName != null || verifNameSpecial != null) {
        return false;
    } else {
        return true;
    }
}
//accesValidation valide l'accès au boutton Commander !
function accesValidation(globalError) {
    if (
        globalError.firstName === true &&
        globalError.lastName === true &&
        globalError.city === true
    ) {
        return true;
    } else {
        return false;
    }
}
// gestion du prix total
function total() {
    let tableauLocalQuantity = [];
    let tableauLocalPrice = [];
    let localStorageActualise = JSON.parse(localStorage.getItem("products"));
    localStorageActualise.map((article, index) => {
        tableauLocalQuantity.push(article.quantity);
        const urlProducts = "http://localhost:3000/api/products/" + article.id;
        fetchData(urlProducts)
            .then(function recalculQuantityPrice(dataResult) {
                let price = dataResult["price"];
                let totalPrice = article.quantity * price;
                tableauLocalPrice.push(totalPrice);

                if (index === localStorageActualise.length - 1) {
                    let totalQuantity = tableauLocalQuantity.reduce(
                        (a, b) => a + b
                    );
                    let emplacementTotalQuantity =
                        document.getElementById("totalQuantity");
                    emplacementTotalQuantity.innerText = totalQuantity;
                    let totalPrice = tableauLocalPrice.reduce(
                        (a, b) => a + b,
                        0
                    );
                    let emplacementTotalPrice =
                        document.getElementById("totalPrice");
                    emplacementTotalPrice.innerText = totalPrice;
                }
            })
            .catch(function (err) {
                // Une erreur est survenue
            });
    });
}

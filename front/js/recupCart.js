import cartItem from "./tmpl/cartItem.js";

//au clique sur panier récupéré les données stockées dans localstorage
//vérifier le nombre déléments de local storage pour une boucle for et crée les différentes lignes de produits

//création de la ligne produits
const storageArticles = JSON.parse(localStorage.getItem("products"));
let articles = [];
let recupQuantity = [];
let recupTotalPrice = [];
let buttonSubmitValid = document.getElementById("order");

if (storageArticles === null || storageArticles.length === 0) {
    const err = "E016";
    error(err);
    let hiddenCartPrice = document.getElementById("price_total");
    hiddenCartPrice.setAttribute("hidden", true);
} else {
    storageArticles.forEach((article, idx) => {
        const urlProducts = "http://localhost:3000/api/products/" + article.id;
        fetchData(urlProducts)
            .then(function recuperationById(dataResult) {
                let price = dataResult["price"];
                let name = dataResult["name"];
                let alt = dataResult["altTxt"];
                let imageUrl = dataResult["imageUrl"];
                let articleCartItem = document.createElement("article");
                let totalProductPrice = price * article.quantity;
                articleCartItem.classList.add("cart__item");
                articleCartItem.setAttribute(
                    "data-id",
                    `${article.id}_${article.color}`
                );
                articleCartItem.setAttribute("data-color", article.color);
                articleCartItem.innerHTML = cartItem;
                articleCartItem.querySelector(".cart__item__img__content").src =
                    imageUrl;
                articleCartItem
                    .querySelector(".cart__item__img__content")
                    .setAttribute("alt", alt);
                articleCartItem.querySelector(".cart__item__title").innerText =
                    name;
                articleCartItem.querySelector(".cart__item__color").innerText =
                    article.color;
                articleCartItem.querySelector(".cart__item__price").innerText =
                    price + "€";
                articleCartItem.querySelector(".itemQuantity").value =
                    article.quantity;
                document
                    .querySelector("#cart__items")
                    .appendChild(articleCartItem);
                articleCartItem
                    .querySelector(".itemQuantity")
                    .setAttribute("data-id", `${article.id}_${article.color}`);
                articles.push(dataResult);
                recupQuantity.push(article.quantity);
                recupTotalPrice.push(totalProductPrice);

                //changement de la quantité
                let inputQuantity =
                    articleCartItem.querySelector(".itemQuantity");
                inputQuantity.addEventListener("change", function (e) {
                    let newQuantity = e.target.value;
                    let cartProducts = JSON.parse(
                        localStorage.getItem("products")
                    );
                    let idProductsModifie = article.id;
                    let color = article.color;
                    let newProducts = {
                        id: idProductsModifie,
                        color: color,
                        quantity: parseInt(newQuantity)
                    };

                    for (let i = 0; cartProducts.length > i; i++) {
                        let quantityModified = cartProducts[i];
                        if (idProductsModifie === quantityModified.id) {
                            if (color === quantityModified.color) {
                                cartProducts.splice(i, 1, newProducts);
                                // localStorage.removeItem('products')
                                localStorage.setItem(
                                    "products",
                                    JSON.stringify(cartProducts)
                                );
                            }
                            total();
                        }
                    }
                });
                //buttonDelete permet à l'utilisateur de supprimer la ligne concernée
                let buttonDelete = articleCartItem.querySelector(".deleteItem");
                if (buttonDelete) {
                    buttonDelete.addEventListener("click", function (e) {
                        let cartProducts = JSON.parse(
                            localStorage.getItem("products")
                        );
                        let idProductsModifie = article.id;
                        let color = article.color;

                        for (let i = 0; cartProducts.length > i; i++) {
                            let verifIdColor = cartProducts[i];
                            if (idProductsModifie === verifIdColor.id) {
                                if (color === verifIdColor.color) {
                                    let cuurentElementDelete =
                                        document.querySelectorAll(`[data-id="${article.id}_${article.color}"]`);

                                    cuurentElementDelete[0].setAttribute("hidden", true);
                                    cuurentElementDelete[0].classList.add("cart__item__hidden");
                                    cartProducts.splice(i, 1);
                                    localStorage.removeItem("products");
                                    localStorage.setItem("products", JSON.stringify(cartProducts));

                                    if (cartProducts.length === 0) {
                                        const err = "E016";
                                        error(err);
                                        let hiddenCartPrice = document.getElementById("price_total");
                                        hiddenCartPrice.setAttribute("hidden", true);
                                    }
                                } else {
                                    // pas le bon id
                                }

                            }
                            setTimeout(() => {
                                total();
                            }, 500);
                        }

                    });
                }
                //récuperer la taille du panier lacalsotrage puis l'index de l'occurence
                if (storageArticles.length === idx + 1) {
                    total();
                }
            })
            .catch(function (err) {
                // Une erreur est survenue
            });
    });
    //on vérifie ici les regex sur l'événement change pour le nom

    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const cityInput = document.getElementById("city");
    const adressInput = document.getElementById("address");
    const mailInput = document.getElementById("email");
    buttonSubmitValid.style.opacity = "0.3";
    let globalError = {
        firstName: null,
        lastName: null,
        city: null,
        adress: null,
        mail: null
    };
    //ici on vérifie le prénom
    firstNameInput.addEventListener("change", function (e) {
        const value = e.target.value;
        verifInputChange(value);
        if (value === "") {
            let err = "E011"
            error(err);
        } else if (verifInputChange(value) === false) {
            let err = "E008";
            error(err);
            globalError.firstName = null;
            let buttonSubmitValid = document.getElementById("order");
            buttonSubmitValid.style.opacity = "0.3";
        } else {
            let emptyError = "";
            let emplacementNoError =
                document.getElementById("firstNameErrorMsg");
            emplacementNoError.innerHTML = emptyError;
            globalError.firstName = true;
        }
        accesValidation(globalError);
        if (accesValidation(globalError) === true) {
            buttonSubmitValid.style.opacity = "1";
        }
    });
    //vérification au changement pour le nom
    lastNameInput.addEventListener("change", function (e) {
        const value = e.target.value;
        verifInputChange(value);
        if (value === "") {
            let err = "E012"
            error(err);
        } else if (verifInputChange(value) === false) {
            let err = "E009";
            error(err);
            globalError.lastName = null;
            let buttonSubmitValid = document.getElementById("order");
            buttonSubmitValid.style.opacity = "0.3";
        } else {
            let emptyError = "";
            let emplacementNoError =
                document.getElementById("lastNameErrorMsg");
            emplacementNoError.innerHTML = emptyError;
            globalError.lastName = true;
        }
        accesValidation(globalError);
        if (accesValidation(globalError) === true) {
            buttonSubmitValid.style.opacity = "1";
        }
    });
    //vérification au changement pour la ville
    cityInput.addEventListener("change", function (e) {
        const value = e.target.value;
        const regexVerifSpecial = new RegExp("[@!*$_]");
        let verifCitySpecial = value.match(regexVerifSpecial);

        if (verifCitySpecial != null) {
            let err = "E010";
            error(err);
            globalError.city = null;
            let buttonSubmitValid = document.getElementById("order");
            buttonSubmitValid.style.opacity = "0.3";
        } else if (value === "") {
            let err = "E014";
            error(err);
            globalError.city = null;
            let buttonSubmitValid = document.getElementById("order");
            buttonSubmitValid.style.opacity = "0.3";
        } else {
            let emptyError = "";
            let emplacementNoError = document.getElementById("cityErrorMsg");
            emplacementNoError.innerHTML = emptyError;
            globalError.city = true;
        }
        accesValidation(globalError);
        if (accesValidation(globalError) === true) {
            buttonSubmitValid.style.opacity = "1";
        }
    });
    //verification adresse 
    adressInput.addEventListener("change", function (e) {
        const value = e.target.value;
        const regexVerifSpecial = new RegExp("[@!*$]");
        let verifAdressSpecial = value.match(regexVerifSpecial);
        if (value === "") {
            let err = "E013"
            error(err);
        } else if (verifAdressSpecial != null) {
            let err = "E019";
            error(err);
            globalError.city = null;
            let buttonSubmitValid = document.getElementById("order");
            buttonSubmitValid.style.opacity = "0.3";
        } else if (value === "") {
            let err = "E013";
            error(err);
            globalError.adress = null;
            let buttonSubmitValid = document.getElementById("order");
            buttonSubmitValid.style.opacity = "0.3";
        } else {

            let emptyError = "";
            let emplacementNoError =
                document.getElementById("addressErrorMsg");
            emplacementNoError.innerHTML = emptyError;
            globalError.adress = true;
            buttonSubmitValid.style.opacity = "1";

        }
        accesValidation(globalError);
        if (accesValidation(globalError) === true) {
            buttonSubmitValid.style.opacity = "1";
        }
    })
    //verification mail 
    mailInput.addEventListener("change", function (e) {
        const value = e.target.value;
        const regexVerifSpecial = new RegExp(/[@_]/);
        let verifMailSpecial = value.match(regexVerifSpecial);
        if (value === "") {
            let err = "E015"
            error(err);
        } else if (verifMailSpecial === null) {
            let err = "E017";
            error(err);
            globalError.mail = null;
            let buttonSubmitValid = document.getElementById("order");
            buttonSubmitValid.style.opacity = "0.3";
        }
        else if (value === "") {
            let err = "E015";
            error(err);
            globalError.mail = null;
        } else {
            let emptyError = "";
            let emplacementNoError =
                document.getElementById("emailErrorMsg");
            emplacementNoError.innerHTML = emptyError;
            globalError.mail = true;
        }
        accesValidation(globalError);
        if (accesValidation(globalError) === true) {

            buttonSubmitValid.style.opacity = "1";
        }
    });
    // on gére la validation de la commande en vérifiant les informations entre puis en intégrant au local storage un objet contact



    const buttonSubmit = document.getElementById("order");

    buttonSubmit.addEventListener("click", function (e) {
        let idProducts = [];
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let address = document.getElementById("address").value;
        let city = document.getElementById("city").value;
        let mail = document.getElementById("email").value;
        const localProducts = JSON.parse(localStorage.getItem("products"));
        let idProductForOrder = [];

        if (localProducts.length === 0) {
            const err = "E016";
            error(err);
        } else if (globalError.firstName && globalError.lastName && globalError.city && globalError.adress && globalError.mail) {
            // Push Product ID in idProductForOrder

            localProducts.forEach((product) => {
                idProductForOrder.push(product.id);
            });
            let bodyData = {
                contact: {
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    city: city,
                    email: mail
                },
                products: idProductForOrder
            };
            const optionsPost = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyData)
            };

            //requete POST pour envoyer l'objet contact
            fetch("http://localhost:3000/api/products/order", optionsPost)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // function pageConfirmation(data) {
                    let orderId = data.orderId;
                    const idPageConfirmation =
                        "http://127.0.0.1:5500/front/html/confirmation.html?id=" +
                        orderId;
                    window.location.href = idPageConfirmation;
                })
                .catch(function (err) {

                });
        } else {
            // e.preventDefault();
            const err = "E018";
            error(err);
        }
    });
}
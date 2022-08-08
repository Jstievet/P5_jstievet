//requètes GET et récupération sous format JSON des résultats
fetch("http://localhost:3000/api/products").then(function (reponse) {
  if (reponse.ok) {
    return reponse.json();
  }
})
  .then(
    function (getAllProducts) {
      // getAllProducts = parametreUrl
      let numberOfProducts = getAllProducts.length;
      console.log("toutes les valeurs de la requète GET", getAllProducts);
      for (let i = 0; i < numberOfProducts; i++) {
        let allProducts = getAllProducts[i];
        let colorProducts = allProducts["colors"];
        let nameProducts = allProducts["name"];
        let priceProducts = allProducts["price"];
        let descriptionProducts = allProducts["description"];
        let imageUrlProducts = allProducts["imageUrl"];
        let idProducts = allProducts["_id"];
        let altProducts = allProducts["altTxt"];
        //on définie ou l'on dois ajouter le code et la balise à ajouter est <a href="lien + id des produits associés">
        let emplacement = document.getElementById('items');
        let card = document.createElement("a");
        card.setAttribute('href', "./product.html?id=" + idProducts);
        emplacement.appendChild(card);
        card.innerHTML = "<article><img src=" + imageUrlProducts + " alt =" + altProducts + "><h3 class='productName'>" + nameProducts + "</h3><p class='productDescription'>" + descriptionProducts + "</p></article>";

      };

    })
  .catch(function (err) {
    // Une erreur est survenue
  });


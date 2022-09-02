//requètes GET et récupération sous format JSON des résultats
fetchData("http://localhost:3000/api/products")
  .then(
    function (resultatFetchData) {
      let numberOfProducts = resultatFetchData.length;
      console.log("toutes les valeurs de la requète GET", resultatFetchData);
      for (let i = 0; i < numberOfProducts; i++) {
        console.log("requète GET", resultatFetchData[i]);
        let allProducts = resultatFetchData[i];
        let nameProducts = allProducts["name"];
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

  });
function verifQuantity(checkQuantityProducts) {

  if (checkQuantityProducts === 0 || checkQuantityProducts >= 100) {
    return true;
  }
  else {
    return false;
  }
}


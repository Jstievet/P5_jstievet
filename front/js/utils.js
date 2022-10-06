//requètes GET et récupération sous format JSON des résultats
fetchData("http://localhost:3000/api/products")
  .then(
    function (products) {
      for (let product of products) {
        let link = document.createElement('a');
        link.href = `./product.html?id=${product._id}`;
        link.innerHTML = `<article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>`;
        document.getElementById('items').appendChild(link);
      }
    }
  )
  .catch(function (err) {
    // error('E005');
  });
function verifQuantity(checkQuantityProducts) {

  if (checkQuantityProducts === 0 || checkQuantityProducts >= 101) {
    return true;
  }
  else {
    return false;
  }
}


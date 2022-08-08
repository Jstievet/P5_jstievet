function urlContent(urlApi) {
    let urlApi = "http://localhost:3000/api/products";
    const urlTest = window.location.search;
    console.log('Url', urlTest);
    if (urlTest === '') {
        fetch(urlApi)
            .then(function (urlApi) {
                if (urlApi.ok) {
                    return urlApi.json();
                }
            })


    } else if (urlTest = ! '') {
        console.log('test de id present', urlTest)
    }
}
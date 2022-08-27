async function fetchData(urlApi) {
    try {
        let data = await fetch(urlApi)
        if (data.ok) {
            let result = await data.json();
            return result;
        }
        else {
            throw new Error('no data');
        }

    }
    catch (err) {
        console.log(err.message);
    }

}
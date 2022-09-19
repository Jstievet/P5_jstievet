//on récupére l'id qui a été passer en paramétres 
const urlTest = window.location.search;
const urlParams = new URLSearchParams(urlTest);
const idCommandFinal = urlParams.get('id');

//on affiche dans le html le numéro de commande

if (idCommandFinal === '') {
    console.log('erreur sur la presence du numero de commande');
} else {



    if (idCommandFinal) {
        const emplacementIdCommand = document.getElementById('orderId');
        emplacementIdCommand.innerText = idCommandFinal;
        localStorage.clear();
    }


}





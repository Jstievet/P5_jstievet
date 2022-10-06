//on récupére l'id qui a été passer en paramétres 
const urlTest = window.location.search;
const urlParams = new URLSearchParams(urlTest);
const idCommandFinal = urlParams.get('id');

//on affiche dans le html le numéro de commande

if (idCommandFinal === '') {
    err === 'E007';
    error(err);
} else {
    if (idCommandFinal) {
        const emplacementIdCommand = document.getElementById('orderId');
        emplacementIdCommand.innerText = idCommandFinal;
        localStorage.clear();
    }


}





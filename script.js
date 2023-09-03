//Definition des variables globales et constante
const xhr = new XMLHttpRequest();

let TauxUSD;
let TauxEUR;
let TauxGBP;

let SymboleEUR;
let SymboleUSD;
let SymboleGBP;

/**
 * Appel à l'API
 * peuple les variable globale
 */
function requete() {
    // Configurez la requête GET avec l'URL de l'API
    xhr.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json", true);

// Définissez une fonction de rappel pour gérer la réponse de l'API
    xhr.onload = function () {
        // Vérifiez si la réponse est OK (code de statut HTTP 200)
        if (xhr.status === 200) {
            // Parser la réponse JSON
            let response = JSON.parse(xhr.responseText);

            // Remplir les variables globales
            TauxUSD = response.bpi.USD.rate;
            TauxEUR = response.bpi.EUR.rate;
            TauxGBP = response.bpi.GBP.rate;

            SymboleUSD = response.bpi.USD.symbol;
            SymboleEUR = response.bpi.EUR.symbol;
            SymboleGBP = response.bpi.GBP.symbol;

            // On affiche les valeurs
            afficherDevise();

        } else {
            // Gérez les erreurs ici
            console.error("Erreur lors de la requête : " + xhr.status);
        }
    };

    // Gérez les erreurs réseau
    xhr.onerror = function () {
        console.error("Erreur réseau lors de la requête.");
    };

    // Envoyez la requête GET
    xhr.send();
}


/**
* Récupérer le contenu de l'option
 * injecte données au DOM
* */
function afficherDevise() {
    // recuperer la valeur du select par l'id
    let selectElement = document.getElementById("form-select");

    // récupérer la valeur du select
    let selectedValue = selectElement.value;

    // récupérer les span à remplir
    let devise = document.getElementById('devise');
    let taux = document.getElementById('taux');

    // en fonction de la valeur du select
    switch (selectedValue) {
        case "EUR":
            devise.innerHTML = SymboleEUR;
            taux.innerHTML = TauxEUR;
            break;
        case "GBP":
            devise.innerHTML = SymboleGBP;
            taux.innerHTML = TauxGBP;
            break;
        case "USD":
            devise.innerHTML = SymboleUSD;
            taux.innerHTML = TauxUSD;
            break;
    }
}
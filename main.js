let liste = document.querySelector(".liste");

function requette(settings) {
    fetch(settings.url || "").then(reponse => {
        if (reponse.ok) {
            return reponse.json();
        }
    }).then(result => {
        settings.callback && settings.callback(result);
    });
}

requette(settings = {
    url: "formClient.json",
    callback: (result) => {
        console.log(result);
        let i = 0;
        result.client.forEach(item => {
            let option = document.createElement("option");
            option.textContent = item.affiche;
            option.addEventListener("click", displayInfo);
            option.value = i;
            i++;
            liste.appendChild(option);
        });
    }
});

function displayInfo() {
    requette(settings = {
        url: "formClient.json",
        callback: (result) => {
            document.querySelector(".infos h2").textContent = result.client[liste.value].nom + " " + result.client[liste.value].prenom;
            document.querySelector(".infos p").textContent = result.client[liste.value].âge + " " + result.client[liste.value].profession + " " + result.client[liste.value].email + " " + result.client[liste.value].telephone;
        }
    });
}
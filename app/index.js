let btnCommencer = document.querySelector('#btnCommencer');
let btnSelect = document.querySelector('.bodyButton');
let btnHelp = document.querySelector('.btnHelp');
let btnCloseModal = document.querySelector('.btnClose')
let cpt = 2;
let signal = document.querySelector('.Signal')

btnSelect.addEventListener('click', () => {
    let nbr = document.querySelector('.nbrJ');
    let row = document.querySelector('.two');
    let txtPlayerUn = document.querySelector('.textPlayerUn');
    let btn = document.querySelector('.buttonNum');
    cpt++

    if (cpt % 2 !== 0) {
        row.style.transform = "scale(0,0)";
        txtPlayerUn.textContent = "Nom du joueur :";
        nbr.textContent = "1";
        btn.classList.add('buttonNumValide');


    } else {
        row.style.transform = "scale(1,1)";
        txtPlayerUn.textContent = "Nom du premier joueur :";
        nbr.textContent = "2";
        btn.classList.remove('buttonNumValide');
    }
})

function verification(player) {
    let valide

    if (player == "") {
        signal.textContent = "Veuillez entrée un nom valide !"
        valide = false
    } else {
        if(player.length < 3 || player.length > 10){
            signal.textContent = "Le nom doit comporté 3 à 10 caractéres."
            valide = false
        }else{
            signal.textContent = ""
            valide = true
        }
    }
    return valide
}

btnCommencer.addEventListener('click', () => {
    cpt = cpt % 2;
    let playerUn = document.querySelector('#namePlayerUn').value
    let playerDeux = document.querySelector('#namePlayerDeux').value
    // deux joueurs
    if (cpt === 0) {
        if(verification(playerUn) && verification(playerDeux)){
            playerUn = new Joueur(playerUn);
            playerDeux = new Joueur(playerDeux);
            gameStart(2, playerUn, playerDeux,0);
        }
    }
    // Un joueur
    else {
        if(verification(playerUn)){
            // playerUn = new Joueur(playerUn);
            // gameStart(1, playerUn, playerUn,0);
            signal.textContent = 'En cour de programmation <-<';
        }
    }
}
)

btnHelp.addEventListener('click',()=>{
    let modal = document.querySelector('.modalHelp');
    modal.style.transform = "scale(1,1)";
})
btnCloseModal.addEventListener('click',()=>{
    let closeModal = document.querySelector('.modalHelp');
    closeModal.style.transform = "scale(0,1)";
})





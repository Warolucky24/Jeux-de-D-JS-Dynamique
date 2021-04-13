let cube = document.querySelector(".cube");
let roll = document.querySelector("#roll");
let hold = document.querySelector("#globalAdd");
let tour = 0;
let nameJ1 = document.querySelector("#nameJoueurUn");
let nameJ2 = document.querySelector("#nameJoueurDeux");
let player1 = "";
let player2 = "";
let nameFace = faceCube(1);
cube.classList.add(nameFace);
let pointMax = 0;



function gameStart(nbrJoueur, j1, j2, restart) {

  do {
    pointMax = prompt("Nombre de point max ? (50 à 400)");

  } while (pointMax < 50 || pointMax > 400 || isNaN(pointMax));

  if (restart === 0) {


    let pageGame = document.querySelector("#game");
    pageGame.style.transform = "scale(1,1)";


    if (nbrJoueur === 2) {
      nameJ2.textContent = j2.name;
    } else {
      j2 = new Joueur('BOT');
      nameJ2.textContent = j2.name;
      console.log(j2)
    }

    nameJ1.textContent = j1.name;
    tour = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    player1 = j1;
    player2 = j2;
    affichageName()
  } else {
    player1.point_round = 0
    player1.point_global = 0
    player2.point_round = 0
    player2.point_global = 0
    let file = document.querySelector('#file');
    file.innerHTML = ""
  }
  affichage()
}

roll.addEventListener("click", () => {
  if (tour % 2 === 0) {
    rollP(player2);
  } else {
    rollP(player1);
  }
  affichageName()
});


function rollP(player) {
  let nbr = aleatoire(); //je tire une face du cube aléatoirement
  let pointTotal = player.point_global + player.point_round + nbr;

  if (pointTotal >= (pointMax * 0.9)) {
    
    let file = document.querySelector('#file');
    let newDiv = document.createElement('div');

    newDiv.innerHTML = `<p> Attention ! ${player.name} ce rapporche dangereusement de l'objectif !`
    file.appendChild(newDiv);
  }

  if (nbr == 1) { // Si c'est 1 hors jeux --> passe au suivant
    cube.classList.remove(nameFace);
    nameFace = faceCube(nbr);
    cube.classList.add(faceCube(nbr));
    tour++;
    player.point_round = 0;
    suivi(player, 0, 0, 0, 0)
  } else {

    cube.classList.remove(nameFace);
    nameFace = faceCube(nbr);
    cube.classList.add(faceCube(nbr));
    player.point_round = player.point_round + nbr;
    suivi(player, nbr, player.point_round, 1, 0)
    if (pointTotal >= pointMax) {
      winner(player)
    }
  }
  affichage(); //affichage actualise l'affiche des points
}

function affichage() {
  let globalj1 = document.querySelector("#pointGlobalUn");
  let roundj1 = document.querySelector("#pointRoundUn");
  let globalj2 = document.querySelector("#pointGlobalDeux");
  let roundj2 = document.querySelector("#pointRoundDeux");


  globalj1.textContent = player1.point_global;
  roundj1.textContent = player1.point_round;
  globalj2.textContent = player2.point_global;
  roundj2.textContent = player2.point_round;
}

function affichageName() {
  if (tour % 2 === 0) {
    nameJ1.style.fontWeight = "normal";
    nameJ1.style.color = "rgba(0,0,0,0.7)";
    nameJ1.style.fontSize = "1em";
    nameJ1.style.textShadow = "0px 0px 7px rgba(150, 150, 150, 1)"

    nameJ2.style.fontSize = "1.4em";
    nameJ2.style.fontWeight = "bold";
    nameJ2.style.textShadow = " 3px -5px 7px rgba(150, 150, 150, 1)"
    nameJ2.style.color = "rgba(0,0,0,1)";

  } else {
    nameJ1.style.fontWeight = "bold";
    nameJ1.style.fontSize = "1.4em";
    nameJ1.style.textShadow = " 3px -5px 7px rgba(150, 150, 150, 1)"
    nameJ1.style.color = "rgba(0,0,0,1)";

    nameJ2.style.fontSize = "1em";
    nameJ2.style.fontWeight = "normal";
    nameJ2.style.textShadow = "0px 0px 7px rgba(150, 150, 150, 1)"
    nameJ2.style.color = "rgba(0,0,0,0.7)";

  }

}

function winner(player) {
  let boxMsg = document.querySelector("#messageEnd");
  let msg = document.querySelector(".message");
  boxMsg.style.transform = "scale(1,1)";
  msg.textContent = `Bravo ${player.name} , tu as gagné !`
}

hold.addEventListener('click', () => {
  if (tour % 2 === 0) {
    tourFin(player2)
  } else {
    tourFin(player1)
  }
  affichageName()
})

function suivi(player, nbrajout, nbrtotal, nul, ajout) {
  let file = document.querySelector('#file');
  let newDiv = document.createElement('div');
  if (nul === 1) {
    if (ajout === 1) {
      if (tour % 2 === 0) {
        newDiv.innerHTML = `<p>Oh non d'une laine, ${player.name} ajoute ${nbrtotal} à ces points globaux.</p><p>Fin du tour de ${player.name}.</p>`
      } else {
        newDiv.innerHTML = `<p>Oh non d'une plume, ${player.name} ajoute ${nbrtotal} à ces points globaux.</p><p>Fin du tour de ${player.name}.</p>`
      }
    } else {
      newDiv.innerHTML = `${player.name} ajoute ${nbrajout} au point round.`
    }
  } else {
    newDiv.innerHTML = `<p>${player.name} doit passé sont tour !</p><p>${player.name} reviendra plus tard.</p>`

  }
  file.appendChild(newDiv);
}

function tourFin(player) {
  player.point_global = player.point_global + player.point_round;
  suivi(player, player.point_round, player.point_round, 1, 1)
  player.point_round = 0
  tour++;
  affichage()
}

function aleatoire() {
  return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

function faceCube(nbr) {
  let faceCube = "";
  switch (nbr) {
    case 1:
      faceCube = "un";
      break;
    case 2:
      faceCube = "deux";
      break;
    case 3:
      faceCube = "trois";
      break;
    case 4:
      faceCube = "quatre";
      break;
    case 5:
      faceCube = "cinq";
      break;
    case 6:
      faceCube = "six";
      break;
    default:
      faceCube = "error";
      break;
  }
  return "show-" + faceCube;
}

let btnRestart = document.querySelector('.btnRestart')


btnRestart.addEventListener("click", () => restart())

function restart() {
  let boxMsg = document.querySelector("#messageEnd");
  boxMsg.style.transform = "scale(0,1)";
  gameStart(2, player1, player2, 1)
}
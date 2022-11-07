const FRONT ="card_front" // Classe dos elementos
const BACK ="card_back"   // Classe dos elementos
const CARD = 'card'
const ICON = 'icon'

let techs = ['bootstrap',          //Arrays das tecnologias // tecnologias que temos no jogo
'css',
'electron',
'firebase',
'html',
'javasript',
'jquery',
'mongo',
'node',
'react'];


// criar cartas 

let cards = null;

startGame();

function startGame(){
 cards = createCardsFromTechs(techs)
 shuffleCards(cards);

 inializeCards(cards);
}

// PEGAR modelo das cartas e transformar em algo visual

function inializeCards(cards){
   let gameBoard = document.getElementById("gameBoard");
   console.log(gameBoard)

   cards.forEach(card=>{

      let cardElement  = document.createElement('div');
      cardElement.id = card.id;
      cardElement.classList.add(CARD);
      cardElement.dataset.icon = card.icon

      createCardContent(card,cardElement)

      cardElement.addEventListener('click',flipCard)

      gameBoard.appendChild(cardElement);
   })
}

function createCardContent(card, cardElement){
   createCardFace(FRONT, card, cardElement)
   createCardFace(BACK, card, cardElement)

}

function createCardFace(face, card, element){

   let cardElementFace = document.createElement('div')
   cardElementFace.classList.add(face);

   if(face===FRONT){
      let iconElement = document.createElement('img');
      iconElement.classList.add(ICON)
      iconElement.src = "./images//" + card.icon + ".png";
      cardElementFace.appendChild(iconElement);

   }else{cardElementFace.innerHTML =  "&lt/&gt";
 }
 element.appendChild(cardElementFace);
}

//embaralhar cartas

function shuffleCards(cards){
let currentIndex = cards.length;
let randomIndex = 0;

while(currentIndex !== 0) {

   randomIndex = Math.floor(Math.random() * currentIndex);
   currentIndex --;

   [cards[randomIndex],cards[currentIndex]] = [cards[currentIndex],cards[randomIndex]]     // Trocando as cartas de lugar
}
}

// CRIAÇÃO DE CARTAS IGUAIS COM ID'S DIFERENTES / PAR DE CARTAS
function createCardsFromTechs(techs){ 

   let cards= [];

   techs.forEach((tech) =>{                   // PEGOU CADA TECNOLOGIA DO ARRAY // fez o looping
      cards.push(createPairFromTech(tech));  // PUXOU UM PAR PARA CADA FIGURA
   })
   console.log(cards.flatMap(pair => pair)); // SEPARAR O PAR / AO INVES DE 10 PARES, TER 20 CARTAS
}

// CRIAR PAR PARA CADA TECNOLOGIA
function createPairFromTech(tech){  
   return[{
      id:createIdWithTech(tech), // CRIOU VALOR RANDOMICO
      icon: tech,                // PEGOU ICONE DA TECNOLOGIA
      flipped:false,               // VERIFICAR SE A CARTA ESTÁ VIRADA 
   },{
       id:createIdWithTech(tech),
      icon: tech,
      flipped:false,
   }]
}

//CRIANDO O ID
function createIdWithTech(tech){      
   return tech + parseInt(Math.random()*1000); //TRANSFORMOU EM NUMERO INTEIRO MULTIPLICOU POR 1000
}

function flipCard(){

   this.classList.add("flip");

}
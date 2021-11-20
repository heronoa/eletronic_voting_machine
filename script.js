// Defining our global variables
votes = [];
// Interface Control Variables
let yourVoteFor = document.querySelector('.yvf span'),
role = document.querySelector('.role span'),
descrption = document.querySelector('.candidate--info'),
instructions = document.querySelector('.instructions'),
aside = document.querySelector('.on-screen--right'),
numbers = document.querySelector('.n-selected');

// Environment Control Variables
let currentStage = 0,
number = '',
blankVote = false;

// Defining our function
// Interface Control Function
function clicou(n) {
    let elNumber = document.querySelector('.number.flashing');
    if(elNumber !== null) {
        elNumber.innerHTML = n;
        number=`${number}${n}`;

        elNumber.classList.remove('flashing');
        if(elNumber.nextElementSibling !== null) {
            elNumber.nextElementSibling.classList.add('flashing');
        } else {
            refreshInterface();
        }
        
    }
}
function blank() {
    if(number === '') {
        blankVote = true;
        yourVoteFor.style.display = 'block';
        instructions.style.display = 'block';
        numbers = '';
        descrption.innerHTML = '<div class="warning flashing">VOTO NULO</div>'
    }
}
function confirm() {
    let stage = etapas[currentStage];
    if (blankVote === true) {
        voteConfirm = true;
        votes.push({
            etapa: etapas[currentStage].titulo,
            voto: 'branco'
        })
    } else if (number.length === stage.numeros) {
        voteConfirm = true;
        votes.push({
            etapa: etapas[currentStage].titulo,
            voto: number
        })
    }

    if(voteConfirm) {
        currentStage++;
        if(etapas[currentStage] !== undefined) {
            startStage();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="warningG flashing">FIM</div>';  
            console.log(votes)
        }
    }
}

// Environment Control Variables
function startStage() {
    let stage = etapas[currentStage];
    let numberHTML = '';
    number = '';
    blankVote = false;
    for(let i = 0; i < stage.numeros; i++) {
        if(i === 0) {
            numberHTML += '<div class="number flashing"></div>'
        } else {
            numberHTML += '<div class="number"></div>'
        }
        
        
    }

    yourVoteFor.style.display = 'none';
    role.innerHTML = stage.titulo;
    descrption.innerHTML = '';
    instructions.style.display = 'none';
    aside.innerHTML = '';
    numbers.innerHTML = numberHTML; 

}

function refreshInterface() {
    let stage = etapas[currentStage];
    let candidate = stage.candidatos.filter((item)=>{
        if(item.numero === number) {
            return true;
        } else {
            return false;
        }
    });
    if (candidate.length > 0) {
        candidate = candidate[0];
        yourVoteFor.style.display = 'block';
        instructions.style.display = 'block';
        descrption.innerHTML = `Nome: ${candidate.nome}<br/>Partido: ${candidate.partido} `;

        let photosHTML = '';
        for(let i in candidate.fotos) {
            if(i == 0){
                photosHTML += `<div class="candidate--image"><img src="images/${candidate.fotos[i].url}" alt="Thats is your selected candidate">${candidate.fotos[i].legenda}</div>`
            } else if (i == 1) {
                photosHTML += `<div class="vice--image"><img src="images/${candidate.fotos[i].url}" alt="Thats is your selected vice candidate">${candidate.fotos[i].legenda}</div>`
            }
        }

        aside.innerHTML = photosHTML;

    } else {
        yourVoteFor.style.display = 'block';
        instructions.style.display = 'block';
        descrption.innerHTML = '<div class="warning flashing">VOTO NULO</div>'
    }
    console.log('Candidato', candidate);
}

// Executing function
// First Function
startStage();
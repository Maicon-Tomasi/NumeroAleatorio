const elementoChute = document.getElementById('chute')

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'pt-Br';
recognition.start();

recognition.addEventListener('result', onSpeak);

function onSpeak(e){
    chute = e.results[0][0].transcript;

    exibeChuteNaTela(chute);
    verificaValorValido(chute);
}

function exibeChuteNaTela(chute) {
    elementoChute.innerHTML = `
        <div>Você disse</div>
        <span class="box">${chute}</span>
    `   
    //<div>O número secreto é maior <i class="fa-solid fa-up-long"></i></div>
}

recognition.addEventListener('end', () => recognition.start())


function verificaValorValido(chute){
    const numero = +chute;

    if(chuteInvalido(numero)){
        if (chute.toUpperCase() === "GAME OVER") {
            document.body.style.backgroundColor = 'red';
            document.body.innerHTML = `
            <h2> Que pena não foi dessa vez!</h2>
            <h3> O número secreto era ${numeroSecreto} </h3>
            <button id="joga-novamente" class="btn-jogar">Jogar Novamente</button>`;
        } else {

            elementoChute.innerHTML += '<div>Valor Inválido</div>';
        }
    }

    if(numeroPermitido(numero)){
        elementoChute.innerHTML += `<div> O número é inválido, ele precisa estar entre ${menorValor} e ${maiorValor} </div>`;
        return
    }


    if(numero === numeroSecreto){
        document.body.innerHTML = `
        <h2> Parabéns Você Acertou!</h2>
        <h3> O número secreto era ${numeroSecreto} </h3>
        <button id="joga-novamente" class="btn-jogar">Jogar Novamente</button>`;
    }else if (numero > numeroSecreto){
        elementoChute.innerHTML += `<div>O número secreto é menor <i class="fa-solid fa-down-long"></i> <br> Diga Game over para desistir</div>`
    } else{
         elementoChute.innerHTML += `<div>O número secreto é maior <i class="fa-solid fa-up-long"></i> <br> Diga Game over para desistir</div>`
    }
    

}

function chuteInvalido(numero){
    return Number.isNaN(numero)
}

function numeroPermitido(numero){
    return numero > maiorValor || numero < menorValor
}

document.body.addEventListener('click', e => {
    if(e.target.id == 'joga-novamente'){
        window.location.reload()
    }
})



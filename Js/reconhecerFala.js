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
        elementoChute.innerHTML += '<div> Valor inválido </div>';
        return
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
        elementoChute.innerHTML += `<div>O número secreto é menor <i class="fa-solid fa-down-long"></i></div>`
    } else{
         elementoChute.innerHTML += `<div>O número secreto é maior <i class="fa-solid fa-up-long"></i></div>`
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



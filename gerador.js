const displayNum = document.querySelector('.numero');
let qtdCaracteres = 12;

const letrasAltas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasBaixas = 'abcdefghijklmnopqrstuvwxyz';
const digitos = '0123456789';
const sinais = '!@%*?';

const botoes = document.querySelectorAll('.btn-ajuste');
const saida = document.querySelector('#campo');
const caixas = document.querySelectorAll('.chk');
const nivel = document.querySelector('.indicador');

botoes[0].onclick = () => {
    if (qtdCaracteres > 1) qtdCaracteres--;
    displayNum.textContent = qtdCaracteres;
    construirSenha();
};

botoes[1].onclick = () => {
    if (qtdCaracteres < 20) qtdCaracteres++;
    displayNum.textContent = qtdCaracteres;
    construirSenha();
};

caixas.forEach(c => c.addEventListener('click', construirSenha));

construirSenha();

function construirSenha() {
    let base = '';
    if (caixas[0].checked) base += letrasAltas;
    if (caixas[1].checked) base += letrasBaixas;
    if (caixas[2].checked) base += digitos;
    if (caixas[3].checked) base += sinais;

    let resultado = '';
    for (let i = 0; i < qtdCaracteres; i++) {
        const indice = Math.floor(Math.random() * base.length);
        resultado += base[indice];
    }

    saida.value = resultado;
    avaliarSeguranca(base.length);
}

function avaliarSeguranca(tamBase) {
    const bits = qtdCaracteres * Math.log2(tamBase);
    console.log(bits);
    nivel.classList.remove('fraca', 'media', 'forte');

    if (bits > 57) nivel.classList.add('forte');
    else if (bits > 35) nivel.classList.add('media');
    else nivel.classList.add('fraca');

    const texto = document.querySelector('.info-seguranca');
    const dias = Math.floor(2 ** bits / (100e6 * 60 * 60 * 24));
    texto.textContent = `Tempo estimado para descobrir: ${dias} dias.`;
}

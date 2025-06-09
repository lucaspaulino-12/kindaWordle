let palavras = [];
let palavraSecreta = "";

let linhaAtual = 0;
let colunaAtual = 0;

const tabela = document.querySelector("table");
const linhas = tabela.rows;
const botoes = document.querySelectorAll('#keyboard button');

// Carregar palavras do JSON
fetch('palavras_5_letras.json')
  .then(response => response.json())
  .then(data => {
    palavras = data.palavras;
    iniciarJogo();
  })
  .catch(error => console.error('Erro ao carregar JSON:', error));

// Iniciar o jogo com palavra secreta aleatória
function iniciarJogo() {
  palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
  console.log("Palavra secreta:", palavraSecreta); // Só para testes
}

// Escrever letra na célula atual
function escreverLetra(letra) {
  if (colunaAtual < 5 && linhaAtual < 6) {
    linhas[linhaAtual].cells[colunaAtual].textContent = letra.toUpperCase();
    colunaAtual++;
  }
}

// Apagar última letra da linha atual
function apagarLetra() {
  if (colunaAtual > 0) {
    colunaAtual--;
    linhas[linhaAtual].cells[colunaAtual].textContent = "";
  }
}

// Verificar se a palavra é válida e comparar com a secreta
function verificarPalavra() {
  let palavraTentada = "";
  for (let i = 0; i < 5; i++) {
    palavraTentada += linhas[linhaAtual].cells[i].textContent.toLowerCase();
  }

  if (!palavras.includes(palavraTentada)) {
    alert("Palavra inválida!");
    return;
  }

  for (let i = 0; i < 5; i++) {
    const letra = palavraTentada[i];
    const celula = linhas[linhaAtual].cells[i];

    if (letra === palavraSecreta[i]) {
      celula.style.backgroundColor = "#538d4e"; // Verde
      celula.style.border = "#538d4e"
      celula.style.color = "#ffffff"
    } else if (palavraSecreta.includes(letra)) {
      celula.style.backgroundColor = "#b59f3b"; // Amarelo
    } else {
      celula.style.backgroundColor = "#aaaaaa"; // Cinza
    }
  }

  if (palavraTentada === palavraSecreta) {
    setTimeout(() => alert("Parabéns! Acertaste!"), 100);
    bloquearInput();
  } else if (linhaAtual === 5) {
    setTimeout(() => alert(`Fim de jogo! A palavra era: ${palavraSecreta}`), 100);
    bloquearInput();
  }

  linhaAtual++;
  colunaAtual = 0;
}

// Bloquear teclado após fim do jogo
function bloquearInput() {
  botoes.forEach(botao => {
    botao.disabled = true;
  });
}

// Event listeners para os botões do teclado
botoes.forEach(botao => {
  botao.addEventListener("click", () => {
    const letra = botao.textContent;

    if (letra === "Apagar") {
      apagarLetra();
    } else if (letra === "Enter") {
      if (colunaAtual === 5) {
        verificarPalavra();
      }
    } else if (/^[a-zA-Z]$/.test(letra)) {
      escreverLetra(letra);
    }
  });
});

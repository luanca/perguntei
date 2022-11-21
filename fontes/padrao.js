// Criado por Luan Carvalho em 14.11.2022 às 19:52
// Arquivo JS principal

// Exibir ao usuário que o jogo está sendo carregado
document.getElementById("msgCarregamento").innerHTML = "Carregando ...";

// Definições gerais
var usuarios = []; // Array de todos os usuários inseridos no jogo
var perguntas = []; // Array de todas as perguntas do jogo
var rodada = 0; // Int do número de rodadas que está sendo jogada

function adicUsuario() {
  // Adicionar o usuário inserido na lista de jogadores
  var vau1 = document.forms["insereNome"]["insNomeUsuario"].value;
  if (Number(document.forms["insereNome"]["btAdcusuario"].getAttribute("renomearUsuario")) == 0) {
    if (vau1 !== "") {
      usuarios.push(
        { "Nome": vau1, perguntasRespondidas: 0, respostasCertas: 0, partSerie: false }
      );
      document.forms["insereNome"]["insNomeUsuario"].value = "";
      atualizarListaJogadores();
    }
  } else {
    if (vau1 == "") {
      document.forms["insereNome"]["insNomeUsuario"].value = usuarios[Number(document.forms["insereNome"]["btAdcusuario"].getAttribute("indiceUsuarioRenomear"))].Nome;
    }
    renomearUsuario(Number(document.forms["insereNome"]["btAdcusuario"].getAttribute("indiceUsuarioRenomear")));
  }
}

function atualizarListaJogadores() {
  // Atualizar a lista de jogadores que é exibida
  document.getElementById("listaJogadores").innerHTML = "";
  var indice = 0;
  usuarios.forEach(usuario => {
    var valj1 = document.createElement("span");
    valj1.setAttribute("class", "jogN");
    valj1.innerText = usuario["Nome"];
    valj1.setAttribute("title", usuario["Nome"]);
    var valj2 = document.createElement("a");
    valj2.setAttribute("class", "jogR");
    valj2.innerText = "Renomear";
    valj2.setAttribute("title", "Renomear este jogador: " + usuario["Nome"]);
    valj2.setAttribute("href", "javascript:;");
    valj2.setAttribute("onclick", "javascript:renomearUsuario(" + indice + ");");
    var valj3 = document.createElement("a");
    valj3.setAttribute("class", "jogA");
    valj3.innerText = "Apagar";
    valj3.setAttribute("title", "Apagar este jogador: " + usuario["Nome"]);
    valj3.setAttribute("href", "javascript:;");
    valj3.setAttribute("onclick", "javascript:apagarUsuario(" + indice + ");");
    var valj4 = document.createElement("span");
    valj4.setAttribute("class", "jogO");
    valj4.innerHTML = "Opções: ";
    valj4.append(valj2);
    valj4.innerHTML += " ou ";
    valj4.append(valj3);
    valj1.append(valj4);
    document.getElementById("listaJogadores").append(valj1);
    indice++;
  });
}

function apagarUsuario(indiceApagar) {
  // Remover usuário da lista de jogadores. Passar por parametro o index da array usuarios
  usuarios.splice(indiceApagar, 1);
  resetarInsercaoUsuario();
  atualizarListaJogadores();
}

function renomearUsuario(indiceRenomear) {
  // Renomear usuário na lista de jogadores. Passar por parametro o index da array usuarios
  var vru1 = document.forms["insereNome"]["btAdcusuario"].getAttribute("renomearUsuario");
  var vru2 = document.forms["insereNome"]["btAdcusuario"].getAttribute("indiceUsuarioRenomear");
  if (Number(vru1) == 0 || indiceRenomear !== Number(vru2)) {
    // Bloco para ser executado quando o formulario nao estiver preparado para renomear
    document.forms["insereNome"]["insNomeUsuario"].value = usuarios[indiceRenomear].Nome;
    document.forms["insereNome"]["btAdcusuario"].value = "Renomear esse jogador";
    document.forms["insereNome"]["btAdcusuario"].setAttribute("indiceUsuarioRenomear", indiceRenomear);
    document.forms["insereNome"]["btAdcusuario"].setAttribute("renomearUsuario", "1");
    document.forms["insereNome"]["insNomeUsuario"].focus();
  } else if (Number(vru1) == 1) {
    // Bloco para ser executado quando o furmulario já estava preparado para o novo nome para o usuário
    usuarios[Number(vru2)].Nome = document.forms["insereNome"]["insNomeUsuario"].value;
    resetarInsercaoUsuario();
  }
  atualizarListaJogadores();
}

function resetarInsercaoUsuario() {
  // Resetar o formulário de inserção de usuários
  document.forms["insereNome"]["insNomeUsuario"].value = "";
  document.forms["insereNome"]["btAdcusuario"].value = "Mais um jogador";
  document.forms["insereNome"]["btAdcusuario"].setAttribute("indiceUsuarioRenomear", 0);
  document.forms["insereNome"]["btAdcusuario"].setAttribute("renomearUsuario", 0);
}

function iniciarJogo() {
  // Preparando a tela para jogar
  if (usuarios.length == 0) {
    // Adicionar um usuário padrão caso o usuário não inseriu nenhum jogador
    if (document.forms["insereNome"]["insNomeUsuario"].value == "") {
      //document.forms["insereNome"]["insNomeUsuario"].value = "Você";
      document.forms["insereNome"]["insNomeUsuario"].value = "Márcia";
      adicUsuario();
      document.forms["insereNome"]["insNomeUsuario"].value = "Rhadassa";
      adicUsuario();
      document.forms["insereNome"]["insNomeUsuario"].value = "Rosilda";
      adicUsuario();
      document.forms["insereNome"]["insNomeUsuario"].value = "Rex";
    }
    adicUsuario();
  }
  document.getElementsByClassName("apresentacao")[0].style.display = "none";
  document.getElementsByClassName("perguntas")[0].style.display = "grid";
  prepararPerguntas();
  escoherPerguntas();
  escolherUsuario();
}

function escolherUsuario() {
  // Escoher o participante para participar na rodada de perguntas
  var veu1 = 0;
  usuarios.forEach(userAtual => {
    if (userAtual.partSerie == false) { veu1++; }
  });
  // * Inicio do trecho que redefine os parametros necessários para o inicio de uma nova série de perguntas
  if (veu1 == 0) {
    usuarios.forEach(userModf => {
      userModf.partSerie = false;
    });
    rodada++;
    veu1 = usuarios.length;
  };
  // * Fim do trecho que redefine os parametros necessários para o inicio de uma nova série de perguntas
  var veu2 = obterInteiroAleatorio(1, veu1);
  usuarios.forEach(userEscolhido => {
    if (userEscolhido.partSerie == false && veu2 > 0) {
      console.log(veu2);
      if (veu2 == 1) {
        document.getElementById("nomeJogador").innerText = userEscolhido.Nome;
        userEscolhido.partSerie = true;
      }
      veu2--;
    }
  });
}

function prepararPerguntas() {
  // Preparar perguntas em uma array separada da array original
  perguntas = [];
  perguntasArrays.forEach(pergAtual => {
    perguntas.push(pergAtual);
  });
}

function escoherPerguntas() {
  // Sortear uma pergunta e exibir na tela
  var vep1 = perguntas.length;
  var vep2 = obterInteiroAleatorio(0, (vep1 - 1));
  var vep3 = [1, 2, 3, 4];
  var vep4 = 1;
  document.getElementById("altResp1").setAttribute("resp", "0");
  document.getElementById("altResp2").setAttribute("resp", "0");
  document.getElementById("altResp3").setAttribute("resp", "0");
  document.getElementById("altResp3").setAttribute("resp", "0");
  document.getElementById("strPergunta").innerText = perguntas[vep2]["pergunta"];
  document.getElementById("txtAjudaPergunta").innerText = perguntas[vep2]["textoBase"];
  while (vep3.length > 0) {
    var vep5 = obterInteiroAleatorio(0, (vep3.length - 1));
    if (vep4 == 1) {
      document.getElementById("altResp" + String(vep3[vep5])).setAttribute("resp", "1");
    }
    document.getElementById("altResp" + String(vep3[vep5])).innerText = perguntas[vep2]["resposta" + String(vep4)];
    vep4++;
    vep3.splice(vep5, 1);
  }
  perguntas.splice(vep2, 1);
}

function obterInteiroAleatorio(minimo, maximo) {
  // Sortear um número aleatório com os parametros informado
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

function aposCarregamento() {
  // Mudança de tela após o carregamento
  document.getElementsByClassName("telaInicial")[0].style.display = "none";
  document.getElementsByClassName("apresentacao")[0].style.display = "grid";

  // Instrução temporária para os teste
  iniciarJogo();
}

document.body.addEventListener('load', aposCarregamento());
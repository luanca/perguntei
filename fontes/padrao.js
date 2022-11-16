// Criado por Luan Carvalho em 14.11.2022 às 19:52
// Arquivo JS principal

// Exibir ao usuário que o jogo está sendo carregado
document.getElementById("msgCarregamento").innerHTML = "Carregando ...";

// Definições gerais
var usuarios = [];

function adicUsuario() {
  // Adicionar o usuário inserido na lista de jogadores
  var vau1 = document.forms["insereNome"]["insNomeUsuario"].value;
  if (Number(document.forms["insereNome"]["btAdcusuario"].getAttribute("renomearUsuario")) == 0) {
    if (vau1 !== "") {
      usuarios.push(
        { "Nome": vau1, perguntasRespondidas: 0, respostasCertas: 0 }
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
      document.forms["insereNome"]["insNomeUsuario"].value = "Você";
    }
    adicUsuario();
  }
  document.getElementsByClassName("apresentacao")[0].style.display = "none";
  document.getElementsByClassName("perguntas")[0].style.display = "grid";
}

function aposCarregamento() {
  // Mudança de tela após o carregamento
  document.getElementsByClassName("telaInicial")[0].style.display = "none";
  document.getElementsByClassName("apresentacao")[0].style.display = "grid";

  // Instrução temporária para os teste
  iniciarJogo();
}

document.body.addEventListener('load', aposCarregamento());
// Criado por Luan Carvalho em 14.11.2022 às 19:52

document.getElementById("msgCarregamento").innerHTML = "Carregando ...";


function aposCarregamento() {
  document.getElementsByClassName("telaInicial")[0].style.display = "none";
  document.getElementsByClassName("apresentacao")[0].style.display = "grid";
}

document.body.addEventListener('load', aposCarregamento());
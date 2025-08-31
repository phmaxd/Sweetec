window.addEventListener("load", function(){
const paginaAtual = window.location.pathname.split('/').pop();
  
if (paginaAtual === "Cadastro.html"|| paginaAtual==="login.html"){
       $.ajax({
      url: "verificarLogin.php",
      type: "POST",
      data: { verificar: "verificação" },
      dataType: "json"
    }).done(function(resp) {
      if(resp.islogado != false){
        window.location.href = "pagina.html";
      }
    }).fail(function(jqXHR, textStatus) {
      alert("Falha na requisição AJAX: " + textStatus);
    }).always(function() {
      console.log("Requisição AJAX verificar login concluída");
    }); 
}else{

    $.ajax({
      url: "verificarLogin.php",
      type: "POST",
      data: { verificar: "verificação" },
      dataType: "json"
    }).done(function(resp) {
      if(resp.islogado != true){
        window.location.href = "login.html";
      }
    }).fail(function(jqXHR, textStatus) {
      alert("Falha na requisição AJAX: " + textStatus);
    }).always(function() {
      console.log("Requisição AJAX verificar login concluída");
    });

}

$.ajax({
  url: "tela.php",
  type: "POST",
  data: "", // se precisar enviar algo, coloque aqui
  dataType: "json",
  success: function(info) {
    var texto = $("#cardContainer");
    
    if (texto.length && Array.isArray(info.data)) {
      // Limpa o conteúdo anterior
      texto.html("");

      // Cria os cards
      info.data.forEach(function(dados) {
        var linha = $(`
          <div id="${dados.Id}" class="card">
            <div class="cardContent" data-id="${dados.Id}">
              <img src="${dados.Imagem}" alt="Imagem do produto" style="width: 32.7vh; height: 32.7vh; border-radius: 1vh;">
              <span><p id="nome">${dados.Nome}</p></span>
              <span style="display:none;"><p>${dados.Descricao}</p></span>
              <span style="display:none;">${dados.Escola}</span>
              <span id="Dados" style="display:none;">${dados.Id}</span>
              <span id="Preco">R$ ${dados.preco}</span>
            </div>
          </div>
        `);

        // Adiciona clique para redirecionamento
        linha.on("click", function() {
          redirecionarPG(dados.Id);
        });

        texto.append(linha);
      });

    } else {
      console.log("Elemento com id 'cardContainer' não encontrado ou info.data não é um array.");
    }
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log("Erro ao conectar ao servidor:", textStatus, errorThrown);
  },
  complete: function() {
    console.log("Requisição AJAX concluída");
  }
});

})
// fim onload


async function logar() {

    var nome = document.getElementById("Nome").value;
    var senha = document.getElementById("Senha").value;
    if (nome == "" || senha == "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }else{
const data = new URLSearchParams();
  data.append("Nome", nome);
  data.append("Senha", senha);
        const conexao = await fetch('login.php', {
            method: 'POST',
            body: data.toString(),
           headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const resposta = await conexao.json();
        console.log(resposta);
         // Verifica se a resposta é um JSON válido
        if (resposta.data == "usuario ou senha incorreto") {
            alert("Usuário ou senha incorretos.");
        } else {
            alert("Login realizado com sucesso.");
            window.location.href = "pagina.html";
        }
    }
}
async function cadastrar() {
    var nome = document.getElementById("Nome").value;
    var senha = document.getElementById("Senha").value;
    var escola = document.getElementById("Escolas").value;
    const Numero = document.getElementById("Numero").value;
    if (nome == "" || senha == "" || Numero == "") {
        alert("Por favor, preencha todos os campos.");
        return;
    } else {
        const data = new URLSearchParams();
        data.append("Nome", nome);
        data.append("Senha", senha);
        data.append("Escolas", escola);
        data.append("Numero", Numero);
        // Envia os dados para o servidor
        const conexao = await fetch('cadastrar.php', {
            method: 'POST',
            body: data.toString(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        const resposta = await conexao.json();
        console.log(resposta);
         // Verifica se a resposta é um JSON válido
        if (resposta.data == "Usuário cadastrado com sucesso!") {
            alert("Cadastro realizado com sucesso.");
            window.location.href = "login.html";
        } else {
            alert("Usuário já cadastrado.");
            alert(resposta.data);
        }
    }
}
async function esqueci() {
window.location.href = "esqueci.html";
}
 async function enviar() {
            var nome = document.getElementById("Nome").value;
            var senha = document.getElementById("Senha").value;
            var confirmaSenha = document.getElementById("ConfirmaSenha").value;

            if (senha != confirmaSenha) {
                alert("As senhas não coincidem.");
                return;
            }
            if (nome == "" || senha == "" || confirmaSenha == "") {
                alert("Por favor, preencha todos os campos.");
                return;
            } else {
                const data = new URLSearchParams();
                data.append("Nome", nome);
                data.append("Senha", senha);
                const conexao = await fetch('esqueci.php', {
                    method: 'POST',
                    body: data.toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });
                const resposta = await conexao.json();
                console.log(resposta);
                // Verifica se a resposta é um JSON válido
                if (resposta.data == "Senha alterada com sucesso!") {
                    alert("Senha alterada com sucesso.");
                    window.location.href = "login.html";
                } else {
                    alert("Erro ao alterar a senha.");
                    alert(resposta.data);
                }
            }
        }
        async function vender() {
            const cardContainer = document.getElementById("cardContainer")
            cardContainer.innerHTML = `
       <section id='venderContainer'>
          <input type="text" id="nomeA" placeholder="Nome do produto">
          <textarea id="descricaoA" placeholder="Descrição"></textarea>
          <input type="file" id="imagemA">
          <input type="number" id="precoA" placeholder="Preço">
          <button id="venderA" onclick="venderProduto()">Vender</button>
        </section>
    `

  
    cardContainer.style.all = "unset";
    cardContainer.style.width = "85%";
    cardContainer.style.height = "auto";
    cardContainer.style.backgroundColor = "white";
    cardContainer.style.display = "flex"
    cardContainer.style.padding = "3vh";
    cardContainer.style.zIndex = "100";


        }
        async function venderProduto() {
            var nome = document.getElementById("nomeA").value;
            var descricao = document.getElementById("descricaoA").value;
            var form = document.getElementById("imagemA").files[0];
            var preco = document.getElementById("precoA").value;
            if (nome == "" || descricao == "" || preco == "" || form == undefined) {
                alert("Por favor, preencha todos os campos.");
                return;
            } else {
      if (!form) return;
      const formData = new FormData();
      formData.append('imagem', form);
      formData.append('descricao', descricao);
      formData.append('preco', preco);
      formData.append('nome', nome);
        try {
        const response = await fetch("vender.php", {
          method: "POST",
          credentials: "include",
          body: formData
        });
                const resposta = await response.text();
                console.log(resposta);
                // Verifica se a resposta é um JSON válido
                if (resposta == "Produto cadastrado com sucesso!") {
                    alert("Produto cadastrado com sucesso.");
                    document.getElementById("nomeA").value = "";
                    document.getElementById("descricaoA").value = "";
                    document.getElementById("precoA").value = "";
                    document.getElementById("imagemA").value = "";
                }else if(resposta == "erro: usuário não autenticado") {
                    window.location.href = "login.html";
                } else {
                    alert("Erro ao cadastrar o produto.");
                    alert(resposta.data);
                }
            }
        catch (error) {
          console.log(error);
        }   
            }   
        }   
async function search() {
    var searchTerm = document.getElementById("Procurar").value.toLowerCase();
    var cards = document.querySelectorAll("#cardContainer .card");

    cards.forEach(function(card) {
        // pega TODO o texto do card
        var textoCard = card.querySelector(".cardContent").textContent.toLowerCase();

        // verifica se o termo aparece em qualquer parte do texto
        card.style.display = textoCard.includes(searchTerm) ? "block" : "none";
    });
}
async function comprar(){
}



async function redirecionarPG(id) {
  $.ajax({
    url: "instanciarProduto.php",
    type: "POST",
    data: { id: id },
    dataType: "html"
  }).done(function(resp) {
    const cardContainer = document.getElementById("cardContainer")
    cardContainer.innerHTML = resp
    cardContainer.style.all = "unset";
    cardContainer.style.width = "85%";
    cardContainer.style.height = "auto";
    cardContainer.style.backgroundColor = "white";
    cardContainer.style.display = "flex"
    cardContainer.style.padding = "3vh";
    cardContainer.style.zIndex = "100";
    
  }).fail(function(jqXHR, textStatus) {
  alert("Falha na requisição AJAX: " + textStatus);
  }).always(function() {
  console.log("Requisição AJAX carregar cartas concluída");
  });
}

document.getElementById("Procurar").addEventListener("input", function(event) {
    
        search()
     window.scrollTo(0, 0);
});

async function refresh(params) {
  
  window.location.href = "pagina.html"
}

async function conta(params) {

  $.ajax({
    url: "verificarConta.php",
    type: "POST",
    data: { verificar: "verificação" },
    dataType: "html"
  }).done(function(resp) {

    document.getElementsByClassName("modal")[0].innerHTML = resp;

  }).fail(function(jqXHR, textStatus) {
  alert("Falha na requisição AJAX: " + textStatus);
  }).always(function() {
  console.log("Requisição AJAX verificar conta concluída");
  });

}
async function sair(params) {
  if(confirm("Tem certeza que deseja sair?")){
    $.ajax({
      url: "deslogarSession.php",
      type: "POST",
      data: { deslogar: "deslogar" },
      dataType: "html"
    }).done(function(resp) {
      alert(resp);
      window.location.href = "login.html";
    }).fail(function(jqXHR, textStatus) {
      alert("Falha na requisição AJAX: " + textStatus);
    }).always(function() {
      console.log("Requisição AJAX deslogar concluída");
    });
  }
}
const abrirModal = document.getElementById("abrirModal");
const modalOverlay = document.getElementsByClassName("modal-overlay")[0];
abrirModal.addEventListener("click", () => {
    modalOverlay.style.display = "flex";
});


modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = "none";
    }
});


function produtosUser() {
  $.ajax({
    url: "produtosUser.php",
    type: "POST",
    data: { user: "user" },
    dataType: "html"
  }).done(function(resp) {
    document.getElementById("cardContainer").innerHTML = resp;
    cardContainer.innerHTML = resp;
    cardContainer.style.all = "unset";
    cardContainer.style.width = "85%";
    cardContainer.style.minHeight = "100%";
    cardContainer.style.flexShrink = "0";
    cardContainer.style.background = "#c9d6da";
    cardContainer.style.padding = "3vh"; // mantive o último do seu CSS
    cardContainer.style.boxSizing = "border-box";
    cardContainer.style.zIndex = "100";
    cardContainer.style.display = "grid";
    cardContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
    cardContainer.style.gap = "3vh";

  }).fail(function(jqXHR, textStatus) {
    alert("Falha na requisição AJAX: " + textStatus);
  }).always(function() {
    console.log("Requisição AJAX produtosUser concluída");
  });
}

function visualizarProduto(id){
  $.ajax({
    url: "instanciarProdutoUser.php",
    type: "POST",
    data: { id: id },
    dataType: "html"
  }).done(function(resp) {
    const cardContainer = document.getElementById("cardContainer")
    cardContainer.innerHTML = resp
    cardContainer.style.all = "unset";
    cardContainer.style.width = "85%";
    cardContainer.style.height = "auto";
    cardContainer.style.backgroundColor = "white";
    cardContainer.style.display = "flex"
    cardContainer.style.padding = "3vh";
    cardContainer.style.zIndex = "100";
    
  }).fail(function(jqXHR, textStatus) {
  alert("Falha na requisição AJAX: " + textStatus);
  }).always(function() {
  console.log("Requisição AJAX instanciar produto do usuario concluída");
  });
}
function apagarProduto(id){
  if(confirm("você tem certeza que deseja excluir este produto?")){
  $.ajax({
    url: "apagarProduto.php",
    type: "POST",
    data: { id: id },
    dataType: "html"
  }).done(function(resp) {
    document.getElementById("cardContainer").innerHTML = resp;
    cardContainer.innerHTML = resp;
    cardContainer.style.all = "unset";
    cardContainer.style.width = "85%";
    cardContainer.style.minHeight = "100%";
    cardContainer.style.flexShrink = "0";
    cardContainer.style.background = "#c9d6da";
    cardContainer.style.padding = "3vh"; // mantive o último do seu CSS
    cardContainer.style.boxSizing = "border-box";
    cardContainer.style.zIndex = "100";
    cardContainer.style.display = "grid";
    cardContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
    cardContainer.style.gap = "3vh";
  }).fail(function(jqXHR, textStatus) {
  alert("Falha na requisição AJAX: " + textStatus);
  }).always(function() {
  console.log("Requisição AJAX excluir produto concluída");
  });
  }
}

function editar(sql,id, elemento, valor){
  const elementoS = document.getElementById(elemento)

  if(elemento!= "descricaoP"){
  elementoS.innerHTML = `
    <input type='text' class='${elemento}' id='${id}' value='${valor}'><input type='button' value='Editar' onclick='editarProduto(${id},"${sql}")'>
  ` 
  }else{
    elementoS.innerHTML = `
    <textarea class='${elemento}' id='${id}'>${valor}</textarea><input type='button' value='Editar' onclick='editarProduto(${id},"${sql}","${elemento}")'>
  ` 
  }
}
function editarProduto(id, sql, elemento){
  
  const valor = document.getElementById(id).value
  
 if(confirm("Tem certeza que deseja editar?")){
    $.ajax({
      url: "editarProduto.php",
      type: "POST",
      data: { id: id, sql:sql, elemento: elemento, valor:valor },
      dataType: "html"
    }).done(function(resp) {
      document.getElementById("cardContainer").innerHTML = resp;
    }).fail(function(jqXHR, textStatus) {
      alert("Falha na requisição AJAX: " + textStatus);
    }).always(function() {
      console.log("Requisição AJAX editar concluída");
    });
  }

}
function editarImagem(id, elemento, valor){
    const cardContainer = document.getElementById("cardContainer")
    document.getElementsByClassName("modal")[0].innerHTML = `
    <section id='modalImagem'>
      <input type="file" id="imagemIMG">
      <button id="vender" onclick="alterarIMG(${id}, '${valor}')">alterar</button>
    </section>
    `

const modalOverlay = document.getElementsByClassName("modal-overlay")[0];

  modalOverlay.style.display = "flex";

}
function alterarIMG(id, imgAtual){
var fileInput = $("#imagemIMG")[0].files[0];
    var formData = new FormData();
    if (fileInput) {
        formData.append("temimg?", true);
        formData.append("arquivo", fileInput);
        formData.append("id", id);
        formData.append("imgatual", imgAtual);
         $.ajax({
            url: "alterarIMG.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            dataType: "html"
        }).done(function(resp) {

          if(!true){
            document.getElementsByClassName("modal")[0].innerHTML = resp;
          }{
            visualizarProduto(id)
            const modalOverlay = document.getElementsByClassName("modal-overlay")[0];

  modalOverlay.style.display = "none";

          }
        }).fail(function(jqXHR, textStatus ) {
            console.log("Request failed: " + textStatus);
        }).always(function() {
            console.log("requisicão ajax edit universo concluida");            
        });
    } else {
        alert("Selecione uma imagem.")
    }

}
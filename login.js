window.onload = async () => {
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

  try {
    const conecta = await fetch("tela.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "",
    })

    if (conecta.ok) {
      const info = await conecta.json()
      var texto = document.getElementById("cardContainer")
      if (texto && Array.isArray(info.data)) {
        // Cria o style global apenas uma vez
       


        // Limpa o conteúdo anterior
        texto.innerHTML = ""

        info.data.forEach((dados) => {
          var linha = document.createElement("div")
          linha.id = dados.Id
          linha.classList.add("card")
          linha.addEventListener("click", function() {
            redirecionarPG(dados.Id);
          });
          linha.innerHTML = `
            
              <div  class="cardContent" data-id="${dados.Id}" >
                <img src="${dados.Imagem}" alt="Imagem do produto" style="width: 32.7vh; height: 32.7vh; border-radius: 1vh;">
                <span><p id="nome"> ${dados.Nome}</p></span>
                <span style="display:none;"><p >${dados.Descricao}</p></span>
                <span style="display:none;">${dados.Escola}</span>
                <span id="Dados" style="display:none;">${dados.Id}</span>
                <span id="Preco"> R$ ${dados.preco}</span>
              </div>
            
          `
          texto.appendChild(linha)
        })

        document.addEventListener("click", (event) => {
          const card = event.target.closest(".card")
          if (card) {
            const elementId = card.getAttribute("data-id")
          }
        })
      } else {
        console.log("Elemento com id 'content' não encontrado ou info.data não é um array.")
      }
    } else {
      console.log("Erro ao conectar ao servidor.")
    }
  } catch (error) {
    console.log(error)
  }

} 
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
                <input type="text" id="Nome" placeholder="Nome do produto">
    <textarea id="Descricao" placeholder="Descrição"></textarea>
    <input type="file" id="Imagem">
    <input type="number" id="Preco" placeholder="Preço">
    <button id="vender" onclick="venderProduto()">Vender</button>
    `

  
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


        }
        async function venderProduto() {
            var nome = document.getElementById("Nome").value;
            var descricao = document.getElementById("Descricao").value;
            var form = document.getElementById("Imagem").files[0];
            var preco = document.getElementById("Preco").value;
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
                    document.getElementById("Nome").value = "";
                    document.getElementById("Descricao").value = "";
                    document.getElementById("Preco").value = "";
                    document.getElementById("Imagem").value = "";
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
const abrirModal = document.getElementById("abrirCamera");
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
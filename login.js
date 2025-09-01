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
          <div tabindex="0" id="${dados.Id}" onkeydown="if(event.key==='Enter') redirecionarPG('${dados.Id}')" class="card">
            <div class="cardContent" data-id="${dados.Id}">
              <img src="${dados.Imagem}" title="${dados.Nome}" alt="Imagem do produto" style="width: 32.7vh; height: 32.7vh; border-radius: 1vh;">
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
       <h2>Anuncie um produto</h2>
          <input type="text" class='inputVender' id="nomeA" placeholder="Nome do produto">
          <textarea id="descricaoA" onkeydown="if(event.key==='Enter') bloquearEnter(event)" maxlength='1000' placeholder="Descrição"></textarea>
          <input type="file" id="imagemA">
          <input type="number" class='inputVender' id="precoA" placeholder="Preço">
          <input type='button' id="venderA" onclick="venderProduto()" value='Vender'>
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
modalOverlay.style.display = "flex";
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

const modalOverlay = document.getElementsByClassName("modal-overlay")[0];
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

let elementoEmEdicao = null; // guarda o elemento que está sendo editado

function editar(sql, id, elemento, valor) {
  const elementoS = document.getElementById(elemento);

  // Se já tem outro em edição, restaura antes
  if (elementoEmEdicao && elementoEmEdicao !== elementoS) {
    elementoEmEdicao.innerHTML = elementoEmEdicao.dataset.original;
    elementoEmEdicao = null;
  }

  // Salva o conteúdo original antes de substituir
  elementoS.dataset.original = elementoS.innerHTML;

  if (elemento !== "descricaoP") {
    elementoS.innerHTML = `
      <input type='text' class='${elemento}' id='${id}' value='${valor}'>
      <input type='button' value='Editar' onclick='editarProduto(${id},"${sql}")'>
    `;
  } else {
    elementoS.innerHTML = `
      <textarea maxlength='1000' onkeydown="if(event.key==='Enter') bloquearEnter(event)" class='${elemento}' id='${id}'>${valor}</textarea>
      <input type='button' value='Editar' onclick='editarProduto(${id},"${sql}","${elemento}")'>
    `;
  }

  // Marca como elemento em edição
  elementoEmEdicao = elementoS;
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
      <button id="alterarIMGBTN" onclick="alterarIMG(${id}, '${valor}')">alterar</button>
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
function editarConta(id, elemento, valor, sql) {
  // Volta todos os outros elementos pro estado original
  document.querySelectorAll("#modalConta span").forEach(span => {
    const original = span.getAttribute("data-original");
    if (original) {
      span.innerHTML = original;
    }
  });

  // Seleciona o span clicado
  const elementoS = document.getElementById(elemento);

  // Salva o HTML original (pra conseguir restaurar depois)
  if (!elementoS.hasAttribute("data-original")) {
    elementoS.setAttribute("data-original", elementoS.innerHTML);
  }

  // Caso especial: escolaM → select
  if (elemento === "escolaM") {
    elementoS.innerHTML = `
      <select class="Escolas" id='${id}'>
        <optgroup label="Escolas Municipais">
          <option value="Ana Cândida Ebling de Oliveira">Ana Cândida Ebling de Oliveira</option>
          <option value="Benedita Matias Gonçalves">Benedita Matias Gonçalves</option>
          <option value="Bernardino de Souza Pereira">Bernardino de Souza Pereira</option>
          <option value="Carlos Augusto Guimarães da Silva">Carlos Augusto Guimarães da Silva</option>
          <option value="Célia Marina Dal Pozzo Borges">Célia Marina Dal Pozzo Borges</option>
          <option value="Dalva Dati Ruivo">Dalva Dati Ruivo</option>
          <option value="Diva do Carmo Alves de Lima">Diva do Carmo Alves de Lima</option>
          <option value="Divani Maria Cardoso">Divani Maria Cardoso</option>
          <option value="Edson Baptista de Andrade">Edson Baptista de Andrade</option>
          <option value="Elga Reis">Elga Reis</option>
          <option value="Tia Pombinha">Tia Pombinha</option>
          <option value="Osmar Rodrigues">Osmar Rodrigues</option>
          <option value="Professora Gioconda Faga">Professora Gioconda Faga</option>
          <option value="Profª Itailde Silva Castro Bragante">Profª Itailde Silva Castro Bragante</option>
          <option value="Eugênia Pitta Rangel Veloso">Eugênia Pitta Rangel Veloso</option>
          <option value="Filomena Dias Apelian">Filomena Dias Apelian</option>
          <option value="Harry Forssell">Harry Forssell</option>
          <option value="Ignez Martins">Ignez Martins</option>
          <option value="José Teixeira Rosas">José Teixeira Rosas</option>
          <option value="Leonor Mendes de Barros">Leonor Mendes de Barros</option>
          <option value="Lídia Martha Ferriello Gianotti">Lídia Martha Ferriello Gianotti</option>
          <option value="Lilian Aparecida Borges Prado">Lilian Aparecida Borges Prado</option>
          <option value="Lions Clube">Lions Clube</option>
          <option value="Luiz Gonzaga Silva Fonseca">Luiz Gonzaga Silva Fonseca</option>
          <option value="Maria Aparecida Soares Amêndola">Maria Aparecida Soares Amêndola</option>
          <option value="Maria Cristina Macedo Gomes">Maria Cristina Macedo Gomes</option>
          <option value="Maria da Conceição Carvalho Batista">Maria da Conceição Carvalho Batista</option>
          <option value="Maria da Conceição Luz">Maria da Conceição Luz</option>
          <option value="Maria da Penha Corrêa Sanches">Maria da Penha Corrêa Sanches</option>
          <option value="Maria das Graças Alves Santos">Maria das Graças Alves Santos</option>
        </optgroup>
        <optgroup label="Escolas Estaduais">
          <option value="EE Benedito Calixto">EE Benedito Calixto</option>
          <option value="EE Dagoberto Nogueira da Fonseca">EE Dagoberto Nogueira da Fonseca</option>
          <option value="EE Dr. José Carlos Braga de Souza">EE Dr. José Carlos Braga de Souza</option>
          <option value="EE José Antonio de Affonseca Rogê Ferreira">EE José Antonio de Affonseca Rogê Ferreira</option>
          <option value="EE Milton Martins Poitena">EE Milton Martins Poitena</option>
          <option value="EE Prof. Jon Teodoresco">EE Prof. Jon Teodoresco</option>
          <option value="EE Profª Silvia Jorge Pollastrini">EE Profª Silvia Jorge Pollastrini</option>
          <option value="EE Rosélia Braga Xavier">EE Rosélia Braga Xavier</option>
        </optgroup>
        <optgroup label="Escolas Particulares">
          <option value="22 de Abril Escola de EI e EF">22 de Abril Escola de EI e EF</option>
          <option value="Colégio Albert Einstein">Colégio Albert Einstein</option>
          <option value="Colégio Belas Artes">Colégio Belas Artes</option>
          <option value="Biotec Escola Profissionalizante">Biotec Escola Profissionalizante</option>
          <option value="Colégio 11 de Novembro">Colégio 11 de Novembro</option>
          <option value="Colégio Masa">Colégio Masa</option>
          <option value="Colégio Master">Colégio Master</option>
          <option value="Colégio Zenith Macicel">Colégio Zenith Macicel</option>
          <option value="EducAr Escola">EducAr Escola</option>
          <option value="Escola de Educação Infantil Baby S Club">Escola de Educação Infantil Baby S Club</option>
          <option value="Evolução Colégio">Evolução Colégio</option>
          <option value="Nova Era Escola EI e EF">Nova Era Escola de Educação Infantil e Fundamental</option>
          <option value="Pirâmide Centro Educacional">Pirâmide Centro Educacional</option>
          <option value="Supremus de Itanhaém Colégio">Supremus de Itanhaém Colégio</option>
        </optgroup>
        <optgroup label="ETEC – Técnico (público estadual)">
          <option value="Etec de Itanhaém">Etec de Itanhaém</option>
        </optgroup>
      </select>
      <input type='button' value='Editar' onclick='alterarConta(${id},"${sql}")'>
    `;

    // já marcar a escola atual como selecionada
    const select = elementoS.querySelector("select");
    if (select) {
      select.value = valor;
    }

  }else {
    // Caso padrão → input text
    elementoS.innerHTML = `
      <input type='text' class='${elemento}' id='${id}' value='${valor}'>
      <input type='button' value='Editar' onclick='alterarConta(${id},"${sql}")'>
    `;
  }
}


function alterarConta(id, sql) {
  const elemento = document.getElementById(id);
  let valor;

  if (!elemento) {
    alert("Elemento não encontrado!");
    return;
  }

  // Detecta o tipo do elemento para pegar o valor corretamente
  if (elemento.tagName === "SELECT") {
    valor = elemento.options[elemento.selectedIndex].value;
  } else if (elemento.type === "checkbox") {
    valor = elemento.checked ? 1 : 0; // se for checkbox, pega true/false ou 1/0
  } else {
    valor = elemento.value; // input text, textarea etc.
  }

  if (confirm("Tem certeza que deseja editar?")) {
    $.ajax({
      url: "editarConta.php",
      type: "POST",
      data: { id: id, sql: sql, valor: valor },
      dataType: "html"
    }).done(function(resp) {
      document.getElementsByClassName("modal")[0].innerHTML = resp;
    }).fail(function(jqXHR, textStatus) {
      alert("Falha na requisição AJAX: " + textStatus);
    }).always(function() {
      console.log("Requisição AJAX editar concluída");
    });
  }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
                    const modalOverlay = document.getElementsByClassName("modal-overlay")[0];

  modalOverlay.style.display = "none";
    }
});

function bloquearEnter(e){
e.preventDefault();
}

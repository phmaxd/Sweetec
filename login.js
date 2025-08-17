window.onload = async () => {
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
      var texto = document.getElementById("content")
      if (texto && Array.isArray(info.data)) {
        // Cria o style global apenas uma vez
        if (!document.getElementById("content-style")) {
          const style = document.createElement("style")
          style.id = "content-style"
          style.innerHTML = `
            #content {
              display: flex;
              flex-wrap: wrap;
              gap: 16px;
              margin-top: 16px;
              justify-content: flex-start;
              padding: 0;
            }
            #content .linha-tabela {
              display: flex;
              padding: 0;
              border: none;
              background: none;
              width: auto;
            }
            #content .card {
              width: 100%;
              min-width: 180px;
              max-width: 250px;
              box-sizing: border-box;
              cursor: pointer;
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            #content .card:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .id-display {
              position: fixed;
              top: 20px;
              right: 20px;
              background: #333;
              color: white;
              padding: 10px 15px;
              border-radius: 5px;
              font-weight: bold;
              z-index: 1000;
              display: none;
            }
            @media (max-width: 600px) {
              #content {
                flex-direction: column;
                align-items: stretch;
              }
              #content .linha-tabela {
                width: 100%;
              }
              #content .card {
                max-width: 100%;
              }
            }
          `
          document.head.appendChild(style)
        }

        if (!document.getElementById("id-display")) {
          const idDisplay = document.createElement("div")
          idDisplay.id = "id-display"
          idDisplay.className = "id-display"
          document.body.appendChild(idDisplay)
        }

        // Limpa o conteúdo anterior
        texto.innerHTML = ""

        info.data.forEach((dados) => {
          var linha = document.createElement("tr")
          linha.classList.add("linha-tabela")
          linha.innerHTML = `
            <td style="padding:0; border:none;">
              <div class="card" data-id="${dados.Id}" style="
                box-sizing: border-box;
                padding: 10px;
                border: 1px solid #ccc;
                margin: 0;
                display: flex;
                flex-direction: column;
                min-width: 180px;
                max-width: 100%;
              ">
                <img src="${dados.Imagem}" alt="Imagem do produto" style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 10px;">
                <div><strong>Nome:</strong> ${dados.Nome}</div>
                <div><strong>Descrição:</strong> ${dados.Descricao}</div>
                <div><strong>Preço:</strong> R$ ${dados.preco}</div>
                <div><strong>Escola:</strong> ${dados.Escolas}</div>
                <div id="Dados" style="display: none;">${dados.Id}</div>
              </div>
            </td>
          `
          texto.appendChild(linha)
        })

        document.addEventListener("click", (event) => {
          const card = event.target.closest(".card")
          if (card) {
            const elementId = card.getAttribute("data-id")
            mostrarId(elementId)
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

async function mostrarId(id) {
  $.ajax({
    url: "compra.php",
    type: "POST",
    data: { id: id },
    success: function(response) {
      const data = JSON.parse(response)
      if (data.data && data.data.length > 0) {
        idDisplay.textContent = `ID: ${data.data[0].Id}`
        idDisplay.style.display = "block"
      } else {
        idDisplay.textContent = "ID não encontrado"
        idDisplay.style.display = "block"
      }
    }
})
}
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
    if (nome == "" || senha == "") {
        alert("Por favor, preencha todos os campos.");
        return;
    } else {
        const data = new URLSearchParams();
        data.append("Nome", nome);
        data.append("Senha", senha);
        data.append("Escolas", escola);
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
            window.location.href = "vender.html";

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
    var cards = document.querySelectorAll("#content .linha-tabela");

    cards.forEach(function(card) {
        // pega TODO o texto do card
        var textoCard = card.querySelector(".card").textContent.toLowerCase();

        // verifica se o termo aparece em qualquer parte do texto
        card.style.display = textoCard.includes(searchTerm) ? "block" : "none";
    });
}
async function comprar(){
}
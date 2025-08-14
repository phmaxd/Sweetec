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
    if (nome == "" || senha == "") {
        alert("Por favor, preencha todos os campos.");
        return;
    } else {
        const data = new URLSearchParams();
        data.append("Nome", nome);
        data.append("Senha", senha);
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
            window.location.href = "pagina.html";
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
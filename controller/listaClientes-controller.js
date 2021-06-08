import { clienteService } from "../service/cliente-service.js";
const criaNovaLinha = (nome, email, id) => {
  //criando um template
  const linhaNovoCliente = document.createElement("tr");
  const conteudo = `
          <td class="td" data-td>${nome}</td>
          <td>${email}</td>
          <td>
              <ul class="tabela__botoes-controle">
                  <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                  <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
              </ul>
          </td> 
      `;
  //colocar o conteúdo dentro da linha usamos innerhtml
  linhaNovoCliente.innerHTML = conteudo;
  linhaNovoCliente.dataset.id = id; //criamos atributo do tipo id e acrescentou em cada data-td

  return linhaNovoCliente;
};

//percorrendo a arvore do dom para encontar o elemento data-tabela
const tabela = document.querySelector("[data-tabela]");

tabela.addEventListener("click", async (evento) => {
  //na tabela vamos adicionar um evento de escuta do tipo click,
  //quando for clicado execute tal ação.
  let ehBotaoDeletar =
    evento.target.className === "botao-simples botao-simples--excluir"; //evento.target significa quem é o alvo?
  //fazendo um verificação
  if (ehBotaoDeletar) {
    try {
      const linhaCliente = evento.target.closest("[data-id]"); //closest significa mais próximo que é o data atributo da tr.
      let id = linhaCliente.dataset.id;
      await clienteService.removeCliente(id); //removendo o cliente por id.
      //.then(() =>{ //como estamos usando o await o .then não é mais necessário.
      linhaCliente.remove(); //removendo a tr por enteiro.
      // })
    } catch (erro) {
      console.log(erro);
      window.location.href = "../telas/erro.html";
    }
  }
});

const render = async () => {
  try {
    const listaClientes = await clienteService.listaClientes();

    //then é então ele refere-se a função listaCliente.
    //const data = (http.response); //data recebe response, assim caso queira mexer só mexer no data, porém, o conteúdo
    //é apenas texto, então temos que converter em um elemento de javascript valido.
    listaClientes.forEach((elemento) => {
      //fazer uma varedura no array.
      //colocando a tabela criada no criaNovalinha no body.
      //criando a visualização.
      tabela.appendChild(
        criaNovaLinha(elemento.nome, elemento.email, elemento.id)
      );
    });
  } catch (erro) {
    console.log(erro);
    window.location.href = "../telas/erro.html";
  }
};
render();

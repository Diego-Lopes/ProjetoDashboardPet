//este arquivo js conversa direto com servidor.

const listaClientes = () => { //está fazendo conexão com api
  // const promise = new Promise((resolve, reject) => {
  //   //instânciando promise com dois parâmetros resolve aceito, reject rejeitado.
  //   const http = new XMLHttpRequest();

  //   http.open("GET", "");

  //   http.onload = () => {
  //     if (http.status >= 400) {
  //       reject(JSON.parse(http.response));
  //     } else {
  //       resolve(JSON.parse(http.response));
  //     }
  //   };
  //   http.send(); //para enviar a requisição
  // });
  //------tudo isso acima foi englobado em uma função chamada fetch
  return fetch(`http://localhost:3000/profile`)//retorn get e uma promise.
  .then(resposta =>{
    if(resposta.ok){
      return resposta.json()
    }
    //throw new Error(alert("errou")) //Uso de erro personalizado.
    throw new Error("Não foi possível listar os clientes")// aqui um erro personalizado que só vai aparecer na ferramenta de desenvolvedor.
  })
};
//aqui estamos fazendo um post e criando novo cliente
const criarCliente = (nome, email) => {
  return fetch(`http://localhost:3000/profile`, {
    method: 'POST', //passamos a mudança do method padrão para o que queremos.
    headers: { //cabeçalho qual tipo de informação que estou enviando.
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ //enviando os dados do formulário, JSON.stringify faz virar texto.
      nome: nome, 
      email: email
    })
  })
  .then(resposta => {
    if(resposta.ok){
      return resposta.body//retornando o corpo da resposta
    }
    throw new Error("Não foi possível criar um cliente")
  })
}

//removendo cliente.
const removeCliente = (id) => { //passando como argumento o id para excluir apenos id de referência.
  return fetch(`http://localhost:3000/profile/${id}`, { //veja que logo depois do profile usamos {id} para itendificar o usuário. usando sifrão para ser reconhecido com javascript válido. 
    method: 'DELETE', //passamos um novo parâmetro.

  }).then(resposta=>{
    if(!resposta.ok){
      throw new Error("Não foi possível remover o cliente")
    }
  })
}

//editar cliente.
const detalhaCliente = (id) => {
  return fetch(`http://localhost:3000/profile/${id}`)
  .then(resposta =>{
    if(resposta.ok){
      return resposta.json()
    }
    throw new Error("Não foi possível datalhar o cliente")
  })
}

//atualizar cliente
const atualizarCliente = (id, nome, email) => {
  return fetch(`http://localhost:3000/profile/${id}`, {
    method: 'PUT',//atualizar dados.
    headers: {
      'Content-type' : 'application/json'
    },
    //o corpo que vai atualizar
    body: JSON.stringify({
      nome : nome, 
      email: email
    })
  })
  .then(resposta => {
    if(resposta.ok){
      return resposta.json();
    }
    throw new Error("Não foi possível atualizar o cliente")
  })
}

export const clienteService = { //aqui exportamos todas as funções.
  listaClientes, 
  criarCliente,
  removeCliente,
  detalhaCliente,
  atualizarCliente
}

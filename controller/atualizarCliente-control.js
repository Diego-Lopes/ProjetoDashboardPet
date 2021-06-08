

import {clienteService} from '../service/cliente-service.js'

(async () => {
    const pegaURL = new URL(window.location) //estanciou const url e passou onde estamos na página com window.location

    //console.log(pegaURL); //use log e vá na página e no dom podemos usar o searchParams get id.
    
    
    //pegando o id 
    const id = pegaURL.searchParams.get('id')
    
    
    //pegando os campos do nome e e-mail.
    const inputNome = document.querySelector('[data-nome]');
    const inputEmail = document.querySelector('[data-email]');
    
    //auto preenchimento para editar.
    
    try {
        const dados = await clienteService.detalhaCliente(id)
        //.then(dados => {
            inputNome.value = dados.nome;
            inputEmail.value = dados.email;
        //})
    }
    catch(erro) {
        console.log(erro);
        window.location.href = '../telas/erro.html'
    }
   
    
    
    //primeiro temos que procurar onde está o formulário na página.
    const formulario = document.querySelector('[data-form]');
    
    formulario.addEventListener('submit', async (evento) =>{
        evento.preventDefault();
        try {
            await clienteService.atualizarCliente(id, inputNome.value, inputEmail.value)
            //.then(() => {
                window.location.href = "../telas/edicao_concluida.html"
            //})
        }
        catch (erro) {
            console.log(erro);
            window.location.href = '../telas/erro.html'
        }
    })
})();
import {clienteService} from '../service/cliente-service.js';

//vamos percorrer o DOM.
const formulario = document.querySelector('[data-form]')

//evento de escutar quando o botão for clicado.
formulario.addEventListener('submit', async (evento) => {//ouvindo o formulario, no botão submite, logo depois execultar algo.
    
    //prevenir o padrão do formulário que é enviar sem chegar o que está logo abaixo.
    evento.preventDefault();

    try {
        const nome = evento.target.querySelector('[data-nome]').value //no alvo do evento fazer um seletor de data-nome e data-email, buscando os campos dos inputs
        //e os valores que é representado no value
        const email = evento.target.querySelector('[data-email]').value
    
        //para onde enviar esse dados?
        await clienteService.criarCliente(nome, email)//criarcliente recebe como paremetro as constante nome e e-mail criado logo acima.
        //.then(() =>{
            window.location.href = '../telas/cadastro_concluido.html'
            //este comando logo acima faz, window minha tela inteira, 
            //location onde estou, 
            //onde vou enviar href, ou seja vai redirecionar para o caminho especificado.
        // })
    }
   catch(erro) {
       console.log(erro);
       window.location.href = '../telas/erro.html'
   }
})


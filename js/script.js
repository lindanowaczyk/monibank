import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]')

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const listaRespostas = { // selecionando respostas do formulário para salvar as informações na localStorage
        'nome': e.target.elements['nome'].value,
        'email': e.target.elements['email'].value,
        'rg': e.target.elements['rg'].value,
        'cpf': e.target.elements['cpf'].value,
        'aniversario': e.target.elements['aniversario'].value
    }

    localStorage.setItem('cadastro', JSON.stringify(listaRespostas)) 
    // localStorage.setItem(): armazeno os dados dos inputs na localStorage; 
    // 'cadastro': chave onde serão armazenados esses dados; 
    // JSON.stringify(): é uma função que converte um objeto JavaScript em uma string no formato JSON. Isso é necessário porque o localStorage só pode armazenar strings, não objetos JavaScript diretamente; 
    // JSON.stringify(listaRespostas): valores que serão armazenados na key 'cadastro'

    window.location.href = './abrir-conta-form-2.html' // redirecionar o usuário para a próxima página
})

camposDoFormulario.forEach((campo) => { // para cada campo da lista de formulários
    campo.addEventListener('blur', () => verificaCampo(campo)) // evento que está esperando acontecer: 'blur', que tem é quando tira o foco do input, ou seja, escrevi em um campo, depois tirei o foco dele e escrevi em outro, isso é chmamado de 'blur'
    campo.addEventListener('invalid', evento => evento.preventDefault()) // remove a mensagem de pop-up padrão do navegador quando tenta avançar sem preencher o campo de nome
})

const tiposDeErro = [
    'valueMissing', // erro que indica quando o campo está vazio
    'typeMismacth', // o tipo da informação que eu coloco não se relaciona com o que se espera, por exemplo, o email espera receber @gmail.com, url espera uma url, se eu colocar diferente, vai cair nesse erro
    'patternMismatch', // seguir o padrão do que se espera, ex: cpf
    'tooShort', // erro que aparece ao digitar menos ou mais caracteres do que foi pré-estabalecido no minlength e no maxLength do html
    'customError' // erros customizados, ex: lógica que construímos no código para validar cpf, idade
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Aceite os termos para continuar.',
    }
}

function verificaCampo(campo) { 
    let mensagem = ''
    campo.setCustomValidity('')

    if (campo.name == 'cpf' && campo.value.length >= 11) { 
        ehUmCPF(campo)
    }

    if (campo.name == 'aniversario' && campo.value != '') {
        ehMaiorDeIdade(campo)
    }

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]
            console.log(mensagem);
        }
    })

    // inserindo mensagem de erro do console para a tela do usuário
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro') // o parentNode nos ajuda a subir um nível na estrutura HTML e selecionar o elemento pai do input, para então encontrar o span com a classe mensagem-erro que está logo abaixo dele
    const validadorDeInput = campo.checkValidity()

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem
    } else {
        mensagemErro.textContent = ''
    }
}
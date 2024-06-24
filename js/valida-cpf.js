export default function ehUmCPF(campo) { // export default: função exportada padrão
    const cpf = campo.value.replace(/\.|-/g, '') // método replace: substituir uma string por outra; remove os . e - para 'nada', deixando apenas os números; g: global, remove em todas as ocorrências do padrão
    // console.log(cpf); // quando eu digitar um cpf com os caracteres especiais, imprime somente os números no console

    // validaNumerosRepetidos(cpf)
    // validaPrimeiroDigito(cpf)
    // console.log(validaNumerosRepetidos(cpf));

    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        // console.log('Esse CPF é inválido ou não existe!');
        campo.setCustomValidity('Esse CPF é inválido')
    } 
}

function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [ // lista de números repetidos que não podem ser cpf
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    // verificando se o cpf digitado no input tem os números repetidos acima ou não
    return numerosRepetidos.includes(cpf) // percorre toda a lista, se ele achar o cpf na lista, então ele retorna true (cpf repetido), se não, retorna false (cpf não repetido)
}

// PASSO A PASSO: verificando se o cpf é válido a partir de um cálculo que resulta no primeiro dígito verificador (ex: xxx.xxx.xxx-67, o 6 é o primeiro dígito verificador)
// fórmula para obter o primeiro dígito verificador:
//  1. multiplica cada um dos 9 primeiros números por 10 a 2 (076.638.282-67 --> [0 * 10], [7 * 9], [6 * 8], [6 * 7], [3 * 6], etc)
//  2. soma todos esses resultados (armazenados na variável 'soma')
//  3. divide o resultado por 11 e pega o resto da divisão
//  4. se o resto for 10 ou 11, o primeiro dígito verificador é 0
//  5. se o resto for diferente de 10 ou 11, o dígito verificador é o próprio resto

function validaPrimeiroDigito(cpf) {
    let soma = 0
    let multiplicador = 10 // começa em 10 e vai decrescendo até 2; passo 1

    for (let tamanho = 0; tamanho < 9; tamanho++) { // pego os primeiros 9 dígitos
        soma += cpf[tamanho] * multiplicador // adiciono a multiplicação do dígito do cpf com o multiplicador da vez a variável; passo 2
        multiplicador-- // decremento 1 do valor do multiplicador
    }

    soma = (soma * 10) % 11 // essa multiplicação por 10 é da fórmula; pego o resto da divisão; passo 3

    if (soma == 10 || soma == 11) { // verificando se o dígito do resto é 10 ou 11; passo 4
        soma = 0
    }
    
    // verifica se o valor calculado para o primeiro dígito verificador (soma) é diferente do primeiro dígito verificador do CPF (cpf[9])
    // Se soma for diferente de cpf[9], a função retornará true, indicando que o CPF é inválido. Caso contrário, retornará false, indicando que o CPF é válido
    return soma != cpf[9] // cpf[9]: referência ao 10º dígito do CPF, que é o primeiro dígito verificador
}

function validaSegundoDigito(cpf) { // validar o segundo dígito verificador; aumenta 1 dígito, então são 10 e não 9
    let soma = 0
    let multiplicador = 11

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador
        multiplicador--
    }

    soma = (soma * 10) % 11

    if (soma == 10 || soma == 11) { 
        soma = 0
    }

    return soma != cpf[10] 
}
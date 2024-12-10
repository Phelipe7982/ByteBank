// Importação dos arquivos
import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import SaldoComponent from "./saldo-component.js";      // É importado dessa forma quando usamos export default no outro arquivo
import Conta from "../types/Conta.js";                  // É importado dessa forma quando usamos export default no outro arquivo
import ExtratoComponent from "./extrato-component.js";

// Pegando o elemento form do HTML usando o querySelector e no final adicionando o "HTMLFormElement"
const elementoFormulario = document.querySelector(".block-nova-transacao form") as HTMLFormElement;

// Evento para caso um ou mais de um input do form não esteja preenchido, dê um alert na tela
elementoFormulario.addEventListener("submit", function (event) {
    // Bloco Try e Catch para tratar o erros do usuário
    try {
        event.preventDefault();     // Para não atualizar a página quando clicar no botão submit
        if (!elementoFormulario.checkValidity()) {          // Checa se todo o formulário foi preenchido
            alert("Por favor, preencha todos os campos da transação!");
            return;
        }

        // Pegando os elementos inputs dos form usando "HTMLSelectElement" e "HTMLInputElement" nos mesmos
        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao") as HTMLSelectElement;
        const inputValor = elementoFormulario.querySelector("#valor") as HTMLInputElement;
        const inputData = elementoFormulario.querySelector("#data") as HTMLInputElement;

        // Pegando os valores dos mesmos
        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let valor: number = inputValor.valueAsNumber;   // Em input type number, usamos "valueAsNumber" em TypeScript
        let data: Date = new Date(inputData.value + " 00:00:00");

        // Criando um objeto novaTransacao e guardando os valores nele pra dar log em todo novo tipo de transação efetuada
        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        };

        Conta.registrarTransacao(novaTransacao);        // Faz a função "registrarTransacao" dentro de Conta
        SaldoComponent.atualizar();        // Atualiza o saldo na tela e na variável Saldo no arquivo Conta
        ExtratoComponent.atualizar();       // Atualiza o extrato a cada transação
        elementoFormulario.reset();         // Reseta os elementos do formulário depois da transação
    }
    catch (error) {
        console.error(error);       // Para logar o erro
        alert(error.message);       // Para pegar a mensagem do erro e jogar na tela para o usuário
    }
});
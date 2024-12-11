// Importação dos arquivos
import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";

// Pega os elementos HTML que mostram o saldo e a data de acesso do usuário, mostrados na tela
const elementoSaldo = document.querySelector(".saldo-valor .valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(".block-saldo time") as HTMLElement;
const elementoIconeOlho = document.querySelector(".saldo-valor #icon-eye") as HTMLElement;

// Se a data de acesso não for nula (se ela existir), coloque na tela a data de hoje com a formatação específica
if (elementoDataAcesso != null) {
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}

// Função para atualizar o saldo do usuário
function renderizarSaldo(): void {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
}

// Atualiza o saldo do usuário na tela inicial
renderizarSaldo();

// Adiciona evento de clique ao ícone de olho
elementoIconeOlho.addEventListener("click", () => {
    if (elementoSaldo != null) {
        elementoSaldo.classList.toggle("blurred"); // Alterna a classe CSS
    }
});


// Objeto que serve para guardar um método de atualizar o saldo da conta do usuário e depois renderizar o saldo na tela
const SaldoComponent = {
    atualizar: function (): void {
        renderizarSaldo();
    }
}

// Exporta esse objeto como default
export default SaldoComponent;
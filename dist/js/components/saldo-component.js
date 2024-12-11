import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
const elementoIconeOlho = document.querySelector(".saldo-valor #icon-eye");
if (elementoDataAcesso != null) {
    elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
}
function renderizarSaldo() {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
}
renderizarSaldo();
elementoIconeOlho.addEventListener("click", () => {
    if (elementoSaldo != null) {
        elementoSaldo.classList.toggle("blurred");
    }
});
const SaldoComponent = {
    atualizar: function () {
        renderizarSaldo();
    }
};
export default SaldoComponent;

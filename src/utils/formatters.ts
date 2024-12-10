// Importação do arquivo da enum de formatos de datas diferentes
import { FormatoData } from "../types/FormatoData.js";

// Função para formatar o texto que é um número em uma string de valor monetário brasileiro
export function formatarMoeda(valor: number): string {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

// Função para formatar a data com o tipo específico que a gente vai querer para cada caso
export function formatarData(data: Date, formato: FormatoData = FormatoData.PADRAO): string {
    if (formato === FormatoData.DIA_SEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    } else if (formato === FormatoData.DIA_MES) {
        return data.toLocaleDateString("pt-br", { day: "2-digit", month: "2-digit" });
    }

    return data.toLocaleDateString("pt-br");
}
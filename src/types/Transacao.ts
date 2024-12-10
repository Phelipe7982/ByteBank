// Importação do arquivo da enum de tipos de transação
import { TipoTransacao } from "./TipoTransacao.js";

// Nossa type Transação que terá 3 subvertentes: o tipo da transação (que puxará aquela nossa enum TipoTransacao), o valor e a data da mesma
export type Transacao = {
    tipoTransacao: TipoTransacao;
    valor: number;
    data: Date;
}
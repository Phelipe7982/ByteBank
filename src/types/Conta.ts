// Este arquivo tem como responsabilidade controlar tudo relacionado aos dados e responsabilidades da conta do usuário

// Importação dos arquivos
import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";

// Variável que armazena o valor do saldo do usuário puxada do localStorage
let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;

// Constante para armazenar em um array as transações realizadas puxada do localStorage
const transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
    if (key == "data") {
        return new Date(value);     // Tratando o atributo data do objeto transacoes
    }

    return value;
}) || []; // Caso não possua nada no localStorage ele cria um array vazio na variável

// Função para quando a pessoa escolher debitar
function debitar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser debitado deve ser maior que zero.");     // Criando um erro para a aplicação entender que há algo de errado
    }
    if (valor > saldo) {
        throw new Error("Saldo insuficiente!");     // Estes erros serão tratados no Try Catch de "nova-transacao-component.ts"
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString());
}

// Função para quando a pessoa escolher depositar
function depositar(valor: number): void {
    if (valor <= 0) {
        throw new Error("O valor a ser depositado deve ser maior que zero.");
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
}

// Objeto Conta que tem funções em si para retornar o saldo, retornar a data de acesso e de registrar a transação do usuário respectivamemte
const Conta = {
    getSaldo() {
        return saldo;
    },

    getDataAcesso(): Date {
        return new Date();
    },

    getGruposTransacoes(): GrupoTransacao[] {
        const GrupoTransacoes: GrupoTransacao[] = [];
        const ListaTransacoes: Transacao[] = structuredClone(transacoes);   // Comando novo do Js que permite copiar de forma profunda a estrutura do objeto sem modificar o objeto original (mais segurança)
        const TransacoesOrdenadas: Transacao[] = ListaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());       // Ordenando por data mais atual para as mais antigas
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of TransacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });

            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                GrupoTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }

            // .at(-1) é para pegar a última transação (o último item do array)
            GrupoTransacoes.at(-1).transacoes.push(transacao);
        }

        return GrupoTransacoes;
    },

    registrarTransacao(novaTransacao: Transacao): void {            // Usando nossa type Transacao
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {        // Usando nossa Enum TipoTransacao
            depositar(novaTransacao.valor);     // Se a pessoa for depositar, roda a função depositar()
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);       // Se a pessoa for fazer uma transferência ou um pagamento, roda a função debitar()
            novaTransacao.valor *= -1;          // Multiplicando por -1 para mudar o sinal para apresentar no extrato
        }
        else {
            throw new Error("Tipo de transação inválido!");       // Criei um novo erro para avisar a aplicação que ouve uma ação inesperada
        }
        transacoes.push(novaTransacao)
        console.log(this.getGruposTransacoes());         // Mostra no log o objeto da transação
        localStorage.setItem("transacoes", JSON.stringify(transacoes));
    }
}

// Exporta esse objeto como default
export default Conta;
// app/screens/logic/LogicaJogo.ts
import { JogoInfo } from "../Jogo";

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const logicaAvancar = (jogoInfo: JogoInfo, custoPoder: number): JogoInfo => {
  let { lider, pais } = jogoInfo;
  let ano = lider.ano;
  let mes: number = jogoInfo.mes ?? 0; // Inicia em Janeiro caso não tenha valor

  // Atualiza o mês e ano
  mes += 1;
  if (mes >= 12) {
    mes = 0; // Reset para Janeiro
    ano += 1; // Avança o ano
  }

  // Defina as variáveis de economia e popularidade
  const receitaTotalEconomia = 1000; // Exemplo de valor, ajuste conforme necessário
  const despesaTotalEconomia = 500; // Exemplo de valor, ajuste conforme necessário
  const saldoEconomia = (jogoInfo.saldoEconomia || pais.saldoEconomia) + receitaTotalEconomia - despesaTotalEconomia;
  const popularidade = jogoInfo.popularidade ?? 50; // Inicializa popularidade em 50 se não estiver definido

  // Define o incremento de poder com base na popularidade
  let incrementoPoder;
  if (popularidade < 25) {
    incrementoPoder = 0.5;
  } else if (popularidade < 50) {
    incrementoPoder = 1;
  } else if (popularidade >= 50 && popularidade <= 85) {
    incrementoPoder = 2;
  } else {
    incrementoPoder = 3;
  }

  // Incrementa o poder do líder e garante que está dentro do limite de 0 a 15
  const novoPoder = Math.min(Math.max((jogoInfo.poder ?? 2) + incrementoPoder - custoPoder, 0), 15);

  const novoJogoInfo = {
    ...jogoInfo,
    lider: {
      ...lider,
      ano
    },
    poder: novoPoder, // Atualiza o poder
    mes, // Adiciona o mês ao estado do jogo
    saldoEconomia,
    popularidade
  };

  // Salva o saldoEconomia atualizado na memória
  novoJogoInfo.pais.saldoEconomia = saldoEconomia;

  return novoJogoInfo;
};

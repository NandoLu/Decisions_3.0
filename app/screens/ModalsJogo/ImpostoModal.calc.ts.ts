// Este arquivo contém as funções de cálculo para impostos, custo de poder e receita

interface ImpostoValores {
    pobre: number;
    medio: number;
    rico: number;
  }
  
  // Função para calcular o custo de poder
  export const calcularCustoPoder = (tempImposto: ImpostoValores, imposto: ImpostoValores): number => {
    return Math.abs(tempImposto.pobre - imposto.pobre) +
           Math.abs(tempImposto.medio - imposto.medio) +
           Math.abs(tempImposto.rico - imposto.rico);
  };
  
  // Função para calcular a receita dos impostos
  export const calcularReceitaImposto = (tempImposto: ImpostoValores): number => {
    return (tempImposto.pobre * 3) + (tempImposto.medio * 5) + (tempImposto.rico * 8);
  };
  
  // Função para calcular o status do botão de salvar (se está desabilitado ou não)
  export const calcularStatusSalvar = (custo: number, poder: number): boolean => {
    return custo > poder || custo === 0;
  };
  
  /**
   * Futuramente, ao adicionar novos sliders, você deve:
   * 1. Adicionar o novo valor no objeto `tempImposto` e `imposto`.
   * 2. Multiplicar o novo valor pelo seu respectivo multiplicador na função `calcularReceitaImposto`.
   * 3. Adicionar o cálculo do custo para esse novo valor na função `calcularCustoPoder` (caso haja um custo específico para ele).
   * 
   * Por exemplo, se adicionar um novo slider para "classeMedia" com valor multiplicado por 6, você faria algo como:
   * - Adicionar `classeMedia` ao objeto `tempImposto` e `imposto`.
   * - Multiplicar `tempImposto.classeMedia * 6` na função `calcularReceitaImposto`.
   * - Ajustar a fórmula de `calcularCustoPoder` se a classe tiver um custo diferente.
   */
  
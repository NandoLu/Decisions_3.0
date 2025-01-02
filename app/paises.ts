// app/paises.ts
import { ImageSourcePropType } from "react-native";

export interface Lider {
  nome: string;
  foto: ImageSourcePropType;
  ano: number;
  poder: number;
}

export interface Pais {
  nome: string;
  PIB: number;
  populacao: number;
  bandeira: ImageSourcePropType;
  saldoEconomia: number; // Adiciona saldoEconomia aos atributos do país
  lideres: Lider[];
}

export const paises: Pais[] = [
  {
    nome: "Brasil",
    PIB: 1847020000000,
    populacao: 212600000,
    bandeira: require("../assets/img/brasil.png"),
    saldoEconomia: 5000, // Valor de exemplo
    lideres: [
      { nome: "Getúlio Vargas", foto: require("../assets/img/vargas.png"), ano: 1930, poder: 10 },
      { nome: "Juscelino Kubitschek", foto: require("../assets/img/jk.png"), ano: 1956, poder: 10 },
    ],
  },
  {
    nome: "URSS",
    PIB: 2500000000000,
    populacao: 293000000,
    bandeira: require("../assets/img/urss.png"),
    saldoEconomia: 8000, // Valor de exemplo
    lideres: [
      { nome: "Vladimir Lenin", foto: require("../assets/img/lenin.png"), ano: 1917, poder: 10 },
      { nome: "Joseph Stalin", foto: require("../assets/img/stalin.png"), ano: 1924, poder: 10 },
    ],
  },
  // Adicione mais países e líderes futuramente
];

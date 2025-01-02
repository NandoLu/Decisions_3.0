// app/screens/Jogo.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Alert, BackHandler, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../../styles/Jogo";
import { Pais, Lider } from "../paises";
import Header from "./JogoBar/Header";
import Footer from "./JogoBar/Footer";
import BotoesJogo from "./ModalsJogo/BotoesJogo";
import { logicaAvancar } from "./logic/LogicaJogo"; // Importe a lógica do jogo

export interface JogoInfo {
  pais: Pais;
  lider: Lider;
  mes?: number; // Adiciona o atributo mes ao estado do jogo
  saldoEconomia: number;
  popularidade: number;
  poder: number; // Adiciona o atributo poder ao estado do jogo
}

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function Jogo() {
  const router = useRouter();
  const [jogoInfo, setJogoInfo] = useState<JogoInfo | null>(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [custoPoder, setCustoPoder] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('jogoAtual');
      if (data) {
        const jogo = JSON.parse(data);
        // Inicializa popularidade em 50 se não estiver definido
        const popularidade = jogo.popularidade ?? 50;
        const poder = jogo.poder ?? 2; // Inicializa poder em 2 se não estiver definido
        // Define o estado inicial do jogo
        setJogoInfo({ ...jogo, popularidade, saldoEconomia: jogo.pais.saldoEconomia, poder });
      }
    };
    fetchData();

    const backAction = () => {
      Alert.alert(
        "Confirmar Retorno",
        "Deseja retornar ao menu ou continuar jogando?",
        [
          {
            text: "Continuar Jogando",
            onPress: () => {},
            style: "cancel",
          },
          { text: "Menu", onPress: () => router.push("/Menu") },
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [router]);

  const handleAvancar = () => {
    if (jogoInfo) {
      const novoJogoInfo = logicaAvancar(jogoInfo, custoPoder); // Passa os dois argumentos corretos
      setJogoInfo(novoJogoInfo);
      AsyncStorage.setItem('jogoAtual', JSON.stringify(novoJogoInfo));
      setBloqueado(false); // Desbloqueia os sliders
    }
  };

  const atualizarPoder = (novoPoder: number) => {
    if (jogoInfo) {
      const novoJogoInfo = { ...jogoInfo, poder: novoPoder };
      setJogoInfo(novoJogoInfo);
      AsyncStorage.setItem('jogoAtual', JSON.stringify(novoJogoInfo));
    }
  };

  const atualizarCustoPoder = (novoCusto: number) => {
    setCustoPoder(novoCusto);
  };

  if (!jogoInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Carregando informações do jogo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header jogoInfo={jogoInfo} />

      <View style={styles.botaoContainer}>
        <BotoesJogo 
          bloqueado={bloqueado} 
          setBloqueado={setBloqueado} 
          avancarTurno={handleAvancar} 
          poder={jogoInfo.poder}
          atualizarPoder={atualizarPoder}
          atualizarCustoPoder={atualizarCustoPoder} // Passa a função para atualizar o custo de poder
        />
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.advanceButton} onPress={handleAvancar}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <Footer jogoInfo={jogoInfo} /> 
    </View>
  );
}

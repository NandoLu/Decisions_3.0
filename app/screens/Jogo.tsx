import React, { useEffect, useState } from "react";
import { View, Text, Alert, BackHandler, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../../styles/Jogo";
import { Pais, Lider } from "../paises";
import Header from "./JogoBar/Header";
import Footer from "./JogoBar/Footer";
import BotoesJogo from "./ModalsJogo/BotoesJogo";
import { logicaAvancar } from "./logic/LogicaJogo";

export interface JogoInfo {
  pais: Pais;
  lider: Lider;
  mes?: number;
  saldoEconomia: number;
  popularidade: number;
  poder: number;
  impostos: { pobre: number; medio: number; rico: number };
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
  const [receitaImposto, setReceitaImposto] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await AsyncStorage.getItem('jogoAtual');
      const savedReceitaImposto = await AsyncStorage.getItem('receitaImposto');
      if (data) {
        const jogo = JSON.parse(data);
        const popularidade = jogo.popularidade ?? 50;
        const poder = jogo.poder ?? 2;
        setJogoInfo({ ...jogo, popularidade, saldoEconomia: jogo.pais.saldoEconomia, poder });
      }
      if (savedReceitaImposto) setReceitaImposto(JSON.parse(savedReceitaImposto));
    };
    fetchData();

    const backAction = () => {
      Alert.alert("Confirmar Retorno", "Deseja retornar ao menu ou continuar jogando?", [
        { text: "Continuar Jogando", style: "cancel" },
        { text: "Menu", onPress: () => router.push("/Menu") },
      ], { cancelable: false });
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [router]);

  const handleAvancar = () => {
    if (jogoInfo) {
      const novoJogoInfo = logicaAvancar(jogoInfo, custoPoder, receitaImposto);
      setJogoInfo(novoJogoInfo);
      AsyncStorage.setItem('jogoAtual', JSON.stringify(novoJogoInfo));
      setBloqueado(false);
    }
  };

  const atualizarEstado = (chave: keyof JogoInfo, valor: any) => {
    if (jogoInfo) {
      const novoJogoInfo = { ...jogoInfo, [chave]: valor };
      setJogoInfo(novoJogoInfo);
      AsyncStorage.setItem('jogoAtual', JSON.stringify(novoJogoInfo));
    }
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
          atualizarPoder={valor => atualizarEstado('poder', valor)}
          atualizarCustoPoder={setCustoPoder}
          atualizarReceitaImposto={valor => { setReceitaImposto(valor); AsyncStorage.setItem('receitaImposto', JSON.stringify(valor)); }}
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

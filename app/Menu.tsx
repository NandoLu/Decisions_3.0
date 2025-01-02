// app/Menu.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../styles/Menu";

export default function Menu() {
  const router = useRouter();
  const [continuarDisponivel, setContinuarDisponivel] = useState(false);

  useEffect(() => {
    const verificarJogoSalvo = async () => {
      const jogoAtual = await AsyncStorage.getItem('jogoAtual');
      setContinuarDisponivel(!!jogoAtual); // Define como disponível se houver um jogo salvo
    };

    verificarJogoSalvo();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <TouchableOpacity
        style={[styles.button, continuarDisponivel ? {} : styles.buttonDisabled]}
        onPress={() => continuarDisponivel && router.push("/screens/Jogo")}
        disabled={!continuarDisponivel}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/NovoJogo")}>
        <Text style={styles.buttonText}>Novo Jogo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/Configuracoes")}>
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/Apoiar")}>
        <Text style={styles.buttonText}>Apoiar</Text>
      </TouchableOpacity>
    </View>
  );
}

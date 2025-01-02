// app/NovoJogo.tsx
import React, { useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { paises, Pais, Lider } from "./paises";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../styles/NovoJogo";

export default function NovoJogo() {
  const router = useRouter();
  const [paisSelecionado, setPaisSelecionado] = useState<Pais | null>(null);
  const [liderSelecionado, setLiderSelecionado] = useState<Lider | null>(null);

  const iniciarJogo = async () => {
    if (paisSelecionado && liderSelecionado) {
      // Limpa o armazenamento anterior
      await AsyncStorage.removeItem('jogoAtual');

      // Salva o novo jogo com saldoEconomia e popularidade inicializados
      await AsyncStorage.setItem('jogoAtual', JSON.stringify({
        pais: paisSelecionado,
        lider: liderSelecionado,
        saldoEconomia: 1000, // Valor inicial, ajuste conforme necessário
       // Valor inicial, ajuste conforme necessário
      }));

      // Navega para a tela do jogo
      router.push('./screens/Jogo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Novo Jogo</Text>
      <Picker
        selectedValue={paisSelecionado ? paisSelecionado.nome : ""}
        onValueChange={(itemValue: any) => {
          const pais = paises.find(p => p.nome === itemValue);
          setPaisSelecionado(pais || null);
          setLiderSelecionado(null);  // Reseta o líder selecionado ao mudar o país
        }}
        style={{ height: 50, width: 250, marginVertical: 10 }}
      >
        {paises.map((pais) => (
          <Picker.Item key={pais.nome} label={pais.nome} value={pais.nome} />
        ))}
      </Picker>
      {paisSelecionado && (
        <Image source={paisSelecionado.bandeira} style={styles.countryImage} />
      )}
      {paisSelecionado && (
        <Picker
          selectedValue={liderSelecionado ? liderSelecionado.nome : ""}
          onValueChange={(itemValue: any) => {
            const lider = paisSelecionado.lideres.find(l => l.nome === itemValue);
            setLiderSelecionado(lider || null);
          }}
          style={{ height: 50, width: 250, marginVertical: 10 }}
        >
          {paisSelecionado.lideres.map((lider) => (
            <Picker.Item key={lider.nome} label={`${lider.nome} (${lider.ano})`} value={lider.nome} />
          ))}
        </Picker>
      )}
      {liderSelecionado && (
        <Image source={liderSelecionado.foto} style={styles.leaderImage} />
      )}
      <Button title="Iniciar" onPress={iniciarJogo} disabled={!paisSelecionado || !liderSelecionado} />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

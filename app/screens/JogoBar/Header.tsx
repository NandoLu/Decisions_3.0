// app/screens/JogoBar/Header.tsx
import React from "react";
import { View, Text, Image } from "react-native";
import { JogoInfo } from "../Jogo";
import { styles } from "../../../styles/Jogo";

interface HeaderProps {
  jogoInfo: JogoInfo;
}

export default function Header({ jogoInfo }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Image source={jogoInfo.pais.bandeira} style={styles.countryImage} />
      <Image source={jogoInfo.lider.foto} style={styles.leaderImageSmall} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Poder: {jogoInfo.poder}</Text> 
        <Text style={styles.infoText}>PIB: ${jogoInfo.pais.PIB.toLocaleString()}</Text>
        <Text style={styles.infoText}>População: {jogoInfo.pais.populacao.toLocaleString()}</Text>
      </View>
    </View>
  );
}

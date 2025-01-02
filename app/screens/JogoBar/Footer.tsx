// app/screens/JogoBar/Footer.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { JogoInfo } from "../Jogo";
import { styles } from "../../../styles/Jogo";

interface FooterProps {
  jogoInfo: JogoInfo;
}

export default function Footer({ jogoInfo }: FooterProps) {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const mesAtual = meses[jogoInfo.mes ?? 0];
  const anoAtual = jogoInfo.lider.ano;

  return (
    <View style={styles.footer}>
      <View style={styles.infoBar}>
        <Text style={styles.infoText}>Saldo Economia: {jogoInfo.saldoEconomia}</Text>
        <Text style={styles.infoText}>Popularidade: {jogoInfo.popularidade}</Text>
        <Text style={styles.infoText}>{mesAtual} / {anoAtual}</Text>
      </View>
      <View style={styles.footerBar}>
        <TouchableOpacity>
          <Image source={require("../../../assets/logo.png")} style={styles.footerImage} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../../../assets/logo.png")} style={styles.footerImage} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../../../assets/logo.png")} style={styles.footerImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

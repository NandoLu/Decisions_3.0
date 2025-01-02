// app/screens/ModalsJogo/BotoesJogo.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { styles } from "../../../styles/BotoesJogo";
import ImpostoModal from "./ImpostoModal";

interface BotoesJogoProps {
  bloqueado: boolean;
  setBloqueado: (bloqueado: boolean) => void;
  avancarTurno: () => void;
  poder: number;
  atualizarPoder: (novoPoder: number) => void;
  atualizarCustoPoder: (novoCusto: number) => void; // Adiciona a nova propriedade
}

export default function BotoesJogo({ bloqueado, setBloqueado, avancarTurno, poder, atualizarPoder, atualizarCustoPoder }: BotoesJogoProps) {
  const [impostoModalVisible, setImpostoModalVisible] = useState(false);

  const openImpostoModal = () => {
    setImpostoModalVisible(true);
  };

  const closeImpostoModal = () => {
    setImpostoModalVisible(false);
  };

  // Atualize aqui a função saveImpostoConfig para desabilitar os sliders
  const saveImpostoConfig = (impostos: { pobre: number; medio: number; rico: number }) => {
    setBloqueado(true); // Bloqueia os sliders após salvar
    avancarTurno(); // Avança o turno
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonContainer} onPress={openImpostoModal}>
          <Image source={require("../../../assets/logo.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Impostos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={require("../../../assets/logo.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Economia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={require("../../../assets/logo.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Trabalho</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={require("../../../assets/logo.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Educação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={require("../../../assets/logo.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Saúde</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={require("../../../assets/logo.png")} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Segurança</Text>
        </TouchableOpacity>
      </View>

      <ImpostoModal 
        visible={impostoModalVisible} 
        onClose={closeImpostoModal} 
        onSave={saveImpostoConfig} 
        bloqueado={bloqueado} 
        avancarTurno={avancarTurno} 
        poder={poder} 
        atualizarPoder={atualizarPoder}
        atualizarCustoPoder={atualizarCustoPoder} // Passa a nova propriedade
      />
    </View>
  );
}

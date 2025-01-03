import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../../../styles/ModalStyle";
import { calcularCustoPoder, calcularReceitaImposto, calcularStatusSalvar } from './ImpostoModal.calc.ts';  // Importa as funções de cálculos

interface ImpostoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (impostos: { pobre: number; medio: number; rico: number }, receitaImposto: number) => void;
  bloqueado: boolean;
  avancarTurno: () => void;
  poder: number;
  atualizarPoder: (novoPoder: number) => void;
  atualizarCustoPoder: (novoCusto: number) => void;
}

type ImpostoTipos = 'pobre' | 'medio' | 'rico';
interface ImpostoValores {
  pobre: number;
  medio: number;
  rico: number;
}

const ImpostoModal: React.FC<ImpostoModalProps> = ({
  visible,
  onClose,
  onSave,
  bloqueado,
  avancarTurno,
  poder,
  atualizarPoder,
  atualizarCustoPoder
}) => {
  const [imposto, setImposto] = useState<ImpostoValores>({ pobre: 0, medio: 0, rico: 0 });
  const [tempImposto, setTempImposto] = useState<ImpostoValores>({ pobre: 0, medio: 0, rico: 0 });
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [isSliderDisabled, setIsSliderDisabled] = useState<boolean>(false);
  const [custoPoder, setCustoPoder] = useState<number>(0);
  const [receitaImposto, setReceitaImposto] = useState<number>(0);

  useEffect(() => {
    const loadImpostos = async () => {
      try {
        const savedImpostos = await AsyncStorage.getItem('impostos');
        if (savedImpostos) {
          const parsedImpostos: ImpostoValores = JSON.parse(savedImpostos);
          setImposto(parsedImpostos);
          setTempImposto(parsedImpostos);
        } else {
          const data = await AsyncStorage.getItem('jogoAtual');
          if (data) {
            const jogo = JSON.parse(data);
            setImposto(jogo.impostos);
            setTempImposto(jogo.impostos);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar os impostos do AsyncStorage", error);
      }
    };

    if (visible) {
      loadImpostos();
    } else {
      // Restaura os valores originais dos sliders ao fechar o modal
      setTempImposto(imposto);
      setCustoPoder(0); // Cancela o custo de poder ao fechar
      atualizarCustoPoder(0); // Atualiza o custo de poder para 0 externamente
    }
  }, [visible]);

  useEffect(() => {
    const custo = calcularCustoPoder(tempImposto, imposto);
    const receita = calcularReceitaImposto(tempImposto);

    if (custo !== custoPoder) {
      setCustoPoder(custo);
      atualizarCustoPoder(custo);
    }

    if (receita !== receitaImposto) {
      setReceitaImposto(receita);
    }

    const isDisabled = calcularStatusSalvar(custo, poder);
    if (isDisabled !== isSaveDisabled) {
      setIsSaveDisabled(isDisabled);
    }
  }, [tempImposto, imposto, custoPoder, receitaImposto, poder]);

  const handleSliderChange = (value: number, type: ImpostoTipos) => {
    setTempImposto((prev) => ({ ...prev, [type]: value }));
  };

  const handleSave = async () => {
    if (custoPoder <= poder) {
      atualizarPoder(poder - custoPoder);
      setImposto(tempImposto);
      onSave(tempImposto, receitaImposto);
      await AsyncStorage.setItem('impostos', JSON.stringify(tempImposto));
      avancarTurno();
      setIsSliderDisabled(true);
      setTimeout(() => setIsSliderDisabled(false), 500);
      setIsSaveDisabled(true);
      setCustoPoder(0);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Configuração de Impostos</Text>

          {(['pobre', 'medio', 'rico'] as ImpostoTipos[]).map((type) => (
            <View key={type}>
              <Text>{`Imposto ${type.charAt(0).toUpperCase() + type.slice(1)}: ${tempImposto[type]}`}</Text>
              <Slider
                minimumValue={0} maximumValue={10} step={1}
                value={tempImposto[type]} onValueChange={(value) => handleSliderChange(value, type)}
                disabled={isSliderDisabled || bloqueado}
                minimumTrackTintColor={isSliderDisabled ? 'gray' : '#1EB1FC'}
                maximumTrackTintColor={isSliderDisabled ? 'gray' : '#1EB1FC'}
                thumbTintColor={isSliderDisabled ? 'gray' : '#1EB1FC'}
              />
            </View>
          ))}

          <Text style={styles.custoPoderText}>Custo de Poder: {custoPoder}</Text>
          <Text style={styles.custoPoderText}>Poder Atual: {poder}</Text>
          <Text style={styles.custoPoderText}>Receita Imposto: {receitaImposto}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={isSaveDisabled ? styles.buttonSaveDisabled : styles.buttonSaveActive}
              onPress={handleSave} disabled={isSaveDisabled}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImpostoModal;

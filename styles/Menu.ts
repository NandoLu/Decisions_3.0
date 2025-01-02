// styles/Menu.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: 200,  // Largura padrão para todos os botões
    padding: 10,  // Adiciona espaçamento interno
    alignItems: "center",
    backgroundColor: "#007BFF",  // Cor azul para os botões
  },
  buttonDisabled: {
    backgroundColor: "#A9A9A9",  // Cor cinza para o botão bloqueado
  },
  buttonText: {
    color: "#FFFFFF",  // Cor do texto dos botões
    textAlign: "center",
  },
});

// styles/BotoesJogo.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10, // Adiciona espaçamento entre as linhas
  },
  buttonContainer: {
    alignItems: "center",
    marginHorizontal: 5, // Adiciona espaçamento entre os botões
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  buttonText: {
    fontSize: 10,
    marginTop: 5,
    textAlign: "center",
  },
});

// styles/Jogo.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    padding: 0,
    paddingBottom: 10,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
  },
  infoBar: {
    backgroundColor: 'gray',
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: "center",
    height: 20,
  },
  footerBar:{
    width: "100%",
    padding: 0,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 10,
    marginBottom: 5,
  },
  countryImage: {
    width: 50,
    height: 25,
  },
  leaderImageSmall: {
    width: 50,
    height: 50,
  },
  leaderImage: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  footerImage: {
    width: 50,
    height: 50,
  },
  advanceButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 10,
  },
  footerText: {
    fontSize: 10,
  },
  botaoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

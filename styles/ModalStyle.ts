// styles/ModalStyle.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginVertical: 10,
  },
  slider: {
    width: 250,
    height: 40,
  },
  value: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonSaveDisabled: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  buttonSaveActive: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  custoPoderText:{
    color: "black",
    fontSize: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

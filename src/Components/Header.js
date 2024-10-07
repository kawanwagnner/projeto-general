import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.topo}>
      <Text style={styles.titulo}>InfoSass</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  topo: {
    width: "100%",
    height: 120,
    backgroundColor: "grey",
  },
  titulo: {
    width: "100%",
    margin: "auto",
    textAlign: "center",
    fontSize: 20,
    fontWeigth: "bold",
    paddingTop: 60,
  },
});

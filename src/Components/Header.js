import React from "react";
import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Header() {
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f5d"]}
      style={styles.topo}
    >
      <Text style={styles.tituloHeader}>Informações</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topo: {
    width: "100%",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
  },
  tituloHeader: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "capitalize",
    letterSpacing: 1.5,
  },
});

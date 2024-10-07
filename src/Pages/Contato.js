import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Contato() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contato</Text>
      <Text style={styles.content}>
        Se você tem alguma dúvida ou gostaria de entrar em contato conosco,
        envie um e-mail para suporte@app.com ou ligue para (11) 1234-5678.
      </Text>
      <Text style={styles.content}>
        Nossa equipe está disponível de segunda a sexta-feira, das 9h às 18h.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 24,
  },
});

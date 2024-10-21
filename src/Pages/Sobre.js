import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Sobre() {
  const [contatos, setContatos] = useState([]);

  const listContact = () => {
    // Função para buscar contatos do server
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre Nós</Text>
      <Text style={styles.content}>
        Bem-vindo ao nosso app! Somos apaixonados por tecnologia, inovação e em
        trazer soluções digitais que facilitam o seu dia a dia. Com uma equipe
        dedicada e focada na excelência, estamos comprometidos em oferecer as
        melhores experiências para nossos usuários. Aqui, acreditamos que cada
        detalhe importa, e estamos sempre buscando formas de melhorar e evoluir.
      </Text>
      <Text style={styles.content}>
        Nossa missão é criar impacto positivo através de produtos digitais que
        transformam a vida das pessoas. Estamos prontos para encarar novos
        desafios e alcançar novas conquistas juntos!
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    lineHeight: 24,
  },
});

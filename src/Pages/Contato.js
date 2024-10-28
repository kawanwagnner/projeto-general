import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [tel, settel] = useState("");

  const enviarContato = async () => {
    if (!nome || !tel) {
      Alert.alert("Erro, por favor preencha todos os campos!");
      return;
    }

    const novoContato = { nome, tel };

    axios
      .post("http://10.0.2.2:3000/contatos", novoContato)
      .then((resposta) => {
        if (resposta.status === 201) {
          Alert.alert("Sucesso, contato adicionado!");
          setNome("");
          settel("");
        } else {
          Alert.alert("Erro, falha ao adicionar contato.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu Nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Celular</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu WhatsApp"
        value={tel}
        onChangeText={settel}
      />

      <Button title="Enviar contato" onPress={enviarContato} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

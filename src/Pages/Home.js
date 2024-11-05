import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Card from "../Components/Card";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Bem-vindo(a) à Loja de Eletrônicos!</Text>

      <TextInput style={styles.searchBox} placeholder="Buscar produtos..." />

      <Text style={styles.sectionTitle}>Produtos Populares</Text>
      <View style={styles.productContainer}>
        <Card
          title="Smartphone X1"
          content="Smartphone de última geração com câmera de alta resolução."
          image={require("../../assets/smartphone.png")}
          buttonText="Ver mais"
          onPress={() => navigation.navigate("Produto", { produtoId: 1 })}
        />
        <Card
          title="Smart TV 50''"
          content="Experimente qualidade 4K com esta Smart TV incrível."
          image={require("../../assets/smarttv.png")}
          buttonText="Ver mais"
          onPress={() => navigation.navigate("Produto", { produtoId: 2 })}
        />
        <Card
          title="Fone de Ouvido Bluetooth"
          content="Desfrute de liberdade sem fio com áudio de alta qualidade."
          image={require("../../assets/headphones.png")}
          buttonText="Ver mais"
          onPress={() => navigation.navigate("Produto", { produtoId: 3 })}
        />
      </View>

      <Text style={styles.sectionTitle}>Categorias</Text>
      <View style={styles.categoryContainer}>
        <Button
          title="Celulares"
          onPress={() =>
            navigation.navigate("Categoria", { categoria: "Celulares" })
          }
        />
        <Button
          title="Televisores"
          onPress={() =>
            navigation.navigate("Categoria", { categoria: "Televisores" })
          }
        />
        <Button
          title="Áudio"
          onPress={() =>
            navigation.navigate("Categoria", { categoria: "Áudio" })
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  productContainer: {
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});

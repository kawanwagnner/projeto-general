import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BottomNavBar() {
  const navigation = useNavigation();
  const route = useRoute();

  // Função para verificar se a rota está ativa
  const isActive = (screenName) => route.name === screenName;

  return (
    <View style={styles.container}>
      {/* Botão Início */}
      <TouchableOpacity
        style={[styles.navButton, isActive("Home") && styles.active]}
        onPress={() => navigation.navigate("Home")}
      >
        {isActive("Home") && <View style={styles.activeLine} />}
        <Icon name="home" size={24} color="#000" />
        <Text style={styles.label}>Início</Text>
      </TouchableOpacity>

      {/* Botão Buscar */}
      <TouchableOpacity
        style={[styles.navButton, isActive("Search") && styles.active]}
        onPress={() => navigation.navigate("Search")}
      >
        {isActive("Search") && <View style={styles.activeLine} />}
        <Icon name="search" size={24} color="#000" />
        <Text style={styles.label}>Buscar</Text>
      </TouchableOpacity>

      {/* Botão Eventos */}
      <TouchableOpacity
        style={[styles.navButton, isActive("DetailsEvent") && styles.active]}
        onPress={() => navigation.navigate("DetailsEvent")}
      >
        {isActive("DetailsEvent") && <View style={styles.activeLine} />}
        <Icon name="calendar" size={24} color="#000" />
        <Text style={styles.label}>Eventos</Text>
      </TouchableOpacity>

      {/* Botão Perfil */}
      <TouchableOpacity
        style={[styles.navButton, isActive("Profile") && styles.active]}
        onPress={() => navigation.navigate("Profile")}
      >
        {isActive("Profile") && <View style={styles.activeLine} />}
        <Icon name="user" size={24} color="#000" />
        <Text style={styles.label}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#DDD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  navButton: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#000",
    marginTop: 5,
  },
  activeLine: {
    position: "absolute",
    top: -13,
    left: 23,
    right: 0,
    height: 3,
    width: 50,
    backgroundColor: "#000",
    borderRadius: 10,
  },
});

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function BottomNavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botão Início */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" size={24} color="#000" />
        <Text style={styles.label}>Início</Text>
      </TouchableOpacity>

      {/* Botão Buscar */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Search")}
      >
        <Icon name="search" size={24} color="#000" />
        <Text style={styles.label}>Buscar</Text>
      </TouchableOpacity>

      {/* Botão Eventos */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("DetailsEvent")}
      >
        <Icon name="calendar" size={24} color="#000" />
        <Text style={styles.label}>Eventos</Text>
      </TouchableOpacity>

      {/* Botão Perfil */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Profile")}
      >
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
  },
  label: {
    fontSize: 12,
    color: "#000",
    marginTop: 5,
  },
});

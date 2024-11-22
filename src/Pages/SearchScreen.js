import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import BottomNavBar from "../Components/BottomNavBar";

const screenWidth = Dimensions.get("window").width;

const sports = [
  {
    name: "Futsal",
    color: "#3A5F0B",
    uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
  },
  {
    name: "Corrida",
    color: "#E94E77",
    uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
  },
  {
    name: "Yoga",
    color: "#FFC0CB",
    uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
  },
  {
    name: "Fit Dance",
    color: "#FF69B4",
    uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
  },
  {
    name: "Natação",
    color: "#4682B4",
    uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
  },
  {
    name: "Vôlei",
    color: "#FFD700",
    uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
  },
  {
    name: "Basketball",
    color: "#A0522D",
    uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
  },
  {
    name: "Ginástica",
    color: "#2F4F4F",
    uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
  },
  {
    name: "Artes Marciais",
    color: "#8B0000",
    uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
  },
  {
    name: "Hip Hop",
    color: "#4B0082",
    uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
  },
];

export default function SearchScreen() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Esportes disponíveis</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {sports.map((sport, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <ImageBackground
                source={{ uri: sport.uri }}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
              >
                <View
                  style={[styles.overlay, { backgroundColor: sport.color }]}
                >
                  <Text style={styles.cardText}>{sport.name}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <BottomNavBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginBottom: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    width: screenWidth * 0.45,
    height: screenWidth * 0.3,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  overlay: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

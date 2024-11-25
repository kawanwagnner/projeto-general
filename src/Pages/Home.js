import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "../Components/BottomNavBar";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [populares, setPopulares] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));

    axios
      .get("http://localhost:3000/destaques")
      .then((response) => setDestaques(response.data))
      .catch((error) => console.error("Erro ao buscar destaques:", error));

    axios
      .get("http://localhost:3000/populares")
      .then((response) => setPopulares(response.data))
      .catch((error) => console.error("Erro ao buscar populares:", error));
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.location}>R. Sílvio Coelho De Alverga, 165</Text>

        {/* Popular Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Populares</Text>
          {populares.map((popular, index) => (
            <View key={index} style={styles.suggestionCard}>
              <ImageBackground
                source={{ uri: popular.uri }}
                style={styles.imageBackground}
                imageStyle={styles.cardImage}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>{popular.name}</Text>
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color="white"
                    style={styles.heartIcon}
                  />
                </View>
              </ImageBackground>
            </View>
          ))}
        </View>

        {/* Destaques Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destaques</Text>
          {destaques.map((destaque, index) => (
            <View key={index} style={styles.favoriteCard}>
              <ImageBackground
                source={{ uri: destaque.uri }}
                style={styles.imageBackground}
                imageStyle={styles.cardImage}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>{destaque.name}</Text>
                  <Text style={styles.cardSubtext}>
                    {destaque.date} às {destaque.time}
                  </Text>
                </View>
              </ImageBackground>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNavBar />
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    backgroundColor: "#F5F5F5",
    paddingTop: 60,
    marginBottom: 50,
  },
  location: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginLeft: 20,
    marginBottom: 10,
  },
  suggestionCard: {
    width: screenWidth * 0.9,
    alignSelf: "center",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
  },
  favoriteCard: {
    width: screenWidth * 0.9,
    alignSelf: "center",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
  },
  imageBackground: {
    height: 150,
    justifyContent: "flex-end",
  },
  cardImage: {
    borderRadius: 15,
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 15,
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  cardSubtext: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },
  heartIcon: {
    alignSelf: "flex-end",
    marginRight: 10,
  },
});

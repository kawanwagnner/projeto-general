import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "../Components/BottomNavBar";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [populares, setPopulares] = useState([]);
  const navigation = useNavigation();

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
        <Text style={styles.location}>
          Rock – Parque Olímpico – Barra da Tijuca, RJ
        </Text>

        {/* Popular Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Populares</Text>
          {populares &&
            populares.length > 0 &&
            populares.map((popular, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionCard}
                onPress={() =>
                  navigation.navigate("DetailsEvent", { event: popular })
                }
              >
                <ImageBackground
                  source={
                    popular.uri
                      ? { uri: popular.uri }
                      : require("../../assets/404.png")
                  }
                  style={styles.imageBackground}
                  imageStyle={styles.cardImage}
                >
                  <View style={styles.cardContent}>
                    <Text style={styles.cardText}>{popular.name}</Text>
                    <Text style={styles.cardSubtext}>
                      {popular.date} às {popular.time}
                    </Text>
                    <Ionicons
                      name="flame-outline"
                      size={20}
                      color="orange"
                      style={styles.heartIcon}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
        </View>

        {/* Destaques Section */}
        {/* Destaques Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destaques</Text>
          {destaques.map((destaque, index) => (
            <TouchableOpacity
              key={index}
              style={styles.favoriteCard}
              onPress={() =>
                navigation.navigate("DetailsEvent", { event: destaque })
              }
            >
              <ImageBackground
                source={
                  destaque.uri
                    ? { uri: destaque.uri }
                    : require("../../assets/404.png")
                }
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
            </TouchableOpacity>
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

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.location}>R. Sílvio Coelho De Alverga, 165</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sugestões</Text>
        <View style={styles.suggestionCard}>
          <ImageBackground
            source={{ uri: "../../assets/judo.png" }}
            style={styles.imageBackground}
            imageStyle={styles.cardImage}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Judô - ring y</Text>
              <Ionicons
                name="heart-outline"
                size={20}
                color="white"
                style={styles.heartIcon}
              />
            </View>
          </ImageBackground>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favoritos</Text>

        <View style={styles.favoriteCard}>
          <ImageBackground
            source={{ uri: "https://via.placeholder.com/300x150" }} // Substitua pela URL da imagem do futsal
            style={styles.imageBackground}
            imageStyle={styles.cardImage}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Futsal na quadra y</Text>
              <Text style={styles.cardSubtext}>Quarta - 17/08 às 09:30</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.favoriteCard}>
          <ImageBackground
            source={{ uri: "https://via.placeholder.com/300x150" }} // Substitua pela URL da imagem de natação
            style={styles.imageBackground}
            imageStyle={styles.cardImage}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Natação na piscina x</Text>
              <Text style={styles.cardSubtext}>Sábado - 19/09 às 09:30</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.favoriteCard}>
          <ImageBackground
            source={{ uri: "https://via.placeholder.com/300x150" }}
            style={styles.imageBackground}
            imageStyle={styles.cardImage}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Corrida na orla</Text>
              <Text style={styles.cardSubtext}>Domingo - 21/03 às 09:30</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    backgroundColor: "#F5F5F5",
    paddingTop: 60,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    marginRight: 10,
  },
});

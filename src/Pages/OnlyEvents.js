import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function OnlyEventScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { cantores } = route.params;

  // Função para navegar para a tela de detalhes
  const navigateToDetails = (cantor) => {
    navigation.navigate("DetailsEvent", { event: cantor });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Cantores Disponíveis</Text>
      {cantores.map((cantor, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => navigateToDetails(cantor)} // Navegar para a tela de detalhes
        >
          <ImageBackground
            source={{ uri: cantor.uri }}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.overlay}>
              <Text style={styles.cardText}>{cantor.name}</Text>
              <Text style={styles.cardSubtext}>
                {cantor.date} às {cantor.time}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingBottom: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 20,
    marginVertical: 20,
  },
  card: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.4,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    alignSelf: "center",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#00000060",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cardText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardSubtext: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});

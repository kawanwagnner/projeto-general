import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import BottomNavBar from "../Components/BottomNavBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function DetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { event } = route.params || {}; // Garante que `event` não será undefined

  if (!event) {
    // Mostra uma mensagem se o evento não foi passado
    return (
      <View style={styles.noEventContainer}>
        <Text style={styles.noEventText}>
          Nenhum evento selecionado. Por favor, volte para a Home e escolha um
          evento.
        </Text>
        <TouchableOpacity
          style={styles.goHomeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.goHomeButtonText}>Ir para a Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evento</Text>
          <View style={styles.suggestionCard}>
            <ImageBackground
              source={{
                uri: event.uri, // Imagem do evento recebido
              }}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardText}>{event.name}</Text>
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
        <Text style={styles.monthText}>Confirme as Informações</Text>
        <Calendar
          style={styles.calendar}
          theme={{
            selectedDayBackgroundColor: "#8B0000",
            todayTextColor: "#8B0000",
            arrowColor: "#8B0000",
            textSectionTitleColor: "#000",
            textDayFontWeight: "600",
            textMonthFontWeight: "bold",
            textDayStyle: styles.dayText,
          }}
          markedDates={{
            [event.date]: {
              selected: true,
              marked: true,
              selectedColor: "#8B0000",
            },
          }}
        />
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            DIA {event.date} às {event.time}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>Pegar meu ingresso ›</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 70,
  },
  noEventContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noEventText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  goHomeButton: {
    backgroundColor: "#8B0000",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  goHomeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  suggestionCard: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.5,
    alignSelf: "center",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  cardContent: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#000",
  },
  calendar: {
    borderWidth: 0,
    borderRadius: 10,
    marginVertical: 10,
  },
  dateButton: {
    backgroundColor: "#fff",
    borderColor: "#8B0000",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
  },
  dateButtonText: {
    color: "#8B0000",
    fontWeight: "600",
  },
  infoButton: {
    backgroundColor: "#8B0000",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 15,
  },
  infoButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

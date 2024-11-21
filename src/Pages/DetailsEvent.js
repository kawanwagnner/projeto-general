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

const screenWidth = Dimensions.get("window").width;

export default function DetailsScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evento</Text>
          <View style={styles.suggestionCard}>
            <ImageBackground
              source={{
                uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
              }}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
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
        <Text style={styles.monthText}>Dezembro 2021</Text>
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
            "2021-12-18": {
              selected: true,
              marked: true,
              selectedColor: "#8B0000",
            },
          }}
          dayComponent={({ date, state }) => (
            <View
              style={[
                styles.dayContainer,
                date.day === 18 && styles.selectedDay,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  state === "disabled" ? styles.disabledDayText : null,
                  date.day === 18 ? styles.selectedDayText : null,
                ]}
              >
                {date.day}
              </Text>
            </View>
          )}
        />
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateButtonText}>DIA 18/12 às 7:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>MAIS INFORMAÇÕES ›</Text>
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
    resizeMode: "cover", // Mantém a proporção da imagem
  },
  cardContent: {
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Fundo semi-transparente para melhor legibilidade do texto
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
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  disabledDayText: {
    color: "#d9e1e8",
  },
  selectedDay: {
    backgroundColor: "#8B0000",
    borderRadius: 20,
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
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
  },
});

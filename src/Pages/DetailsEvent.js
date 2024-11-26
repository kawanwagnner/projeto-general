import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";
import BottomNavBar from "../Components/BottomNavBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, useNavigation } from "@react-navigation/native";

const DetailsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
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
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          }
          accessible={true}
          accessibilityLabel="Botão para voltar à tela inicial"
        >
          <Text style={styles.goHomeButtonText}>Ir para a Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Seção do Evento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evento</Text>
          <View style={styles.suggestionCard}>
            <ImageBackground
              source={{
                uri: event.uri,
              }}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardText}>{event.name}</Text>
                <TouchableOpacity
                  onPress={() => console.log("Favoritado!")}
                  accessible={true}
                  accessibilityLabel="Botão para favoritar este evento"
                >
                  <Ionicons
                    name="heart-outline"
                    size={20}
                    color="white"
                    style={styles.heartIcon}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Calendário e Data */}
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
          }}
          markedDates={{
            [event.date]: {
              selected: true,
              marked: true,
              selectedColor: "#8B0000",
            },
          }}
          dayComponent={({ date, state }) => {
            const [day, month, year] = event.date.split("/");
            const eventDate = new Date(`${year}-${month}-${day}`);

            const eventDay = eventDate.getDate() + 1;
            const eventMonth = eventDate.getMonth() + 1;
            const eventYear = eventDate.getFullYear();

            const currentDay = date.day;
            const currentMonth = date.month;
            const currentYear = date.year;

            const isSelectedDay =
              currentDay === eventDay &&
              currentMonth === eventMonth &&
              currentYear === eventYear;

            return (
              <View
                style={[
                  styles.dayContainer,
                  isSelectedDay && styles.selectedDay,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    state === "disabled" ? styles.disabledDayText : null,
                    isSelectedDay ? styles.selectedDayText : null,
                  ]}
                >
                  {date.day}
                </Text>
              </View>
            );
          }}
        />

        {/* Botões */}
        <TouchableOpacity
          style={styles.dateButton}
          accessible={true}
          accessibilityLabel={`Botão com informações: dia ${event.date} às ${event.time}`}
        >
          <Text style={styles.dateButtonText}>
            DIA {event.date} às {event.time}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setModalVisible(true)} // Exibe o modal ao clicar
          accessible={true}
          accessibilityLabel="Botão para obter ingressos"
        >
          <Text style={styles.infoButtonText}>Pegar meu ingresso ›</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // Fecha ao pressionar "voltar"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#8B0000" />
            <Text style={styles.modalText}>Ingresso comprado com sucesso!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNavBar />
    </>
  );
};

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
    width: "100%",
    height: Dimensions.get("window").width * 0.5,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#8B0000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DetailsScreen;

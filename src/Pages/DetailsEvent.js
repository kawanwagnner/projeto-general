import React, { useState, useEffect } from "react";
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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ticketResgatado, setTicketResgatado] = useState(false);
  const [userId, setUserId] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { event } = route.params || {};

  if (!event) {
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
        >
          <Text style={styles.goHomeButtonText}>Ir para a Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUserId(parsedUserData.id);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
      }
    };

    const checkTicketStatus = async () => {
      if (!userId || !event) return;

      try {
        const userResponse = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        const user = userResponse.data;

        // Verifica se o ingresso já foi resgatado
        if (user.tickets && user.tickets.some((t) => t.name === event.name)) {
          setTicketResgatado(true); // Marca o ticket como resgatado
        }
      } catch (error) {
        console.error("Erro ao verificar o status do ingresso:", error);
      }
    };

    loadUserData(); // Carregar dados do usuário
    checkTicketStatus(); // Verificar o status do ticket
  }, [userId, event]); // Reexecutar quando userId ou event mudarem

  const handleGetTicket = async () => {
    if (ticketResgatado || !userId) return;

    const ticket = {
      eventId: event.id,
      name: event.name,
      date: event.date,
      time: event.time,
    };

    setLoading(true);
    setError(null);

    try {
      const userResponse = await axios.get(
        `http://localhost:3000/users/${userId}`
      );
      const user = userResponse.data;

      // Verifica se o ingresso já foi resgatado
      if (user.tickets && user.tickets.some((t) => t.name === event.name)) {
        setError("Ticket já resgatado.");
        setTicketResgatado(true); // Marca como já resgatado
        setLoading(false);
        return;
      }

      const updatedTickets = user.tickets
        ? [...user.tickets, ticket]
        : [ticket];

      const response = await axios.patch(
        `http://localhost:3000/users/${userId}`,
        {
          tickets: updatedTickets,
        }
      );

      if (response.status === 200) {
        setModalVisible(true);
        setTicketResgatado(true);
      }
    } catch (error) {
      console.error("Erro ao salvar o ingresso: ", error);
      setError("Houve um erro ao salvar o ingresso. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Evento</Text>
          <View style={styles.suggestionCard}>
            <ImageBackground
              source={{ uri: event.uri }}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardText}>{event.name}</Text>
                <TouchableOpacity onPress={() => console.log("Favoritado!")}>
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
        />
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            DIA {event.date} às {event.time}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.infoButton,
            ticketResgatado && { backgroundColor: "#28a745" }, // Cor verde quando o ingresso já foi resgatado
          ]}
          onPress={handleGetTicket}
          disabled={loading || ticketResgatado}
        >
          <Text style={styles.infoButtonText}>
            {loading
              ? "Carregando..."
              : ticketResgatado
              ? "Ingresso Resgatado"
              : "Pegar meu ingresso ›"}
          </Text>
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
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

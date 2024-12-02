import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"; // Para navegação

const screenWidth = Dimensions.get("window").width;

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserDataAndTickets = async () => {
      try {
        // Carregar os dados do usuário logado
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const userId = parsedUserData.id;
          setUserName(parsedUserData.name); // Atualizar o nome do usuário

          // Carregar os tickets do usuário
          const response = await axios.get(
            `http://localhost:3000/users/${userId}`
          );
          console.log("Tickets carregados:", response.data.tickets);
          setTickets(response.data.tickets || []);
        }
      } catch (error) {
        console.error(
          "Erro ao carregar os dados do usuário ou tickets:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadUserDataAndTickets();
  }, []);

  const handleDeleteTicket = async (ticketId) => {
    console.log("ticketId passado para a função:", ticketId); // Log para verificar o ID passado
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData.id;

        // Carregar os dados do usuário novamente, incluindo os tickets
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        console.log("Tickets antes da exclusão:", response.data.tickets);

        // Filtra o ticket que foi excluído
        const updatedTickets = response.data.tickets.filter(
          (ticket) => ticket.eventId !== ticketId // Use o campo correto para exclusão
        );
        console.log("Tickets após a exclusão:", updatedTickets);

        // Atualiza o banco de dados com a lista de tickets atualizada
        const patchResponse = await axios.patch(
          `http://localhost:3000/users/${userId}`,
          {
            tickets: updatedTickets,
          }
        );
        console.log("Resposta da atualização da API:", patchResponse.data);

        // Atualiza o estado local
        setTickets(updatedTickets);
        console.log("Estado local após a atualização:", updatedTickets);
      }
    } catch (error) {
      console.error("Erro ao excluir ticket:", error);
    }
  };

  const handleViewDetails = async (ticket) => {
    try {
      console.log("Ticket selecionado:", ticket); // Verifique se os dados estão corretos

      // Requisição ao endpoint de "destaques" para obter os eventos
      const destaqueResponse = await axios.get(
        "http://localhost:3000/destaques"
      );
      const destaques = destaqueResponse.data;

      // Buscar evento na lista de destaques com base no nome
      const eventInDestaques = destaques.find(
        (event) => event.name === ticket.name
      );
      console.log("Evento encontrado nos destaques:", eventInDestaques); // Verifique se o evento foi encontrado

      if (eventInDestaques) {
        // Se encontrado nos destaques, navegue para a tela de detalhes
        navigation.navigate("DetailsEvent", {
          event: eventInDestaques,
          imageUri: eventInDestaques.uri,
        });
      } else {
        // Se não encontrado nos destaques, buscar nas categorias > cantores
        const categoriesResponse = await axios.get(
          "http://localhost:3000/categories"
        );
        const categories = categoriesResponse.data;

        let eventInCategories = null;

        // Procurar o evento nas categorias
        categories.forEach((category) => {
          const foundInCategory = category.cantores.find(
            (cantor) => cantor.name === ticket.name
          );
          if (foundInCategory) {
            eventInCategories = foundInCategory;
          }
        });

        console.log("Evento encontrado nas categorias:", eventInCategories);

        if (eventInCategories) {
          // Se encontrado nas categorias, navegue para a tela de detalhes
          navigation.navigate("DetailsEvent", {
            event: eventInCategories,
            imageUri: eventInCategories.uri,
          });
        } else {
          console.error(
            "Evento não encontrado nos destaques nem nas categorias."
          );
        }
      }
    } catch (error) {
      console.error("Erro ao carregar o evento:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando os tickets...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <TicketCard
            key={index}
            ticket={ticket}
            userName={userName} // Passando o nome do usuário para o TicketCard
            onDelete={handleDeleteTicket}
            onViewDetails={handleViewDetails}
          />
        ))
      ) : (
        <Text style={styles.noTicketsText}>Nenhum ticket encontrado.</Text>
      )}
    </ScrollView>
  );
}

function TicketCard({ ticket, userName, onDelete, onViewDetails }) {
  const [randomGate, setRandomGate] = useState(null);

  useEffect(() => {
    // Gerar número aleatório entre 1 e 15
    const randomNumber = Math.floor(Math.random() * 15) + 1;
    setRandomGate(randomNumber);
  }, []);

  return (
    <View style={styles.cardWrap}>
      {/* Left Card */}
      <View style={styles.cardLeft}>
        <Text style={styles.header}>
          Evento <Text style={styles.event}>Musical</Text>
        </Text>
        <View style={styles.title}>
          <Text style={styles.subtitle}>Evento</Text>
          <Text style={styles.titleText}>{ticket.name}</Text>
        </View>
        <View style={styles.name}>
          <Text style={styles.subtitle}>Nome</Text>
          <Text style={styles.nameText}>{userName}</Text>
        </View>
        <View style={styles.seatTimeRow}>
          <View style={styles.seat}>
            <Text style={styles.subtitle}>Portão</Text>
            <Text style={styles.seatText}>{randomGate}</Text>
          </View>
          <View style={styles.time}>
            <Text style={styles.subtitle}>Horário</Text>
            <Text style={styles.timeText}>{ticket.time}</Text>
          </View>
        </View>
      </View>

      {/* Right Card */}
      <View style={styles.cardRight}>
        <TouchableOpacity onPress={() => onViewDetails(ticket)}>
          <View style={styles.eye}>
            <Ionicons name="eye-outline" size={20} color="#E84C3D" />
          </View>
        </TouchableOpacity>
        <View style={styles.number}>
          <Text style={styles.subtitle}>Portão</Text>
          <Text style={styles.numberText}>{randomGate}</Text>
        </View>
        <View style={styles.barcode}></View>

        {/* Lixeira */}
        <TouchableOpacity
          onPress={() => {
            console.log("ID do ticket para exclusão:", ticket.eventId); // Certifique-se de que está correto
            onDelete(ticket.eventId);
          }}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={25} color="#E84C3D" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrap: {
    flexDirection: "row",
    backgroundColor: "#E84C3D",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 20,
    alignSelf: "center",
    width: screenWidth * 0.9,
    height: 170,
  },
  cardLeft: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardRight: {
    flex: 1,
    backgroundColor: "#ECEDF2",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderLeftWidth: 1,
    borderLeftColor: "#FFFFFF",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E84C3D",
    marginBottom: 10,
  },
  event: {
    fontWeight: "normal",
  },
  title: {
    marginBottom: 10,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#343434",
  },
  subtitle: {
    fontSize: 10,
    color: "#A2AEAE",
    textTransform: "uppercase",
  },
  name: {
    marginBottom: 10,
  },
  nameText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#525252",
  },
  seatTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seat: {
    flexDirection: "column",
  },
  seatText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#525252",
  },
  time: {
    flexDirection: "column",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#525252",
  },
  eye: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E84C3D",
    borderWidth: 2,
  },
  number: {
    alignItems: "center",
  },
  numberText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E84C3D",
  },
  barcode: {
    width: "80%",
    height: 20,
    backgroundColor: "none",
    marginVertical: 10,
  },
  deleteButton: {
    position: "absolute",
    bottom: 15,
    right: 37,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  noTicketsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#A2AEAE",
  },
});

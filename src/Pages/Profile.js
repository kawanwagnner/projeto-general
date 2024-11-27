import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import BottomNavBar from "../Components/BottomNavBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importando AsyncStorage

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Função para carregar os dados do usuário armazenados no AsyncStorage
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          setUserData(JSON.parse(userData)); // Parseia os dados JSON armazenados
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
      }
    };

    loadUserData(); // Carregar dados assim que a tela for montada
  }, []);

  if (!userData) {
    // Exibe uma tela de carregamento ou mensagem caso não tenha dados
    return (
      <View style={styles.container}>
        <Text>Carregando dados do usuário...</Text>
      </View>
    );
  }

  // Função para formatar a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Janeiro é 0, então somamos 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {/* Foto de perfil */}
          <Image
            source={require("../../assets/profile.png")}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            {/* Exibindo os dados do usuário */}
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.lastName}>{userData.surname}</Text>
            <Text style={styles.activityText}>{userData.email}</Text>
            <Text style={styles.activityCount}>
              Entrou em {formatDate(userData.createdAt)}
            </Text>
          </View>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Tickets")}
          >
            <View style={styles.menuIcon}>
              <Ionicons name="list-outline" size={24} color="#94A98D" />
            </View>
            <Text style={styles.menuText}>Meus ingressos</Text>
            <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="#7F7FAF"
              />
            </View>
            <Text style={styles.menuText}>Sobre nós</Text>
            <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            // Limpar dados de login ao sair
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("userData");
            navigation.navigate("Login");
          }}
        >
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          <Text style={styles.logoutText}>Sair da conta</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#4C8D8D",
  },
  profileInfo: {
    marginLeft: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  lastName: {
    fontSize: 16,
    color: "#000",
  },
  activityText: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  activityCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4C8D8D",
  },
  menu: {
    marginVertical: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  menuIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#E6F4F4",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#4C8D8D",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});

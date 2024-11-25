import React from "react";
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

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/profile.png")}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Fernando</Text>
            <Text style={styles.lastName}>Dias</Text>
            <Text style={styles.activityText}>Tempo de atividade</Text>
            <Text style={styles.activityCount}>entrou em 2024</Text>
          </View>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
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
          onPress={() => navigation.navigate("Login")}
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

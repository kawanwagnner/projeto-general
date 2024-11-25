import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomNavBar from "../Components/BottomNavBar";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/splash.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>SPORTIVO</Text>
          <Text style={styles.subtitle}>Crie sua conta para começar</Text>
        </View>

        {/* Campos de Cadastro */}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#AAA"
        />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#AAA"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#AAA"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#AAA"
          secureTextEntry
        />

        {/* Botão de Cadastro */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Cadastrar &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Linha Divisória */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou cadastre-se com</Text>
          <View style={styles.divider} />
        </View>

        {/* Botões de Cadastro Social */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
            <Icon name="google" size={20} color="#FFF" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.socialButton, styles.linkedinButton]}
            >
              <Icon name="linkedin" size={20} color="#FFF" />
              <Text style={styles.socialButtonText}>LinkedIn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, styles.instagramButton]}
            >
              <Icon name="instagram" size={20} color="#FFF" />
              <Text style={styles.socialButtonText}>Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Link para Login */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLink}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F2F4F8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    marginBottom: 50,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderColor: "#DDD",
    borderWidth: 1,
  },
  actionContainer: {
    width: "100%",
    marginVertical: 15,
  },
  signupButton: {
    backgroundColor: "#0056b3",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  signupButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCC",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
    fontSize: 14,
  },
  socialContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    width: "100%",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: "#DB4437",
  },
  linkedinButton: {
    backgroundColor: "#0077B5",
    flex: 1,
    marginRight: 5,
  },
  instagramButton: {
    backgroundColor: "#E4405F",
    flex: 1,
    marginLeft: 5,
  },
  socialButtonText: {
    color: "#FFF",
    marginLeft: 10,
    fontSize: 16,
  },
  loginText: {
    marginTop: 30,
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#0056b3",
    fontWeight: "bold",
  },
});

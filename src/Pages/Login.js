import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ScrollView } from "react-native-web";

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/splash.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>SPORTIVO</Text>
          <Text style={styles.subtitle}>
            Seu aplicativo de práticas esportivas
          </Text>
        </View>

        {/* Campos de Login */}
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

        {/* Botão Esquecer Senha e Entrar */}
        <View style={styles.actionContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Entrar {">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Linha Divisória */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.divider} />
        </View>

        {/* Botões de Login Social */}
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

        {/* Link de Cadastro */}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupText}>
            Não tem uma conta ainda?{" "}
            <Text style={styles.signupLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 15,
  },
  forgotText: {
    color: "#007BFF",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#0056b3",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  loginButtonText: {
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
  signupText: {
    marginTop: 30,
    color: "#666",
    fontSize: 14,
  },
  signupLink: {
    color: "#0056b3",
    fontWeight: "bold",
  },
});

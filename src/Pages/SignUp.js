import React, { useReducer, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomNavBar from "../Components/BottomNavBar";
import { useNavigation } from "@react-navigation/native";

// Estado inicial do formulário
const initialState = {
  name: "",
  usuario: "",
  email: "", // Novo campo para email
  password: "",
};

// Redutor para gerenciar o estado do formulário
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default function SignupScreen() {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSignup = async () => {
    const { name, usuario, email, password } = state;

    // Verificação para garantir que o estado está correto
    console.log("Estado antes de enviar:", state);

    // Validações
    if (!name || !usuario || !email || !password) {
      setMessage("Todos os campos são obrigatórios.");
      setMessageType("error");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      // Validação de email
      setMessage("Por favor, insira um email válido.");
      setMessageType("error");
      return;
    }
    if (password.length < 6) {
      setMessage("A senha deve ter pelo menos 6 caracteres.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage(""); // Limpar mensagem antes de tentar cadastrar
    setMessageType("");

    try {
      // Verificar se o nome de usuário já está em uso
      const checkResponse = await fetch(
        `http://localhost:3000/users?usuario=${usuario}`
      );
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        setLoading(false);
        setMessage("Este nome de usuário já está em uso.");
        setMessageType("error");
        return;
      }

      // Cadastrar novo usuário com email e data de criação
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          usuario: usuario,
          email: email, // Enviando email
          password: password,
          createdAt: new Date().toISOString(), // Data de criação
          tickets: [],
          "photo-user": "none",
        }),
      });

      if (response.ok) {
        setMessage("Cadastro realizado com sucesso!");
        setMessageType("success");
        dispatch({ type: "RESET" });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000); // Redireciona após 2 segundos
      } else {
        setMessage("Erro ao realizar o cadastro.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMessage("Erro de conexão.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

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
        {["Nome", "Usuário", "Email", "Senha"].map((placeholder, index) => {
          let fieldName;
          if (placeholder === "Nome") {
            fieldName = "name";
          } else if (placeholder === "Usuário") {
            fieldName = "usuario";
          } else if (placeholder === "Email") {
            fieldName = "email"; // Para o campo email
          } else if (placeholder === "Senha") {
            fieldName = "password";
          }

          return (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#AAA"
              secureTextEntry={placeholder === "Senha"}
              value={state[fieldName]} // Referencia corretamente os campos do estado
              onChangeText={(value) =>
                dispatch({
                  type: "SET_FIELD",
                  field: fieldName, // Passa o nome correto do campo para o reducer
                  value,
                })
              }
            />
          );
        })}

        {/* Mensagem de Erro ou Sucesso */}
        {message ? (
          <View
            style={[
              styles.messageContainer,
              messageType === "error"
                ? styles.errorMessage
                : styles.successMessage,
            ]}
          >
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}

        {/* Botão de Cadastro */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.signupButtonText}>Cadastrar &gt;</Text>
            )}
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
          {[
            { name: "Google", icon: "google", color: "#DB4437" },
            { name: "LinkedIn", icon: "linkedin", color: "#0077B5" },
            { name: "Instagram", icon: "instagram", color: "#E4405F" },
          ].map((social, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.socialButton, { backgroundColor: social.color }]}
            >
              <Icon name={social.icon} size={20} color="#FFF" />
              <Text style={styles.socialButtonText}>{social.name}</Text>
            </TouchableOpacity>
          ))}
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
  messageContainer: {
    marginVertical: 1,
    padding: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  successMessage: {
    color: "#4CAF50",
  },
  errorMessage: {
    color: "#FF3B30",
  },
  messageText: {
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

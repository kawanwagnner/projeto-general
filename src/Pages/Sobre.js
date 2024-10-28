import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

export default function Sobre() {
  const [contatos, setContatos] = useState([]);
  const [faqs, setFaq] = useState([]);

  const listContact = () => {
    axios
      .get("http://10.0.2.2:3000/contatos") // Ajuste o IP se estiver em um emulador
      .then((response) => {
        setContatos(response.data);
      })
      .catch((error) => {
        console.error("ERROR ao buscar contatos", error);
      });
  };

  const listFaq = () => {
    axios
      .get("http://10.0.2.2:3000/faq") // Ajuste o IP se estiver em um emulador
      .then((response) => {
        setFaq(response.data);
      })
      .catch((error) => {
        console.error("ERROR ao buscar FAQs", error);
      });
  };

  useEffect(() => {
    listFaq();
    listContact();
  }, []);

  const handleEditContact = (contact) => {
    console.log("Editando contato:", contact);
  };

  const handleDeleteContact = (contactId) => {
    axios
      .delete(`http://10.0.2.2:3000/contatos/${contactId}`)
      .then(() => {
        listContact();
      })
      .catch((error) => {
        console.error("ERROR ao excluir contato", error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Lista de Contatos</Text>
        {contatos.length > 0 ? (
          contatos.map((contato, index) => (
            <View key={contato.id} style={styles.contactCard}>
              <Text style={styles.contactName}>{contato.nome}</Text>
              <Text style={styles.contactPhone}>{contato.tel}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditContact(contato)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteContact(contato.id)}
                >
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum contato disponível</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Nosso FAQ</Text>
        {faqs.length > 0 ? (
          faqs.map((faq) => (
            <View key={faq.id} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{faq.pergunta}</Text>
              <Text style={styles.faqAnswer}>{faq.resposta}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum FAQ disponível</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  contactCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  contactPhone: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  faqCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  faqAnswer: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

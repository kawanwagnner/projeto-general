import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function TicketCard() {
  const [randomGate, setRandomGate] = useState(null);

  useEffect(() => {
    // Gerar número aleatório entre 1 e 15
    const randomNumber = Math.floor(Math.random() * 15) + 1;
    setRandomGate(randomNumber);
  }, []);

  const ticket = {
    event: "How I Met Your Mother",
    name: "Vladimir Kudinov",
    seat: 156,
    time: "12:00",
  };

  return (
    <View style={styles.cardWrap}>
      {/* Left Card */}
      <View style={styles.cardLeft}>
        <Text style={styles.header}>
          Evento <Text style={styles.event}>Musical</Text>
        </Text>
        <View style={styles.title}>
          <Text style={styles.subtitle}>Evento</Text>
          <Text style={styles.titleText}>{ticket.event}</Text>
        </View>
        <View style={styles.name}>
          <Text style={styles.subtitle}>Nome</Text>
          <Text style={styles.nameText}>{ticket.name}</Text>
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
        <View style={styles.eye}>
          <Ionicons name="eye-outline" size={20} color="#E84C3D" />
        </View>
        <View style={styles.number}>
          <Text style={styles.subtitle}>Portão</Text>
          <Text style={styles.numberText}>{randomGate}</Text>
        </View>
        <View style={styles.barcode}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrap: {
    flexDirection: "row",
    backgroundColor: "#E84C3D",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 20,
    alignSelf: "center",
    width: screenWidth * 0.9,
    height: 180,
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
    backgroundColor: "#000",
    marginVertical: 10,
  },
});

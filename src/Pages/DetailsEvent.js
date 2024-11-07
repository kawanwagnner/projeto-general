import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import BottomNavBar from "../Components/BottomNavBar";

export default function DetailsScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.backButton}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.menuButton}>⋮</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Judô - ring y</Text>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/kawanwagnner/projeto-general/refs/heads/main/assets/judo.png",
            }}
            style={styles.image}
          />
        </View>
        <Text style={styles.monthText}>Dezembro 2021</Text>
        <Calendar
          style={styles.calendar}
          theme={{
            selectedDayBackgroundColor: "#8B0000",
            todayTextColor: "#8B0000",
            arrowColor: "#8B0000",
            textSectionTitleColor: "#000",
            textDayFontWeight: "600",
            textMonthFontWeight: "bold",
            textDayStyle: styles.dayText,
          }}
          markedDates={{
            "2021-12-18": {
              selected: true,
              marked: true,
              selectedColor: "#8B0000",
            },
          }}
          dayComponent={({ date, state }) => {
            return (
              <View
                style={[
                  styles.dayContainer,
                  date.day === 18 && styles.selectedDay,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    state === "disabled" ? styles.disabledDayText : null,
                    date.day === 18 ? styles.selectedDayText : null,
                  ]}
                >
                  {date.day}
                </Text>
              </View>
            );
          }}
        />
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateButtonText}>DIA 18/12 às 7:00 PM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>MAIS INFORMAÇÕES ›</Text>
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
    marginVertical: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  backButton: {
    fontSize: 20,
    color: "#000",
  },
  menuButton: {
    fontSize: 20,
    color: "#000",
  },
  card: {
    backgroundColor: "#8B0000",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
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
  },
});

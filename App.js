import { StyleSheet } from "react-native";
import Header from "./src/Components/Header";
import MainNavigator from "./MainNavigator";

export default function App() {
  return (
    <>
      <Header />
      <MainNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import Icon from "../assets/logo.png";
import api from "../services/Api";

export default function Book({ navigation }) {
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const [itemId, setItemId] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) setUser(user);
      const id = navigation.getParam("id");
      setItemId(id);
    });
  }, []);

  async function handleSolicitar() {
    await api.post(
      `/spots/${itemId}/bookings`,
      { data },
      { Headers: { user } }
    );

    Alert.alert("Solicitação enviada com sucesso");

    navigation.navigate("List");
  }
  async function handleCancelar() {
    Alert.alert("Solicitação cancelada");
    navigation.navigate("List");
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.imagem} source={Icon} />
      <View style={styles.box}>
        <Text style={styles.label}>Seu Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Qual data você quer reservar"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          value={data}
          onChangeText={setData}
        />
        <TouchableOpacity
          style={styles.buttonSolicitar}
          onPress={handleSolicitar}
        >
          <Text style={styles.buttonText}>Solicitar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCancel} onPress={handleCancelar}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: "center"
  },
  box: {
    margin: 30
  },
  imagem: {
    marginTop: 15,
    alignSelf: "center",
    marginBottom: 60
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#999",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  buttonSolicitar: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginBottom: 10
  },
  buttonCancel: {
    height: 42,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});

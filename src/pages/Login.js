import React, { useState, useEffect } from "react";

import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from "react-native";
import Icon from "../assets/logo.png";
import Api from "../services/Api";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) navigation.navigate("List");
    });
  }, []);

  async function handleLogin() {
    const response = await Api.post("/usuarios", { email });
    const { _id } = response.data;
    console.log(response.data);
    await AsyncStorage.setItem("user", _id);
    await AsyncStorage.setItem("techs", techs);

    navigation.navigate("List");
  }
  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
      style={style.container}
    >
      <Image source={Icon} />
      <View style={style.form}>
        <Text style={style.label}>Seu Email *</Text>
        <TextInput
          style={style.input}
          placeholder="Seu email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={style.label}>Tecnologias *</Text>
        <TextInput
          style={style.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={style.buttonText}>Encontrar Spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", //alinha verticalmente
    alignItems: "center" //alinha horizoltalmente
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
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
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
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

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  AsyncStorage,
  ScrollView
} from "react-native";
import Logo from "../assets/logo.png";
import SpotList from "../components/SpotList";

export default function List() {
  const [techs, setTechs] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("techs").then(storageTechs => {
      const techArray = storageTechs.split(",").map(tech => tech.trim());
      setTechs(techArray);
    });
  }, []);
  function handleNavigate() {}

  return (
    <SafeAreaView style={style.container}>
      <Image source={Logo} style={style.logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    alignSelf: "center"
  }
});

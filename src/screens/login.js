import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView, View, Text } from "react-native";
import Input from "../components/input";
import PassInput from "../components/passinput";
import { useState } from "react";
import Boton from "../components/boton";
import { loginApi } from "../apis/login";
import { save } from "../utils/storage";

export default Login = ({ navigation }) => {
  const [dni, setUser] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (dni, password) => {
    const Data = await loginApi(dni, password);
    console.log(Data);
    if (Data.succes) {
      const guardar = save("token", Data.token);
      console.log(guardar);
      if (guardar) navigation.navigate("tabs");
    } else {
      // Mostrar un mensaje al usuario diciendo "usuario o contraseña incorrecta"
      Alert.alert("Su usuario o contraseña son incorrecta");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/bgprincipal.jpg")}
          resizeMode="cover"
          style={{ flex: 1, opacity: 1 }}
        >
          <View
            style={{
              flex: 0.6,
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/logo.jpg")}
              style={{
                width: 250,
                height: 250,
                borderRadius: 125,
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                fontSize: 40,
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Hola!
            </Text>
          </View>
          <View style={{ flex: 0.3, padding: 10 }}>
            <Input
              label="nombre de usuario"
              icon="account"
              value={dni}
              onChange={setUser}
            />
            <PassInput
              label="ingrese su contraseña"
              value={password}
              onChange={setPassword}
            />
            <Boton
              texto="ingresar"
              onClick={() => handleLogin(dni, password)}
            />
            <Boton
              texto="Crear cuenta"
              onClick={() => {
                handleLogin(dni, password);
              }}
            />
          </View>
          <View style={{ flex: 0.1 }}></View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" && 25,
    flex: 1,
  },
});

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Alert,
  StyleSheet,
  ImageBackground,
  Animated,
  Pressable,
  Platform,
} from "react-native";

export default function RegisterScreen() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const fadeLogo = useRef(new Animated.Value(0)).current;  
  const scaleLogo = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeLogo, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(scaleLogo, { toValue: 1, friction: 4, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeLogo, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  //  Validador de correo
  const validarCorreo = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  //  Función para mostrar alertas según plataforma
  const showAlert = (titulo, mensaje) => {
    if (Platform.OS === "web") {
      alert(`${titulo}: ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const handleRegistro = () => {
    if (!nombre.trim() || !correo.trim()) {
      showAlert("Error", "Completa todos los campos.");
      return;
    }

    if (!validarCorreo(correo)) {
      showAlert("Correo inválido", "ingresa un correo electrónico válido.");
      return;
    }

    if (!aceptaTerminos) {
      showAlert("Aviso", "Debes aceptar los términos y condiciones.");
      return;
    }

    showAlert("Registro exitoso", `Nombre: ${nombre}\nCorreo: ${correo}`);

    setNombre("");
    setCorreo("");
    setAceptaTerminos(false);
  };

  // Splash
  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Image
          source={require("../assets/fondo12.png")}
          style={[
            styles.splashLogo,
            { opacity: fadeLogo, transform: [{ scale: scaleLogo }] },
          ]}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Pantalla principal
  return (
    <ImageBackground
      source={require("../assets/bf6.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.form}>
          <Text style={styles.title}>Registro de Usuario</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#ddd"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#ddd"
            keyboardType="email-address"
            autoCapitalize="none"
            value={correo}
            onChangeText={setCorreo}
          />

          <View style={styles.switchContainer}>
            <Switch
              value={aceptaTerminos}
              onValueChange={setAceptaTerminos}
              thumbColor={aceptaTerminos ? "#00c853" : "#ccc"}
              trackColor={{ true: "#81c784", false: "#bdbdbd" }}
            />
            <Text style={styles.switchText}>Aceptar términos y condiciones</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              {
                opacity: pressed ? 0.6 : 1,
                backgroundColor: pressed ? "#6ac08eff" : "#39e600",
              },
            ]}
            onPress={handleRegistro}
          >
            {({ pressed }) => (
              <Text
                style={[
                  styles.buttonText,
                  { textDecorationLine: pressed ? "underline" : "none" },
                ]}
              >
                Registrarse
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  splashLogo: {
    width: 200,
    height: 200,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 10,
    color: "#fff",
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchText: {
    color: "#fff",
    marginLeft: 10,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

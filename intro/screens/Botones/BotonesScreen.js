import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
} from 'react-native';

export default function BotonesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Tipos de Botones en React Native</Text>

      {/* 1. Button nativo */}
      <Text style={styles.title}>1. Button (nativo)</Text>
      <Button title="Presionar" onPress={() => alert("Botón básico")} />

      {/* 2. TouchableOpacity */}
      <Text style={styles.title}>2. TouchableOpacity</Text>
      <TouchableOpacity style={styles.btnOpacity} onPress={() => alert("Opacity")}>
        <Text style={styles.text}>Botón Opacity</Text>
      </TouchableOpacity>

      {/* 3. TouchableHighlight */}
      <Text style={styles.title}>3. TouchableHighlight</Text>
      <TouchableHighlight
        style={styles.btnHighlight}
        underlayColor="#002a3dff"
        onPress={() => alert("Highlight")}
      >
        <Text style={styles.text}>Botón Highlight</Text>
      </TouchableHighlight>

      {/* 4. TouchableWithoutFeedback */}
      <Text style={styles.title}>4. TouchableWithoutFeedback</Text>
      <TouchableWithoutFeedback onPress={() => alert("Sin feedback")}>
        <View style={styles.btnNoFeedback}>
          <Text style={styles.text}>Sin feedback</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* 5. Pressable */}
      <Text style={styles.title}>5. Pressable</Text>
      <Pressable
        onPress={() => alert("Pressable!")}
        style={({ pressed }) => [
          styles.btnPressable,
        {     
            backgroundColor: pressed ? "#ff7043" : "#66bb6a", // cambia el color de fondo al presionar
            transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }], // se hace un poquito más pequeño al presionar
            opacity: pressed ? 0.7 : 1, // disminuye la opacidad mientras se presiona
            shadowColor: "#000", // color de la sombra
            shadowOffset: { width: 0, height: pressed ? 1 : 4 }, // desplaza la sombra verticalmente
            shadowOpacity: pressed ? 0.3 : 0.6, // cambia la opacidad de la sombra
            shadowRadius: pressed ? 2 : 4, // cambia el difuminado de la sombra
        },
        ]}
      > 
        <Text style={styles.text}>Botón Pressable</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffffff", // Color de fondo de toda la pantalla
    alignItems: "center",        // Centra horizontalmente los elementos dentro del container
    justifyContent: "flex-start",// Alinea verticalmente los elementos desde arriba
    padding: 20,                 // Espacio interno alrededor del contenido
    paddingTop: 50,              // Espacio extra en la parte superior
  },
  header: {
    fontSize: 22,                // Tamaño de letra del encabezado
    fontWeight: "bold",          // Pone el texto en negrita
    marginBottom: 20,            // Espacio debajo del encabezado
    color: "#333",               // Color del texto
    textAlign: "center",         // Centra el texto horizontalmente
  },
  title: {
    fontWeight: "bold",          // Título de cada sección en negrita
    marginTop: 20,               // Espacio arriba del título
    marginBottom: 5,             // Espacio debajo del título
    color: "#333",               // Color del texto
  },
  text: {
    color: "white",              // Color del texto dentro de los botones
    fontWeight: "600",           // Grosor del texto para que resalte
  },
  btnOpacity: {
    backgroundColor: "#2a9fffff",// Color de fondo del botón TouchableOpacity
    padding: 10,                 // Espacio interno del botón
    borderRadius: 8,             // Bordes redondeados del botón
  },
  btnHighlight: {
    backgroundColor: "#29b6f6",  // Color de fondo del botón TouchableHighlight
    padding: 10,                 // Espacio interno del botón
    borderRadius: 8,             // Bordes redondeados
  },
  btnNoFeedback: {
    backgroundColor: "#ab47bc",  // Color de fondo del botón sin feedback visual
    padding: 10,                 // Espacio interno del botón
    borderRadius: 8,             // Bordes redondeados
  },
  btnPressable: {
    padding: 10,                 // Espacio interno del botón Pressable
    borderRadius: 8,             // Bordes redondeados
    // Los demás estilos dinámicos (color, opacidad, sombra, escala) se agregan dentro de style={({ pressed }) => ...}
  },
  btnNative: {
    padding: 10,                 // Espacio interno del botón nativo o simulación de Ripple
    borderRadius: 8,             // Bordes redondeados
    marginBottom: 15,            // Espacio debajo del botón para separarlo del siguiente
  },
});

/*Buttons y Switch Completada*/
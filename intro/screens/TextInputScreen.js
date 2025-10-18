import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Button, StyleSheet } from 'react-native';

export default function TextScreen() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [comentario, setComentario] = useState('');

  const enviarDatos = () => {
    if (nombre.trim() === '' || contraseña.trim() === '' || comentario.trim() === '') {
      Alert.alert('Error', 'Por favor completa todos los campos');
      alert('Error: Por favor completa todos los campos');
      setMensaje('Faltan campos por llenar');

    } else {
      Alert.alert('¡Hola!', 'Bienvenidooo, ' + nombre + '!');
      alert('¡Hola! Bienvenidooo, ' + nombre + '!');
      setMensaje('Bienvenidooo, ' + nombre + '!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Práctica para ingresar tu nombre usando TextInput y Alert</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
      style={styles.input}
      placeholder='escribe contrasena'
      value='{contraseña}'
      onChangeText={setContraseña}
      SecureTextEntry={true}
      />
      <TextInput
      style={[styles.input, {height: 100, textAlignVertical:'top'}]}
      placeholder='escribe comentario'
      value={comentario}
      onChangeText={setComentario}
      multiline={true}
      numberOfLines={4}
      />

      <Button title="Enviar" onPress={enviarDatos} />
      <Text style={styles.mensaje}>{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    gap:10
  },
  title:{
    fontSize:25,
    fontWeight:'bold'
  },
  input:{
    width:'80%',
    borderWidth:3,
    borderColor:'#a47bf7ff',
    padding:12,
    borderRadius:9
  },
  mensaje:{
    marginTop:20,
    fontSize:18,
    color:'#e431f1ff',
    textAlign:'center'
  }
});
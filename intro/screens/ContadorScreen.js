//1. Import: Zona de declaraciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button} from 'react-native';
import React,{useState} from 'react';
//2. Main: Zona de componentes
export default function App() {

const[contador,setContador]=useState(0);

  return (

    <View style={styles.container}>

      <Text style={styles.texto}>Contador: </Text>
      <Text style={styles.texto2}> {contador} </Text>

      <View style={styles.contenedorBotones}>
      <Button color="green"title="Agregar" onPress={()=>setContador(contador+1)}/>
        <Button color="orange" title="Quitar" onPress={()=>setContador(contador-1)}/>
          <Button color="brown"title="Reiniciar" onPress={()=>setContador(contador-contador)}/>
      </View>

      
      <StatusBar style="auto" />

    </View>
  );
}
//3. Estilos: Zona de estetica y posicionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#928e8eff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    color:'#09327eff',
    fontSize:30,
    fontFamily:'Times New Roman', //tipo de letra
    fontWeight:'bold', //color de negritas
    fontStyle:'italic',//tipo de letra inclinada
    textDecorationLine:'line-through', 
  },
  texto2:{
    color:'#ad074fff',
    fontSize:40,
    fontFamily:'Courier', //tipo de letra
    fontWeight:'400', //color de negritas
    textDecorationLine:'underline', 
  },
  contenedorBotones:{
    marginTop:15, //Va a tomar un margen superior de 15
    flexDirection:'row', //Los botones se van a acomodar en fila
    gap:20, //Va a tener un espacio entre cada boton de 20

  }

});

import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ContadorScreen from './ContadorScreen';
import BotonesScreen from './Botones/BotonesScreen';
import TextInputScreen from './TextInputScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import ScrollViewScreen from './ScrollViewScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import FlatListScreen from './FlatListScreen';
import ModalScreen from './ModalScreen';
import BottomSheetScreen from './BottomSheetScreen';
import { Button } from 'react-native-web';

export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');

    switch (screen) {
        case 'contador':
            return <ContadorScreen />;
        case 'botones':
            return <BotonesScreen />;
        case 'TextInput':
            return <TextInputScreen />;
        case 'ImageBackground':
            return <ImageBackgroundScreen />;
        case 'ScrollView':
            return <ScrollViewScreen />;
        case 'ActivityIndicator':
            return <ActivityIndicatorScreen />;
        case 'FlatList':
            return <FlatListScreen />;
        case 'Modal':
            return <ModalScreen />;
        case 'Bottom Sheet':
            return <BottomSheetScreen />;
        case 'menu':
            default:
                return (
                    <View style={styles.container}>
      <View style={styles.contenedorBotones}>
            <Text style={styles.texto}> Menu de practicas </Text>
            <Button onPress={()=>setScreen('contador')} title="Pract:Contador"/>
            <Button onPress={()=>setScreen('botones')} title="Pract:Botones"/>
            <Button onPress={()=>setScreen('TextInput')} title="Pract:TextInput"/>
            <Button onPress={()=>setScreen('ImageBackground')} title="Pract:ImageBackground"/>
            <Button onPress={()=>setScreen('ScrollView')} title="Pract:ScrollView"/>
            <Button onPress={()=>setScreen('ActivityIndicator')} title="Pract:ActivityIndicator"/>
            <Button onPress={()=>setScreen('FlatList')} title="Pract:FlatList"/>
            <Button onPress={()=>setScreen('Modal')} title="Pract:Modal"/>
            <Button onPress={()=>setScreen('Bottom Sheet')} title="Pract:Bottom Sheet"/>
      </View>
      </View>
    )
 
    }

    

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000001ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    color:'#72b6eaff',
    fontSize:30,
    fontFamily:'Times New Roman', //tipo de letra
    fontWeight:'bold', //color de negritas
    fontStyle:'italic',//tipo de letra inclinada
    textDecorationLine:'', 
  },
  contenedorBotones:{
    marginTop:15, //Va a tomar un margen superior de 15
    flexDirection:'column', //Los botones se van a acomodar en columna
    gap:20, //Va a tener un espacio entre cada boton de 20

  }

});

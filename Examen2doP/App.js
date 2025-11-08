import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native-web";

const DATA = [
  {id: 1, title: 'Primera noticia'},
  {id: 2, title: 'Segunda noticia'},
  {id: 3, title: 'Tercera noticia'},
  {id: 4, title: 'Cuarta noticia'},
  {id: 5, title: 'Quinta noticia'},
  {id: 6, title: 'Sexta noticia'},
];

const SimpleHeader = () => {
  return(
  <View style = {styles.header}>
    <Text style = {styles.title}>Portal de noticias</Text>
  </View>
);
};

const SimpleScrollView = () => {
  return (
    <View>
    <SimpleHeader/>
    <ScrollView
     showVerticalScrollIndicator={false}
    >
    
      {DATA.map((item) => {
        return (
          <View style={styles.card} key = {item.id}>
          <Text style = {styles.subtitle}> Sheinbaum seguirá caminando en la calle con la gente pese a acoso: "No vamos a cambiar" </Text>
          </View>
        );
      })}

      <View style={styles.card} key={item.id}>
        <Text style={styles.subtitle}> Sheinbaum seguirá caminando en la calle con la gente pese a acoso: "No vamos a cambiar" </Text>
      </View>
      <View style={styles.card} key={item.id}>
        <Text style={styles.subtitle}> Descubrimiento arqueológico revela secretos de civilizaciones antiguas </Text>
      </View>
      <View style={styles.card} key={item.id}>
        <Text style={styles.subtitle}> Nuevas evidencias sobre la vida en la antigua Roma </Text>
      </View>
    </ScrollView>
    </View>
  );
};

export default  SimpleScrollView;

const styles = StyleSheet.create({
  header: {
    height: 120,
    backgroundColor: 'rgba(71, 44, 176, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,
  },
  title:{
    color: '#ffffffff',
    fontWeight: 'bold',
    fontSize: 20
  },
  card:{
    height: 100,
    backgroundColor: '#341c83ff',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  subtitle: {
    color: '#ffffffff',
    fontWeight: 'bold',
  },
})
  
import { ScrollView, Text, StyleSheet, View } from 'react-native-web'
import React from 'react'

const DATA = [
  {id:1},
  {id:2},
  {id:3},
  {id:4},
  {id:5},
  {id:6},
  {id:7},
  {id:8},
  {id:9},
  {id:10},
];

const SimpleHeader = () => {
  return(
  <View style = {styles.header}>
    <Text style = {styles.title}>ScrollView Horizontal</Text>
  </View>
);
};

const SimpleScrollView = () => {
  return (
    <View style = {styles.container}>
    <SimpleHeader/>
    <ScrollView
    horizontal={true}
     showHorizontalScrollIndicator={false}
     contentContainerStyle={styles.scrollContent}
    >
      {DATA.map((item) => {
        return (
          <View style={styles.card} key = {item.id}>
          <Text style = {styles.subtitle}> ¡Soy una tarjeta! </Text>
          </View>
        );
      })}
    </ScrollView>
    </View>
  );
};

export default  SimpleScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    scrollContent: {
    paddingVertical: 10,
    },
  card:{
    width: 100,
    height: 150,
    backgroundColor: '#2626bdff',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  subtitle: {
    color: '#030303ff',
    fontWeight: 'bold',
  },
})
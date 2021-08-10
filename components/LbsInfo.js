import React from 'react'
import AppLoading from 'expo-app-loading'
import {StyleSheet, Text, View} from 'react-native'
import {useFonts, Jost_400Regular} from '@expo-google-fonts/jost'

export default function LbsInfo(props) {
  let values = JSON.parse(props.values)
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.description}>
            <View style={styles.charge}>
              <Text style={styles.outerTitle}>{'Sem Carga'}</Text>
              <Text style={styles.propTitle}>{'Dianteiro'}</Text>
              <Text style={styles.propValue}>{values.d0}</Text>
              <Text style={styles.propTitle}>{'Traseiro'}</Text>
              <Text style={styles.propValue}>{values.t0}</Text>
            </View>
          </View>
          <View style={styles.description}>
            <View style={styles.charge}>
              <Text style={styles.outerTitle}>{'Com Carga'}</Text>
              <Text style={styles.propTitle}>{'Dianteiro'}</Text>
              <Text style={styles.propValue}>{values.d1}</Text>
              <Text style={styles.propTitle}>{'Traseiro'}</Text>
              <Text style={styles.propValue}>{values.t1}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  propTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6e6e6e',
  },
  outerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  propValue: {
    fontSize: 20,
  },
  wrapper: {
    margin: 15,
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    marginLeft: 50,
    textAlign: 'center',
  },
})

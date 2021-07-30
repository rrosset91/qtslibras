import React from 'react'
import AppLoading from 'expo-app-loading'
import {StyleSheet, Text, View} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {useState} from 'react'
import {useFonts, Jost_400Regular} from '@expo-google-fonts/jost'
const CARS_BRANDS = require('./assets/CarBrands.json')
const CARS_MODELS = require('./assets/CarModels.json')

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
  })
  const brands = JSON.parse(JSON.stringify(CARS_BRANDS))
  const models = JSON.parse(JSON.stringify(CARS_MODELS))
  const [selectedBrand, setSelectedBrand] = useState('Selecione uma marca')
  const [selectedModel, setSelectedModel] = useState('Selecione um modelo')
  let [filteredModels, setFilteredModels] = useState()
  let filterModels = brand => {
    return models.filter(model => {
      return model.Marca == brand
    })
  }

  let cleanFilteredModels = () => {
    filteredModels.filter(function (item, pos) {
      return a.indexOf(item) == pos
    })
  }
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.pickersContainer}>
          <Picker
            selectedValue={selectedBrand}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedBrand(itemValue)
              let filteredMoldels = filterModels(itemValue)
              setFilteredModels(filteredMoldels)
            }}
          >
            {brands.map((brand, index) => {
              return (
                <Picker.Item
                  label={brand}
                  key={index}
                  value={brand}
                  style={styles.pickerItem}
                />
              )
            })}
          </Picker>
          {!selectedBrand.includes('Selecione uma marca') ? (
            <Picker
              selectedValue={selectedModel}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedModel(itemValue)
              }}
            >
              {filteredModels.map((model, index) => {
                return (
                  <Picker.Item
                    label={model.Modelo}
                    key={index}
                    value={model.Modelo}
                  />
                )
              })}
            </Picker>
          ) : null}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickersContainer: {
    padding: 40,
    width: '100%',
    height: 300,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
    height: 60,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 2,
    borderColor: 'red',
    fontSize: 20,
    fontFamily: 'Jost_400Regular',
    color: 'red',
  },
  pickerItem: {
    fontSize: 30,
  },
})

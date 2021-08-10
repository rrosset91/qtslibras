import React from 'react'
import AppLoading from 'expo-app-loading'
import {StyleSheet, Text, View} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {useState} from 'react'
import {useFonts, Jost_400Regular} from '@expo-google-fonts/jost'
import LbsInfo from './components/LbsInfo'
const CARS_BRANDS = require('./assets/Marcas.json')
const CARS_MODELS = require('./assets/Modelos.json')
const CARS_VERSIONS = require('./assets/Versoes.json')

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
  })
  let resetOptions = () => {
    setShowVersions(false)
    setShowModels(false)
    setShowInfos(false)
    setVersionInfos('')
    setFilteredModels([])
    setAvailableVersions([])
    setSelectedVersion('')
  }
  const brands = JSON.parse(JSON.stringify(CARS_BRANDS))
  const models = JSON.parse(JSON.stringify(CARS_MODELS))
  const versions = JSON.parse(JSON.stringify(CARS_VERSIONS))

  const [selectedBrand, setSelectedBrand] = useState()
  const [selectedModel, setSelectedModel] = useState()
  let [selectedVersion, setSelectedVersion] = useState('')
  let [filteredModels, setFilteredModels] = useState()
  let [versionsOptions, setAvailableVersions] = useState()
  let [versionInfos, setVersionInfos] = useState()
  let [showVersions, setShowVersions] = useState()
  let [showModels, setShowModels] = useState()
  let [showInfos, setShowInfos] = useState(false)

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
              resetOptions()
              if (
                itemValue === undefined ||
                itemValue === 'Selecione uma marca...'
              ) {
                setShowModels(false)
              } else {
                let cleanedModels = []
                models[itemValue].forEach(model => {
                  if (!cleanedModels.includes(model)) cleanedModels.push(model)
                  setFilteredModels(cleanedModels)
                })
                setShowModels(true)
              }
            }}
          >
            <Picker.Item
              label={'Selecione uma marca...'}
              key={'default'}
              value={undefined}
              style={styles.pickerItem}
            />
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
          {showModels == true ? (
            <Picker
              selectedValue={selectedModel}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedModel(itemValue)
                if (itemValue != undefined) {
                  setShowVersions(true)
                  let availableVersions = versions.filter(model => {
                    return model.modelo == itemValue
                  })
                  setAvailableVersions(availableVersions)
                } else {
                  setShowVersions(false)
                }
              }}
            >
              <Picker.Item
                label="Selecione um modelo..."
                key={'default'}
                value={undefined}
              />
              {filteredModels.map((model, index) => {
                return <Picker.Item label={model} key={index} value={model} />
              })}
            </Picker>
          ) : null}
          {showVersions ? (
            <Picker
              selectedValue={selectedVersion}
              style={styles.picker}
              onValueChange={(itemVersion, itemIndex) => {
                setSelectedVersion(itemVersion)
                let versionInformation = versionsOptions[Number(itemIndex - 1)]
                setVersionInfos(JSON.stringify(versionInformation))
                if (
                  itemVersion != undefined &&
                  itemVersion != 'Escolha uma versão...'
                ) {
                  setShowInfos(true)
                }
              }}
            >
              <Picker.Item label={'Escolha uma versão...'} value={undefined} />
              {versionsOptions.map((version, index) => {
                return (
                  <Picker.Item
                    label={version.versao}
                    key={index}
                    value={version.versao}
                  />
                )
              })}
            </Picker>
          ) : null}
        </View>
        {showInfos ? <LbsInfo values={versionInfos}></LbsInfo> : null}
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
    borderColor: '#708090',
    fontSize: 20,
    fontFamily: 'Jost_400Regular',
    color: '#708090',
  },
  pickerItem: {
    fontSize: 30,
  },
})

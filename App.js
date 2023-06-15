import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [url, setURL] = useState('')
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if(data){
    setURL(data)
    }
  };
  
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleOpenLink = () => {
    setScanned(false);
    Linking.openURL(url)
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && 
        <View style={styles.popUpContainer}>
          <Text style={{color: "#0D8C36", marginTop: 10, fontWeight: '600'}}> Successfull scan !</Text>
          <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
          <Text style={styles.text}>Tap to Scan Again</Text>
          </TouchableOpacity> 
          <TouchableOpacity onPress={() => handleOpenLink()} style={styles.button}>
          <Text style={styles.text}>Open the link!</Text>
          </TouchableOpacity> 
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popUpContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width:'60%',
    height: 120,
    backgroundColor: '#B0B0B0',
    borderRadius: 10
  },
  button: {
    width: '80%',
    backgroundColor: "#014C00",
    paddingHorizontal: 15,
    marginVertical: 10,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text:{
    fontWeight: 'bold',
    color: '#fff'
  }
});

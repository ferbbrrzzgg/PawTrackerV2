"use client"
import React from "react"
import MapView, {Marker} from "react-native-maps"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ActivityIndicator, } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const [DogLocation, SetDogLocation] = React.useState({
    latitude: -33.512863,
    longitude: -70.597444   
   })
   
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])  

  if (isLoading) {
    return (  
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B8E23" style={styles.spinner} />
        <Text style={styles.loadingText}>Cargando mapa...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Mapa de PawTracker</Text>
        <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom}}> 
      <MapView
      style ={styles.map}
        initialRegion={{
            latitude: DogLocation.latitude, 
            longitude: DogLocation.longitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01
        }}  
      /> 
      <Marker
        coordinate={DogLocation}
        title={"Tu perro"}
        //description={isConected ? "Conectado a Wifi" : "Usando GPS"}
        pinColor={"blue"}></Marker>
    </View>
        <Text style={styles.mapSubtext}>
          Aquí podrás ver la ubicación de tu perro en tiempo real.
        </Text> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F3E7",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#6B8E23",
    fontWeight: "400",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F3E7",
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2F4F4F",
    marginBottom: 10,
  },
  mapSubtext: {
    fontSize: 16,
    color: "#6B8E23",
    textAlign: "center",
    paddingHorizontal: 40,
  },
    map: {
    width: "100%",
    height: "100%"
  },
})
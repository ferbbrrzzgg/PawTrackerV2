"use client"
import React, { useState, useEffect } from "react"
import MapView, { Marker, Circle } from "react-native-maps"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

export default function MapScreen() {
  const [DogLocation, SetDogLocation] = useState({
    latitude: -33.512863,
    longitude: -70.597444
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: DogLocation.latitude,
            longitude: DogLocation.longitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01
          }}
        >
          {/* Marcador del perro */}
          <Marker
            coordinate={DogLocation}
            title={"Tu perro"}
            pinColor="#6B8E23"
          />

          {/* Círculo alrededor del pin */}
          <Circle
            center={DogLocation}
            radius={50} // en metros
            strokeColor="rgba(107, 142, 35, 0.4)"
            fillColor="rgba(144, 238, 144, 0.3)" // verde pastel claro con transparencia
          />
        </MapView>
      </View>
      <Text style={styles.mapSubtext}>
        Aquí podrás ver la ubicación de tu perro en tiempo real.
      </Text>
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

"use client"
import React, { useState, useEffect } from "react"
import MapView, { Marker, Circle } from "react-native-maps"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

  export default function MapScreen() {
  const [dogLocation, setDogLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastKnownPosition, setLastKnownPosition] = useState(null)

  // aquí va tu useEffect y demás lógica...

  // Función para obtener la ubicación desde la API
 const fetchLocation = async () => {
    try {
      const response = await fetch("http://8dec-190-164-212-12.ngrok-free.app/ubicaciones")
      const data = await response.json()

      if (data.lat && data.long) {
        const newPosition = {
          latitude: data.lat,
          longitude: data.long,
        }
        setDogLocation(newPosition)
        setLastKnownPosition(newPosition)
        setError(null)
      } else if (lastKnownPosition) {
        console.log("No nuevas coordenadas. Usando última posición conocida.")
        setDogLocation(lastKnownPosition)
      } else {
        throw new Error("Datos de ubicación inválidos y sin última conocida.")
      }
    } catch (err) {
      console.error("Error al obtener la ubicación:", err)
      setError("No se pudo obtener la ubicación del perro.")
      if (lastKnownPosition) {
        setDogLocation(lastKnownPosition)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLocation()
    const interval = setInterval(fetchLocation, 10000) // actualiza cada 10 seg
    return () => clearInterval(interval)
  }, [])

  // Si aún no se ha obtenido la ubicación, mostramos un loader
  if (isLoading && dogLocation === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B8E23" style={styles.spinner} />
        <Text style={styles.loadingText}>Cargando ubicación...</Text>
      </View>
    )
  }

  // Si se terminó la carga pero no se obtuvo la ubicación, mostramos un mensaje de error
  if (!isLoading && dogLocation === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={[styles.loadingText, { color: "red" }]}>
          {error || "No se encontró la ubicación"}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <MapView
          style={styles.map}
          region={{
            latitude: dogLocation.latitude,
            longitude: dogLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={dogLocation} title={"Tu perro"} pinColor="#6B8E23" />
          <Circle
            center={dogLocation}
            radius={50} // en metros
            strokeColor="rgba(107, 142, 35, 0.4)"
            fillColor="rgba(144, 238, 144, 0.3)"
          />
        </MapView>
      </View>
      <Text style={styles.mapSubtext}>
        Aquí podrás ver la ubicación de tu perro en tiempo real.
      </Text>
      {error && <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>{error}</Text>}
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
    height: "100%",
  },
})

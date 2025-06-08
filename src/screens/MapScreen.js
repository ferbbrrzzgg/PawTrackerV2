"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

export default function MapScreen() {
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
        <Text style={styles.mapSubtext}>Aquí aparecerá la ubicación de tu mascota</Text>
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
})
"use client"
import React from "react"
import MapView, {Marker, Polyline} from "react-native-maps"
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

export default function MapScreen() {
  const [DogLocation, SetDogLocation] = React.useState({
    latitude: -33.512863,
    longitude: -70.597444   
  })

  // Add direction/heading state
  const [dogHeading, setDogHeading] = useState(45) // degrees
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])  

  // Function to create arrow coordinates based on heading
  const getArrowCoordinates = (center, heading, length = 0.001) => {
    const headingRad = (heading * Math.PI) / 180
    
    // Arrow tip
    const tip = {
      latitude: center.latitude + length * Math.cos(headingRad),
      longitude: center.longitude + length * Math.sin(headingRad)
    }
    
    // Arrow base (left and right points)
    const baseLeft = {
      latitude: center.latitude + (length * 0.7) * Math.cos(headingRad + 2.5),
      longitude: center.longitude + (length * 0.7) * Math.sin(headingRad + 2.5)
    }
    
    const baseRight = {
      latitude: center.latitude + (length * 0.7) * Math.cos(headingRad - 2.5),
      longitude: center.longitude + (length * 0.7) * Math.sin(headingRad - 2.5)
    }
    
    return { tip, baseLeft, baseRight }
  }

  if (isLoading) {
    return (  
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B8E23" style={styles.spinner} />
        <Text style={styles.loadingText}>Cargando mapa...</Text>
      </View>
    )
  }

  const arrowCoords = getArrowCoordinates(DogLocation, dogHeading)

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
          {/* Main marker for dog location */}
          <Marker
            coordinate={DogLocation}
            title={"Tu perro"}
            pinColor={"blue"}
          />
          
          {/* Arrow using Polylines */}
          <Polyline
            coordinates={[arrowCoords.baseLeft, arrowCoords.tip]}
            strokeColor="#FF0000"
            strokeWidth={3}
          />
          <Polyline
            coordinates={[arrowCoords.baseRight, arrowCoords.tip]}
            strokeColor="#FF0000"
            strokeWidth={3}
          />
          <Polyline
            coordinates={[arrowCoords.baseLeft, arrowCoords.baseRight]}
            strokeColor="#FF0000"
            strokeWidth={2}
          />
          
          {/* Alternative: Simple direction line */}
          <Polyline
            coordinates={[
              DogLocation,
              {
                latitude: DogLocation.latitude + 0.002 * Math.cos((dogHeading * Math.PI) / 180),
                longitude: DogLocation.longitude + 0.002 * Math.sin((dogHeading * Math.PI) / 180)
              }
            ]}
            strokeColor="#00FF00"
            strokeWidth={4}
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
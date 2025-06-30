import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as Notifications from "expo-notifications"
import * as Device from "expo-device"

export default function NotificationsScreen() {
  const [notificaciones, setNotificaciones] = useState([])
  const [prevNotificaciones, setPrevNotificaciones] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Solicita permisos para notificaciones locales
  useEffect(() => {
    const pedirPermisos = async () => {
      if (Device.isDevice) {
        const { status } = await Notifications.requestPermissionsAsync()
        if (status !== "granted") {
          Alert.alert("Permisos denegados", "No se pueden mostrar notificaciones.")
        }
      } else {
        Alert.alert("No compatible", "Debe usarse en un dispositivo físico.")
      }
    }
    pedirPermisos()
  }, [])

  // Obtiene notificaciones de la API y lanza nuevas al sistema
  const fetchNotifications = async () => {
    try {
      //const response = await fetch("https://c435-2803-c600-d20c-bd0d-9992-a400-c7b7-d89d.ngrok-free.app/alertas") // 
      const data = await response.json()

      // Detecta si hay nuevas notificaciones
      if (prevNotificaciones.length > 0 && data.length > prevNotificaciones.length) {
        const nuevas = data.slice(prevNotificaciones.length)

        for (const noti of nuevas) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: noti.titulo,
              body: noti.descripcion,
              sound: "default",
            },
            trigger: null, // Mostrar inmediatamente
          })
        }
      }

      setNotificaciones(data)
      setPrevNotificaciones(data)
    } catch (err) {
      console.error("Error al obtener notificaciones:", err)
      setError("No se pudieron cargar las notificaciones.")
    } finally {
      setIsLoading(false)
    }
  }

  // Ejecuta fetch al inicio y luego cada 5 segundos
  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 5000)
    return () => clearInterval(interval)
  }, [])

  const renderIcon = (tipo) => {
    switch (tipo) {
      case "gps":
        return <Ionicons name="locate" size={24} color="#2F4F4F" style={styles.alertIcon} />
      case "rastreo":
        return <Ionicons name="paw-outline" size={24} color="#2F4F4F" style={styles.alertIcon} />
      case "wifi":
        return <Ionicons name="warning-outline" size={24} color="#B22222" style={styles.alertIcon} />
      default:
        return <Ionicons name="notifications-outline" size={24} color="#6B8E23" style={styles.alertIcon} />
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="notifications" size={32} color="#6B8E23" />
          </View>
          <Text style={styles.title}>Notificaciones</Text>
          <Text style={styles.subtitle}>Mantente actualizado con alertas y noticias.</Text>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#6B8E23" />
        ) : error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          notificaciones.map((n, index) => (
            <View style={styles.alertBox} key={index}>
              {renderIcon(n.tipo)}
              <View style={styles.alertTextContainer}>
                <Text style={styles.alertTitle}>{n.titulo}</Text>
                <Text style={styles.alertDescription}>{n.descripcion}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3E7",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F8E8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2F4F4F",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B8E23",
    textAlign: "center",
    lineHeight: 22,
  },
  alertBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F0F8FF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CCE0E8",
    marginBottom: 16,
  },
  alertIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  alertTextContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2F4F4F",
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: "#2F4F4F",
    lineHeight: 20,
  },
})

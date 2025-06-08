"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emailSummary, setEmailSummary] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const handleSignOut = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro de que quieres cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Cerrar Sesión", style: "destructive", onPress: () => console.log("Sign out") },
    ])
  }

  const ProfileSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name="person-circle" size={20} color="#6B8E23" />
        <Text style={styles.sectionTitle}>Perfil</Text>
      </View>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Editar Información del Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Cambiar Contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingText}>Gestionar Ubicaciones Guardadas</Text>
      </TouchableOpacity>
    </View>
  )

  const NotificationSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name="notifications" size={20} color="#6B8E23" />
        <Text style={styles.sectionTitle}>Notificaciones</Text>
      </View>
      <View style={styles.switchItem}>
        <View style={styles.switchContent}>
          <Text style={styles.switchTitle}>Notificaciones Push</Text>
          <Text style={styles.switchSubtitle}>Recibe actualizaciones y alertas en tiempo real.</Text>
        </View>
        <Switch
          value={pushNotifications}
          onValueChange={setPushNotifications}
          trackColor={{ false: "#D3D3D3", true: "#90EE90" }}
          thumbColor={pushNotifications ? "#6B8E23" : "#f4f3f4"}
        />
      </View>
      <View style={styles.switchItem}>
        <View style={styles.switchContent}>
          <Text style={styles.switchTitle}>Resúmenes por Email</Text>
          <Text style={styles.switchSubtitle}>Recibe actividad semanal y noticias por email.</Text>
        </View>
        <Switch
          value={emailSummary}
          onValueChange={setEmailSummary}
          trackColor={{ false: "#D3D3D3", true: "#90EE90" }}
          thumbColor={emailSummary ? "#6B8E23" : "#f4f3f4"}
        />
      </View>
    </View>
  )

  const AppearanceSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name="color-palette" size={20} color="#6B8E23" />
        <Text style={styles.sectionTitle}>Apariencia</Text>
      </View>
      <View style={styles.switchItem}>
        <View style={styles.switchContent}>
          <Text style={styles.switchTitle}>Modo Oscuro</Text>
          <Text style={styles.switchSubtitle}>Activa el tema oscuro para la interfaz de la app.</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#D3D3D3", true: "#90EE90" }}
          thumbColor={darkMode ? "#6B8E23" : "#f4f3f4"}
        />
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="settings" size={32} color="#6B8E23" />
          </View>
          <Text style={styles.title}>Ajustes de la App</Text>
          <Text style={styles.subtitle}>Personaliza tu experiencia GeoNavega.</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <ProfileSection />
          <NotificationSection />
          <AppearanceSection />

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out" size={20} color="white" />
            <Text style={styles.signOutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3E7",
    padding: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
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
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2F4F4F",
    marginLeft: 8,
  },
  settingItem: {
    backgroundColor: "#F8F6F0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E8E6E0",
  },
  settingText: {
    fontSize: 16,
    color: "#6B8E23",
    fontWeight: "400",
  },
  switchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F6F0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E8E6E0",
  },
  switchContent: {
    flex: 1,
    marginRight: 15,
  },
  switchTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2F4F4F",
    marginBottom: 4,
  },
  switchSubtitle: {
    fontSize: 14,
    color: "#6B8E23",
    lineHeight: 18,
  },
  signOutButton: {
    backgroundColor: "#DC143C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  signOutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})

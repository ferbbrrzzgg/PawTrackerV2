"use client"

import { useState } from "react"
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Modal
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
// Change to default import
import DeviceInstructionsPopup from "./InstructionsPopup" // Adjust the path as needed

export default function InstructionsScreen() {
  const [expandedSections, setExpandedSections] = useState({})
  const [showDevicePopup, setShowDevicePopup] = useState(false)

  const sections = [
    {
      id: "map",
      title: "Usando el Mapa",
      content: "Aprende a navegar por el mapa y localizar a tu mascota en tiempo real.",
    },
    {
      id: "notifications",
      title: "Revisando Notificaciones",
      content: "Configura y gestiona las alertas para mantenerte informado sobre tu mascota.",
    },
    {
      id: "settings",
      title: "Personalizando Ajustes",
      content: "Personaliza la aplicación según tus preferencias y necesidades.",
    },
    {
      id: "navigation",
      title: "Navegando la App",
      content: "Descubre todas las funciones y características de PawTracker.",
    },
    {
      id: "device",
      title: "Configurar el dispositivo",
      content: "Aprende a configurar y sincronizar el collar GPS de tu mascota.",
    },
  ]

  const toggleSection = (sectionId) => {
    if (sectionId === "device") {
      setShowDevicePopup(true)
      return
    }
    
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="help-circle" size={32} color="#6B8E23" />
          </View>
          <Text style={styles.title}>Cómo Usar PawTracker</Text>
          <Text style={styles.subtitle}>Encuentra tu camino en la app con estos útiles consejos.</Text>
        </View>

        <ScrollView style={styles.sectionsContainer} showsVerticalScrollIndicator={false}>
          {sections.map((section) => (
            <View key={section.id} style={styles.sectionContainer}>
              <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection(section.id)}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Ionicons
                  name={expandedSections[section.id] ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#6B8E23"
                />
              </TouchableOpacity>
              {expandedSections[section.id] && (
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionText}>{section.content}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showDevicePopup}
        onRequestClose={() => setShowDevicePopup(false)}
      >
        <DeviceInstructionsPopup onClose={() => setShowDevicePopup(false)} />
      </Modal>
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
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F5F3E7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F4F4F",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B8E23",
    textAlign: "center",
    lineHeight: 22,
  },
  sectionsContainer: {
    flex: 1,
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2F4F4F",
    flex: 1,
  },
  sectionContent: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: "#FAFAFA",
  },
  sectionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  }
})
"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function InstructionsScreen() {
  const [expandedSections, setExpandedSections] = useState({})

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
  sectionsContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F6F0",
    padding: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E6E0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2F4F4F",
    flex: 1,
  },
  sectionContent: {
    backgroundColor: "#FAFAF8",
    padding: 18,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#E8E6E0",
  },
  sectionText: {
    fontSize: 14,
    color: "#6B8E23",
    lineHeight: 20,
  },
})
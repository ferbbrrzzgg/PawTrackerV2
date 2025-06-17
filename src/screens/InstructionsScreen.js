import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import DeviceInstructionsPopup from "./InstructionsPopup"

export default function InstructionsScreen() {
  const [showDevicePopup, setShowDevicePopup] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="help-circle" size={32} color="#6B8E23" />
          </View>
          <Text style={styles.title}>Cómo Usar PawTracker</Text>
          <Text style={styles.subtitle}>
            Pulsa el botón para configurar el dispositivo.
          </Text>

          {/* Botón con mismo color que el fondo */}
          <TouchableOpacity
            style={styles.configureButton}
            onPress={() => setShowDevicePopup(true)}
          >
            <Ionicons name="bluetooth" size={20} color="#2F4F4F" />
            <Text style={styles.configureButtonText}>Configurar dispositivo</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 20,
  },
  configureButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F3E7", // mismo color que el fondo
    padding: 14,
    borderRadius: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#6B8E23",
  },
  configureButtonText: {
    color: "#2F4F4F",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
})

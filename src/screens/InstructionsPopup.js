// DeviceInstructionsPopup.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// Change this from named export to default export
export default function DeviceInstructionsPopup({ onClose }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Instrucciones de configuración del dispositivo</Text>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <Text style={styles.backButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.instructionCard}>
          <Text style={styles.instructionTitle}>Cómo Configurar el collar</Text>

          {[
            "Verifica que el collar está cargado",
            "Asegúrate de tener conexión con tu Wifi y también Bluetooth",
            "Al encender el Bluetooth te debería salir el nombre del collar",
            "Asegúrate que está conectado correctamente con el Bluetooth",
            "Ingresa los datos de tu red Wifi",
            "Luego anda a la puerta de tu casa y aprieta el botón que ya estás ahí",
            "Al seguir los anteriores pasos, ¡estaría todo listo!",
          ].map((text, index) => (
            <View key={index} style={styles.instructionStep}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepText}>{text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3E7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0DFD5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F4F4F',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#6B8E23',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  instructionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F4F',
    marginBottom: 16,
  },
  instructionStep: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6B8E23',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
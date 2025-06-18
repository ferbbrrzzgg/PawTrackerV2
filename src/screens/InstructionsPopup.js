import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DeviceInstructionsPopup({ onClose }) {
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleBluetoothConnect = () => {
    console.log("Botón de conexión con Bluetooth presionado");
  };

  const handleWifiSubmit = () => {
    console.log("Nombre WiFi:", wifiName);
    console.log("Contraseña WiFi:", wifiPassword);
  };

  const steps = [
    "Verifica que el collar está cargado",
    "Asegúrate de tener conexión con tu Wifi ",
    "Al encender el Bluetooth te debería salir el nombre del collar",
    "Selecciona el collar y espera a que se conecte",
    "Ingresa los datos de tu red Wifi",
    "Asegúrate de que tus datos estén correctos",
    "Presiona el botón de conectar",
    "Luego dirígete a la puerta de tu casa y aprieta el botón que ya estás ahí",
    "Al seguir los anteriores pasos, ¡estaría todo listo!",
  ];

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

          {steps.map((text, index) => (
            <View key={index}>
              <View style={styles.instructionStep}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={styles.stepText}>{text}</Text>
              </View>

              {index === 2 && (
                <TouchableOpacity style={styles.bluetoothButton} onPress={handleBluetoothConnect}>
                  <Text style={styles.bluetoothButtonText}>Conexión con Bluetooth</Text>
                </TouchableOpacity>
              )}

              {index === 4 && (
                <View style={styles.wifiForm}>
                  <TextInput
                    placeholder="Nombre de tu Wifi"
                    value={wifiName}
                    onChangeText={setWifiName}
                    style={styles.input}
                  />
                  <View style={styles.passwordContainer}>
                    <TextInput
                      placeholder="Contraseña de tu Wifi"
                      value={wifiPassword}
                      onChangeText={setWifiPassword}
                      secureTextEntry={!showPassword}
                      style={[styles.input, { flex: 1, marginBottom: 0 }]}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={22}
                        color="#6B8E23"
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.submitButton} onPress={handleWifiSubmit}>
                    <Text style={styles.submitButtonText}>Ingrese su Wifi</Text>
                  </TouchableOpacity>
                </View>
              )}

              {index === 7 && (
                <TouchableOpacity style={styles.hereButton} onPress={() => console.log("¡Ya estoy acá!")}>
                  <Text style={styles.hereButtonText}>¡Ya estoy acá!</Text>
                </TouchableOpacity>
              )}
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
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0DFD5',
    backgroundColor: '#F5F3E7',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F4F4F',
    textAlign: 'center',
    marginBottom: 10,
  },
  backButton: {
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#6B8E23',
    fontWeight: '600',
    fontSize: 16,
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
  bluetoothButton: {
    alignSelf: 'center',
    backgroundColor: '#6B8E23',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 16,
  },
  bluetoothButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  wifiForm: {
    marginTop: -8,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 12,
  },
  eyeButton: {
    padding: 10,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#6B8E23',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  hereButton: {
    alignSelf: 'center',
    backgroundColor: '#6B8E23',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 20,
  },
  hereButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

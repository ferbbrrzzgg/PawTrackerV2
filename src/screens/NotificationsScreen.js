import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function NotificationsScreen() {
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

        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="cube-outline" size={48} color="#6B8E23" />
          </View>
          <Text style={styles.emptyTitle}>No hay notificaciones nuevas</Text>
          <Text style={styles.emptySubtitle}>Vuelve más tarde para ver actualizaciones.</Text>
        </View>
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
    marginBottom: 40,
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
  emptyState: {
    alignItems: "center",
  },
  emptyIconContainer: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#2F4F4F",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#6B8E23",
    textAlign: "center",
    lineHeight: 22,
  },
})
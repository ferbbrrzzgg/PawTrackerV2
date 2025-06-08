"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function ProjectDetailScreen({ route, navigation }) {
  const { project } = route.params

  const [projectStats] = useState({
    totalUsers: project.users,
    activeUsers: Math.floor(project.users * 0.7),
    apiCalls: 15420,
    storageUsed: "2.3 GB",
    bandwidth: "45.2 GB",
  })

  const StatCard = ({ icon, title, value, color }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={20} color={color} />
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  )

  const ActionButton = ({ icon, title, onPress, color }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color="white" />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
    </TouchableOpacity>
  )

  const handleDeleteProject = () => {
    Alert.alert("Delete Project", `Are you sure you want to delete "${project.name}"? This action cannot be undone.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          navigation.goBack()
          Alert.alert("Success", "Project deleted successfully")
        },
      },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
              <Text style={styles.statusText}>{project.status.toUpperCase()}</Text>
            </View>
            <Text style={styles.lastUpdated}>Updated {project.lastUpdated}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Project Statistics</Text>
        <StatCard
          icon="people-outline"
          title="Total Users"
          value={projectStats.totalUsers.toLocaleString()}
          color="#4285F4"
        />
        <StatCard
          icon="pulse-outline"
          title="Active Users"
          value={projectStats.activeUsers.toLocaleString()}
          color="#34A853"
        />
        <StatCard
          icon="analytics-outline"
          title="API Calls"
          value={projectStats.apiCalls.toLocaleString()}
          color="#FBBC04"
        />
        <StatCard icon="cloud-outline" title="Storage Used" value={projectStats.storageUsed} color="#EA4335" />
        <StatCard icon="wifi-outline" title="Bandwidth" value={projectStats.bandwidth} color="#9C27B0" />
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <ActionButton
            icon="settings-outline"
            title="Configure"
            color="#4285F4"
            onPress={() => Alert.alert("Configure", "Open project configuration")}
          />
          <ActionButton
            icon="analytics-outline"
            title="Analytics"
            color="#34A853"
            onPress={() => Alert.alert("Analytics", "View detailed analytics")}
          />
          <ActionButton
            icon="key-outline"
            title="API Keys"
            color="#FBBC04"
            onPress={() => Alert.alert("API Keys", "Manage API keys")}
          />
          <ActionButton
            icon="shield-outline"
            title="Security"
            color="#EA4335"
            onPress={() => Alert.alert("Security", "Security settings")}
          />
        </View>
      </View>

      <View style={styles.dangerZone}>
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteProject}>
          <Ionicons name="trash-outline" size={20} color="#EA4335" />
          <Text style={styles.dangerButtonText}>Delete Project</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "#34A853"
    case "inactive":
      return "#EA4335"
    case "development":
      return "#FBBC04"
    default:
      return "#666"
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
  },
  projectInfo: {
    alignItems: "flex-start",
  },
  projectName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 15,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  lastUpdated: {
    fontSize: 14,
    color: "#666",
  },
  statsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  statCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  actionsSection: {
    padding: 20,
    paddingTop: 0,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  dangerZone: {
    padding: 20,
    paddingTop: 0,
    marginBottom: 50,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EA4335",
  },
  dangerButtonText: {
    fontSize: 16,
    color: "#EA4335",
    marginLeft: 10,
    fontWeight: "500",
  },
})
"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState({
    totalProjects: 5,
    activeUsers: 1247,
    totalRequests: 15420,
    storageUsed: "2.3 GB",
  })

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const StatCard = ({ icon, title, value, color }) => (
    <TouchableOpacity style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </TouchableOpacity>
  )

  const QuickAction = ({ icon, title, onPress, color }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text style={styles.quickActionTitle}>{title}</Text>
    </TouchableOpacity>
  )

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.titleText}>Firebase Studio</Text>
        <Text style={styles.subtitleText}>Manage your Firebase projects with ease</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <StatCard icon="folder-outline" title="Total Projects" value={stats.totalProjects} color="#4285F4" />
        <StatCard
          icon="people-outline"
          title="Active Users"
          value={stats.activeUsers.toLocaleString()}
          color="#34A853"
        />
        <StatCard
          icon="analytics-outline"
          title="Total Requests"
          value={stats.totalRequests.toLocaleString()}
          color="#FBBC04"
        />
        <StatCard icon="cloud-outline" title="Storage Used" value={stats.storageUsed} color="#EA4335" />
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickAction
            icon="add-circle-outline"
            title="New Project"
            color="#4285F4"
            onPress={() => console.log("New Project")}
          />
          <QuickAction icon="server-outline" title="Database" color="#34A853" onPress={() => console.log("Database")} />
          <QuickAction
            icon="person-add-outline"
            title="Add User"
            color="#FBBC04"
            onPress={() => console.log("Add User")}
          />
          <QuickAction
            icon="cloud-upload-outline"
            title="Upload File"
            color="#EA4335"
            onPress={() => console.log("Upload File")}
          />
        </View>
      </View>

      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Ionicons name="checkmark-circle" size={20} color="#34A853" />
          <Text style={styles.activityText}>Project "MyApp" deployed successfully</Text>
          <Text style={styles.activityTime}>2 hours ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Ionicons name="person-add" size={20} color="#4285F4" />
          <Text style={styles.activityText}>New user registered</Text>
          <Text style={styles.activityTime}>4 hours ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Ionicons name="cloud-upload" size={20} color="#FBBC04" />
          <Text style={styles.activityText}>File uploaded to storage</Text>
          <Text style={styles.activityTime}>6 hours ago</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#FF6B35",
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    color: "white",
    fontSize: 16,
    opacity: 0.9,
  },
  titleText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
  subtitleText: {
    color: "white",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 5,
  },
  statsContainer: {
    padding: 20,
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
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  quickActionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickAction: {
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
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  recentActivity: {
    padding: 20,
    paddingTop: 0,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  activityTime: {
    fontSize: 12,
    color: "#666",
  },
})
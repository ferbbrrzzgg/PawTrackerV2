"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function ProjectsScreen({ navigation }) {
  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "MyApp",
      description: "Main mobile application",
      status: "active",
      users: 1247,
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "WebPortal",
      description: "Customer web portal",
      status: "active",
      users: 856,
      lastUpdated: "1 day ago",
    },
    {
      id: "3",
      name: "AdminPanel",
      description: "Administrative dashboard",
      status: "inactive",
      users: 23,
      lastUpdated: "1 week ago",
    },
    {
      id: "4",
      name: "TestProject",
      description: "Development testing environment",
      status: "development",
      users: 5,
      lastUpdated: "3 hours ago",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return "checkmark-circle"
      case "inactive":
        return "close-circle"
      case "development":
        return "construct"
      default:
        return "help-circle"
    }
  }

  const ProjectCard = ({ project }) => (
    <TouchableOpacity style={styles.projectCard} onPress={() => navigation.navigate("ProjectDetail", { project })}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
          <Ionicons name={getStatusIcon(project.status)} size={16} color="white" />
        </View>
      </View>

      <View style={styles.projectStats}>
        <View style={styles.statItem}>
          <Ionicons name="people-outline" size={16} color="#666" />
          <Text style={styles.statText}>{project.users} users</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.statText}>{project.lastUpdated}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const handleCreateProject = () => {
    Alert.alert("Create New Project", "This would open the project creation flow", [{ text: "OK" }])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateProject}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProjectCard project={item} />}
        contentContainerStyle={styles.projectsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: "#FF6B35",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  projectsList: {
    padding: 20,
  },
  projectCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 14,
    color: "#666",
  },
  statusBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  projectStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
})

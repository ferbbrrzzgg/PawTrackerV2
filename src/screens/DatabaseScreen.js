"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function DatabaseScreen() {
  const [selectedTab, setSelectedTab] = useState("collections")
  const [collections] = useState([
    { name: "users", documents: 1247, size: "2.3 MB" },
    { name: "posts", documents: 856, size: "5.1 MB" },
    { name: "comments", documents: 3421, size: "1.8 MB" },
    { name: "categories", documents: 23, size: "0.1 MB" },
  ])

  const [realtimeData] = useState([
    { path: "/users/active", value: "1247", type: "number" },
    { path: "/posts/latest", value: "Hello World!", type: "string" },
    { path: "/settings/maintenance", value: "false", type: "boolean" },
  ])

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity style={[styles.tabButton, isActive && styles.activeTab]} onPress={onPress}>
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
    </TouchableOpacity>
  )

  const CollectionCard = ({ collection }) => (
    <TouchableOpacity style={styles.collectionCard}>
      <View style={styles.collectionHeader}>
        <Ionicons name="folder" size={24} color="#4285F4" />
        <View style={styles.collectionInfo}>
          <Text style={styles.collectionName}>{collection.name}</Text>
          <Text style={styles.collectionStats}>
            {collection.documents} documents • {collection.size}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  )

  const RealtimeDataItem = ({ item }) => (
    <View style={styles.realtimeItem}>
      <View style={styles.realtimeHeader}>
        <Text style={styles.realtimePath}>{item.path}</Text>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.realtimeValue}>{item.value}</Text>
    </View>
  )

  const getTypeColor = (type) => {
    switch (type) {
      case "string":
        return "#34A853"
      case "number":
        return "#4285F4"
      case "boolean":
        return "#FBBC04"
      default:
        return "#666"
    }
  }

  const handleAddCollection = () => {
    Alert.alert("Add Collection", "This would open the collection creation dialog")
  }

  const handleAddData = () => {
    Alert.alert("Add Data", "This would open the data entry form")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TabButton
            title="Firestore"
            isActive={selectedTab === "collections"}
            onPress={() => setSelectedTab("collections")}
          />
          <TabButton
            title="Realtime DB"
            isActive={selectedTab === "realtime"}
            onPress={() => setSelectedTab("realtime")}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={selectedTab === "collections" ? handleAddCollection : handleAddData}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === "collections" ? (
          <View style={styles.collectionsContainer}>
            <Text style={styles.sectionTitle}>Collections</Text>
            {collections.map((collection, index) => (
              <CollectionCard key={index} collection={collection} />
            ))}
          </View>
        ) : (
          <View style={styles.realtimeContainer}>
            <Text style={styles.sectionTitle}>Realtime Database</Text>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#666" />
              <TextInput style={styles.searchInput} placeholder="Search by path..." />
            </View>
            {realtimeData.map((item, index) => (
              <RealtimeDataItem key={index} item={item} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 5,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#333",
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#FF6B35",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  collectionsContainer: {
    flex: 1,
  },
  collectionCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  collectionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  collectionInfo: {
    flex: 1,
    marginLeft: 15,
  },
  collectionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  collectionStats: {
    fontSize: 12,
    color: "#666",
  },
  realtimeContainer: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
  realtimeItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  realtimeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  realtimePath: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    color: "white",
    fontWeight: "600",
  },
  realtimeValue: {
    fontSize: 16,
    color: "#666",
    fontFamily: "monospace",
  },
})

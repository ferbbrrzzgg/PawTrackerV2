"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function StorageScreen() {
  const [files] = useState([
    {
      id: "1",
      name: "profile-images",
      type: "folder",
      size: "15.2 MB",
      items: 247,
      modified: "2 hours ago",
    },
    {
      id: "2",
      name: "documents",
      type: "folder",
      size: "8.7 MB",
      items: 56,
      modified: "1 day ago",
    },
    {
      id: "3",
      name: "app-logo.png",
      type: "image",
      size: "256 KB",
      modified: "3 days ago",
    },
    {
      id: "4",
      name: "user-manual.pdf",
      type: "document",
      size: "2.1 MB",
      modified: "1 week ago",
    },
    {
      id: "5",
      name: "backup.zip",
      type: "archive",
      size: "45.8 MB",
      modified: "2 weeks ago",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [uploadModalVisible, setUploadModalVisible] = useState(false)

  const getFileIcon = (type) => {
    switch (type) {
      case "folder":
        return "folder"
      case "image":
        return "image"
      case "document":
        return "document-text"
      case "archive":
        return "archive"
      default:
        return "document"
    }
  }

  const getFileColor = (type) => {
    switch (type) {
      case "folder":
        return "#4285F4"
      case "image":
        return "#34A853"
      case "document":
        return "#EA4335"
      case "archive":
        return "#FBBC04"
      default:
        return "#666"
    }
  }

  const FileItem = ({ file }) => (
    <TouchableOpacity style={styles.fileItem}>
      <View style={styles.fileIcon}>
        <Ionicons name={getFileIcon(file.type)} size={24} color={getFileColor(file.type)} />
      </View>
      <View style={styles.fileInfo}>
        <Text style={styles.fileName}>{file.name}</Text>
        <Text style={styles.fileDetails}>
          {file.size} • {file.modified}
          {file.items && ` • ${file.items} items`}
        </Text>
      </View>
      <TouchableOpacity style={styles.fileMenu}>
        <Ionicons name="ellipsis-vertical" size={20} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  const StorageStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Ionicons name="cloud" size={24} color="#4285F4" />
        <Text style={styles.statValue}>2.3 GB</Text>
        <Text style={styles.statLabel}>Used</Text>
      </View>
      <View style={styles.statCard}>
        <Ionicons name="folder" size={24} color="#34A853" />
        <Text style={styles.statValue}>1,247</Text>
        <Text style={styles.statLabel}>Files</Text>
      </View>
      <View style={styles.statCard}>
        <Ionicons name="download" size={24} color="#FBBC04" />
        <Text style={styles.statValue}>15.2K</Text>
        <Text style={styles.statLabel}>Downloads</Text>
      </View>
    </View>
  )

  const UploadModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={uploadModalVisible}
      onRequestClose={() => setUploadModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Upload File</Text>
            <TouchableOpacity onPress={() => setUploadModalVisible(false)}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.uploadOptions}>
            <TouchableOpacity style={styles.uploadOption}>
              <Ionicons name="camera" size={32} color="#4285F4" />
              <Text style={styles.uploadOptionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadOption}>
              <Ionicons name="image" size={32} color="#34A853" />
              <Text style={styles.uploadOptionText}>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadOption}>
              <Ionicons name="document" size={32} color="#EA4335" />
              <Text style={styles.uploadOptionText}>Choose Document</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search files..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={() => setUploadModalVisible(true)}>
          <Ionicons name="cloud-upload" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <StorageStats />

        <View style={styles.filesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Files & Folders</Text>
            <TouchableOpacity>
              <Ionicons name="grid" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {filteredFiles.map((file) => (
            <FileItem key={file.id} file={file} />
          ))}
        </View>
      </ScrollView>

      <UploadModal />
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
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  filesSection: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  fileDetails: {
    fontSize: 12,
    color: "#666",
  },
  fileMenu: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  uploadOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  uploadOption: {
    alignItems: "center",
    padding: 20,
  },
  uploadOptionText: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
    textAlign: "center",
  },
})

"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function AuthScreen() {
  const [selectedTab, setSelectedTab] = useState("users")
  const [users] = useState([
    {
      id: "1",
      email: "john.doe@example.com",
      displayName: "John Doe",
      provider: "email",
      lastSignIn: "2 hours ago",
      verified: true,
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      displayName: "Jane Smith",
      provider: "google",
      lastSignIn: "1 day ago",
      verified: true,
    },
    {
      id: "3",
      email: "bob.wilson@example.com",
      displayName: "Bob Wilson",
      provider: "email",
      lastSignIn: "3 days ago",
      verified: false,
    },
  ])

  const [authSettings, setAuthSettings] = useState({
    emailSignIn: true,
    googleSignIn: true,
    facebookSignIn: false,
    twitterSignIn: false,
    emailVerification: true,
    multiFactorAuth: false,
  })

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity style={[styles.tabButton, isActive && styles.activeTab]} onPress={onPress}>
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
    </TouchableOpacity>
  )

  const UserCard = ({ user }) => (
    <TouchableOpacity style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.userAvatar}>
          <Text style={styles.userInitial}>{user.displayName.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.displayName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.userMeta}>
            <View style={styles.providerBadge}>
              <Ionicons name={user.provider === "google" ? "logo-google" : "mail"} size={12} color="white" />
              <Text style={styles.providerText}>{user.provider}</Text>
            </View>
            <Text style={styles.lastSignIn}>Last: {user.lastSignIn}</Text>
          </View>
        </View>
        <View style={styles.userStatus}>
          <Ionicons
            name={user.verified ? "checkmark-circle" : "alert-circle"}
            size={20}
            color={user.verified ? "#34A853" : "#FBBC04"}
          />
        </View>
      </View>
    </TouchableOpacity>
  )

  const SettingItem = ({ title, description, value, onValueChange, icon }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={24} color="#4285F4" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#767577", true: "#FF6B35" }}
        thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
      />
    </View>
  )

  const handleAddUser = () => {
    Alert.alert("Add User", "This would open the user creation form")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tabContainer}>
          <TabButton title="Users" isActive={selectedTab === "users"} onPress={() => setSelectedTab("users")} />
          <TabButton
            title="Settings"
            isActive={selectedTab === "settings"}
            onPress={() => setSelectedTab("settings")}
          />
        </View>
        {selectedTab === "users" && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
            <Ionicons name="person-add" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        {selectedTab === "users" ? (
          <View style={styles.usersContainer}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#666" />
              <TextInput style={styles.searchInput} placeholder="Search users..." />
            </View>
            <Text style={styles.sectionTitle}>Users ({users.length})</Text>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </View>
        ) : (
          <View style={styles.settingsContainer}>
            <Text style={styles.sectionTitle}>Sign-in Methods</Text>
            <SettingItem
              title="Email/Password"
              description="Allow users to sign in with email and password"
              value={authSettings.emailSignIn}
              onValueChange={(value) => setAuthSettings({ ...authSettings, emailSignIn: value })}
              icon="mail"
            />
            <SettingItem
              title="Google"
              description="Allow users to sign in with Google"
              value={authSettings.googleSignIn}
              onValueChange={(value) => setAuthSettings({ ...authSettings, googleSignIn: value })}
              icon="logo-google"
            />
            <SettingItem
              title="Facebook"
              description="Allow users to sign in with Facebook"
              value={authSettings.facebookSignIn}
              onValueChange={(value) => setAuthSettings({ ...authSettings, facebookSignIn: value })}
              icon="logo-facebook"
            />
            <SettingItem
              title="Twitter"
              description="Allow users to sign in with Twitter"
              value={authSettings.twitterSignIn}
              onValueChange={(value) => setAuthSettings({ ...authSettings, twitterSignIn: value })}
              icon="logo-twitter"
            />

            <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Security Settings</Text>
            <SettingItem
              title="Email Verification"
              description="Require email verification for new accounts"
              value={authSettings.emailVerification}
              onValueChange={(value) => setAuthSettings({ ...authSettings, emailVerification: value })}
              icon="shield-checkmark"
            />
            <SettingItem
              title="Multi-Factor Authentication"
              description="Enable two-factor authentication"
              value={authSettings.multiFactorAuth}
              onValueChange={(value) => setAuthSettings({ ...authSettings, multiFactorAuth: value })}
              icon="key"
            />
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
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
  userCard: {
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
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
  },
  userInitial: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  userMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  providerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4285F4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  providerText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
    marginLeft: 4,
  },
  lastSignIn: {
    fontSize: 12,
    color: "#666",
  },
  userStatus: {
    marginLeft: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
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
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
  },
})

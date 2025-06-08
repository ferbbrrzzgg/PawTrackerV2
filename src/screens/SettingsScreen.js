"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
    biometricAuth: false,
    crashReporting: true,
    analytics: true,
  })

  const SettingItem = ({ title, description, value, onValueChange, icon, type = "switch" }) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={24} color="#4285F4" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      {type === "switch" ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#767577", true: "#FF6B35" }}
          thumbColor={value ? "#f4f3f4" : "#f4f3f4"}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#666" />
      )}
    </TouchableOpacity>
  )

  const SectionHeader = ({ title }) => <Text style={styles.sectionHeader}>{title}</Text>

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: () => console.log("Sign out") },
    ])
  }

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "This action cannot be undone. All your data will be permanently deleted.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => console.log("Delete account") },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileInitial}>JD</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={16} color="#4285F4" />
        </TouchableOpacity>
      </View>

      <SectionHeader title="Preferences" />
      <SettingItem
        title="Push Notifications"
        description="Receive notifications about your projects"
        value={settings.notifications}
        onValueChange={(value) => setSettings({ ...settings, notifications: value })}
        icon="notifications"
      />
      <SettingItem
        title="Dark Mode"
        description="Use dark theme throughout the app"
        value={settings.darkMode}
        onValueChange={(value) => setSettings({ ...settings, darkMode: value })}
        icon="moon"
      />
      <SettingItem
        title="Auto Sync"
        description="Automatically sync data when connected"
        value={settings.autoSync}
        onValueChange={(value) => setSettings({ ...settings, autoSync: value })}
        icon="sync"
      />

      <SectionHeader title="Security" />
      <SettingItem
        title="Biometric Authentication"
        description="Use fingerprint or face recognition"
        value={settings.biometricAuth}
        onValueChange={(value) => setSettings({ ...settings, biometricAuth: value })}
        icon="finger-print"
      />
      <SettingItem title="Change Password" icon="key" type="navigation" />
      <SettingItem title="Two-Factor Authentication" icon="shield-checkmark" type="navigation" />

      <SectionHeader title="Privacy" />
      <SettingItem
        title="Crash Reporting"
        description="Help improve the app by sending crash reports"
        value={settings.crashReporting}
        onValueChange={(value) => setSettings({ ...settings, crashReporting: value })}
        icon="bug"
      />
      <SettingItem
        title="Analytics"
        description="Share usage data to improve the app"
        value={settings.analytics}
        onValueChange={(value) => setSettings({ ...settings, analytics: value })}
        icon="analytics"
      />
      <SettingItem title="Privacy Policy" icon="document-text" type="navigation" />

      <SectionHeader title="Support" />
      <SettingItem title="Help Center" icon="help-circle" type="navigation" />
      <SettingItem title="Contact Support" icon="mail" type="navigation" />
      <SettingItem title="Rate the App" icon="star" type="navigation" />

      <SectionHeader title="About" />
      <SettingItem title="Version" description="1.0.0 (Build 123)" icon="information-circle" type="info" />
      <SettingItem title="Terms of Service" icon="document" type="navigation" />

      <View style={styles.dangerZone}>
        <TouchableOpacity style={styles.dangerButton} onPress={handleSignOut}>
          <Ionicons name="log-out" size={20} color="#EA4335" />
          <Text style={styles.dangerButtonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dangerButton} onPress={handleDeleteAccount}>
          <Ionicons name="trash" size={20} color="#EA4335" />
          <Text style={styles.dangerButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileSection: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    padding: 10,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
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
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
  },
  dangerZone: {
    marginTop: 30,
    marginBottom: 50,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dangerButtonText: {
    fontSize: 16,
    color: "#EA4335",
    marginLeft: 15,
    fontWeight: "500",
  },
})

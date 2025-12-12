import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const USER_STATS = [
  { label: 'Movies Watched', value: '142', icon: '🎬', color: '#FF416C' },
  { label: 'Watchlist', value: '24', icon: '⏰', color: '#2196F3' },
  { label: 'Reviews', value: '56', icon: '⭐', color: '#FFD700' },
  { label: 'Following', value: '89', icon: '👥', color: '#4CAF50' },
];

const WATCHED_MOVIES = [
  {
    id: 1,
    title: 'Interstellar',
    date: 'Yesterday',
    rating: 5,
    poster: 'https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  },
  {
    id: 2,
    title: 'Inception',
    date: '2 days ago',
    rating: 4,
    poster: 'https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    date: '1 week ago',
    rating: 5,
    poster: 'https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
];

const WATCHLIST = [
  {
    id: 1,
    title: 'Dune: Part Two',
    added: '3 days ago',
    poster: 'https://image.tmdb.org/t/p/w300/8b8R8l88Qje9dn9OE8PY05Nx1S8.jpg',
  },
  {
    id: 2,
    title: 'Poor Things',
    added: '1 week ago',
    poster: 'https://image.tmdb.org/t/p/w300/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
  },
  {
    id: 3,
    title: 'Oppenheimer',
    added: '2 weeks ago',
    poster: 'https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR3nYzh.jpg',
  },
];

const PREFERENCES = [
  { label: 'Action', enabled: true },
  { label: 'Sci-Fi', enabled: true },
  { label: 'Drama', enabled: true },
  { label: 'Comedy', enabled: false },
  { label: 'Horror', enabled: false },
  { label: 'Documentary', enabled: true },
];

export default function ProfileScreen() {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    memberSince: '2022',
  });
  const [editMode, setEditMode] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [preferences, setPreferences] = useState(PREFERENCES);
  const [activeTab, setActiveTab] = useState('watched');

  const togglePreference = (index) => {
    const newPrefs = [...preferences];
    newPrefs[index].enabled = !newPrefs[index].enabled;
    setPreferences(newPrefs);
  };

  const saveProfile = () => {
    setUser({ ...user, name: tempName });
    setEditMode(false);
    // Save to AsyncStorage
    AsyncStorage.setItem('userProfile', JSON.stringify({ ...user, name: tempName }));
  };

  const RatingStars = ({ rating }) => (
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <MaterialIcons
          key={star}
          name={star <= rating ? 'star' : 'star-outline'}
          size={16}
          color={star <= rating ? '#FFD700' : '#666'}
        />
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#0f0c29', '#302b63']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatar}>
              <Feather name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          {editMode ? (
            <View style={styles.editNameContainer}>
              <TextInput
                style={styles.nameInput}
                value={tempName}
                onChangeText={setTempName}
                autoFocus
              />
              <View style={styles.editActions}>
                <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditMode(false)} style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
                <Feather name="edit-2" size={16} color="#FF416C" />
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </LinearGradient>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {USER_STATS.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Activity Tabs */}
      <View style={styles.tabsContainer}>
        {['Watched', 'Watchlist', 'Reviews', 'Preferences'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab.toLowerCase() && styles.activeTab]}
            onPress={() => setActiveTab(tab.toLowerCase())}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.toLowerCase() && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content based on active tab */}
      <View style={styles.content}>
        {activeTab === 'watched' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recently Watched</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {WATCHED_MOVIES.map((movie) => (
              <TouchableOpacity key={movie.id} style={styles.activityCard}>
                <Image source={{ uri: movie.poster }} style={styles.activityPoster} />
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{movie.title}</Text>
                  <Text style={styles.activityDate}>Watched {movie.date}</Text>
                  <RatingStars rating={movie.rating} />
                </View>
                <TouchableOpacity style={styles.activityAction}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </>
        )}

        {activeTab === 'watchlist' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Watchlist</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {WATCHLIST.map((movie) => (
              <TouchableOpacity key={movie.id} style={styles.activityCard}>
                <Image source={{ uri: movie.poster }} style={styles.activityPoster} />
                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>{movie.title}</Text>
                  <Text style={styles.activityDate}>Added {movie.added}</Text>
                  <TouchableOpacity style={styles.watchButton}>
                    <Ionicons name="play" size={16} color="white" />
                    <Text style={styles.watchButtonText}>Watch Now</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.activityAction}>
                  <Ionicons name="close" size={20} color="#999" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </>
        )}

        {activeTab === 'preferences' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Preferences</Text>
              <Text style={styles.sectionSubtitle}>Customize your movie recommendations</Text>
            </View>
            
            <View style={styles.preferencesGrid}>
              {preferences.map((pref, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.preferenceCard,
                    pref.enabled && styles.preferenceCardEnabled
                  ]}
                  onPress={() => togglePreference(index)}
                >
                  <Text style={[
                    styles.preferenceLabel,
                    pref.enabled && styles.preferenceLabelEnabled
                  ]}>
                    {pref.label}
                  </Text>
                  <Switch
                    value={pref.enabled}
                    onValueChange={() => togglePreference(index)}
                    trackColor={{ false: '#444', true: '#FF416C' }}
                    thumbColor={pref.enabled ? '#FF416C' : '#f4f3f4'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Settings */}
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Settings</Text>
              
              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="moon" size={24} color="#666" />
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#444', true: '#FF416C' }}
                  thumbColor={darkMode ? '#FF416C' : '#f4f3f4'}
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="notifications" size={24} color="#666" />
                  <Text style={styles.settingLabel}>Notifications</Text>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#444', true: '#FF416C' }}
                  thumbColor={notifications ? '#FF416C' : '#f4f3f4'}
                />
              </View>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="language" size={24} color="#666" />
                  <Text style={styles.settingLabel}>Language</Text>
                </View>
                <Text style={styles.settingValue}>English</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <Ionicons name="shield" size={24} color="#666" />
                  <Text style={styles.settingLabel}>Privacy</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton}>
              <Ionicons name="log-out" size={20} color="#FF416C" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF416C',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 65, 108, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FF416C',
  },
  editButtonText: {
    color: '#FF416C',
    fontWeight: '600',
    marginLeft: 8,
  },
  editNameContainer: {
    width: '100%',
    alignItems: 'center',
  },
  nameInput: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  editActions: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    backgroundColor: '#FF416C',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#666',
  },
  cancelButtonText: {
    color: '#ccc',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: -30,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FF416C',
  },
  tabText: {
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FF416C',
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
  },
  viewAll: {
    color: '#FF416C',
    fontWeight: '600',
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityPoster: {
    width: 60,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  activityDate: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF416C',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  watchButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  activityAction: {
    padding: 10,
  },
  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 30,
  },
  preferenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    width: (width - 60) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  preferenceCardEnabled: {
    backgroundColor: 'rgba(255, 65, 108, 0.1)',
    borderColor: '#FF416C',
  },
  preferenceLabel: {
    color: '#ccc',
    fontWeight: '500',
  },
  preferenceLabelEnabled: {
    color: '#FF416C',
    fontWeight: 'bold',
  },
  settingsSection: {
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
  },
  settingValue: {
    color: '#ccc',
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 65, 108, 0.1)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#FF416C',
  },
  logoutText: {
    color: '#FF416C',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
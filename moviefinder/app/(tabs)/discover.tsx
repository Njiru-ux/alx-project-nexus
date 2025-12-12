import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const GENRES = [
  { id: 28, name: 'Action', icon: '💥', color: '#FF5252' },
  { id: 35, name: 'Comedy', icon: '😂', color: '#FFC107' },
  { id: 18, name: 'Drama', icon: '🎭', color: '#2196F3' },
  { id: 27, name: 'Horror', icon: '👻', color: '#9C27B0' },
  { id: 878, name: 'Sci-Fi', icon: '🚀', color: '#00BCD4' },
  { id: 10749, name: 'Romance', icon: '❤️', color: '#E91E63' },
  { id: 53, name: 'Thriller', icon: '🔪', color: '#795548' },
  { id: 16, name: 'Animation', icon: '🎨', color: '#4CAF50' },
  { id: 99, name: 'Documentary', icon: '📽️', color: '#607D8B' },
  { id: 10751, name: 'Family', icon: '👨‍👩‍👧‍👦', color: '#FF9800' },
];

const YEARS = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

const MOVIE_COLLECTIONS = [
  {
    id: 1,
    title: 'Oscar Winners',
    description: 'Academy Award winning films',
    count: '45 films',
    icon: '🏆',
    color: '#FFD700',
    image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: 2,
    title: 'Mind Benders',
    description: 'Movies that make you think',
    count: '32 films',
    icon: '🌀',
    color: '#9C27B0',
    image: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
  },
  {
    id: 3,
    title: 'Epic Adventures',
    description: 'Journeys of a lifetime',
    count: '28 films',
    icon: '🗺️',
    color: '#4CAF50',
    image: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
  },
  {
    id: 4,
    title: 'Tearjerkers',
    description: 'Get the tissues ready',
    count: '36 films',
    icon: '😭',
    color: '#2196F3',
    image: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  },
];

const DISCOVER_MOVIES = [
  {
    id: 1,
    title: 'Dune: Part Two',
    poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nx1S8.jpg',
    rating: 8.4,
    year: 2024,
    genre: 'Sci-Fi',
  },
  {
    id: 2,
    title: 'Poor Things',
    poster: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
    rating: 7.8,
    year: 2023,
    genre: 'Comedy',
  },
  {
    id: 3,
    title: 'Oppenheimer',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR3nYzh.jpg',
    rating: 8.1,
    year: 2023,
    genre: 'Drama',
  },
  {
    id: 4,
    title: 'The Holdovers',
    poster: 'https://image.tmdb.org/t/p/w500/vD6Vk5tXm1tWfbd1e8bTtQYyF5S.jpg',
    rating: 7.9,
    year: 2023,
    genre: 'Comedy',
  },
  {
    id: 5,
    title: 'Killers of the Flower Moon',
    poster: 'https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg',
    rating: 7.6,
    year: 2023,
    genre: 'Crime',
  },
  {
    id: 6,
    title: 'Past Lives',
    poster: 'https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
    rating: 8.0,
    year: 2023,
    genre: 'Romance',
  },
];

export default function DiscoverScreen() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#0f0c29', '#302b63']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>Find your next favorite movie</Text>
        </View>
      </LinearGradient>

      {/* Search and Filters */}
      <View style={styles.filtersSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for movies..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="filter" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Sort Options */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortOptions}>
          {['Popular', 'Newest', 'Highest Rated', 'Trending', 'Upcoming'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.sortOption,
                sortBy === option.toLowerCase() && styles.sortOptionActive
              ]}
              onPress={() => setSortBy(option.toLowerCase())}
            >
              <Text style={[
                styles.sortOptionText,
                sortBy === option.toLowerCase() && styles.sortOptionTextActive
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Year Filters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Release Year</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.yearContainer}>
            <TouchableOpacity
              style={[styles.yearButton, !selectedYear && styles.yearButtonActive]}
              onPress={() => setSelectedYear(null)}
            >
              <Text style={[styles.yearText, !selectedYear && styles.yearTextActive]}>
                All Years
              </Text>
            </TouchableOpacity>
            {YEARS.map((year) => (
              <TouchableOpacity
                key={year}
                style={[styles.yearButton, selectedYear === year && styles.yearButtonActive]}
                onPress={() => setSelectedYear(year)}
              >
                <Text style={[styles.yearText, selectedYear === year && styles.yearTextActive]}>
                  {year}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Genre Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by Genre</Text>
        <View style={styles.genreGrid}>
          {GENRES.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              style={[
                styles.genreCard,
                selectedGenre === genre.id && { backgroundColor: genre.color + '40' }
              ]}
              onPress={() => setSelectedGenre(genre.id)}
            >
              <View style={[styles.genreIcon, { backgroundColor: genre.color }]}>
                <Text style={styles.genreIconText}>{genre.icon}</Text>
              </View>
              <Text style={styles.genreName}>{genre.name}</Text>
              {selectedGenre === genre.id && (
                <View style={styles.selectedIndicator}>
                  <MaterialIcons name="check" size={16} color="white" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Collections */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Collections</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MOVIE_COLLECTIONS.map((collection) => (
            <TouchableOpacity key={collection.id} style={styles.collectionCard}>
              <Image
                source={{ uri: collection.image }}
                style={styles.collectionImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.collectionContent}>
                <View style={[styles.collectionIcon, { backgroundColor: collection.color }]}>
                  <Text style={styles.collectionIconText}>{collection.icon}</Text>
                </View>
                <Text style={styles.collectionTitle}>{collection.title}</Text>
                <Text style={styles.collectionDescription}>{collection.description}</Text>
                <Text style={styles.collectionCount}>{collection.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Discover Movies Grid */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Movies</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.moviesGrid}>
          {DISCOVER_MOVIES.map((movie) => (
            <TouchableOpacity key={movie.id} style={styles.movieCard}>
              <Image source={{ uri: movie.poster }} style={styles.moviePoster} />
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
                <View style={styles.movieDetails}>
                  <Text style={styles.movieRating}>⭐ {movie.rating}</Text>
                  <Text style={styles.movieYear}>{movie.year}</Text>
                  <Text style={styles.movieGenre}>{movie.genre}</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="add" size={20} color="#FF416C" />
                  <Text style={styles.addButtonText}>Watchlist</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
  },
  filtersSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 25,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 15,
  },
  filterButton: {
    backgroundColor: '#FF416C',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortOptions: {
    marginBottom: 20,
  },
  sortOption: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginRight: 10,
  },
  sortOptionActive: {
    backgroundColor: '#FF416C',
  },
  sortOptionText: {
    color: '#ccc',
    fontWeight: '500',
  },
  sortOptionTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  viewAll: {
    color: '#FF416C',
    fontWeight: '600',
  },
  yearContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  yearButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginRight: 10,
  },
  yearButtonActive: {
    backgroundColor: '#FF416C',
  },
  yearText: {
    color: '#ccc',
    fontWeight: '500',
  },
  yearTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  genreCard: {
    width: (width - 60) / 3,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
  },
  genreIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  genreIconText: {
    fontSize: 24,
  },
  genreName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF416C',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionCard: {
    width: 200,
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 15,
    marginLeft: 20,
  },
  collectionImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  collectionContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  collectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  collectionIconText: {
    fontSize: 20,
  },
  collectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  collectionDescription: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 5,
  },
  collectionCount: {
    fontSize: 11,
    color: '#FF416C',
    fontWeight: '600',
  },
  moviesGrid: {
    paddingHorizontal: 20,
  },
  movieCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  moviePoster: {
    width: 100,
    height: 150,
  },
  movieInfo: {
    flex: 1,
    padding: 15,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  movieDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  movieRating: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  movieYear: {
    color: '#aaa',
  },
  movieGenre: {
    color: '#FF416C',
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 65, 108, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#FF416C',
    fontWeight: '600',
    marginLeft: 5,
    fontSize: 14,
  },
});
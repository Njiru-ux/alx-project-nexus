import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Switch,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Slider } from '@react-native-assets/slider';

const { width } = Dimensions.get('window');

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
  'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction',
  'TV Movie', 'Thriller', 'War', 'Western'
];

const YEARS = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());
const RUNTIMES = ['Any', '< 90 min', '90-120 min', '> 120 min'];

const SEARCH_RESULTS = [
  {
    id: 1,
    title: 'Dune: Part Two',
    year: 2024,
    rating: 8.4,
    genre: 'Sci-Fi, Adventure',
    poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nx1S8.jpg',
  },
  {
    id: 2,
    title: 'Poor Things',
    year: 2023,
    rating: 7.8,
    genre: 'Comedy, Drama',
    poster: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
  },
  {
    id: 3,
    title: 'Oppenheimer',
    year: 2023,
    rating: 8.1,
    genre: 'Biography, Drama',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR3nYzh.jpg',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([1990, 2024]);
  const [rating, setRating] = useState(5);
  const [runtime, setRuntime] = useState('Any');
  const [sortBy, setSortBy] = useState('relevance');

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setYearRange([1990, 2024]);
    setRating(5);
    setRuntime('Any');
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <LinearGradient
        colors={['#0f0c29', '#302b63']}
        style={styles.header}
      >
        <View style={styles.searchHeader}>
          <Text style={styles.title}>Search</Text>
          <Text style={styles.subtitle}>Find exactly what you're looking for</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={22} color="#FF416C" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search movies, actors, directors..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
          
          <TouchableOpacity
            style={[styles.filterToggle, showFilters && styles.filterToggleActive]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Feather name="filter" size={20} color={showFilters ? 'white' : '#FF416C'} />
            <Text style={[styles.filterToggleText, showFilters && styles.filterToggleTextActive]}>
              Filters
            </Text>
            {selectedGenres.length > 0 && (
              <View style={styles.filterCount}>
                <Text style={styles.filterCountText}>{selectedGenres.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Advanced Filters */}
      {showFilters && (
        <ScrollView style={styles.filtersPanel} showsVerticalScrollIndicator={false}>
          <View style={styles.filtersHeader}>
            <Text style={styles.filtersTitle}>Advanced Filters</Text>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFilters}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {/* Genres */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Genres</Text>
            <View style={styles.genresGrid}>
              {GENRES.map((genre) => (
                <TouchableOpacity
                  key={genre}
                  style={[
                    styles.genreChip,
                    selectedGenres.includes(genre) && styles.genreChipSelected
                  ]}
                  onPress={() => toggleGenre(genre)}
                >
                  <Text style={[
                    styles.genreChipText,
                    selectedGenres.includes(genre) && styles.genreChipTextSelected
                  ]}>
                    {genre}
                  </Text>
                  {selectedGenres.includes(genre) && (
                    <MaterialIcons name="check" size={16} color="white" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Year Range */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>
              Release Year: {yearRange[0]} - {yearRange[1]}
            </Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>{yearRange[0]}</Text>
              <Slider
                style={styles.slider}
                minimumValue={1970}
                maximumValue={2024}
                step={1}
                value={yearRange[0]}
                onValueChange={(value) => setYearRange([value, yearRange[1]])}
                minimumTrackTintColor="#FF416C"
                maximumTrackTintColor="#444"
                thumbTintColor="#FF416C"
              />
              <Text style={styles.sliderLabel}>{yearRange[1]}</Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Minimum Rating: {rating.toFixed(1)}</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={24}
                    color={star <= rating ? '#FFD700' : '#666'}
                    onPress={() => setRating(star)}
                  />
                ))}
              </View>
              <Text style={styles.ratingText}>{rating.toFixed(1)}/10</Text>
            </View>
          </View>

          {/* Runtime */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Runtime</Text>
            <View style={styles.runtimeOptions}>
              {RUNTIMES.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[styles.runtimeOption, runtime === time && styles.runtimeOptionSelected]}
                  onPress={() => setRuntime(time)}
                >
                  <Text style={[
                    styles.runtimeOptionText,
                    runtime === time && styles.runtimeOptionTextSelected
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sort Options */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Sort By</Text>
            <View style={styles.sortOptions}>
              {[
                { value: 'relevance', label: 'Relevance' },
                { value: 'rating', label: 'Highest Rated' },
                { value: 'newest', label: 'Newest First' },
                { value: 'popularity', label: 'Most Popular' },
              ].map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.sortOption, sortBy === option.value && styles.sortOptionSelected]}
                  onPress={() => setSortBy(option.value)}
                >
                  <Text style={[
                    styles.sortOptionText,
                    sortBy === option.value && styles.sortOptionTextSelected
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.applyFilters}>
            <Text style={styles.applyFiltersText}>Apply Filters</Text>
            <Ionicons name="checkmark-circle" size={20} color="white" />
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Search Results */}
      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        {searchQuery ? (
          <>
            <Text style={styles.resultsTitle}>Search Results for "{searchQuery}"</Text>
            <View style={styles.resultsGrid}>
              {SEARCH_RESULTS.map((movie) => (
                <TouchableOpacity key={movie.id} style={styles.resultCard}>
                  <Image source={{ uri: movie.poster }} style={styles.resultPoster} />
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle}>{movie.title}</Text>
                    <View style={styles.resultDetails}>
                      <Text style={styles.resultYear}>{movie.year}</Text>
                      <View style={styles.resultRating}>
                        <MaterialIcons name="star" size={14} color="#FFD700" />
                        <Text style={styles.resultRatingText}>{movie.rating}</Text>
                      </View>
                    </View>
                    <Text style={styles.resultGenre}>{movie.genre}</Text>
                    <TouchableOpacity style={styles.resultButton}>
                      <Text style={styles.resultButtonText}>View Details</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={80} color="#FF416C" />
            <Text style={styles.emptyTitle}>Start Searching</Text>
            <Text style={styles.emptyText}>
              Search for movies, TV shows, actors, or directors
            </Text>
            <View style={styles.searchTips}>
              <Text style={styles.tipsTitle}>Search Tips:</Text>
              {[
                'Try searching by movie title',
                'Search for your favorite actor',
                'Use filters for precise results',
                'Try genre names like "sci-fi" or "comedy"',
              ].map((tip, index) => (
                <View key={index} style={styles.tip}>
                  <MaterialIcons name="lightbulb" size={16} color="#FFD700" />
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  searchHeader: {
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 65, 108, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FF416C',
  },
  filterToggleActive: {
    backgroundColor: '#FF416C',
  },
  filterToggleText: {
    color: '#FF416C',
    fontWeight: '600',
    marginLeft: 5,
  },
  filterToggleTextActive: {
    color: 'white',
  },
  filterCount: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  filterCountText: {
    color: '#FF416C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filtersPanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 20,
    padding: 20,
    maxHeight: 400,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filtersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  clearFilters: {
    color: '#FF416C',
    fontWeight: '600',
  },
  filterSection: {
    marginBottom: 25,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  genresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  genreChipSelected: {
    backgroundColor: '#FF416C',
    borderColor: '#FF416C',
  },
  genreChipText: {
    color: '#ccc',
    fontSize: 12,
    marginRight: 5,
  },
  genreChipTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderLabel: {
    color: '#ccc',
    fontSize: 12,
    minWidth: 40,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stars: {
    flexDirection: 'row',
    flex: 1,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  runtimeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  runtimeOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  runtimeOptionSelected: {
    backgroundColor: '#FF416C',
    borderColor: '#FF416C',
  },
  runtimeOptionText: {
    color: '#ccc',
    fontSize: 14,
  },
  runtimeOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sortOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sortOptionSelected: {
    backgroundColor: '#FF416C',
    borderColor: '#FF416C',
  },
  sortOptionText: {
    color: '#ccc',
    fontSize: 12,
  },
  sortOptionTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  applyFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF416C',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 10,
    gap: 10,
  },
  applyFiltersText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  resultsGrid: {
    gap: 15,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resultPoster: {
    width: 100,
    height: 150,
  },
  resultInfo: {
    flex: 1,
    padding: 15,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  resultDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultYear: {
    color: '#aaa',
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultRatingText: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  resultGenre: {
    color: '#FF416C',
    fontSize: 12,
    marginBottom: 15,
  },
  resultButton: {
    backgroundColor: 'rgba(255, 65, 108, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  resultButtonText: {
    color: '#FF416C',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: 300,
  },
  searchTips: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    color: '#ccc',
    marginLeft: 10,
    fontSize: 14,
  },
});
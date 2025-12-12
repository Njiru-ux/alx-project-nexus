import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Updated movie data with more variety
const TRENDING_MOVIES = [
  {
    id: 1,
    title: 'Dune: Part Two',
    poster_path: '/8b8R8l88Qje9dn9OE8PY05Nx1S8.jpg',
    backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    release_date: '2024-03-01',
    vote_average: 8.4,
    genre: 'Sci-Fi, Adventure',
    duration: '2h 46m',
  },
  {
    id: 2,
    title: 'The Batman',
    poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    backdrop_path: '/c0AspB8Om2aTWPYe2H0ttBKs4v1.jpg',
    release_date: '2022-03-04',
    vote_average: 7.8,
    genre: 'Action, Crime',
    duration: '2h 56m',
  },
  {
    id: 3,
    title: 'Spider-Man: No Way Home',
    poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    backdrop_path: '/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
    release_date: '2021-12-17',
    vote_average: 8.3,
    genre: 'Action, Adventure',
    duration: '2h 28m',
  },
];

const RECOMMENDED_MOVIES = [
  {
    id: 4,
    title: 'Everything Everywhere All at Once',
    poster_path: '/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
    backdrop_path: '/vNPY8Q7hGZ8S8wHOmrK4kRBWzlU.jpg',
    release_date: '2022-03-25',
    vote_average: 7.9,
    genre: 'Action, Adventure',
    duration: '2h 19m',
  },
  {
    id: 5,
    title: 'Top Gun: Maverick',
    poster_path: '/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    backdrop_path: '/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg',
    release_date: '2022-05-27',
    vote_average: 8.2,
    genre: 'Action, Drama',
    duration: '2h 10m',
  },
  {
    id: 6,
    title: 'Interstellar',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    release_date: '2014-11-07',
    vote_average: 8.6,
    genre: 'Adventure, Drama',
    duration: '2h 49m',
  },
];

// Elegant Category Cards Data (replaces round buttons)
const CATEGORY_CARDS = [
  {
    id: 1,
    title: 'For You',
    subtitle: 'Personalized picks',
    icon: '✨',
    background: 'https://image.tmdb.org/t/p/w500/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
    color: '#FF416C',
    count: '50+ movies',
  },
  {
    id: 2,
    title: 'Top Rated',
    subtitle: 'Highest scores',
    icon: '⭐',
    background: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    color: '#FFD700',
    count: '100+ movies',
  },
  {
    id: 3,
    title: 'Watchlist',
    subtitle: 'Saved for later',
    icon: '⏰',
    background: 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    color: '#2196F3',
    count: '24 movies',
  },
  {
    id: 4,
    title: 'New Releases',
    subtitle: 'Just added',
    icon: '🆕',
    background: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nx1S8.jpg',
    color: '#4CAF50',
    count: '30+ movies',
  },
];

// Director Cards with Real Photos
const DIRECTORS = [
  {
    id: 1,
    name: 'Christopher Nolan',
    movies: 12,
    photo: 'https://image.tmdb.org/t/p/w500/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg',
    notable: 'Inception, Interstellar',
    color: '#2196F3',
  },
  {
    id: 2,
    name: 'Quentin Tarantino',
    movies: 10,
    photo: 'https://image.tmdb.org/t/p/w500/6grj7o6DmKbmspQpTjlqkGkdB2R.jpg',
    notable: 'Pulp Fiction, Django',
    color: '#FF5722',
  },
  {
    id: 3,
    name: 'Steven Spielberg',
    movies: 34,
    photo: 'https://image.tmdb.org/t/p/w500/pOK15UNawj4k6a1ZGVuNWJyvLp5.jpg',
    notable: 'Jurassic Park, Jaws',
    color: '#4CAF50',
  },
  {
    id: 4,
    name: 'Martin Scorsese',
    movies: 26,
    photo: 'https://image.tmdb.org/t/p/w500/7b19RW5upQHkI6eWX0O8y5p2d7v.jpg',
    notable: 'Goodfellas, The Departed',
    color: '#F44336',
  },
  {
    id: 5,
    name: 'Greta Gerwig',
    movies: 8,
    photo: 'https://image.tmdb.org/t/p/w500/3YkP9v6z5ZyPdv8ku6IlK3JJpUb.jpg',
    notable: 'Barbie, Little Women',
    color: '#E91E63',
  },
];

export default function HomeScreen() {
  const [activeMovie, setActiveMovie] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([1, 3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMovie((prev) => (prev + 1) % TRENDING_MOVIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(movieId => movieId !== id)
        : [...prev, id]
    );
  };

  const MovieCard = ({ movie, index, isTrending = false }: any) => (
    <TouchableOpacity 
      style={[
        styles.movieCard,
        isTrending && styles.trendingMovieCard,
        { marginLeft: index === 0 ? 0 : 15 }
      ]}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.moviePoster}
        imageStyle={{ borderRadius: 20 }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.movieGradient}
        />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(movie.id)}
        >
          <Ionicons 
            name={favorites.includes(movie.id) ? 'heart' : 'heart-outline'} 
            size={24} 
            color={favorites.includes(movie.id) ? '#FF416C' : 'white'} 
          />
        </TouchableOpacity>
        <View style={styles.ratingBadge}>
          <MaterialIcons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{movie.vote_average}</Text>
        </View>
      </ImageBackground>
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
        <Text style={styles.movieMeta} numberOfLines={1}>
          {movie.release_date.split('-')[0]} • {movie.genre} • {movie.duration}
        </Text>
        <TouchableOpacity style={styles.watchButton}>
          <MaterialIcons name="play-circle-outline" size={20} color="white" />
          <Text style={styles.watchButtonText}>Watch Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const CategoryCard = ({ category, index }: any) => (
    <TouchableOpacity 
      style={[
        styles.categoryCard,
        { marginLeft: index === 0 ? 0 : 15 }
      ]}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: category.background }}
        style={styles.categoryBackground}
        imageStyle={{ borderRadius: 20 }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.categoryContent}>
          <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
            <Text style={styles.categoryIconText}>{category.icon}</Text>
          </View>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
          <View style={styles.categoryCount}>
            <Ionicons name="film-outline" size={14} color="white" />
            <Text style={styles.categoryCountText}>{category.count}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const DirectorCard = ({ director, index }: any) => (
    <TouchableOpacity 
      style={[
        styles.directorCard,
        { marginLeft: index === 0 ? 0 : 15 }
      ]}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: director.photo }}
        style={styles.directorPhoto}
        imageStyle={{ borderRadius: 20 }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.directorInfo}>
          <View style={[styles.directorBadge, { backgroundColor: director.color }]}>
            <MaterialIcons name="movie" size={16} color="white" />
            <Text style={styles.directorBadgeText}>{director.movies}</Text>
          </View>
          <Text style={styles.directorName}>{director.name}</Text>
          <Text style={styles.directorNotable}>{director.notable}</Text>
          <TouchableOpacity style={styles.directorButton}>
            <Text style={styles.directorButtonText}>View Films</Text>
            <MaterialIcons name="arrow-forward" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Animated Hero Banner */}
      <View style={styles.heroContainer}>
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/original${TRENDING_MOVIES[activeMovie].backdrop_path}` }}
          style={styles.heroBackground}
        >
          <LinearGradient
            colors={['rgba(15, 12, 41, 0.9)', 'rgba(15, 12, 41, 0.6)', 'transparent']}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={['transparent', 'rgba(15, 12, 41, 0.7)', '#0f0c29']}
            style={[StyleSheet.absoluteFill, { top: '50%' }]}
          />
          
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Discover Your Next</Text>
            <Text style={styles.heroHighlight}>Favorite Movie</Text>
            <Text style={styles.heroSubtitle}>
              Personalized recommendations powered by AI
            </Text>
            
            <View style={styles.searchContainer}>
              <View style={styles.searchBox}>
                <Ionicons name="search" size={22} color="#FF416C" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search movies, actors, directors..."
                  placeholderTextColor="#888"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.filterButton}>
                  <Ionicons name="options" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Banner Indicators */}
          <View style={styles.bannerIndicators}>
            {TRENDING_MOVIES.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  activeMovie === index && styles.activeIndicator
                ]}
                onPress={() => setActiveMovie(index)}
              />
            ))}
          </View>
        </ImageBackground>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsContainer}>
        {[
          { value: '500K+', label: 'Movies', icon: '🎬' },
          { value: '99%', label: 'Match Rate', icon: '🎯' },
          { value: '24/7', label: 'Updates', icon: '⚡' },
          { value: '4.8', label: 'Rating', icon: '⭐' },
        ].map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Category Cards (Replaces round buttons) */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>📁</Text>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#FF416C" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>
          Explore movies by different categories
        </Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {CATEGORY_CARDS.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </ScrollView>
      </View>

      {/* Trending Now Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>🔥</Text>
            <Text style={styles.sectionTitle}>Trending Now</Text>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#FF416C" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>
          Movies everyone is watching right now
        </Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.movieScroll}
          contentContainerStyle={styles.movieScrollContent}
        >
          {TRENDING_MOVIES.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} isTrending={true} />
          ))}
        </ScrollView>
      </View>

      {/* Recommended For You Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>✨</Text>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#FF416C" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>
          Based on your watching history and preferences
        </Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.movieScroll}
          contentContainerStyle={styles.movieScrollContent}
        >
          {RECOMMENDED_MOVIES.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </ScrollView>
      </View>

      {/* Directors Section with Photos */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>🎬</Text>
            <Text style={styles.sectionTitle}>Iconic Directors</Text>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#FF416C" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionSubtitle}>
          Explore films by legendary directors
        </Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.directorScroll}
          contentContainerStyle={styles.directorScrollContent}
        >
          {DIRECTORS.map((director, index) => (
            <DirectorCard key={director.id} director={director} index={index} />
          ))}
        </ScrollView>
      </View>

      {/* Featured Collections */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionIcon}>🎞️</Text>
            <Text style={styles.sectionTitle}>Featured Collections</Text>
          </View>
        </View>
        <View style={styles.collectionsGrid}>
          {[
            { title: 'Oscar Winners', count: '45 films', color: '#FFD700', icon: '🏆' },
            { title: 'Sci-Fi Classics', count: '32 films', color: '#00BCD4', icon: '🚀' },
            { title: '90s Throwback', count: '28 films', color: '#9C27B0', icon: '📼' },
            { title: 'Animated Gems', count: '50 films', color: '#FF9800', icon: '🎨' },
          ].map((collection, index) => (
            <TouchableOpacity key={index} style={styles.collectionCard}>
              <View style={[styles.collectionIcon, { backgroundColor: collection.color }]}>
                <Text style={styles.collectionIconText}>{collection.icon}</Text>
              </View>
              <Text style={styles.collectionTitle}>{collection.title}</Text>
              <Text style={styles.collectionCount}>{collection.count}</Text>
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
  heroContainer: {
    height: height * 0.65,
  },
  heroBackground: {
    flex: 1,
    width: '100%',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
  },
  heroHighlight: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FF416C',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: 300,
  },
  searchContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#FF416C',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0f0c29',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 24,
    backgroundColor: '#FF416C',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: -30,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#aaa',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#FF416C',
    fontWeight: '600',
    marginRight: 5,
  },
  // Category Cards Styles
  categoryScroll: {
    paddingLeft: 20,
  },
  categoryScrollContent: {
    paddingRight: 20,
  },
  categoryCard: {
    width: width * 0.6,
    height: 180,
    marginRight: 15,
  },
  categoryBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContent: {
    alignItems: 'center',
    padding: 20,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
  },
  categoryCount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categoryCountText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
  // Movie Cards Styles
  movieScroll: {
    paddingLeft: 20,
  },
  movieScrollContent: {
    paddingRight: 20,
  },
  movieCard: {
    width: width * 0.7,
    marginRight: 15,
  },
  trendingMovieCard: {
    width: width * 0.8,
  },
  moviePoster: {
    height: width * 0.7 * 1.5,
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
  },
  movieGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  favoriteButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ratingText: {
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  movieInfo: {
    paddingHorizontal: 5,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  movieMeta: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF416C',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  watchButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 5,
  },
  // Director Cards Styles
  directorScroll: {
    paddingLeft: 20,
  },
  directorScrollContent: {
    paddingRight: 20,
  },
  directorCard: {
    width: width * 0.75,
    height: 220,
    marginRight: 15,
  },
  directorPhoto: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  directorInfo: {
    alignItems: 'flex-start',
  },
  directorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 10,
  },
  directorBadgeText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 12,
  },
  directorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  directorNotable: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 15,
  },
  directorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  directorButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    marginRight: 5,
  },
  // Collections Grid
  collectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  collectionCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  collectionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  collectionIconText: {
    fontSize: 24,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  collectionCount: {
    fontSize: 12,
    color: '#aaa',
  },
});
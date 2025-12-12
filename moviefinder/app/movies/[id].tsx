import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  Share,
  Linking,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';

const { width, height } = Dimensions.get('window');

const MOVIE_DETAILS = {
  id: 1,
  title: 'Dune: Part Two',
  tagline: 'Long live the fighters.',
  overview: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
  poster_path: '/8b8R8l88Qje9dn9OE8PY05Nx1S8.jpg',
  backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
  release_date: '2024-03-01',
  runtime: 166,
  vote_average: 8.4,
  vote_count: 2500,
  budget: 190000000,
  revenue: 700000000,
  genres: ['Sci-Fi', 'Adventure'],
  directors: ['Denis Villeneuve'],
  cast: [
    { name: 'Timothée Chalamet', character: 'Paul Atreides', photo: '/7qO47iFgHPCFubaXqWJ1II8DSSc.jpg' },
    { name: 'Zendaya', character: 'Chani', photo: '/6HN3p4QCkETeQqkHyb6ynYH8luT.jpg' },
    { name: 'Rebecca Ferguson', character: 'Lady Jessica', photo: '/qcpC9lv6VLL1u9WnLhGqjOgWFwW.jpg' },
    { name: 'Josh Brolin', character: 'Gurney Halleck', photo: '/g0vqVslDqB5btH0cFiXxLpBsG7t.jpg' },
  ],
};

const SIMILAR_MOVIES = [
  {
    id: 2,
    title: 'Dune',
    poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    year: 2021,
    rating: 8.0,
  },
  {
    id: 3,
    title: 'Interstellar',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    year: 2014,
    rating: 8.6,
  },
  {
    id: 4,
    title: 'Arrival',
    poster_path: '/hLudzvGfpi6JlwUnsNhXwKKg4j.jpg',
    year: 2016,
    rating: 7.9,
  },
];

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(MOVIE_DETAILS);
  const [isFavorite, setIsFavorite] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(true);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [playing, setPlaying] = useState(false);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out "${movie.title}" on MovieFinder!`,
        url: `https://moviefinder.app/movies/${id}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleWatchlist = () => setInWatchlist(!inWatchlist);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Backdrop Image */}
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}` }}
        style={styles.backdrop}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(15, 12, 41, 0.9)']}
          style={StyleSheet.absoluteFill}
        />
        
        {/* Header Actions */}
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.actionButton} onPress={toggleFavorite}>
              <Ionicons 
                name={isFavorite ? 'heart' : 'heart-outline'} 
                size={24} 
                color={isFavorite ? '#FF416C' : 'white'} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={onShare}>
              <Ionicons name="share-social-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Movie Poster and Basic Info */}
        <View style={styles.movieHeader}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.poster}
          />
          
          <View style={styles.movieInfo}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.tagline}>{movie.tagline}</Text>
            
            <View style={styles.metaInfo}>
              <Text style={styles.year}>{new Date(movie.release_date).getFullYear()}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.runtime}>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.rating}>
                <MaterialIcons name="star" size={14} color="#FFD700" />
                {' '}{movie.vote_average.toFixed(1)}
              </Text>
            </View>
            
            <View style={styles.genres}>
              {movie.genres.map((genre, index) => (
                <View key={index} style={styles.genre}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.watchButton}>
          <Ionicons name="play" size={24} color="white" />
          <Text style={styles.watchButtonText}>Watch Trailer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.secondaryButton, inWatchlist && styles.inWatchlist]} 
          onPress={toggleWatchlist}
        >
          <Ionicons 
            name={inWatchlist ? 'checkmark' : 'add'} 
            size={20} 
            color={inWatchlist ? 'white' : '#FF416C'} 
          />
          <Text style={[
            styles.secondaryButtonText,
            inWatchlist && styles.secondaryButtonTextActive
          ]}>
            {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview} numberOfLines={showFullOverview ? undefined : 4}>
          {movie.overview}
        </Text>
        {!showFullOverview && (
          <TouchableOpacity onPress={() => setShowFullOverview(true)}>
            <Text style={styles.readMore}>Read more</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Cast */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cast</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.castScroll}>
          {movie.cast.map((actor, index) => (
            <View key={index} style={styles.actorCard}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w200${actor.photo}` }}
                style={styles.actorPhoto}
              />
              <Text style={styles.actorName}>{actor.name}</Text>
              <Text style={styles.actorCharacter}>{actor.character}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Directors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Directed by</Text>
        <View style={styles.directors}>
          {movie.directors.map((director, index) => (
            <View key={index} style={styles.director}>
              <MaterialIcons name="movie-creation" size={20} color="#FF416C" />
              <Text style={styles.directorName}>{director}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{movie.vote_average.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{movie.vote_count.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Votes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatMoney(movie.budget)}</Text>
          <Text style={styles.statLabel}>Budget</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatMoney(movie.revenue)}</Text>
          <Text style={styles.statLabel}>Revenue</Text>
        </View>
      </View>

      {/* Similar Movies */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Similar Movies</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {SIMILAR_MOVIES.map((similarMovie) => (
            <TouchableOpacity 
              key={similarMovie.id} 
              style={styles.similarMovieCard}
              onPress={() => router.push(`/movies/${similarMovie.id}`)}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w300${similarMovie.poster_path}` }}
                style={styles.similarMoviePoster}
              />
              <Text style={styles.similarMovieTitle}>{similarMovie.title}</Text>
              <View style={styles.similarMovieDetails}>
                <Text style={styles.similarMovieYear}>{similarMovie.year}</Text>
                <View style={styles.similarMovieRating}>
                  <MaterialIcons name="star" size={12} color="#FFD700" />
                  <Text style={styles.similarMovieRatingText}>{similarMovie.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Reviews (Placeholder) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Reviews</Text>
        <View style={styles.reviewsPlaceholder}>
          <Ionicons name="chatbubble-outline" size={50} color="#FF416C" />
          <Text style={styles.reviewsPlaceholderText}>Be the first to review this movie!</Text>
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Write a Review</Text>
          </TouchableOpacity>
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
  backdrop: {
    height: height * 0.7,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieHeader: {
    flexDirection: 'row',
    marginTop: 20,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 15,
    marginRight: 20,
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: '#ccc',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  year: {
    color: '#aaa',
    fontSize: 14,
  },
  dot: {
    color: '#666',
    marginHorizontal: 8,
  },
  runtime: {
    color: '#aaa',
    fontSize: 14,
  },
  rating: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genre: {
    backgroundColor: 'rgba(255, 65, 108, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF416C',
  },
  genreText: {
    color: '#FF416C',
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -25,
    marginBottom: 30,
    gap: 10,
  },
  watchButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF416C',
    paddingVertical: 15,
    borderRadius: 25,
    gap: 10,
  },
  watchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 65, 108, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FF416C',
    gap: 8,
  },
  inWatchlist: {
    backgroundColor: '#FF416C',
  },
  secondaryButtonText: {
    color: '#FF416C',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonTextActive: {
    color: 'white',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  overview: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },
  readMore: {
    color: '#FF416C',
    fontWeight: '600',
    marginTop: 10,
  },
  viewAll: {
    color: '#FF416C',
    fontWeight: '600',
  },
  castScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  actorCard: {
    width: 100,
    marginRight: 15,
    alignItems: 'center',
  },
  actorPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  actorName: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  actorCharacter: {
    color: '#aaa',
    fontSize: 10,
    textAlign: 'center',
  },
  directors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  director: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 65, 108, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 10,
  },
  directorName: {
    color: '#FF416C',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 10,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF416C',
    marginBottom: 5,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  similarMovieCard: {
    width: 120,
    marginRight: 15,
  },
  similarMoviePoster: {
    width: 120,
    height: 180,
    borderRadius: 15,
    marginBottom: 10,
  },
  similarMovieTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  similarMovieDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  similarMovieYear: {
    color: '#aaa',
    fontSize: 12,
  },
  similarMovieRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  similarMovieRatingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  reviewsPlaceholder: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  reviewsPlaceholderText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  reviewButton: {
    backgroundColor: '#FF416C',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
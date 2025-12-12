import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

const MoviePoster = ({ posterPath, title }: { posterPath?: string; title: string }) => {
  const [error, setError] = useState(false);
  
  if (error || !posterPath) {
    return (
      <View style={[styles.poster, styles.placeholder]}>
        <MaterialIcons name="movie" size={40} color="#666" />
        <Text style={styles.placeholderText} numberOfLines={2}>{title}</Text>
      </View>
    );
  }
  
  return (
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w300${posterPath}` }}
      style={styles.poster}
      onError={() => setError(true)}
    />
  );
};

export default function MovieGrid({ movies = [] }: any) {
  const renderMovieItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={[
        styles.movieCard,
        { marginLeft: index % 2 === 0 ? 20 : 10 }
      ]}
    >
      <View style={styles.posterContainer}>
        <MoviePoster posterPath={item.poster_path} title={item.title} />
        <View style={styles.ratingBadge}>
          <MaterialIcons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.vote_average?.toFixed(1) || 'N/A'}</Text>
        </View>
      </View>
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.movieYear}>
          {item.release_date ? new Date(item.release_date).getFullYear() : 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={movies}
      numColumns={2}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      renderItem={renderMovieItem}
      scrollEnabled={false}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  movieCard: {
    width: ITEM_WIDTH,
    marginBottom: 15,
  },
  posterContainer: {
    position: 'relative',
    height: ITEM_WIDTH * 1.5,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 5,
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  movieInfo: {
    paddingHorizontal: 5,
  },
  movieTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  movieYear: {
    color: '#aaa',
    fontSize: 12,
  },
});
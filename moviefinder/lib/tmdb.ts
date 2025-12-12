// Simple mock data for now
export const MOCK_MOVIES = [
  {
    id: 1,
    title: 'The Avengers',
    overview: "Earth's mightiest heroes must come together and learn to fight as a team.",
    poster_path: '/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    backdrop_path: '/h6Dx6dWO7PnfKJLXz0C7gFf5HoW.jpg',
    release_date: '2012-05-04',
    vote_average: 8.0,
    vote_count: 25000,
    genre_ids: [28, 12, 878]
  },
  {
    id: 2,
    title: 'Interstellar',
    overview: "A team of explorers travel through a wormhole in space.",
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop_path: '/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    release_date: '2014-11-07',
    vote_average: 8.6,
    vote_count: 32000,
    genre_ids: [12, 18, 878]
  },
  {
    id: 3,
    title: 'Inception',
    overview: "A thief who steals corporate secrets through dream-sharing technology.",
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    release_date: '2010-07-16',
    vote_average: 8.8,
    vote_count: 29000,
    genre_ids: [28, 878, 12]
  },
  {
    id: 4,
    title: 'The Dark Knight',
    overview: "Batman faces the Joker, a criminal mastermind who seeks to undermine order.",
    poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdrop_path: '/hkC4yNDFmW1yQuQhtZydMeRuaAb.jpg',
    release_date: '2008-07-18',
    vote_average: 9.0,
    vote_count: 30000,
    genre_ids: [28, 80, 18]
  },
];

export const fetchTrendingMovies = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_MOVIES;
};

export const fetchNowPlaying = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_MOVIES.slice(0, 2);
};

export const fetchTopRated = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_MOVIES;
};

export const fetchByGenre = async (genreId: number) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_MOVIES.filter(movie => movie.genre_ids.includes(genreId));
};
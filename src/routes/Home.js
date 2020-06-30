import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component{
  state = {
    isLoding: false,
    movies: [],
  };

  getMovies = async () => {
    const {
      data: {
        data: {movies},
      },
    } = await axios.get('https://yts.mx/api/v2/list_movies.json?sort_by=rating');
    this.setState({ movies, isLoding:false });
    }

  componentDidMount() {
    this.getMovies();
  }

  render(){ // 우선 순위 2
    const {isLoding, movies} = this.state;
  return (
    <section className='container'>
      {isLoding ? (
      <div className='loader'>
        <span className='loader__text'>Loding...</span>
      </div>
      ) : (
      <div className='movies'>
        {movies.map(movie => (
          <Movie 
            key={movie.id}
            year={movie.year}
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
            genres={movie.genres}
          />
        ))}
      </div>
    )}
    </section>
  );
  }
}

export default Home;

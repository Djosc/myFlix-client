import React from 'react';

class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;
        return (
            <div className="movie-card" onClick={() => { onMovieClick(movieData) }}>
                <span>{movieData.Title}</span>
            </div>
        );
    }
}

export default MovieCard;
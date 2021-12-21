import React from 'react';

class MovieView extends React.Component {
    render() {
        const { movieData, onBackClick } = this.props;

        if (movieData.length === 0) return <div>No movies to display.</div>

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movieData.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movieData.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movieData.Description}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movieData.Director}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}

export default MovieView;
import MovieCard from "./MovieCard";

const MovieList = ({ title, Movies }) => {

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                {title}
            </p>
            <div className="grid grid-cols-4 gap-2">
                {
                    Movies.map((movie, index) => {
                        return <MovieCard data={movie} key={index} />
                    })
                }
            </div>
        </div>

    )
}

export default MovieList;
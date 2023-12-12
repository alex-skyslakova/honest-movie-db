import {ImageResponse} from "next/og";
import {getMovies} from "@/api/db/movie";
import {Movie} from "@/model/movie";


// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Movies | Movie Ratings App'
export const size = {
    width: 1200,
    height: 630
};

export const contentType = 'image/png';

export default async function Image() {
    // Fetch data
    const movies = await getMovies({page: 1, pageSize: 10}) as any as Movie[];
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 42,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: 64
                }}
            >
                {movies && movies.length > 0 ? movies.map(movie => <div key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.description}</p>
                </div>) : <p>no movies</p>}
            </div>
        ),
        { ...size }
    );
}
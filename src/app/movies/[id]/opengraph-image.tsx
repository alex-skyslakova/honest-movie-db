import {ImageResponse} from "next/og";
import {getUserById} from "@/api/db/user";
import {User} from "@/model/user";
import {getMovieById} from "@/api/db/movie";
import {Movie} from "@/model/movie";
import {Genre} from "@/model/genre";


// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 1200,
    height: 630
};

export const contentType = 'image/png';

export default async function Image({
                                        params // read [id] route slug
                                    }: {
    params: { movieId: string };
}) {
    // Fetch data
    const id = parseInt(params.movieId)
    let movie: Movie | null = null;
    if (!isNaN(id)) {
        movie = await getMovieById(parseInt(params.movieId)) as any as Movie;
    }

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
                {movie ? (
                    <>
                        <p style={{ marginBottom: '20px',  fontSize: 72}}>Movie: {movie.title}</p>
                        <p style={{ marginBottom: '10px',  fontSize: 20}}>Description: {movie.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {movie.genres?.length !== 0 ? <p>Genres:</p> : <p>{movie.title} has no genres assigned.</p>}
                            {movie.genres.map(genre => {
                                return (
                                    <div key={genre.id} style={{margin: '10px', textAlign: 'center'}}>
                                        <span>{genre.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <p>Movie not found</p>
                )}

            </div>
        ),
        { ...size }
    );
}
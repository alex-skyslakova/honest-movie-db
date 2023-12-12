import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Movie Ratings App'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 48,
                    color: 'black',
                    background: 'linear-gradient(135deg, rgba(120,70,190,1) 0%, rgba(250,112,154,1) 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter, sans-serif'
                }}
            >
                <p style={{ marginBottom: '20px', fontSize: 72 }}>Honest Movie DB</p>
                <p>Discover and Rate Your Favorite Movies</p>
                <img src="/img/background.png" alt="Movie Icon" style={{ marginTop: '20px', width: '100px', height: '100px' }}/>
            </div>
        ),
        {
            ...size
        }
    )
}

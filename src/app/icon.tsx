import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    fontWeight: 800,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    borderRadius: '999',
                    background: 'rgb(120 113 108)',
                }}
            >
                <div style={{
                    fontWeight: 400,
                    fontSize: 28,
                    color: 'black',
                    position: 'absolute',
                }}>
                    M
                </div>
                <div style={{
                    color: 'white',
                    position: 'absolute',
                }}>
                    H
                </div>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        }
    )
}
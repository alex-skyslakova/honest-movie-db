import {ImageResponse} from "next/og";
import {getUserById} from "@/api/db/user";
import {User} from "@/model/user";


// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 1200,
    height: 630
};

export const contentType = 'image/png';

export default async function Image() {
    // Fetch data
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
                TODO
            </div>
        ),
        { ...size }
    );
}
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

export default async function Image({
                                        params // read [id] route slug
                                    }: {
    params: { userId: string };
}) {
    // Fetch data
    const user = await getUserById(params.userId);
    const badges = user?.badges;
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
                {user ? (
                    <>
                        <p style={{ marginBottom: '20px',  fontSize: 72}}>User: {user.name}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {badges?.length !== 0 ? <p>{user.name} has gained following badges by reviewing movies:</p> : <p>{user.name} has not gained any badges yet.</p>}
                            {user.badges.map(badge => (
                                <div key={badge.id} style={{ margin: '10px', textAlign: 'center' }}>
                                    <img src={badge.image} alt={badge.name} style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                                    <span>{badge.name}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>User not found</p>
                )}

            </div>
        ),
        { ...size }
    );
}
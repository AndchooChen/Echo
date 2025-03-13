import axios from "axios";

export async function POST(req: Request) {
    try {
        const { trackUri } = await req.json();

        await axios.put(
            "https://api.spotify.com/v1/me/player/play",
            { uris: [trackUri] },
            {
                headers: {
                    Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return new Response(JSON.stringify({ message: "Playing song" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error playing song" }), { status: 500 });
    }
}

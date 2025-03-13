import axios from "axios";

export async function POST(req: Request) {
    try {
        const { mood } = await req.json();
        
        // Example: Searching for a track on Spotify
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
            },
            params: {
                q: mood, 
                type: "track",
                limit: 1
            },
        });

        const track = response.data.tracks.items[0];

        return new Response(JSON.stringify({
            track: {
                title: track.name,
                image: track.album.images[0].url,
                uri: track.uri
            }
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error fetching song" }), { status: 500 });
    }
}

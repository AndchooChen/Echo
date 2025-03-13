import axios from "axios";

export async function POST(req: Request) {
    const accessToken = process.env.SPOTIFY_ACCESS_TOKEN; // Use environment variable for security

    try {
        // Parse incoming request to extract mood-based parameters
        const { genre = "pop", valence = 0.5, energy = 0.5 } = await req.json();

        const response = await axios.get("https://api.spotify.com/v1/recommendations", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                seed_genres: genre, // Dynamically set genre
                target_valence: valence, // Mood-based happiness
                target_energy: energy, // Mood-based energy
                limit: 1, // Return one song
            },
        });

        const track = response.data.tracks[0];

        if (!track) {
            return new Response(JSON.stringify({ error: "No tracks found" }), { status: 404 });
        }

        return new Response(JSON.stringify({
            track: {
                title: track.name,
                artist: track.artists[0].name,
                image: track.album.images[0]?.url,
                uri: track.uri,
                spotify_url: track.external_urls.spotify
            }
        }), { status: 200 });
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return new Response(JSON.stringify({ error: error.response?.data || "Spotify API error" }), { status: 500 });
        } else {
            return new Response(JSON.stringify({ error: "Unexpected server error" }), { status: 500 });
        }
    }
}


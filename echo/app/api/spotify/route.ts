import axios from 'axios';
import querystring from 'querystring';

const client_ID = process.env.SPOTIFY_CLIENT_ID;
const client_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_URI = process.env.SPOTIFY_REDIRECT_URI;

let accessToken: string | null = null;
let refreshToken: string | null = null;

export async function POST(req: Request) {
    try {
        const { code, trackUri } = await req.json();

        if (!accessToken) {
            await getAccessToken(code);
        }

        if (trackUri) {
            await playSong(trackUri);
            return new Response(JSON.stringify({ message: "Song playing!" }), { status: 200 });
        }

        const userData = await fetchSpotifyData();
        return new Response(JSON.stringify(userData), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
}


// 🔹 Function to Get Access Token
async function getAccessToken(code: string) {
    const tokenResponse = await axios.post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_URI,
            client_id: client_ID,
            client_secret: client_SECRET,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    accessToken = tokenResponse.data.access_token;
    refreshToken = tokenResponse.data.refresh_token;
}

// 🔹 Refresh Token Function (Token Expires in 1 Hour)
async function refreshAccessToken() {
    if (!refreshToken) throw new Error("No refresh token available.");

    const tokenResponse = await axios.post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: client_ID,
            client_secret: client_SECRET,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    accessToken = tokenResponse.data.access_token;
}

// 🔹 Function to Fetch Spotify Data
async function fetchSpotifyData() {
    if (!accessToken) throw new Error("Access token is missing!");

    const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    return response.data;
}

async function playSong(trackUri: string) {
    if (!accessToken) throw new Error("Access token is missing!");

    const devicesResponse = await axios.get('https://api.spotify.com/v1/me/player/devices', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const devices = devicesResponse.data.devices;
    if (devices.length === 0) throw new Error("No active Spotify devices found!");

    await axios.put(
        'https://api.spotify.com/v1/me/player/play',
        { uris: [trackUri] }, // 🎵 Play the song using track URI
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    );

    console.log("Playing:", trackUri);
}


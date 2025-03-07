import axios from 'axios';
import querystring from 'querystring';

const client_ID = process.env.SPOTIFY_CLIENT_ID;
const client_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_URI = process.env.SPOTIFY_REDIRECT_URI;

let accessToken: string | null = null;

export async function POST(req: Request, res: Response) {
    const { code } = await req.json();

    if (!accessToken) {
        await getAccessToken(code);
    }

    const response = await fetchSpotifyData();
    return new Response(JSON.stringify(response), { status: 200 });
}

async function getAccessToken(code: string) {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_URI,
        client_id: client_ID,
        client_secret: client_SECRET,
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    accessToken = tokenResponse.data.access_token;
}

async function fetchSpotifyData() {
    const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    return response.data;
}
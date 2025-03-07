import { NextApiRequest, NextApiResponse } from 'next';

// Load environment variables (store in .env.local)
const client_ID = process.env.SPOTIFY_CLIENT_ID;
const redirect_URI = process.env.SPOTIFY_REDIRECT_URI;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!client_ID || !redirect_URI) {
        return res.status(500).json({ error: 'Missing Spotify Client ID or Redirect URI' });
    }

    const scope = 'user-read-private user-read-email';
    
    const authURL = `https://accounts.spotify.com/authorize?${new URLSearchParams({
        response_type: 'code',
        client_id: client_ID,
        scope: scope,
        redirect_uri: redirect_URI,
    }).toString()}`;

    res.redirect(authURL);
}

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;
    res.redirect(`/api/spotify?code=${code}`);
}
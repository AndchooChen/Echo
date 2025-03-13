import { HfInference } from "@huggingface/inference";

// Create a session with the token
const client = new HfInference(process.env.HuggingFace_Token);
const model = "sentence-transformers/all-MiniLM-L6-v2";
const sentences = [
    // Happy & Uplifting Moods
    "Give me a playlist that makes me feel unstoppable and full of energy.",
    "I want to listen to some joyful and uplifting tunes to brighten my day.",
    "Make a playlist that feels like a celebration of life!",
    "I need songs that make me want to dance like nobody's watching.",
    "Give me some feel-good anthems to start my day on a high note.",
    
    // Sad & Emotional Moods
    "I'm feeling heartbroken and need some deeply emotional songs.",
    "I just want to listen to sad, soulful music and let myself feel.",
    "Play some songs that make me reflect on life and past memories.",
    "I need comforting music to make me feel less alone.",
    
    // Energized & Pumped Up
    "Give me an energetic playlist for my intense workout session.",
    "I need fast-paced, high-energy music to keep me motivated.",
    "Play some intense rock anthems to get hyped and ready to go!",
    "Give me an adrenaline-fueled playlist for a thrilling night.",
    
    // Relaxing & Calm
    "I want to relax with some chill acoustic tunes.",
    "Give me a playlist of soft, mellow songs to unwind after a long day.",
    "I need peaceful instrumental music to help me focus and stay calm.",
    "Play some lo-fi beats to help me study and concentrate.",
    
    // Nostalgic & Throwback Vibes
    "I'm feeling nostalgic and want to listen to old classics.",
    "Give me some throwback hits from the early 2000s.",
    "I need a playlist that takes me back to my childhood memories.",
    
    // Moody & Dramatic
    "Create a dark and moody playlist for late-night thoughts.",
    "I want songs that feel like they belong in a dramatic movie scene.",
    "Play some mysterious and eerie music for spooky vibes.",
    "Give me a playlist that sounds like a cyberpunk future.",
    
    // Romantic & Love-Filled
    "I'm feeling romantic and need some love songs.",
    "Play some soft and dreamy tunes for a candlelit evening.",
    "Give me songs that make me want to fall in love all over again.",
    
    // Weather-Based Moods
    "Create a playlist for a rainy day drive.",
    "Give me warm and cozy songs for a snowy winter evening.",
    "I need a playlist that feels like a perfect summer beach day.",
    "Make a playlist with tropical house party vibes for a sunny afternoon.",
    "Play some soothing music for a windy autumn evening.",
    
    // Weird, Quirky & Unique
    "I’m feeling a bit crazy today—play something unpredictable!",
    "Give me a playlist that makes me feel like I’m in a fantasy world.",
    "Make a playlist that sounds like an alien invasion.",
    "Play music that makes me feel like I'm inside a dream.",
    
    // Activities & Daily Life
    "I want a playlist for a late-night walk in the city.",
    "Give me background music while I cook a fancy meal.",
    "I need songs to vibe to while I clean my room.",
    "Make a playlist that fits my road trip adventure.",
    "I want music that feels like a soundtrack to my life.",
    
    // Tired & Sleepy Moods
    "I'm exhausted and need soft, soothing music to help me sleep.",
    "Play some dreamy and ethereal vibes to drift off to.",
    "I need a playlist to help me relax after a long, stressful day."
];

export async function POST(req: Request, res: Response) {
    const { input } = await req.json();
    const similarityResponse = await runSimilarity(input);
    console.log(similarityResponse);

    // return
}

async function runSimilarity(input: string) {
    const response = await client.sentenceSimilarity({
        model: model,
        inputs: {
            "source_sentence": input,
            "sentences": sentences,
        },
        provider: "hf-inference",
    })
    return response;
}

/* function firstResponse(response) {
    return 
}
    */
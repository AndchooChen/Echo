import { HfInference } from "@huggingface/inference";

// Create a session with the token
const client = new HfInference(process.env.HuggingFace_Token);
const model = "sentence-transformers/all-MiniLM-L6-v2";
const sentences = [
    "I want to relax with some chill acoustic tunes.",
    "Give me an energetic playlist for my workout session.",
    "I'm feeling nostalgic and want to listen to old classics.",
    "I need some background music for studying and focusing.",
    "Create a playlist for a rainy day drive.",
    "I'm feeling heartbroken and need some sad songs.",
    "Give me some uplifting music to boost my mood.",
    "I want a playlist for a late-night walk in the city.",
    "Make a playlist with dreamy and ethereal vibes.",
    "I need some jazz to unwind after a long day.",
    "Play some intense rock anthems to get hyped.",
    "I’m in the mood for some lo-fi beats to chill to.",
    "Make a playlist with futuristic electronic sounds.",
    "Give me a setlist of songs for a summer beach day.",
    "I'm feeling lonely and need comforting music.",
    "I want a playlist that feels like a movie soundtrack.",
    "Create a dark and moody playlist for late-night thoughts.",
    "Give me some throwback hits from the early 2000s.",
    "I'm feeling rebellious—play some punk rock!",
    "I need peaceful instrumental music to meditate.",
    "Make a playlist with tropical house party vibes.",
    "Give me a playlist that makes me feel like I'm in a fantasy world.",
    "I'm feeling romantic and need some love songs.",
    "Create a playlist with dramatic orchestral pieces.",
    "I want songs that make me feel like I'm in an indie movie.",
    "Give me a road trip playlist with adventure vibes.",
    "I need music for a cozy night by the fireplace.",
    "Play some mysterious and eerie music for spooky vibes.",
    "Make a playlist that sounds like a cyberpunk future.",
    "Give me some feel-good anthems to start my day.",
    "I am feeling a bit crazy today",
]

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
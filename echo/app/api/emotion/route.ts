import { HfInference } from "@huggingface/inference";

const client = new HfInference(process.env.HuggingFace_Token);

// Define an async function to run inference
async function getSentenceSimilarity() {
    const input = {
        source_sentence: "That is a happy person",
        sentences: [
            "That is a happy dog",
            "That is a very happy person",
            "Today is a sunny day",
        ],
    };

    // Use Hugging Face inference API through `HfInference`
    const output = await client.sentenceSimilarity({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: input,
        provider: "hf-inference",
    });

    console.log("Sentence Similarity Scores:", output);
    return output;
}

// Call the function
// getSentenceSimilarity().catch(console.error);

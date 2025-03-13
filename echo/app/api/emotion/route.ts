import { HfInference } from '@huggingface/inference';
import { TextClassificationOutput } from '@huggingface/transformers';

let hf: HfInference;

export async function POST(req: Request, res: Response) {
    const { input } = await req.json();
    const inferenceResponse: TextClassificationOutput = await runInference(input);
    // console.log(inferenceResponse);
    const primaryEmotion = firstEmotion(inferenceResponse);

    return new Response(JSON.stringify({
        inferenceResponse,
        primaryEmotion
    }), { status: 200 });
}

async function runInference(input: string) {
    if (!hf) {
        hf = new HfInference(process.env.HuggingFace_Token);
    }

    const model = "SamLowe/roberta-base-go_emotions";
    const response = await hf.textClassification({
        model: model,
        inputs: input,
    })

    return response;
}

function firstEmotion(emotions: TextClassificationOutput) {
    return emotions[0];
}
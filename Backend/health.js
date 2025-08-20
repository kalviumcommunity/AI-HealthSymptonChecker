import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt with RTFC framework (Zero-Shot)
const systemPrompt = `
You are a trusted medical assistant.

ROLE: Provide safe, factual, and structured health suggestions based on user symptoms. 
Do not give a final diagnosis, but always include advice on when to see a doctor.

TASK: Take the user's reported symptoms and return structured medical guidance.

FORMAT: Respond strictly in JSON with the following keys:
{
  "Possible Conditions": [],
  "Suggested Precautions": [],
  "Severity Level": "",
  "When to See a Doctor": "",
  "Info Sources": []
}

CONSTRAINTS: Keep responses short, safe, and actionable. Ground answers in reliable medical sources like WHO, CDC, or Mayo Clinic.

ZERO-SHOT PROMPT: Without seeing any examples, generate the health guidance purely based on the user's input.

ONE-SHOT PROMPT: Here is an example of how you should respond:

USER: "I have a headache and mild fever for 1 day"
ASSISTANT:
{
  "Possible Conditions": ["Common cold", "Mild viral infection"],
  "Suggested Precautions": ["Drink warm fluids", "Rest well", "Monitor temperature"],
  "Severity Level": "Mild",
  "When to See a Doctor": "If fever lasts more than 3 days or headache worsens",
  "Info Sources": ["WHO", "CDC"]
}
`;


async function checkSymptoms(input) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4o"
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input },
      ],
      temperature: 0.3,
      frequency_penalty: 0.5,
    });

    console.log("🩺 Health Assistant Result:");
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

// 👇 Example user input
checkSymptoms("I am getting little pain in my heart");

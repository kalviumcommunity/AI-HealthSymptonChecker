import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt (RTFC applied)
const systemPrompt = `
ROLE:
You are a trusted medical assistant.

TASK:
Provide safe, factual, and structured health suggestions based on user symptoms.
Never give a final diagnosis. Always include advice on when to see a doctor.

FORMAT:
Respond strictly in JSON with these keys:
{
  "Possible Conditions": [],
  "Suggested Precautions": [],
  "Severity Level": "",
  "When to See a Doctor": "",
  "Info Sources": []
}

CONTEXT:
Ground answers in reliable medical sources (WHO, CDC, Mayo Clinic).
Keep responses short, safe, and actionable.
`;

async function checkSymptoms(input) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",  // You can also use "gpt-4o"
      temperature: 0.3,
      frequency_penalty: 0.5,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Symptoms reported: ${input}` },
      ],
    });

    console.log("🩺 Health Assistant Result:");
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

// 👇 Change the text here to test different symptoms
checkSymptoms("I have a fever and sore throat for 2 days");

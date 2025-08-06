# AI-HealthSymptonChecker

## Project Overview

This project is an AI-powered health assistant designed to help users understand their symptoms and get medically-grounded suggestions. It leverages advanced capabilities of Large Language Models (LLMs), function calling, and Retrieval-Augmented Generation (RAG) to provide personalized, safe, and structured medical guidance.

By the end of this project, you'll have a fully functional AI chatbot that:
- Collects symptoms from users through interactive prompts
- Uses real medical data to suggest possible causes, home care, and when to consult a doctor
- Offers structured, reliable outputs with dynamic follow-ups
- Is grounded in real-world documents (e.g., WHO, CDC, Mayo Clinic)

---

## Key Features

- **Dynamic Symptom Interaction:** Asks follow-up questions intelligently
- **Function Calling:** Fetches condition info using symptom input
- **RAG (Retrieval-Augmented Generation):** Uses vector search to retrieve real medical content
- **Structured Output:** Easy-to-read advice broken into categories like causes, precautions, severity, etc.
- **Tuned for Safety:** Low creativity to ensure fact-based responses

---

## System Design Overview

### 1. System & User Prompts

#### System Prompt
You are a trusted medical assistant. You provide accurate, structured, and safe health advice based on user-reported symptoms and verified medical data. You never give a final diagnosis. Always suggest when to consult a doctor.

#### Example User Prompts
- "I have had a fever and sore throat for 2 days."
- "There’s a burning sensation when I urinate."
- "My child is coughing non-stop. What should I do?"


### 2. Tuning Parameters

| Parameter | Value | Purpose |
| temperature | 0.3 | Keep responses factual |
| frequency_penalty | 0.5 | Avoid repetition like "see a doctor" |


### 3. Function Calling

We use OpenAI’s function-calling to connect symptom input to backend logic.

#### Sample Function:
```json
{
  "function": "getConditionInfo",
  "parameters": {
    "symptoms": ["fever", "sore throat"]
  }
}
```

#### Output Example:
```json
{
  "conditions": ["Strep Throat", "Tonsillitis", "Common Cold"],
  "precautions": ["Drink warm fluids", "Rest", "Avoid cold food"],
  "severity": "Moderate",
  "seek_doctor": "If symptoms last more than 3 days or worsen",
  "sources": ["Mayo Clinic", "WHO"]
}
```

### 4. Retrieval-Augmented Generation (RAG)

#### RAG Pipeline:
1. Scrape or upload medical documents (PDFs, HTML, Markdown)
2. Create embeddings using OpenAI’s `text-embedding-ada-002`
3. Store in a vector database like **FAISS**
4. At runtime, retrieve the top relevant chunks based on the symptom query
5. Inject retrieved context into the LLM for grounded, reliable responses

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express.js
- API Integration: OpenAI GPT-4 (using REST API)
- Database for Retrieval (RAG): FAISS or static JSON files with embeddings
- Embedding Model: OpenAI text-embedding-ada-002
- Deployment: Vercel (Frontend) + Render or Railway (Backend)


## Sample Interaction

**User:** I feel a tightness in my chest and shortness of breath.

**AI Assistant:**
```json
{
  "Possible Conditions": ["Asthma", "Anxiety Attack", "Angina"],
  "Suggested Precautions": ["Rest in a comfortable position", "Avoid exertion", "Monitor heart rate"],
  "Severity Level": "High",
  "When to See a Doctor": "Immediately if chest pain is severe or lasts more than 5 minutes",
  "Info Sources": ["CDC Guidelines", "Mayo Clinic"]
}
```



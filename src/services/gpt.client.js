import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const gptClient = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo-16k",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data?.choices?.[0]?.message?.content;
  } catch (error) {
    console.log({ error });
    throw new Error("failed to generate content");
  }
};

export const generatePrompt = (transcript, sections) => {
  let prompt = `You are an assistant for clinicians, trained to generate detailed notes based on patient conversations. Using the provided transcript, create content for each section of the clinician's template. Each section should have 3-4 detailed sentences.\n\nTranscript: "${transcript}"\n\n`;

  sections.forEach((section, index) => {
    prompt += `${index + 1}. ${section.title}: `;
  });

  prompt += `\n\nProvide the output in the format (json):\n{
      "Section 1": "Generated content for section 1",
      "Section 2": "Generated content for section 2"
    }`;

  return prompt;
};

export default gptClient;

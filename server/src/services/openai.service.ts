import OpenAI from "openai";
import { PORTKEY_GATEWAY_URL, createHeaders } from "portkey-ai";

export function getOpenAIClient(): OpenAI {
  return _createOpenAIClient({
    apiKey: process.env.OPENAI_API_KEY || "", // ADD API KEY HERE
    openAIKey: process.env.OPENAI_AI_KEY || "", // ADD OPENAI KEY HERE
  });
}

export async function generateAISummary(description: string): Promise<{
  summary: string;
  violation: string;
}> {
  // Debug: Check if API key is available
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY environment variable is not set");
    throw new Error("OpenAI API key is not configured");
  }

  const client = getOpenAIClient();

  const prompt = `Please analyze the following article description and provide:
1. A 3-line summary of the article
2. A 1-line description of the violation the article refers to

Article description: "${description}"

IMPORTANT: Respond with ONLY valid JSON. Do not use markdown formatting, code blocks, or any other text. Return only the raw JSON object in this exact format:
{"summary": "<3 lines of summary>", "violation": "<1 line of the specified violation in this article>"}`;

  let content = "";

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that analyzes news articles and provides summaries in JSON format. Always respond with valid JSON only, no markdown formatting.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    content = response.choices[0]?.message?.content || "";
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    // Clean up the response - remove markdown formatting if present
    let cleanContent = content.trim();

    // Remove markdown code blocks if they exist
    if (cleanContent.startsWith("```json")) {
      cleanContent = cleanContent
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
    } else if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    // Parse the JSON response
    const parsedResponse = JSON.parse(cleanContent);

    return {
      summary: parsedResponse.summary || "Unable to generate summary",
      violation: parsedResponse.violation || "Unable to identify violation",
    };
  } catch (error) {
    console.error("Error generating AI summary:", error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("401")) {
        throw new Error("Invalid OpenAI API key");
      } else if (error.message.includes("400")) {
        throw new Error(
          "Invalid request to OpenAI API - check model name and parameters"
        );
      } else if (error.message.includes("429")) {
        throw new Error("OpenAI API rate limit exceeded");
      } else if (
        error.name === "SyntaxError" ||
        error.message.includes("JSON")
      ) {
        console.error("Failed to parse AI response as JSON:", content);
        throw new Error("AI returned invalid JSON format");
      }
    }

    throw new Error("Failed to generate AI summary");
  }
}

// Private function to create the openai client - Do not touch this function
function _createOpenAIClient({
  apiKey,
  openAIKey,
}: {
  apiKey: string;
  openAIKey: string;
}): OpenAI {
  return new OpenAI({
    apiKey: "xx",
    baseURL: PORTKEY_GATEWAY_URL,
    defaultHeaders: createHeaders({
      apiKey,
      virtualKey: openAIKey,
    }),
  });
}

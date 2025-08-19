import OpenAI from "openai";
import { PORTKEY_GATEWAY_URL, createHeaders } from "portkey-ai";

export function getOpenAIClient(): OpenAI {
  return _createOpenAIClient({
    apiKey: "", // ADD API KEY HERE
    openAIKey: "", // ADD OPENAI KEY HERE
  });
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

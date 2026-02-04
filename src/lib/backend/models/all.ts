import { Provider } from '$lib/types';
import { type OpenRouterModel } from './open-router';
import { type GroqModel } from './groq';
import { type GeminiModel } from './gemini';

export type ProviderModelMap = {
	[Provider.OpenRouter]: OpenRouterModel;
	[Provider.HuggingFace]: never;
	[Provider.OpenAI]: never;
	[Provider.Anthropic]: never;
	[Provider.Groq]: GroqModel;
	[Provider.Gemini]: GeminiModel;
};

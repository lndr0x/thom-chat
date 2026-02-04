import { Result, ResultAsync } from 'neverthrow';

export type OpenRouterApiKeyData = {
	label: string;
	usage: number;
	is_free_tier: boolean;
	is_provisioning_key: boolean;
	limit: number;
	limit_remaining: number;
};

export const OpenRouter = {
	getApiKey: async (key: string): Promise<Result<OpenRouterApiKeyData, string>> => {
		return await ResultAsync.fromPromise(
			(async () => {
				const res = await fetch('https://openrouter.ai/api/v1/key', {
					headers: {
						Authorization: `Bearer ${key}`,
						'Content-Type': 'application/json',
					},
				});

				if (!res.ok) throw new Error('Failed to get API key');

				const { data } = await res.json();

				if (!data) throw new Error('No info returned for api key');

				return data as OpenRouterApiKeyData;
			})(),
			(e) => `Failed to get API key ${e}`
		);
	},
};

export type GroqApiKeyData = {
	label: string;
	usage: number;
	is_free_tier: boolean;
	limit: number;
	limit_remaining: number;
};

export const Groq = {
	getApiKey: async (key: string): Promise<Result<GroqApiKeyData, string>> => {
		return await ResultAsync.fromPromise(
			(async () => {
				// Groq doesn't have a key validation endpoint, so we'll make a simple models list call
				const res = await fetch('https://api.groq.com/openai/v1/models', {
					headers: {
						Authorization: `Bearer ${key}`,
						'Content-Type': 'application/json',
					},
				});

				if (!res.ok) throw new Error('Failed to validate API key');

				// Return a simplified response structure
				return {
					label: 'Groq API Key',
					usage: 0,
					is_free_tier: false,
					limit: 0,
					limit_remaining: 0,
				} as GroqApiKeyData;
			})(),
			(e) => `Failed to get API key ${e}`
		);
	},
};

export type GeminiApiKeyData = {
	label: string;
	usage: number;
	is_free_tier: boolean;
	limit: number;
	limit_remaining: number;
};

export const Gemini = {
	getApiKey: async (key: string): Promise<Result<GeminiApiKeyData, string>> => {
		return await ResultAsync.fromPromise(
			(async () => {
				// Gemini doesn't have a key validation endpoint, so we'll make a simple models list call
				const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
					headers: {
						'x-goog-api-key': key,
						'Content-Type': 'application/json',
					},
				});

				if (!res.ok) throw new Error('Failed to validate API key');

				// Return a simplified response structure
				return {
					label: 'Gemini API Key',
					usage: 0,
					is_free_tier: false,
					limit: 0,
					limit_remaining: 0,
				} as GeminiApiKeyData;
			})(),
			(e) => `Failed to get API key ${e}`
		);
	},
};

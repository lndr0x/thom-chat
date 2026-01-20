import { ResultAsync } from 'neverthrow';

export interface GeminiModel {
	name: string;
	displayName: string;
	description: string;
	inputTokenLimit: number;
	outputTokenLimit: number;
	supportedGenerationMethods: string[];
}

export function getGeminiModels() {
	return ResultAsync.fromPromise(
		(async () => {
			const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models');

			const { models } = await res.json();

			return models as GeminiModel[];
		})(),
		() => '[gemini] Failed to fetch models'
	);
}

import { ResultAsync } from 'neverthrow';

export interface GroqModel {
	id: string;
	object: string;
	created: number;
	owned_by: string;
	active: boolean;
	context_window: number;
}

export function getGroqModels() {
	return ResultAsync.fromPromise(
		(async () => {
			const res = await fetch('https://api.groq.com/openai/v1/models');

			const { data } = await res.json();

			return data as GroqModel[];
		})(),
		() => '[groq] Failed to fetch models'
	);
}

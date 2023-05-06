import { page } from '$app/stores';

type Options = {
	noCache?: boolean;
	accessToken?: string;
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body?: Record<string, unknown>;
};

export async function fetchGithub(url: string, options?: Options): Promise<unknown> {
	let { accessToken } = options || {};
	if (!accessToken) {
		page.subscribe(({ data }) => {
			accessToken = data.session?.accessToken || '';
		});
	}

	const response = await fetch(`${url.startsWith('http') ? '' : 'https://api.github.com/'}${url}`, {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${accessToken}`
		},
		method: options?.method || 'GET',
		body: options?.body ? JSON.stringify(options.body) : undefined,
		cache: options?.noCache ? 'no-store' : undefined
	});

	if (options?.method) return;

	if (response.ok) {
		const data = await response.json();
		return data;
	}

	throw new Error('Failed to fetch');
}
export default {
	async fetch(request) {
		const url = new URL(request.url);

		// Handle POST requests for storing data
		if (request.method === 'POST') {
			try {
				const { key, value } = await request.json();

				if (!key || !value) {
					return new Response('Missing "key" or "value" in request body', {
						status: 400,
						headers: { 'content-type': 'text/plain' },
					});
				}

				// Store the value in the KV Namespace
				await MY_NAMESPACE_BINDING.put(key, value);

				return new Response('Value written to KV Namespace', {
					headers: { 'content-type': 'text/plain' },
				});
			} catch (e) {
				return new Response('Error processing request', {
					status: 500,
					headers: { 'content-type': 'text/plain' },
				});
			}
		}

		// Handle GET requests for retrieving data
		if (request.method === 'GET') {
			try {
				const key = url.searchParams.get('key') || 'default-key';

				// Retrieve the value from the KV Namespace
				const value = await MY_NAMESPACE_BINDING.get(key);

				return new Response(`Value for "${key}": ${value || 'No value found'}`, {
					headers: { 'content-type': 'text/plain' },
				});
			} catch (e) {
				return new Response('Error retrieving value from KV Namespace', {
					status: 500,
					headers: { 'content-type': 'text/plain' },
				});
			}
		}

		return new Response('Unsupported request method', {
			status: 405,
			headers: { 'content-type': 'text/plain' },
		});
	},
};

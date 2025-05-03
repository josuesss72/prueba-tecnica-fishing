import type { APIRoute } from "astro";
import { API_HOST } from "astro:env/client";

export const GET: APIRoute = async () => {
	const res = await fetch(`${API_HOST}/game/leaderboard`);

	if (!res.ok) {
		return new Response(
			JSON.stringify({ error: "No se pudo obtener el leaderboard" }),
			{ status: 500 }
		);
	}

	const data = await res.json();

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

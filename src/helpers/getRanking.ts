import { API_HOST } from "astro:env/client";
import type { IRanking } from "../types/ranking";

export async function getRanking() {
	const response = await fetch(`${API_HOST}/game/leaderboard`);
	const data: IRanking = await response.json();
	return data;
}

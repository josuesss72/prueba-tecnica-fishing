import { create } from "zustand";
import type { IPlayerRanking } from "../types/ranking";

interface PlayersState {
	players: IPlayerRanking[];
	setPlayers: (players: IPlayerRanking[]) => void;
}

export const usePlayersStore = create<PlayersState>((set) => ({
	players: [],
	setPlayers: (players) => set({ players }),
}));

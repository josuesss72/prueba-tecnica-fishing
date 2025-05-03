export interface IPlayerRanking {
	rank: number;
	username: string;
	level: number;
	xp: number;
	gold: number;
}

export interface IRanking {
	players: IPlayerRanking[];
	legend: {
		tiers: ITiers[];
	};
}

export interface ITiers {
	example: string;
	range: string;
	representation: string;
}

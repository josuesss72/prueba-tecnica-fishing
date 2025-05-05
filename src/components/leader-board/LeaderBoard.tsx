import React, { useEffect, useState } from "react";
import { getRanking } from "../../helpers/getRanking";
import type { IPlayerRanking } from "../../types/ranking";
import { AnimatedNumber } from "./components/animate-number/AnimateNumber";
import { usePlayersStore } from "../../store/useStore";

const LeaderBoard = () => {
	const [players, setPlayers] = useState<IPlayerRanking[]>([]);
	const setPlayersStore = usePlayersStore((state) => state.setPlayers);
	const [prevPlayers, setPrevPlayers] = useState<IPlayerRanking[]>([]);
	const [player, setPlayer] = useState<IPlayerRanking>();
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const totalPages = Math.ceil(players?.length / itemsPerPage);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = players.slice(indexOfFirstItem, indexOfLastItem);

	const nextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const prevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	useEffect(() => {
		async function fetching() {
			try {
				const ranking = await getRanking();
				setPlayers(ranking.players);
				setPlayersStore(ranking.players);
			} catch (err) {
				console.error("Error fetching leaderboard:", err);
			}
		}

		fetching();

		const interval = setInterval(fetching, 5_000); // Cada 30 segundos

		return () => clearInterval(interval);
	}, []);

	// Nuevo useEffect para comparar cambios entre versiones
	useEffect(() => {
		if (prevPlayers.length > 0) {
			players.forEach((player) => {
				const prev = prevPlayers.find((i) => i.username === player.username);
				if (prev) {
					if (prev.rank > player.rank) {
						setPlayer(player);
					}
				}
			});
		}
		setPrevPlayers(players);
	}, [players]);

	return (
		<section className="w-full">
			<h2 className="text-xl font-bold mb-2">
				<span className="text-2xl">🏆</span> Leaderboard
			</h2>
			{player && (
				<h3 className="text-green-700 flex justify-center p-2">
					player {player?.username} moved up to position #{player?.rank}
				</h3>
			)}
			<ul className="space-y-1">
				{currentItems.map((player: IPlayerRanking) => {
					const prev = prevPlayers.find((p) => p.username === player.username);
					return (
						<li
							key={player.username}
							className="bg-gray-900 p-2 rounded shadow text-xs grid grid-cols-[0.3fr_1fr_0.5fr_1fr]"
						>
							<span>#{player.rank}</span>
							<span className="max-w-[90px] overflow-hidden break-words md:max-w-full">
								{player.username}
							</span>
							<span className="bg-green-900 p-1 border-2 border-green-800 rounded-sm flex justify-center">
								Lvl {player.level}
							</span>
							<article className="flex flex-col items-center md:flex-row md:justify-end md:gap-4">
								<AnimatedNumber
									value={player.gold}
									icon="💰"
									previous={prev?.gold ?? 0}
									players={players}
								/>
								<AnimatedNumber
									value={player.xp}
									icon="🥇"
									previous={prev?.xp ?? 0}
									players={players}
								/>
							</article>
						</li>
					);
				})}
			</ul>

			<div className="flex items-center justify-center space-x-4 mt-4">
				<button
					onClick={prevPage}
					disabled={currentPage === 1}
					className="flex gap-2 text-sm px-4 py-2 bg-gray-900 rounded cursor-pointer"
				>
					<span>⬅️</span> <span>Anterior</span>
				</button>
				<span>
					{currentPage} de {totalPages}
				</span>
				<button
					onClick={nextPage}
					disabled={currentPage === totalPages}
					className="flex gap-2 text-sm px-4 py-2 bg-gray-900 rounded cursor-pointer"
				>
					<span>Siguiente</span> <span>➡️</span>
				</button>
			</div>
		</section>
	);
};

export default LeaderBoard;

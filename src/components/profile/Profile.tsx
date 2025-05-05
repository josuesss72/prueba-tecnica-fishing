import React, { useEffect, useState } from "react";
import type { IPlayerRanking } from "../../types/ranking";
import { usePlayersStore } from "../../store/useStore";

const Profile = () => {
	const [username, setUsername] = useState<string>("");
	const players = usePlayersStore((state) => state.players);
	const [viewPlayer, setViewPlayer] = useState<boolean>(false);
	const [player, setPlayer] = useState<IPlayerRanking>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value.toLocaleLowerCase().trim());
	};

	useEffect(() => {
		if (viewPlayer) {
			const currentPlayer = players.find(
				(pyr) => pyr.username.toLocaleLowerCase() === username
			);
			if (currentPlayer) {
				setPlayer(currentPlayer);
			}
		}
	}, [players, viewPlayer, username]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setViewPlayer(true);
	};

	return (
		<article className="flex w-full flex-col items-center">
			<h2 className="text-xl font-bold">
				<span className="text-2xl">👤</span> Profile
			</h2>

			{player ? (
				<article className="p-4 bg-gray-900 rounded-sm mt-4 w-full">
					<h2 className="text-center text-lg mb-2">{player.username}</h2>
					<div className="flex flex-col gap-2">
						<span>💰 {player.gold}</span>
						<span>🥇 {player.xp}</span>
					</div>
				</article>
			) : (
				<form onSubmit={handleSubmit} className="p-4" action="">
					<p className="mb-2">Ingrese su username</p>
					<div className="text-sm flex flex-col gap-2">
						<p>Username</p>
						<input
							className="border-[1px] border-gray-700 rounded-sm"
							type="text"
							name=""
							value={username}
							id=""
							onChange={handleChange}
						/>
					</div>
					<button className="m-auto w-full mt-4 border-2 p-1 rounded-sm border-gray-900 bg-gray-950">
						Send
					</button>
				</form>
			)}
		</article>
	);
};

export default Profile;

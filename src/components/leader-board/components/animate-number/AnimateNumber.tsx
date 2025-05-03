import { useEffect, useState } from "react";
import clsx from "clsx";
import type { IPlayerRanking } from "../../../../types/ranking";

export function AnimatedNumber({
	value,
	icon,
	previous = value,
	players,
}: {
	value: number;
	icon: string;
	previous?: number;
	players: IPlayerRanking[];
}) {
	const [change, setChange] = useState<"up" | "down" | null>(null);
	const [display, setDisplay] = useState(value);

	useEffect(() => {
		if (value > previous) setChange("up");
		else if (value < previous) setChange("down");
		else setChange(null);

		const timeout = setTimeout(() => {
			setDisplay(value);
			setChange(null);
		}, 800);
		return () => clearTimeout(timeout);
	}, [players]);

	return (
		<span
			className={clsx(
				"transition-colors duration-500 font-mono flex justify-center",
				{
					"text-green-500 animate-pulse": change === "up",
					"text-red-500 animate-pulse": change === "down",
					"text-white": change === null,
				}
			)}
		>
			{icon} {display}
		</span>
	);
}

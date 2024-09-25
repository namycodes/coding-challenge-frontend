"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/button";
import {
	LucideArrowLeftCircle,
	LucideArrowRightCircle,
	LucideLoader2,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function WeatherForecast() {
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 4;
	const fetchWeatherForecast = async () => {
		try {
			const response = await fetch(
				"/api/weather/forecast/daily?city=Lusaka&countryCode=260"
			);
			if (response.ok) {
				const data = await response.json();
				console.log(data);
				return data;
			}
			if (!response.ok) {
				const data = await response.json();
				console.log(data);
				return data;
			}
		} catch (error) {
			console.log(error);
		}
	};
	const { data, isFetching, isError, refetch, isRefetching } = useQuery({
		queryKey: ["16-day-weather-forecast"],
		queryFn: fetchWeatherForecast,
	});
	// Pagination Implementation Logic
	// data received from the useQuery has nested data objects thus the data?.data.....
	const totalPages = Math.ceil(data?.data?.data?.length / ITEMS_PER_PAGE);
	const getItemsForCurrentPage = (page) => {
		const startIndex = (page - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		return data?.data?.data?.slice(startIndex, endIndex);
	};
	const itemsToDisplay = getItemsForCurrentPage(currentPage);
	return (
		<div className="w-full  px-4 flex flex-col gap-3 h-auto py-5 bg-white/10 shadow-sm rounded-xl">
			<div className="flex justify-between w-full items-center ">
				<h1>16 days Forecast</h1>
				<Button onClick={refetch} className="bg-white/15 hover:bg-white/20">
					{isRefetching ? (
						<LucideLoader2 size={15} className="animate-spin" />
					) : (
						"Refresh"
					)}
				</Button>
			</div>
			{isFetching &&
				Array.from({ length: 4 }).map((_, index) => (
					<Skeleton
						key={index}
						className="flex w-full items-center justify-between h-[100px] p-4 bg-white/15 shadow-lg rounded-lg "
					/>
				))}
			{isError && (
				<div className="flex justify-center items-center flex-col gap-3">
					<h1>An Error Occurred Fetching data</h1>
					<Button onClick={fetchWeatherForecast} variant={"outline"}>
						Retry
					</Button>
				</div>
			)}
			{itemsToDisplay &&
				!isFetching &&
				itemsToDisplay?.map((item, index) => (
					<div
						key={index}
						className="flex w-full items-center justify-between p-4 bg-white/15 shadow-lg rounded-lg "
					>
						<div className="flex-1 w-fulll">
							<div>
								<h1 className="text-sm font-semibold">
									Max: {item.max_temp} °C / Min: {item.min_temp} °C
								</h1>
							</div>
							<div className="text-white text-[13px]">
								{item.weather.description} | Precipitation: {item.precip} mm |
								UV Index: {item.uv} | Wind: {item.wind_cdir_full} at{" "}
								{item.wind_spd} m/s
							</div>
						</div>
					</div>
				))}
			<div className="flex gap-4">
				<Button
					disabled={currentPage === 1}
					className="flex gap-2 bg-white/15 text-white"
					onClick={() => setCurrentPage(currentPage - 1)}
				>
					<LucideArrowLeftCircle size={18} /> Prev
				</Button>
				<Button
					disabled={currentPage === totalPages}
					className="flex gap-2 bg-white/15 text-white"
					onClick={() => setCurrentPage(currentPage + 1)}
				>
					Next <LucideArrowRightCircle size={18} />
				</Button>
			</div>
		</div>
	);
}

import { apiClient } from "./client";

export async function getStationDetails(name: string) {

    const response = await apiClient.get(
        `/station-details/${name}`
    );

    return response.data;

}
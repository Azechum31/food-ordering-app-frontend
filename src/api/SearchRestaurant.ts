import { Restaurant, RestaurantsSearchResponse } from '@/@types';
import { SearchState } from '@/pages/SearchPage';

import { useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (
	searchState: SearchState,
	city?: string,
) => {
	const params = new URLSearchParams();
	params.set('searchQuery', searchState.searchQuery);
	params.set('page', searchState.page.toString());
	params.set('selectedCuisines', searchState.selectedCuisines.join(','));
	params.set('sortOption', searchState.sortOption);
	const searchRestaurantRequest =
		async (): Promise<RestaurantsSearchResponse> => {
			const response = await fetch(
				`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`,
				{
					method: 'GET',
				},
			);

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			return response.json();
		};

	const {
		data: searchData,
		isLoading,
		error,
	} = useQuery(['fetchSearchData', searchState], searchRestaurantRequest, {
		enabled: !!city,
	});

	if (error) {
		toast.error(error.toString());
	}

	return { searchData, isLoading };
};

export const useRestaurantDetail = (restaurantId?: string) => {
	const restaurantDetailRequest = async (): Promise<Restaurant> => {
		const response = await fetch(
			`${API_BASE_URL}/api/restaurant/${restaurantId}`,
			{
				method: 'GET',
			},
		);

		if (!response.ok) {
			throw new Error(`Something went wrong`);
		}

		return response.json();
	};

	const {
		data: restaurant,
		isLoading,
		error,
	} = useQuery('fetchRestaurantDetail', restaurantDetailRequest, {
		enabled: !!restaurantId,
	});

	if (error) {
		error.toString();
	}

	return { restaurant, isLoading };
};

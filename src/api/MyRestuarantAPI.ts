import { Order, Restaurant } from '@/@types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestuarant = () => {
	const { getAccessTokenSilently } = useAuth0();
	const getRestuarantRequest = async (): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/my/restuarant`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new Error('Something went wrong!');
		}

		return response.json();
	};

	const {
		data: restaurant,
		isLoading,
		error,
	} = useQuery('fetchMyRestuarant', getRestuarantRequest);

	if (error) {
		toast.error(error.toString());
	}

	return {
		restaurant,
		isLoading,
	};
};

export const useCreateMyRestuarant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const createRestuarantRequest = async (
		restuarant: FormData,
	): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/my/restuarant`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: restuarant,
		});
		console.log('response fulfilled!');
		if (!response.ok) {
			throw new Error('Something went wrong!');
		}

		return response.json();
	};

	const {
		mutateAsync: createRestuarant,
		isLoading,
		isSuccess,
		error,
		reset,
	} = useMutation(createRestuarantRequest);

	if (isSuccess) {
		toast.success('Restuarant created successfully!');
	}

	if (error) {
		toast.error(error.toString());
		reset();
	}

	return {
		createRestuarant,
		isLoading,
	};
};

export const useUpdateMyRestuarant = () => {
	const { getAccessTokenSilently } = useAuth0();
	const createUpdateMyRestuarantRequest = async (
		restuarant: FormData,
	): Promise<Restaurant> => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/my/restuarant`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: restuarant,
		});

		if (!response.ok) {
			throw new Error('Something went wrong!');
		}

		return response.json();
	};

	const {
		mutateAsync: updateRestuarant,
		isLoading,
		isSuccess,
		error,
		reset,
	} = useMutation(createUpdateMyRestuarantRequest);

	if (error) {
		toast.error(error.toString());
		reset();
	}

	if (isSuccess) {
		toast.success('Restaurant updated!');
	}

	return { updateRestuarant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
	const { getAccessTokenSilently } = useAuth0();
	const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(
			`${API_BASE_URL}/api/my/restaurant/orders`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		if (!response.ok) {
			throw new Error('Something went wrong!');
		}

		return response.json();
	};

	const { data: restaurantOrders, isLoading } = useQuery(
		'fetchRestaurantOrders',
		getMyRestaurantOrdersRequest,
	);

	return { restaurantOrders, isLoading };
};

type updateRestaurantOrderType = {
	orderId: string;
	status: string;
};

export const useUpdateMyRestaurantOrders = () => {
	const { getAccessTokenSilently } = useAuth0();
	const updateMyRestaurantOrdersRequest = async (
		updateRestaurantOrderRequest: updateRestaurantOrderType,
	) => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(
			`${API_BASE_URL}/api/my/restaurant/orders/${updateRestaurantOrderRequest.orderId}/status`,
			{
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					status: updateRestaurantOrderRequest.status,
				}),
			},
		);

		if (!response.ok) {
			throw new Error('Failed to fetch order!');
		}
		return response.json();
	};

	const {
		mutateAsync: updateRestaurantOrder,
		isLoading,
		isSuccess,
		error,
		reset,
	} = useMutation(updateMyRestaurantOrdersRequest);

	if (error) {
		toast.error(error.toString());
		reset();
	}

	if (isSuccess) {
		toast.success('Order status updated!');
	}

	return { updateRestaurantOrder, isLoading };
};

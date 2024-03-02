import { Restuarant } from '@/@types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestuarant = () => {
	const { getAccessTokenSilently } = useAuth0();
	const getRestuarantRequest = async (): Promise<Restuarant> => {
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
		data: restuarant,
		isLoading,
		error,
	} = useQuery('fetchMyRestuarant', getRestuarantRequest);

	if (error) {
		toast.error(error.toString());
	}

	return {
		restuarant,
		isLoading,
	};
};

export const useCreateMyRestuarant = () => {
	const { getAccessTokenSilently } = useAuth0();

	const createRestuarantRequest = async (
		restuarant: FormData,
	): Promise<Restuarant> => {
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
	): Promise<Restuarant> => {
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
		toast.success('Restuarant updated!');
	}

	return { updateRestuarant, isLoading };
};

import { User } from '@/@types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetUser = () => {
	const { getAccessTokenSilently } = useAuth0();
	const getCurrentUserRequest = async (): Promise<User> => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/my/user`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch user!');
		}

		return response.json();
	};
	const {
		data: currentUser,
		isLoading,
		error,
	} = useQuery('fetchCurrentUser', getCurrentUserRequest);

	if (error) {
		toast.error(error.toString());
	}

	return { currentUser, isLoading };
};
type CreateUserRequest = {
	auth0Id: string;
	email: string;
};

export const useCreateMyUser = () => {
	const { getAccessTokenSilently } = useAuth0();
	const createMyUserRequest = async (user: CreateUserRequest) => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/my/user`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error('Unable to create User');
		}
	};

	const {
		mutateAsync: createUser,
		isLoading,
		isError,
		isSuccess,
	} = useMutation(createMyUserRequest);

	return {
		createUser,
		isLoading,
		isError,
		isSuccess,
	};
};

type UpdateUserRequest = {
	name: string;
	addressLine1: string;
	country: string;
	city: string;
	phoneNumber: string;
};

export const useUpdateUser = () => {
	const { getAccessTokenSilently } = useAuth0();
	const updateUserRequest = async (user: UpdateUserRequest) => {
		const accessToken = await getAccessTokenSilently();
		const response = await fetch(`${API_BASE_URL}/api/my/user`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error('Failed to update user!');
		}
	};

	const {
		mutateAsync: updateUser,
		isLoading,
		isSuccess,
		error,
		reset,
	} = useMutation(updateUserRequest);

	if (isSuccess) {
		toast.success('User profile updated!');
	}

	if (error) {
		toast.error(error.toString());
		reset();
	}

	return {
		updateUser,
		isLoading,
	};
};

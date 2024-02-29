import { useGetUser, useUpdateUser } from '@/api/MyUserAPI';
import UserProfileForm from '@/forms/user-profile-form/UserProfileForm';

const UserProfilePage = () => {
	const { currentUser, isLoading: isGetLoading } = useGetUser();
	const { updateUser, isLoading } = useUpdateUser();

	if (isGetLoading) {
		return <span>Loading...</span>;
	}

	if (!currentUser) {
		return <span>Unable to fetch user profile data</span>;
	}
	return (
		<UserProfileForm
			currentUser={currentUser}
			onSave={updateUser}
			isLoading={isLoading}
		/>
	);
};

export default UserProfilePage;

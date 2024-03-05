import {
	useCreateMyRestuarant,
	useGetMyRestuarant,
	useUpdateMyRestuarant,
} from '@/api/MyRestuarantAPI';
import ManageRestaurantFom from '@/forms/manage-restuarant-form/ManageRestuarantFom';

const RestuarantPage = () => {
	const { restaurant, isLoading: isGetRestuarantLoading } =
		useGetMyRestuarant();
	const { createRestuarant, isLoading } = useCreateMyRestuarant();
	const { updateRestuarant, isLoading: isUpdateLoading } =
		useUpdateMyRestuarant();

	if (isGetRestuarantLoading) {
		<span>Loading</span>;
	}

	if (!restaurant) {
		<span>Unable to load restuarant data!</span>;
	}

	const isEditing = !!restaurant;

	return (
		<ManageRestaurantFom
			restuarant={restaurant}
			onSave={isEditing ? updateRestuarant : createRestuarant}
			isLoading={isLoading || isUpdateLoading}
		/>
	);
};

export default RestuarantPage;

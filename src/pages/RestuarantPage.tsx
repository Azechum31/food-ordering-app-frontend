import {
	useCreateMyRestuarant,
	useGetMyRestaurantOrders,
	useGetMyRestuarant,
	useUpdateMyRestuarant,
} from '@/api/MyRestuarantAPI';
import MyRestaurantOrders from '@/components/MyRestaurantOrders';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManageRestaurantFom from '@/forms/manage-restuarant-form/ManageRestuarantFom';

const RestuarantPage = () => {
	const { restaurant, isLoading: isGetRestuarantLoading } =
		useGetMyRestuarant();
	const { createRestuarant, isLoading } = useCreateMyRestuarant();
	const { updateRestuarant, isLoading: isUpdateLoading } =
		useUpdateMyRestuarant();
	const { restaurantOrders } = useGetMyRestaurantOrders();

	if (isGetRestuarantLoading) {
		<span>Loading</span>;
	}

	if (!restaurant) {
		<span>Unable to load restuarant data!</span>;
	}

	const isEditing = !!restaurant;

	return (
		<Tabs defaultValue='orders'>
			<TabsList className='grid grid-cols-2 w-[400px]'>
				<TabsTrigger value='orders' className='font-bold'>
					Orders
				</TabsTrigger>
				<TabsTrigger value='restaurant' className='font-bold'>
					Restaurant
				</TabsTrigger>
			</TabsList>
			<TabsContent
				value='orders'
				className='space-y-10 bg-slate-50 px-10 py-6 rounded-lg'>
				<h2 className='text-2xl font-bold tracking-tight'>
					{restaurantOrders?.length || 0} active{' '}
					{restaurantOrders?.length === 1 ? 'order' : 'orders'}
				</h2>
				{restaurantOrders?.map((order) => (
					<MyRestaurantOrders key={order._id} order={order} />
				))}
			</TabsContent>
			<TabsContent value='restaurant'>
				<ManageRestaurantFom
					restaurant={restaurant}
					onSave={isEditing ? updateRestuarant : createRestuarant}
					isLoading={isLoading || isUpdateLoading}
				/>
			</TabsContent>
		</Tabs>
	);
};

export default RestuarantPage;

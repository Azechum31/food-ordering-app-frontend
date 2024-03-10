import { useGetMyOrders } from '@/api/OrderAPI';
import OrderStatusDetails from '@/components/OrderStatusDetails';
import OrdersStatusHeader from '@/components/OrdersStatusHeader';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const OrderStatusPage = () => {
	const { orders, isLoading } = useGetMyOrders();

	if (isLoading) {
		return 'Loading...';
	}

	if (!orders || orders.length === 0) {
		('No orders found!');
	}
	return (
		<div className='space-y-10'>
			{orders?.map((order) => (
				<div
					key={order._id}
					className='space-y-10 bg-slate-50 p-10 rounded-lg'>
					<OrdersStatusHeader order={order} />
					<div className='grid gap-10 md:grid-cols-[2fr_4fr]'>
						<OrderStatusDetails order={order} />
						<AspectRatio ratio={16 / 5}>
							<img
								src={order.restaurant.imageUrl}
								alt=''
								className='w-full h-full object-cover rounded-lg'
							/>
						</AspectRatio>
					</div>
				</div>
			))}
		</div>
	);
};

export default OrderStatusPage;

import { Order, OrderStatus } from '@/@types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Select, SelectValue } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { ORDER_STATUS } from '@/config/order-status-config';
import { useUpdateMyRestaurantOrders } from '@/api/MyRestuarantAPI';
import { useEffect, useState } from 'react';

type Props = {
	order: Order;
};
const MyRestaurantOrders = ({ order }: Props) => {
	const { updateRestaurantOrder, isLoading } = useUpdateMyRestaurantOrders();
	const [status, setStatus] = useState<OrderStatus>(order.status);

	const handleStatusUpdate = async (newOrderStatus: OrderStatus) => {
		await updateRestaurantOrder({
			orderId: order._id as string,
			status: newOrderStatus,
		});
		setStatus(newOrderStatus);
	};

	useEffect(() => {
		setStatus(order.status);
	}, [order.status]);

	const getDeliveryTime = () => {
		const created = new Date(order.createdAt);

		const hours = created.getHours();
		const minutes = created.getMinutes();
		const PaddedTime = minutes < 10 ? `0${minutes}` : minutes;

		return `${hours}:${PaddedTime}`;
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle className='grid  md:grid-cols-4 gap-6 justify-between text-center'>
					<div>
						Customer Name:
						<span className='ml-2 font-normal'>
							{order.deliveryDetails.name}
						</span>
					</div>
					<div>
						Delivery Address:
						<span className='ml-2 font-normal'>
							{order.deliveryDetails.addressLine1},{' '}
							{order.deliveryDetails.city},{' '}
							{order.deliveryDetails.country}
						</span>
					</div>
					<div>
						Time:
						<span className='ml-2 font-normal'>
							{getDeliveryTime()}
						</span>
					</div>
					<div>
						Total:
						<span className='ml-2 font-normal'>
							${(order.totalAmount / 100).toFixed(2)}
						</span>
					</div>
				</CardTitle>
				<Separator />
				<CardContent className='py-5'>
					<table className=' text-left w-full table-auto border-collapse rounded-lg border border-slate-300 mb-6 '>
						<thead>
							<tr className='bg-slate-500 text-slate-50'>
								<th className='border border-slate-300 py-2 px-4'>
									Item
								</th>
								<th className='border border-slate-300 py-2 px-4'>
									Qty
								</th>
							</tr>
						</thead>
						<tbody>
							{order.cartItems.map((cartItem) => (
								<tr
									key={cartItem.menuItemId}
									className='even:bg-slate-100'>
									<td className='border border-slate-300 py-2 px-4'>
										{cartItem.name}
									</td>
									<td className='border border-slate-300 py-2 px-4'>
										{cartItem.quantity}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div>
						<Label htmlFor='order-status'>
							What is the status of the order?
						</Label>
						<Select
							value={status}
							disabled={isLoading}
							onValueChange={(value) =>
								handleStatusUpdate(value as OrderStatus)
							}>
							<SelectTrigger id='order-status'>
								<SelectValue placeholder='Select order status' />
							</SelectTrigger>
							<SelectContent position='popper'>
								{ORDER_STATUS.map((status, index) => (
									<SelectItem
										value={status.value}
										key={index}>
										{status.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</CardHeader>
		</Card>
	);
};

export default MyRestaurantOrders;

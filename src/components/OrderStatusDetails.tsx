import { Order } from '@/@types';
import { Separator } from './ui/separator';

const OrderStatusDetails = ({ order }: Props) => {
	return (
		<div className='space-y-10'>
			<div className='flex flex-col'>
				<span className='text-xl font-semibold tracking-tight'>
					Delivering to:
				</span>
				<span>{order.deliveryDetails.name}</span>
				<span>
					{order.deliveryDetails.addressLine1},{' '}
					{order.deliveryDetails.city},{' '}
					{order.deliveryDetails.country}
				</span>
				<span>{order.deliveryDetails.phoneNumber}</span>
			</div>
			<Separator />
			<div className='flex flex-col'>
				<span className='text-xl font-semibold tracking-tight'>
					Your Order:
				</span>
				<ul className='list-disc flex flex-col pl-5'>
					{order.cartItems.map((cartItem) => (
						<li key={cartItem.menuItemId}>
							{cartItem.name} x {cartItem.quantity}
						</li>
					))}
				</ul>
			</div>
			<Separator />
			<div className='flex flex-col'>
				<span className='text-xl font-semibold tracking-tight'>
					Total:
				</span>
				<span>${(order.totalAmount / 100).toFixed(2)}</span>
			</div>
		</div>
	);
};

type Props = {
	order: Order;
};

export default OrderStatusDetails;

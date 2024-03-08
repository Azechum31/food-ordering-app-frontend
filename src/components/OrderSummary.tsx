import { Restaurant } from '@/@types';
import { CartItem } from '@/pages/RestaurantDetailPage';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Trash } from 'lucide-react';

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
	const getTotalCost = () => {
		const totalInCents = cartItems.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0,
		);

		const totalWithDeliveryPrice = totalInCents + restaurant.deliveryPrice;
		return (totalWithDeliveryPrice / 100).toFixed(2);
	};
	return (
		<>
			<CardHeader>
				<CardTitle className='text-xl font-bold tracking-tight flex justify-between'>
					<span>Your Order</span>
					<span>${getTotalCost()}</span>
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-5'>
				{cartItems.map((item) => (
					<div
						key={item._id}
						className='flex gap-3 justify-between items-center'>
						<span className='flex-1'>
							<Badge variant='outline' className='mr-2'>
								{item.quantity}
							</Badge>
							{item.name}
						</span>
						<span className='flex gap-1 items-center'>
							${((item.price * item.quantity) / 100).toFixed(2)}
							<Trash
								strokeWidth={1.0}
								size={20}
								className='text-red-500 cursor-pointer'
								onClick={() => removeFromCart(item)}
							/>
						</span>
					</div>
				))}
				<Separator />
				<div className='flex justify-between'>
					<span>Delivery</span>
					<span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
				</div>
				<Separator />
			</CardContent>
		</>
	);
};

type Props = {
	restaurant: Restaurant;
	cartItems: CartItem[];
	removeFromCart: (cartItem: CartItem) => void;
};

export default OrderSummary;

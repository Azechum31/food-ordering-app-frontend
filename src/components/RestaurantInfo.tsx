import { Restaurant } from '@/@types';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Dot, MapPin } from 'lucide-react';

const RestaurantInfo = ({ restaurant }: Props) => {
	return (
		<Card className='border-2 border-slate-100 bg-slate-50 rounded-md'>
			<CardHeader>
				<CardTitle className='text-3xl font-bold tracking-tight'>
					{restaurant.restaurantName}
				</CardTitle>
				<CardDescription className='flex gap-1 items-center'>
					<MapPin
						strokeWidth={2}
						size={20}
						className='text-red-500'
					/>
					{restaurant.city}, {restaurant.country}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-wrap'>
				{restaurant.cuisines.map((cuisine, index) => (
					<span key={index} className='flex '>
						<span className='flex items-center'>
							{cuisine}
							{index < restaurant.cuisines.length - 1 && <Dot />}
						</span>
					</span>
				))}
			</CardContent>
		</Card>
	);
};

type Props = {
	restaurant: Restaurant;
};

export default RestaurantInfo;

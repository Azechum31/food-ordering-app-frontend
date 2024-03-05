import { Banknote, Clock } from 'lucide-react';
import { AspectRatio } from './ui/aspect-ratio';
import { Restaurant } from '@/@types';

type Props = {
	restaurant: Restaurant;
};

const SearchResultsCard = ({ restaurant }: Props) => {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-12'>
			<AspectRatio ratio={16 / 6}>
				<img
					src={restaurant.imageUrl}
					alt={restaurant.restaurantName}
					className=' w-full h-full object-cover rounded-md'
				/>
			</AspectRatio>

			<div className='flex flex-col justify-center'>
				<h4 className='text-2xl font-bold mb-3 tracking-tight group-hover:underline'>
					{restaurant.restaurantName}
				</h4>
				<ul className='list-disc flex flex-wrap gap-x-6 pl-4'>
					{restaurant.cuisines.map((cuisine, index) => (
						<li key={index} className='text-sm'>
							{cuisine}
						</li>
					))}
				</ul>
			</div>
			<div className='flex flex-col justify-center'>
				<span className='text-green-500 text-sm'>
					<Clock
						strokeWidth={1.0}
						size={20}
						className='mr-1 inline'
					/>
					{restaurant.estimatedDeliveryTime} mins
				</span>
				<span className='text-sm'>
					<Banknote
						strokeWidth={1.0}
						size={20}
						className='mr-1 inline'
					/>
					Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
				</span>
			</div>
		</div>
	);
};

export default SearchResultsCard;

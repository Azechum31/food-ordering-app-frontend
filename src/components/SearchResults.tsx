import { Link } from 'react-router-dom';

type Props = {
	total: number;
	city: string;
};

const SearchResults = ({ total, city }: Props) => {
	return (
		<div className='text-xl font-bold flex gap-3 flex-col justify-between lg:items-center lg:flex-row'>
			<span className='flex-1 '>
				{total} {total === 1 ? 'Restaurant' : 'Restaurants'} found in{' '}
				{city.charAt(0).toLocaleUpperCase() + city.slice(1)}
				<Link
					to='/'
					className='text-sm font-semibold underline text-blue-500 cursor-pointer ml-2'>
					Change Location
				</Link>
			</span>
		</div>
	);
};

export default SearchResults;

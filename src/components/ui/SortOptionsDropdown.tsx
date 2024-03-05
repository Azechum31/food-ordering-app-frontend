import { Button } from './button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './dropdown-menu';

const SortOptionsDropdown = ({ onChange, sortOption }: Props) => {
	const selectedOption =
		SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
		SORT_OPTIONS[0].label;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='cursor-pointer'>
				<Button variant='outline' className='w-full'>
					Sort by: {selectedOption}
				</Button>
				<DropdownMenuContent>
					{SORT_OPTIONS.map((option, index) => (
						<DropdownMenuItem
							key={index}
							className='cursor-pointer'
							onClick={() => onChange(option.value)}>
							{option.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
};

const SORT_OPTIONS = [
	{
		label: 'Best match',
		value: 'bestMatch',
	},
	{
		label: 'Delivery price',
		value: 'deliveryPrice',
	},
	{
		label: 'Estimated delivery time',
		value: 'estimatedDeliveryTime',
	},
];

type Props = {
	onChange: (value: string) => void;
	sortOption: string;
};

export default SortOptionsDropdown;

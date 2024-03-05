import { cuisineList } from '@/config/restuarant-options-config';
import { Label } from './ui/label';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { ChangeEvent } from 'react';
import { Button } from './ui/button';

const CuisineFilter = ({
	onChange,
	selectedCuisines,
	isExpanded,
	isExpandedClick,
}: Props) => {
	const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
		const clickedCuisine = event.target.value;
		const isChecked = event.target.checked;

		const newCuisineList = isChecked
			? [...selectedCuisines, clickedCuisine]
			: selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

		onChange(newCuisineList);
	};
	const handleCuisineReset = () => onChange([]);
	return (
		<>
			<div className='flex justify-between items-center px-3'>
				<div className='text-md font-semibold mb-2'>
					Filter by Cuisine
				</div>
				<div
					onClick={handleCuisineReset}
					className='text-sm font-semibold text-blue-500 underline cursor-pointer'>
					Reset Filters
				</div>
			</div>
			<div className='flex flex-col space-y-2'>
				{cuisineList
					.slice(0, isExpanded ? cuisineList.length : 7)
					.map((cuisine, index) => {
						const isSelected = selectedCuisines.includes(cuisine);
						return (
							<div key={index}>
								<input
									type='checkbox'
									id={`cuisine_${cuisine}`}
									className='hidden'
									value={cuisine}
									onChange={handleCuisineChange}
									checked={isSelected}
								/>
								<Label
									htmlFor={`cuisine_${cuisine}`}
									className={`flex flex-1 rounded-full cursor-pointer px-4 py-2 font-semibold bg-slate-50  items-center text-sm hover:shadow-lg ${
										isSelected
											? 'border border-green-500 text-green-600'
											: 'border border-slate-300'
									}`}>
									{isSelected && (
										<Check size={20} strokeWidth={3} />
									)}
									{cuisine}
								</Label>
							</div>
						);
					})}
				<Button onClick={isExpandedClick} variant='link'>
					{isExpanded ? (
						<span className='flex mt-4 font-semibold flex-1 items-center justify-center'>
							Collapse <ChevronUp />
						</span>
					) : (
						<span className='flex mt-4 font-semibold flex-1 items-center justify-center'>
							Expand <ChevronDown />
						</span>
					)}
				</Button>
			</div>
		</>
	);
};

type Props = {
	onChange: (cuisines: string[]) => void;
	selectedCuisines: string[];
	isExpanded: boolean;
	isExpandedClick: () => void;
};

export default CuisineFilter;

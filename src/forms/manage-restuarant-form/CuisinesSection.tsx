import {
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import CuisineCheckbox from './CuisineCheckbox';

import { cuisineList } from '@/config/restuarant-options-config';
import { useFormContext } from 'react-hook-form';

const CuisinesSection = () => {
	const { control } = useFormContext();
	return (
		<div className='space-y-4'>
			<div>
				<h2 className='text-2xl font-bold'>Cuisines</h2>
				<FormDescription>
					Select the cuisines that your Restuarant serves!
				</FormDescription>
			</div>
			<FormField
				control={control}
				name='cuisines'
				render={({ field }) => (
					<FormItem>
						<div className='grid md:grid-cols-5 gap-1'>
							{cuisineList.map((cuisine, index) => (
								<CuisineCheckbox
									key={index}
									cuisine={cuisine}
									field={field}
								/>
							))}
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default CuisinesSection;

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const DestailSection = () => {
	const { control } = useFormContext();
	return (
		<div className='space-y-4'>
			<div>
				<h2 className='text-2xl font-bold'>Details</h2>
				<FormDescription>
					Enter details about your Restuarant here!
				</FormDescription>
			</div>
			<FormField
				control={control}
				name='restaurantName'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Restuarant Name</FormLabel>
						<FormControl>
							<Input {...field} className='bg-white' />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className='flex flex-col md:flex-row gap-6'>
				<FormField
					control={control}
					name='city'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input {...field} className='bg-white' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name='country'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormLabel>Country</FormLabel>
							<FormControl>
								<Input {...field} className='bg-white' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<div className='flex flex-col md:flex-row gap-6'>
				<FormField
					control={control}
					name='deliveryPrice'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormLabel>Delivery Price ($)</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-white'
									placeholder='1.0'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name='estimatedDeliveryTime'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormLabel>
								Estimated Delivery Time (in minutes)
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-white'
									placeholder='30'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
};

export default DestailSection;

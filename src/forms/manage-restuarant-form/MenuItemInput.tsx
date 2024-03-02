import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

type Props = {
	index: number;
	removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
	const { control } = useFormContext();
	return (
		<div className='flex flex-row gap-2 items-end'>
			<FormField
				control={control}
				name={`menuItems.${index}.name`}
				render={({ field }) => (
					<FormItem>
						<FormLabel className='flex items-center gap-1'>
							Name <FormMessage />
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								className='bg-white'
								placeholder='cheese, pizza'
							/>
						</FormControl>
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name={`menuItems.${index}.price`}
				render={({ field }) => (
					<FormItem>
						<FormLabel className='flex items-center gap-1'>
							Price ($) <FormMessage />
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder='8.00'
								className='bg-white'
							/>
						</FormControl>
					</FormItem>
				)}
			/>
			<Button
				variant='ghost'
				type='button'
				className='bg-transparent max-h-fit'
				onClick={removeMenuItem}>
				<Trash2 className='h-6 w-6 text-red-500' />
			</Button>
		</div>
	);
};

export default MenuItemInput;

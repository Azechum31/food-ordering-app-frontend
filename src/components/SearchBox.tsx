import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect } from 'react';

const formSchema = z.object({
	searchQuery: z.string({
		required_error: 'city is required!',
	}),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
	onSubmit: (formData: SearchForm) => void;
	onReset?: () => void;
	placeHolder: string;
	searchQuery?: string;
};

const SearchBox = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
	const form = useForm<SearchForm>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			searchQuery,
		},
	});

	useEffect(() => {
		form.reset({ searchQuery });
	}, [form, searchQuery]);

	const handleReset = (): void => {
		form.reset({
			searchQuery: '',
		});

		if (onReset) {
			onReset();
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`flex rounded-full border-2 p-2 items-center justify-between ${
					form.formState.errors.searchQuery && 'border-red-500'
				}`}>
				<Search
					strokeWidth={2.5}
					size={30}
					className='ml-2 text-orange-500 hidden md:block'
				/>

				<FormField
					control={form.control}
					name='searchQuery'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormControl>
								<Input
									{...field}
									className='bg-white border-none shadow-none focus-visible:ring-0'
									placeholder={placeHolder}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					variant='outline'
					type='button'
					className='rounded-full'
					onClick={handleReset}>
					Reset
				</Button>
				<Button type='submit' className='bg-orange-500 rounded-full'>
					Search
				</Button>
			</form>
		</Form>
	);
};

export default SearchBox;

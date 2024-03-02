import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DestailSection from './DestailSection';
import { Separator } from '@/components/ui/separator';
import CuisinesSection from './CuisinesSection';
import MenuItemsSection from './MenuItemsSection';
import ImageSection from './ImageSection';
import { Restuarant } from '@/@types';
import { useEffect } from 'react';

const formSchema = z
	.object({
		restuarantName: z.string({
			required_error: 'Restuarant name is required!',
		}),
		city: z.string({
			required_error: 'City is required!',
		}),
		country: z.string({
			required_error: 'Country is required!',
		}),
		deliveryPrice: z.coerce.number({
			required_error: 'Delivery price is required!',
			invalid_type_error: 'Delivery price must be a valid number!',
		}),
		estimatedDeliveryTime: z.coerce.number({
			required_error: 'Estimated delivery time is required!',
			invalid_type_error:
				'Estimated delivery time must be a valid integer!',
		}),
		cuisines: z.array(z.string()).nonempty({
			message: 'Please select at least one item!',
		}),
		menuItems: z.array(
			z.object({
				name: z.string().min(1, 'name is required!'),
				price: z.coerce.number().min(1, 'price is required!'),
			}),
		),
		imageUrl: z.string().optional(),
		imageFile: z
			.instanceof(File, { message: 'image is required!' })
			.optional(),
	})
	.refine((data) => data.imageUrl || data.imageFile, {
		message: 'You must provide an image url or file',
		path: ['imageFile'],
	});

type RestuarantFormData = z.infer<typeof formSchema>;

type Props = {
	restuarant?: Restuarant;
	onSave: (restuarantData: FormData) => void;
	isLoading: boolean;
};
const ManageRestuarantFom = ({ onSave, isLoading, restuarant }: Props) => {
	const form = useForm<RestuarantFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cuisines: [],
			menuItems: [{ name: '', price: 0 }],
		},
	});

	useEffect(() => {
		if (!restuarant) {
			return;
		}

		const deliveryPriceFormated = parseInt(
			(restuarant.deliveryPrice / 100).toFixed(2),
		);

		const menuItemsFormated = restuarant.menuItems.map((item) => ({
			...item,
			price: parseInt((item.price / 100).toFixed(2)),
		}));

		const updatedRestuarant = {
			...restuarant,
			deliveryPrice: deliveryPriceFormated,
			menuItems: menuItemsFormated,
		};

		form.reset(updatedRestuarant as object);
	}, [form, restuarant]);

	const onSubmit = (formDataJSON: RestuarantFormData) => {
		const formData = new FormData();
		formData.append('restuarantName', formDataJSON.restuarantName);
		formData.append('city', formDataJSON.city);
		formData.append('country', formDataJSON.country);
		formData.append(
			'deliveryPrice',
			(formDataJSON.deliveryPrice * 100).toString(),
		);
		formData.append(
			'estimatedDeliveryTime',
			formDataJSON.estimatedDeliveryTime.toString(),
		);
		formDataJSON.cuisines.forEach((cuisine, index) =>
			formData.append(`cuisines[${index}]`, cuisine),
		);
		formDataJSON.menuItems.forEach((menuItem, index) => {
			formData.append(`menuItems[${index}][name]`, menuItem.name);
			formData.append(
				`menuItems[${index}][price]`,
				(menuItem.price * 100).toString(),
			);
		});

		if (formDataJSON.imageFile) {
			formData.append('imageFile', formDataJSON.imageFile);
		}

		onSave(formData);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8 rounded-lg bg-gray-50 md:p-10'>
				<DestailSection />
				<Separator />
				<CuisinesSection />
				<Separator />
				<MenuItemsSection />
				<Separator />
				<ImageSection />
				{isLoading ? (
					<LoadingButton />
				) : (
					<Button type='submit' className='bg-orange-500 font-bold'>
						Create Restuarant
					</Button>
				)}
			</form>
		</Form>
	);
};

export default ManageRestuarantFom;

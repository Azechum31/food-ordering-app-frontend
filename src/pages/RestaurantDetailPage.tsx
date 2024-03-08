import { MenuItem } from '@/@types';
import { useCreateCheckoutSession } from '@/api/OrderAPI';
import { useRestaurantDetail } from '@/api/SearchRestaurant';
import CheckoutButton from '@/components/CheckoutButton';
import MenuItemList from '@/components/MenuItem';
import OrderSummary from '@/components/OrderSummary';
import RestaurantInfo from '@/components/RestaurantInfo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardFooter } from '@/components/ui/card';
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export type CartItem = {
	_id: string;
	name: string;
	price: number;
	quantity: number;
};

const RestaurantDetail = () => {
	const { restaurantId } = useParams();
	const { restaurant, isLoading } = useRestaurantDetail(restaurantId);
	const [cartItems, setCartItems] = useState<CartItem[]>(() => {
		const selectedCartItems = sessionStorage.getItem(
			`cartItems_${restaurantId}`,
		);
		return selectedCartItems ? JSON.parse(selectedCartItems) : [];
	});

	const { createCheckoutSession, isLoading: isCheckoutLoading } =
		useCreateCheckoutSession();

	const addToCart = (menuItem: MenuItem) => {
		setCartItems((prevCartItems: CartItem[]): CartItem[] => {
			const existingCartItem = prevCartItems.find(
				(cartItem) => cartItem._id === menuItem._id,
			);

			let updatedCartItems: CartItem[];

			if (existingCartItem) {
				updatedCartItems = prevCartItems.map((cartItem) =>
					cartItem._id === menuItem._id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem,
				);
			} else {
				updatedCartItems = [
					...prevCartItems,
					{
						_id: menuItem._id,
						name: menuItem.name,
						price: menuItem.price,
						quantity: 1,
					},
				];
			}

			sessionStorage.setItem(
				`cartItems_${restaurantId}`,
				JSON.stringify(updatedCartItems),
			);

			return updatedCartItems;
		});
	};

	const removeFromCart = (cartItemProp: CartItem) => {
		const updatedCartItems = setCartItems((prevCartItems) =>
			prevCartItems.filter((carItem) => carItem._id !== cartItemProp._id),
		);

		sessionStorage.setItem(
			`cartItems_${restaurantId}`,
			JSON.stringify(updatedCartItems),
		);

		return updatedCartItems;
	};

	const onCheckout = async (userFormData: UserFormData) => {
		console.log('userFormData', userFormData);

		if (!restaurant) {
			return;
		}

		const checkoutData = {
			cartItems: cartItems.map((cartItem) => ({
				menuItemId: cartItem._id,
				name: cartItem.name,
				quantity: cartItem.quantity.toString(),
			})),
			restaurantId: restaurant._id,
			deliveryDetails: {
				name: userFormData.name,
				addressLine1: userFormData.addressLine1,
				city: userFormData.city,
				country: userFormData.country,
				phoneNumber: userFormData.phoneNumber,
				email: userFormData.email as string,
			},
		};

		const data = await createCheckoutSession(checkoutData);
		window.location.href = data.url;
	};

	if (isLoading || !restaurant) {
		return <span>Loading....</span>;
	}
	return (
		<div className='flex flex-col gap-10'>
			<AspectRatio ratio={16 / 6}>
				<img
					src={restaurant?.imageUrl}
					alt=''
					className='w-full h-full object-cover rounded-lg'
				/>
			</AspectRatio>
			<div className='grid grid-cols-1 lg:grid-cols-[4fr_2fr] gap-5 lg:px-32'>
				<div className='flex flex-col gap-4'>
					<RestaurantInfo restaurant={restaurant} />
					<span className='text-2xl font-bold tracking-tight px-4'>
						Menu
					</span>
					{restaurant.menuItems.map((menuItem, index) => {
						return (
							<MenuItemList
								key={index}
								menuItem={menuItem}
								addToCart={() => addToCart(menuItem)}
							/>
						);
					})}
				</div>
				<div>
					<Card>
						<OrderSummary
							restaurant={restaurant}
							cartItems={cartItems}
							removeFromCart={removeFromCart}
						/>
						<CardFooter>
							<CheckoutButton
								disabled={cartItems.length === 0}
								onCheckout={onCheckout}
								isLoading={isCheckoutLoading}
							/>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default RestaurantDetail;

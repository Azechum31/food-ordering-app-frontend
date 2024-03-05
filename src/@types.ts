export type User = {
	_id: string;
	name: string;
	addressLine1: string;
	country: string;
	city: string;
	phoneNumber: string;
};

export type MenuItem = {
	_id: string;
	name: string;
	price: number;
};

export type Restaurant = {
	_id: string;
	user: string;
	restaurantName: string;
	city: string;
	country: string;
	deliveryPrice: number;
	estimatedDeliveryTime: number;
	cuisines: string[];
	menuItems: MenuItem[];
	imageUrl: string;
	lastUpdated: string;
};

export type RestaurantsSearchResponse = {
	data: Restaurant[];
	pagination: {
		total: number;
		page: number;
		pages: number;
	};
};

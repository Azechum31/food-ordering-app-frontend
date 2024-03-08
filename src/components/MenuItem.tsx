import { MenuItem } from '@/@types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const MenuItemList = ({ menuItem, addToCart }: Props) => {
	return (
		<Card
			onClick={addToCart}
			className='cursor-pointer bg-slate-50 border-2 border-slate-100'>
			<CardHeader>
				<CardTitle>{menuItem.name}</CardTitle>
			</CardHeader>
			<CardContent className='font-bold'>
				${(menuItem.price / 100).toFixed(2)}
			</CardContent>
		</Card>
	);
};

type Props = {
	menuItem: MenuItem;
	addToCart: () => void;
};

export default MenuItemList;

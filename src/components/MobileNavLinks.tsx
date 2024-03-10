import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useAuth0 } from '@auth0/auth0-react';

const MobileNavLinks = () => {
	const { logout } = useAuth0();
	return (
		<>
			<Link
				to='/order-status'
				className='font-bold hover:text-orange-500'>
				Order Status
			</Link>
			<Link
				to='/manage-restuarant'
				className='font-bold hover:text-orange-500'>
				Manage Restuarant
			</Link>
			<Link
				to='/user-profile'
				className='font-bold hover:text-orange-500'>
				User Profile
			</Link>
			<Separator />
			<Button
				onClick={() => logout()}
				className='flex flex-l items-center bg-gray-500 hover:bg-orange-500 rounded-md font-bold'>
				Log Out
			</Button>
		</>
	);
};

export default MobileNavLinks;

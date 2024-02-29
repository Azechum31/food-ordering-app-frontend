import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

const AuthenticatedUsername = () => {
	const { user, logout } = useAuth0();
	return (
		<div className='flex flex-1'>
			<DropdownMenu>
				<DropdownMenuTrigger className='flex items-center px-3 gap-2 font-bold hover:text-orange-500'>
					<img
						src={user?.picture}
						className='w-[25px] h-[25px] rounded-full object-cover'
					/>
					{`${user?.family_name
						?.charAt(0)
						.toUpperCase()}${user?.family_name?.slice(1)}`}
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>
						<Link to='/user-profile'>User Profile</Link>
					</DropdownMenuItem>
					<Separator />
					<DropdownMenuItem>
						<Button
							onClick={() => logout()}
							className='flex flex-1 font-bold bg-orange-500 rounded-md'>
							Log Out
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default AuthenticatedUsername;

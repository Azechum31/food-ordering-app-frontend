import { Menu } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useAuth0 } from '@auth0/auth0-react';

import MobileNavLinks from './MobileNavLinks';

const MobileNav = () => {
	const { loginWithRedirect, isAuthenticated, user } = useAuth0();
	return (
		<Sheet>
			<SheetTrigger>
				<Menu className='text-orange-500' />
			</SheetTrigger>
			<SheetContent className='space-y-3'>
				<SheetTitle className='font-display'>
					{isAuthenticated ? (
						<span className='flex flex-l items-center gap-2 font-bold'>
							<img
								src={user?.picture}
								className='w-[40px] h-[40px] object-cover rounded-full'
							/>
							<span>
								{user?.family_name?.toLocaleUpperCase()}
							</span>
						</span>
					) : (
						<span>Welcome to MernEats.com</span>
					)}
				</SheetTitle>
				<Separator />
				<SheetDescription className='flex flex-col gap-2'>
					{isAuthenticated ? (
						<MobileNavLinks />
					) : (
						<Button
							className='flex-1 flex h-12 bg-orange-500 font-bold text-xl items-center'
							onClick={async () => await loginWithRedirect()}>
							Login
						</Button>
					)}
				</SheetDescription>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;

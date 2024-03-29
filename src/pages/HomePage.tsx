import landingImage from '../assets/landing.png';
import appDownloads from '../assets/appDownload.png';
import SearchBox, { SearchForm } from '@/components/SearchBox';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();
	const handleSearchBoxSubmit = (searchFormValues: SearchForm) => {
		navigate({
			pathname: `/search/${searchFormValues.searchQuery}`,
		});
	};
	return (
		<div className='flex flex-col gap-12'>
			<div className='md:px-32 flex flex-col gap-5 bg-white text-center -mt-16 rounded-lg shadow-md py-8'>
				<h1 className='font-bold text-5xl text-orange-600 tracking-tight'>
					Tuck into a takeaway today
				</h1>
				<span className='text-xl'>Food is just a click away!</span>
				<SearchBox
					onSubmit={handleSearchBoxSubmit}
					placeHolder='Search by City or Town'
				/>
			</div>
			<div className='grid md:grid-cols-2 gap-5'>
				<img src={landingImage} />
				<div className='flex flex-col items-center justify-center text-center gap-4'>
					<span className='text-3xl font-bold tracking-tighter'>
						Order takeaway even faster!
					</span>
					<span className=''>
						Download the MernEats App for faster ordering and
						personalized recommendations
					</span>
					<img src={appDownloads} />
				</div>
			</div>
		</div>
	);
};

export default HomePage;

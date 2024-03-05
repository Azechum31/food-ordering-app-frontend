import { useSearchRestaurant } from '@/api/SearchRestaurant';
import { Loader2 } from 'lucide-react';
import SearchResults from '@/components/SearchResults';
import { Link, useParams } from 'react-router-dom';
import SearchResultsCard from '@/components/SearchResultsCard';
import SearchBox, { SearchForm } from '@/components/SearchBox';
import { useState } from 'react';
import PaginationSelector from '@/components/PaginationSelector';
import CuisineFilter from '@/components/CuisineFilter';
import SortOptionsDropdown from '@/components/ui/SortOptionsDropdown';

export type SearchState = {
	searchQuery: string;
	page: number;
	selectedCuisines: string[];
	sortOption: string;
};

const SearchPage = () => {
	const { city } = useParams();
	const [searchState, setSearchState] = useState<SearchState>({
		searchQuery: '',
		page: 1,
		selectedCuisines: [],
		sortOption: '',
	});

	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const { searchData, isLoading } = useSearchRestaurant(searchState, city);

	const setSortOptions = (sortOption: string) => {
		setSearchState((prevState) => ({
			...prevState,
			sortOption,
			page: 1,
		}));
	};

	const setSelectedCuisines = (selectedCuisines: string[]) => {
		setSearchState((prevState) => ({
			...prevState,
			selectedCuisines,
			page: 1,
		}));
	};

	const setSearchQuery = (searchFormData: SearchForm) => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: searchFormData.searchQuery,
			page: 1,
		}));
	};

	const resetSearch = () => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: '',
			page: 1,
			selectedCuisines: [],
		}));
	};

	const setPage = (page: number) => {
		setSearchState((prevState) => ({
			...prevState,
			page,
		}));
	};

	if (isLoading) {
		<span className='w-full min-h-screen flex justify-center items-center font-bold text-center'>
			Loading...
			<Loader2
				strokeWidth={2.5}
				size={30}
				className='animate-spin ml-2'
			/>
		</span>;
	}

	if (!searchData?.data || !city) {
		<span>No results found!</span>;
	}

	return (
		<div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
			<div id='cuisines-list'>
				<CuisineFilter
					onChange={setSelectedCuisines}
					selectedCuisines={searchState.selectedCuisines}
					isExpanded={isExpanded}
					isExpandedClick={() =>
						setIsExpanded((prevState) => !prevState)
					}
				/>
			</div>
			<div id='main-content' className='flex flex-col gap-5'>
				<SearchBox
					searchQuery={searchState.searchQuery}
					onSubmit={setSearchQuery}
					placeHolder='Search by Cuisine or Restaurant name'
					onReset={resetSearch}
				/>
				<div className='flex flex-col lg:flex-row items-center justify-between gap-3'>
					<SearchResults
						total={searchData?.pagination.total as number}
						city={city as string}
					/>
					<SortOptionsDropdown
						onChange={(value) => setSortOptions(value)}
						sortOption={searchState.sortOption}
					/>
				</div>
				{searchData?.data.map((item) => (
					<Link
						to={`/detial/${item._id}`}
						key={item._id}
						className='mb-5 bg-gray-50 lg:p-6 rounded-lg group'>
						<SearchResultsCard restaurant={item} />
					</Link>
				))}

				<PaginationSelector
					page={searchData?.pagination.page as number}
					pages={searchData?.pagination.pages as number}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
};

export default SearchPage;

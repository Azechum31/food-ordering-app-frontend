import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination';

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
	const pageNumbers = [];

	for (let i = 1; i <= pages; i++) {
		pageNumbers.push(i);
	}

	return (
		<Pagination>
			<PaginationContent>
				{page !== pageNumbers[0] && (
					<PaginationItem>
						<PaginationPrevious
							href='#'
							onClick={() => onPageChange(page - 1)}
						/>
					</PaginationItem>
				)}
				{pageNumbers.map((number, index) => {
					return (
						<PaginationItem key={index}>
							<PaginationLink
								href='#'
								onClick={() => onPageChange(number)}
								isActive={page === number}>
								{number}
							</PaginationLink>
						</PaginationItem>
					);
				})}
				{page !== pageNumbers.length && (
					<PaginationItem>
						<PaginationNext
							href='#'
							onClick={() => onPageChange(page + 1)}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

type Props = {
	page: number;
	pages: number;
	onPageChange: (pageNumber: number) => void;
};

export default PaginationSelector;

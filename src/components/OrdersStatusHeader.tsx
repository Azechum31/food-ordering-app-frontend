import { Order } from '@/@types';
import { Progress } from './ui/progress';
import { ORDER_STATUS } from '@/config/order-status-config';

const OrdersStatusHeader = ({ order }: Props) => {
	const getDeliveryTime = () => {
		const created = new Date(order.createdAt);
		created.setMinutes(
			created.getMinutes() + order.restaurant.estimatedDeliveryTime,
		);

		const hours = created.getHours();
		const minutes = created.getMinutes();
		const PaddedTime = minutes < 10 ? `0${minutes}` : minutes;

		return `${hours}:${PaddedTime}`;
	};

	const getOrderStatusInfo = () => {
		return (
			ORDER_STATUS.find((status) => status.value === order.status) ||
			ORDER_STATUS[0]
		);
	};
	return (
		<>
			<h1 className='text-2xl font-semibold tracking-tighter flex flex-col md:flex-row md:justify-between'>
				<span>Order Status: {getOrderStatusInfo()?.label}</span>
				<span>Expected By: {getDeliveryTime()}</span>
			</h1>
			<Progress
				value={getOrderStatusInfo()?.progressValue}
				className={`animate-pulse ${
					getOrderStatusInfo()?.value === 'delivered'
						? 'bg-green-500'
						: 'bg-red-500'
				} `}
			/>
		</>
	);
};

type Props = {
	order: Order;
};

export default OrdersStatusHeader;

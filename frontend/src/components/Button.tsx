import './css/button.css';

interface ButtonInterface {
	className: string;
	value: number | string;
	onClick: any;
}

const Button = ({ className, value, onClick }: ButtonInterface) => {
	return (
		<button className={className} onClick={onClick}>
			{value}
		</button>
	);
};

export default Button;

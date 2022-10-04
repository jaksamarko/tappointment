import { Textfit } from 'react-textfit';
import './css/screen.css';

interface ScreenInterface {
	value: number | string;
}

const Screen = ({ value }: ScreenInterface) => {
	return (
		<Textfit className="screen" mode="single" max={70}>
			{value}
		</Textfit>
	);
};

export default Screen;

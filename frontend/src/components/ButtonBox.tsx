import './css/buttonBox.css';

interface ButtonBoxInterface {
	children: JSX.Element[];
}

const ButtonBox = ({ children }: ButtonBoxInterface) => {
	return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;

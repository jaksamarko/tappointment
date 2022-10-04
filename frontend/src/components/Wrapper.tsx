import './css/wrapper.css';

interface WrapperInterface {
	children: JSX.Element[];
}

const Wrapper = ({ children }: WrapperInterface) => {
	return <div className="wrapper">{children}</div>;
};

export default Wrapper;

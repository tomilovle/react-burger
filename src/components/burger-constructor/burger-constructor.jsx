import stylesConstuctor from './burger-costructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.json';

const BurgerConstructor = () => {
    return (
        <div className={stylesConstuctor.burgerConstructor}>
            {data.map((item) => {
                let type;
                switch (item) {
                    case data[0]:
                        type = 'top';
                        break;

                    case data[data.length - 1]:
                        type = 'bottom';
                        break;

                    default:
                        type = '';
                        break;
                }
                return (
                    <ConstructorElement
                        type={type}
                        isLocked={true}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                        key={item.id}
                    />
                );
            })}
        </div>
    );
};
export default BurgerConstructor;

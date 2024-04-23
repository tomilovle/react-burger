import styles from './app-header.module.css';
import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.links}>
                <nav className={styles.item}>
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default pl-2">
                        Конструктор
                    </p>
                </nav>
                <nav className={styles.item}>
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive pl-2">
                        Лента заказов
                    </p>
                </nav>
            </div>
            <a href="/" className={styles.logo}>
                <Logo />
            </a>
            <div className={styles.item}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive pl-2">
                    Личный кабинет
                </p>
            </div>
        </header>
    );
};

export default AppHeader;

import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <main className={styles.container}>
        <p className="text text_type_main-large mt-40">Соберите бургер</p>
        <div className={styles.row}>
          <div className={styles["col-6"]}>
            <BurgerIngredients />
          </div>
          <div className={styles["col-6"]}>
            <BurgerConstructor />
          </div>
        </div>
      </main>
    </DndProvider>
  );
}

export default App;

/// <reference types="cypress" />

describe("Burger Constructor Page", () => {
  beforeEach(() => {
    // Открываем страницу конструктора

    cy.visit("http://localhost:3000/");
    cy.viewport(1920, 1080);
  });

  it("should drag and drop an ingredient to the constructor", () => {
    // Проверяем, что ингредиенты загружены
    cy.get("[data-cy=ingredient-item]").should("have.length.greaterThan", 0);

    // Перетаскиваем первый ингредиент в конструктор
    cy.get("[data-cy=ingredient-item]").first().trigger("dragstart");
    cy.get("[data-cy=constructor-drop-area]").trigger("drop");

    // Проверяем, что ингредиент добавлен в конструктор
    cy.get("[data-cy=constructor-item]").should("have.length.greaterThan", 0);
  });

  it("should open ingredient details modal on ingredient click", () => {
    // Перетаскиваем ингредиент в конструктор
    cy.get("[data-cy=ingredient-item]").first().trigger("dragstart");
    cy.get("[data-cy=constructor-drop-area]").trigger("drop");

    // Открываем модальное окно с описанием ингредиента
    cy.get("[data-cy=ingredient-item]").first().click();

    // Проверяем, что модальное окно открыто
    cy.get("[data-cy=ingredient-modal]").should("be.visible");

    // Проверяем отображение данных ингредиента в модальном окне
    cy.get("[data-cy=ingredient-name]").should("exist");
    cy.get("[data-cy=ingredient-description]").should("exist");
  });

  it('should open order details modal on "Place Order" button click', () => {
    // Перетаскиваем булку в конструктор
    cy.get("[data-cy=ingredient-item]").contains("булка").trigger("dragstart");
    cy.get("[data-cy=constructor-drop-area]").trigger("drop");

    // Перетаскиваем еще один ингредиент
    cy.get("[data-cy=ingredient-item]")
      .not(':contains("булка")')
      .first()
      .trigger("dragstart");
    cy.get("[data-cy=constructor-drop-area]").trigger("drop");

    // Нажимаем кнопку "Оформить заказ"
    cy.get("button").contains("Оформить заказ").click();

    // Проверяем, что модальное окно с деталями заказа открыто
    cy.get("[data-cy=order-modal]").should("be.visible");
    cy.get("[data-cy=order-modal-close]").click();
    cy.get("[data-cy=order-modal]").should("not.exist");
  });
});

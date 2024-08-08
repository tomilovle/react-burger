import reducer, { initialState, removeOrder, createOrder } from "./orderSlice";

describe("orderSlice", () => {
  describe("reducers", () => {
    it("должен вернуть начальное состояние", () => {
      expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("должен обработать removeOrder", () => {
      const previousState = {
        ...initialState,
        order: { name: "Test Order", order: { number: 123 } },
      };
      expect(reducer(previousState, removeOrder())).toEqual(initialState);
    });
  });

  describe("extraReducers", () => {
    it("должен обработать createOrder.pending", () => {
      const action = { type: createOrder.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: "loading",
      });
    });

    it("должен обработать createOrder.fulfilled", () => {
      const actionPayload = {
        name: "Test Order",
        order: { number: 123 },
      };
      const action = {
        type: createOrder.fulfilled.type,
        payload: actionPayload,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: "success",
        order: actionPayload,
        name: actionPayload.name,
        number: actionPayload.order.number,
      });
    });

    it("должен обработать createOrder.rejected", () => {
      const action = {
        type: createOrder.rejected.type,
        error: { message: "Error" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: "error",
        error: "Error",
      });
    });
  });
});

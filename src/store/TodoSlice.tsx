import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
interface DoneTodoPayload {
  id: string;
}
const todoSlice = createSlice({
  name: "Todo",
  initialState: [
    {
      id: uuidv4(),
      text: "learn react",
      done: false,
      date: new Date().toLocaleDateString(),
    },
  ],
  reducers: {
    addTodo(state, action) {
      state.push({
        id: uuidv4(),
        text: action.payload.text,
        done: false,
        date: new Date().toLocaleDateString(),
      });
    },

    doneTodo(state, action: PayloadAction<DoneTodoPayload>) {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    editTodo(state, action) {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});
export const { addTodo, doneTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;

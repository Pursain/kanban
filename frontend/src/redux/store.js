import { createStore } from "redux";
import uuid from "uuid";
import { find2dCoord, filter2d_shallowCopy, insert2d } from "../functions";

const initalState = {
  count: 0,
  notecardsMap: notecardGenerator(),
  notecardsOrder: null
};

function notecardGenerator() {
  let res = new Map();
  for (let i = 0; i < 10; i++) {
    let unique = uuid.v4();
    res.set(unique, {
      id: unique,
      categoryId: i % 4,
      title: `NoteCard #${i}`,
      desc: `lorem${i} ipsum${i} solem${i} ${unique}`,
      estimate: `${i}0 min`
    });
  }
  return res;
}

function notecardRandomOrder(notecardsMap) {
  let res = [[], [], [], []];
  for (const [key, value] of notecardsMap.entries()) {
    res[value.categoryId].push(key);
  }
  return res;
}

initalState.notecardsOrder = notecardRandomOrder(initalState.notecardsMap);

function reducer(state = initalState, action) {
  console.log("reducer", state, action);
  let newNotecardsMap = null;
  let newNotecardsOrder = null;
  let newNotecard = null;

  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      };
    case "NOTECARD_MOVE":
      //find position
      let [col, row] = find2dCoord(
        state.notecardsOrder,
        element => element === action.id
      );

      //move position
      console.log(action.direction);
      switch (action.direction) {
        case "LEFT":
          col -= 1;
          break;
        case "RIGHT":
          col += 1;
          break;
        case "UP":
          row -= 1;
          break;
        case "DOWN":
          row += 1;
          break;
        default:
          console.log("notecard move direction not specified");
          return state;
      }

      //bound check
      if (
        col === -1 ||
        col === state.notecardsOrder.length ||
        row === -1 ||
        (row >= state.notecardsOrder[col].length &&
          action.direction !== "RIGHT" &&
          action.direction !== "LEFT")
      ) {
        console.log("notecard move out of bounds");
        return state;
      }

      //remove old from order
      newNotecardsOrder = filter2d_shallowCopy(
        state.notecardsOrder,
        element => element === action.id
      );

      //insert new into order
      newNotecardsOrder = insert2d(newNotecardsOrder, action.id, col, row);

      //new notecardsMap
      newNotecardsMap = new Map(state.notecardsMap);
      newNotecardsMap.get(action.id).categoryId = col;

      return {
        ...state,
        notecardsOrder: newNotecardsOrder,
        notecardsMap: newNotecardsMap
      };
    case "NOTECARD_MODIFY":
      //new notecard
      newNotecard = {
        id: action.id,
        categoryId: action.categoryId,
        title: action.title,
        desc: action.desc,
        estimate: action.estimate
      };

      //new notecardsMap
      newNotecardsMap = new Map(state.notecardsMap);
      newNotecardsMap.set(action.id, newNotecard);
      return {
        ...state,
        notecardsMap: newNotecardsMap
      };
    case "NOTECARD_ADD":
      //new notecard
      newNotecard = {
        id: action.id,
        categoryId: action.categoryId,
        title: action.title,
        desc: action.desc,
        estimate: action.estimate
      };

      //add to notecardsMap
      newNotecardsMap = new Map(state.notecardsMap);
      newNotecardsMap.set(action.id, newNotecard);

      //insert new into order
      newNotecardsOrder = insert2d(
        state.notecardsOrder,
        action.id,
        action.categoryId,
        0
      );

      return {
        ...state,
        notecardsOrder: newNotecardsOrder,
        notecardsMap: newNotecardsMap
      };
    case "NOTECARD_DELETE":
      //remove old from order
      newNotecardsOrder = filter2d_shallowCopy(
        state.notecardsOrder,
        element => element === action.id
      );

      //new notecardsMap
      newNotecardsMap = new Map(state.notecardsMap);
      newNotecardsMap.delete(action.id);

      return {
        ...state,
        notecardsOrder: newNotecardsOrder,
        notecardsMap: newNotecardsMap
      };
    default:
      return state;
  }
}

export default createStore(reducer);

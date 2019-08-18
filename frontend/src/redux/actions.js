export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const MOVE_UP = "UP";
export const MOVE_DOWN = "DOWN";
export const MOVE_LEFT = "LEFT";
export const MOVE_RIGHT = "RIGHT";

export function increment() {
  return { type: INCREMENT };
}

export function decrement() {
  return { type: DECREMENT };
}

export const moveNotecard = (id, direction) => ({
  type: "NOTECARD_MOVE",
  id,
  direction
});

export const addNotecard = (id, categoryId, title, desc, estimate) => ({
  type: "NOTECARD_ADD",
  id,
  categoryId,
  title,
  desc,
  estimate
});

export const modifyNotecard = (id, title, desc, estimate) => ({
  type: "NOTECARD_MODIFY",
  id,
  title,
  desc,
  estimate
});

export const deleteNotecard = id => ({
  type: "NOTECARD_DELETE",
  id
});

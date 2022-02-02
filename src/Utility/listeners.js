export const addDropListener = (ref, callback) => {
  ref.current.addEventListener("drop", (event) => {
    event.preventDefault();
    callback(ref);
  });

  return () => {
    ref.current.removeEventListener("drop");
  };
};

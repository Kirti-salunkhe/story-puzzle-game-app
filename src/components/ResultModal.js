import React from "react";
import { forwardRef } from "react";
const ResultModal = forwardRef(({ result, OnClose }, ref) => {
  return (
    <>
      <dialog className="modal" ref={ref}>
        {result()
          ? "You win! congratulation!"
          : "You Lost! better luck next time"}
        <form method="dialog">
          <button className="dialog-button" onClick={OnClose}>
            Close
          </button>
        </form>
      </dialog>
    </>
  );
});

export default ResultModal;

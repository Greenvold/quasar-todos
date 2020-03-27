export const selectAll = {
  //inserted hook triggered when the component is first hooked in DOM
  inserted(el) {
    //found class name from inspector
    let input = el.querySelector(".q-field__native");
    input.addEventListener("focus", () => {
      if (input.value.length) {
        input.select();
      }
    });
  }
};

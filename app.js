const input = document.querySelector("#input");
const button = document.querySelector("#button");
const result = document.querySelector("#result");

let isDragging = false;

button.addEventListener("click", () => {
  result.innerHTML = "";
  const value = input.value;
  value.split("").forEach((character) => {
    const el = document.createElement("div");
    el.innerText = character;
    el.classList.add("char");
    el.ondragstart = function () {
      return false;
    };
    el.addEventListener('click', dragAndDrop);
    result.append(el);
  });
});

function dragAndDrop (event) {
  let shiftX, shiftY, dragElement = event.target;

  if (!dragElement) return;

  event.preventDefault();

  dragElement.ondragstart = function () {
    return false;
  };

  startDrag(dragElement, event.clientX, event.clientY);

  function secondClick(event) {
    finishDrag();
  }

  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

  function startDrag(element, clientX, clientY) {
    if (isDragging) {
      return;
    }

    isDragging = true;

    document.addEventListener("mousemove", onMouseMove);
    element.addEventListener("click", secondClick);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = "fixed";

    moveAt(clientX, clientY);
  }

  function finishDrag() {
    if (!isDragging) {
      return;
    }

    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + scrollY + "px";
    dragElement.style.position = "absolute";

    document.removeEventListener("mousemove", onMouseMove);
    dragElement.removeEventListener("click", secondClick);
    dragElement.removeEventListener("click", dragAndDrop);

    dragElement.addEventListener('click', dragAndDrop);
  }

  function moveAt(clientX, clientY) {
    
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    let newBottom = newY + dragElement.offsetHeight;

    if (newBottom > document.documentElement.clientHeight) {
      let docBottom = document.documentElement.getBoundingClientRect().bottom;
      let scrollY = Math.min(docBottom - newBottom, 10);

      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);
      newY = Math.min(
        newY,
        document.documentElement.clientHeight - dragElement.offsetHeight
      );
    }

    if (newY < 0) {

      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, -scrollY);
      newY = Math.max(newY, 0);
    }

    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }

    dragElement.style.left = newX + "px";
    dragElement.style.top = newY + "px";
  }
};

const one = document.querySelector("#one");
const two = document.querySelector("#two");
let coordX, coordY, pageX, pageY;

one.draggable = true;
two.draggable = true;

one.addEventListener("dragstart", dragStart);
two.addEventListener("dragstart", dragStart);

one.addEventListener("dragend", dragEnd);
two.addEventListener("dragend", dragEnd);

one.addEventListener("dragover", dragOver);
two.addEventListener("dragover", dragOver);

one.addEventListener("drop", drop);
two.addEventListener("drop", drop);

function dragStart(e) {
  coordY = e.offsetY;
  coordX = e.offsetX;
  pageX = e.target.getBoundingClientRect().left;
  pageY = e.target.getBoundingClientRect().top;
}
function dragEnd(e) {
  const { target } = e;
  target.style.position = "absolute";
  target.style.top = e.pageY - coordY + "px";
  target.style.left = e.pageX - coordY + "px";
}
function dragOver(e) {
  e.preventDefault();
}
function drop(e) {
  e.preventDefault();
  const { target } = e;
  target.removeEventListener("dragstart", dragStart);
  target.removeEventListener("dragend", dragEnd);
  [target.style.top, target.style.left] = [(pageY + 'px'), (pageX + 'px')];
  target.addEventListener("dragstart", dragStart);
  target.addEventListener("dragend", dragEnd);
}
//----------------------------------------------------------------------------------
const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const content = document.querySelector("#string");

btn.addEventListener("click", () => {
  content.innerHTML = '';
  const text = input.value.split('');
  text.forEach((char) => {
    const div = document.createElement("div");
    div.innerText = char;
    div.classList.add("char");
    div.draggable = true;
    div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragend", dragEnd);
    div.addEventListener("dragover", dragOver);
    div.addEventListener("drop", drop);
    content.append(div);
  });
  input.value = "";
});

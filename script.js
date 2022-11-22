const addButton = document.querySelector("#add");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = []; 
  // console.log(textAreaData);
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });
//   console.log(notes);      
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNode = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
 <div class="operation">
<button class="edit"><i class="fas fa-edit"> </i></button>
<button class="delete"><i class="fas fa-trash-alt"> </i></button>
</div>
<div class="main ${text ? "" : "hidden"}"></div> 
<textarea class=" ${text ? "hidden" : ""}"></textarea> `;

  note.insertAdjacentHTML("afterbegin", htmlData);
  // console.log(note);

  //////////// getting the referance
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  // deleting the Note
  delButton.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  // toggle using edit button
  textarea.value = text;
  mainDiv.innerHTML = text;

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");   //is line ka matlab hai ki edit click krne k bad hidden wala show hoga or show wala hidden
    textarea.classList.toggle("hidden");  //toggle mtlab on nito off 
  });

  textarea.addEventListener("change", (event) => {  // js me input value ko get krne k liye
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLSData();
  });

  document.body.appendChild(note);
  // it appeds a node as the last child of a node
};

// getting data back from localstorage
const notes = JSON.parse(localStorage.getItem("notes"));  // string json ko js object me convert karta h 
if (notes) {
  notes.forEach((note) => addNewNode(note));
}

addButton.addEventListener("click", () => {
  addNewNode();
});

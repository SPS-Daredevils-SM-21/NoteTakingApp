function LoadEditNoteForm() {
  let firstDiv = document.getElementById("FirstDiv");

  let formElement = document.createElement("form");
  formElement.action = "/Edit";
  formElement.method = "POST";

  let nameLabel = document.createElement("label");
  nameLabel.for = "Name";
  nameLabel.innerHTML = "Note's name:";

  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "Name";
  nameInput.id = "NoteName";
  nameInput.value = sessionStorage.getItem("Title");
  nameInput.required = true;

  let textLabel = document.createElement("label");
  textLabel.for = "Text";
  textLabel.innerHTML = "Note:";

  let noteText = document.createElement("textarea");
  noteText.name = "Text";
  noteText.id = "NoteText";
  noteText.required = true;
  noteText.value = sessionStorage.getItem("Text"); 

  let rightSpanButton = document.createElement("span");
  rightSpanButton.classList.add("MoveRight");

  let submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.id = "SubmitNote";
  submitButton.innerHTML = "Update Note";

  let id = document.createElement("input");
  id.type = "hidden";
  id.name = "id";
  id.value = sessionStorage.getItem("NoteID");
  
  let owner = document.createElement("input");
  owner.type = "hidden";
  owner.name = "owner";
  owner.value = sessionStorage.getItem("Owner");

  rightSpanButton.appendChild(submitButton);

  formElement.appendChild(nameLabel);
  formElement.appendChild(nameInput);
  formElement.appendChild(textLabel);
  formElement.appendChild(noteText);
  formElement.appendChild(rightSpanButton);
  formElement.appendChild(id);
  formElement.appendChild(owner);

  firstDiv.appendChild(formElement);
}

LoadEditNoteForm();

function ExitFeedBack() {
  if( confirm("You are about to exit, your note won't be saved") ){
    document.location.href = "Notes.html";
  }
}
function LoadNewNoteForm() {
  let firstDiv = document.getElementById("FirstDiv");

  let formElement = document.createElement("form");
  formElement.action = "/Create";
  formElement.method = "POST";

  let nameLabel = document.createElement("label");
  nameLabel.for = "Name";
  nameLabel.innerHTML = "Note's name:";

  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "Name";
  nameInput.id = "NoteName";
  nameInput.placeholder = "Enter Note Name";
  nameInput.required = true;

  let textLabel = document.createElement("label");
  textLabel.for = "Text";
  textLabel.innerHTML = "Note:";

  let noteText = document.createElement("textarea");
  noteText.name = "Text";
  noteText.id = "NoteText";
  noteText.required = true;

  let rightSpanButton = document.createElement("span");
  rightSpanButton.classList.add("MoveRight");

  let submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.id = "SubmitNote";
  submitButton.innerHTML = "Create Note";

  rightSpanButton.appendChild(submitButton);

  formElement.appendChild(nameLabel);
  formElement.appendChild(nameInput);
  formElement.appendChild(textLabel);
  formElement.appendChild(noteText);
  formElement.appendChild(rightSpanButton);

  firstDiv.appendChild(formElement);
}

LoadNewNoteForm();

function ExitFeedBack() {
  if( confirm("You are about to exit, your note won't be saved") ){
    document.location.href = "Notes.html";
  }
}

const MESSAGE_PLACEHOLDER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const EXPAND_CASE_ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"bi bi-fullscreen\" viewBox=\"0 0 16 16\"><path d=\"M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z\"/></svg>";

function createNoteElement(noteId){
    let sectionElement = document.createElement("section");
    sectionElement.classList.add("note"); //era case
    sectionElement.id = noteId;

    let expandElement = document.createElement("div");
    expandElement.classList.add("ExpandCase");
    expandElement.innerHTML = EXPAND_CASE_ICON;

    let contentElement = getNoteInfo(); //randomCase

    sectionElement.appendChild(contentElement);
    sectionElement.appendChild(expandElement);

    return sectionElement;
}

function getNoteInfo(){
    let noteDiv = document.createElement("div");

    let nameElement = document.createElement("p");
    nameElement.classList.add("Atribute");
    nameElement.innerHTML = "<span>Name: </span> NOTE NAME";

    let textElement = document.createElement("p");
    textElement.classList.add("Atribute");
    textElement.classList.add("Message");
    textElement.innerHTML = "<span>Text: </span>" + MESSAGE_PLACEHOLDER;

    noteDiv.appendChild(nameElement);
    noteDiv.appendChild(textElement);

    return noteDiv;
}

function placeNotes(){
    var articleElement = document.getElementById("Notes");
    articleElement.classList.add("FlexCenter");
    var cases = Math.floor(Math.random() * 10);
    for (let i = 0; i < cases; ++i) {
        articleElement.appendChild( createNoteElement("case"+i.toString()) );
    }
}

placeNotes();
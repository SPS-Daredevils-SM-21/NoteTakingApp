const MESSAGE_PLACEHOLDER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const EXPAND_CASE_ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"bi bi-fullscreen\" viewBox=\"0 0 16 16\"><path d=\"M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z\"/></svg>";

const TRASH_ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg>";

function createNoteElement(note){
    let sectionElement = document.createElement("section");
    sectionElement.classList.add("note"); 
    sectionElement.id = note.id;

    let expandElement = document.createElement("div");
    expandElement.classList.add("ExpandCase");
    expandElement.innerHTML = EXPAND_CASE_ICON;

    let deleteElement = document.createElement("button");
    deleteElement.classList.add("DeleteNote");
    let trashSVG = document.createElement("div");
    trashSVG.innerHTML = TRASH_ICON;
    deleteElement.addEventListener("click", () => {
        deleteNote(note);
    });
    deleteElement.appendChild(trashSVG);

    let contentElement = getNoteInfo(note); 

    sectionElement.appendChild(contentElement);
    sectionElement.appendChild(expandElement);
    sectionElement.appendChild(deleteElement);

    return sectionElement;
}

function getNoteInfo(note){
    let noteDiv = document.createElement("div");

    let nameElement = document.createElement("p");
    nameElement.classList.add("Atribute");
    nameElement.innerHTML = "<span>Name: </span>" + note.title;

    let textElement = document.createElement("p");
    textElement.classList.add("Atribute");
    textElement.classList.add("Message");
    textElement.innerHTML = "<span>Text: </span>" + note.text;

    let dateElement = document.createElement("p");
    dateElement.classList.add("Atribute");
    dateElement.innerHTML = "<span>Date: </span>" + new Date(note.timeStamp).toLocaleString();
    //console.log(Intl.DateTimeFormat().);

    noteDiv.appendChild(nameElement);
    noteDiv.appendChild(textElement);
    noteDiv.appendChild(dateElement);

    return noteDiv;
}

function placeNotes(){
    fetch('/list-notes').then(response => response.json()).then((notes) => {
        var articleElement = document.getElementById("Notes");
        articleElement.classList.add("FlexCenter");
        notes.forEach((note) => {
            articleElement.appendChild(createNoteElement(note));
        })
    });
}

function deleteNote(note) {
    if(confirm("This note will be erased forever, Are you sure? \n(This action cant' be undone)")){
        const params = new URLSearchParams();
        params.append('id', note.id);
        params.append('owner', note.userId);
        fetch('/delete-note', {method: 'POST', body: params}).then((response) => {
            location.reload();
        });
    }
    
}

placeNotes();
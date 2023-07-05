//creates variables that hold query selectors 
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

//IF the pathname is equal to /notes create these elements 
//had incorrect path
if (window.location.pathname === '/notes.html') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group'); 
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
//activeNote is an empty object here
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

//this is where the note is saved. 
//fetches post from the rest api
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

//this is where the note is deleted
//fetches DELETE from the rest api
const deleteNote = (id) =>
//by default it returns a promise..
//nothing is returned
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

//render the Note that is clicked on?
const renderActiveNote = () => {
  //hide the save note btn
  hide(saveNoteBtn);

  //if activeNote.id is truthy
  if (activeNote.id) {
    //set the note title and text attribute's to readonly
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    //set the values of the right column to the Note that was clicked. 
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  }
  else {
    //remove the readonly attribute to allow a new note to be entered 
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    //set the text input fields to be empty
    noteTitle.value = '';
    noteText.value = '';
  }
};


const handleNoteSave = () => {
  //object containing title and text
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  //save Note with the new Note as the parameter, then render note, render activeNote
  saveNote(newNote).then(() => {
    console.log('inside saveNote')
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
// e is event
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  //note is equal to the delete button clicked
  const note = e.target;
  //noteID is equal to the ID of the parent element
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  //if the id's are equal, set the active note to be empty
  if (activeNote.id === noteId) {
    activeNote = {};
  }
  console.log('before then')
  //run deleteNote function then run needed functions to re-render 
  deleteNote(noteId).then(() => {
    console.log('inside then')
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};


// Sets the activeNote to an empty object calls renderActiveNote function
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();

  //had incorrect path
  if (window.location.pathname === '/notes.html') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  //had incorrect path
  if (window.location.pathname === '/notes.html') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

//had incorrect path
if (window.location.pathname === '/notes.html') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
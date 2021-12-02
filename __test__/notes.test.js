const fs = require('fs');
const { filterByQuery, findById, createNewNote, validateNote } = require('../lib/notes.js');
const notes = require('../db/db');

jest.mock('fs');

test('creates an note object', () => {
  const note = createNewNote({ name: 'Darlene', id: 'jhgdja3ng2' }, notes);

  expect(note.name).toBe('Darlene');
  expect(note.id).toBe('jhgdja3ng2');
});

test('filters by query', () => {
  const startingNotes = [
    {
      id: '3',
      name: 'Erica',
      species: 'gorilla',
      diet: 'omnivore',
      personalityTraits: ['quirky', 'rash']
    },
    {
      id: '4',
      name: 'Noel',
      species: 'bear',
      diet: 'carnivore',
      personalityTraits: ['impish', 'sassy', 'brave']
    }
  ];

  const updatedNotes = filterByQuery({ species: 'gorilla' }, startingNotes);

  expect(updatedNotes.length).toEqual(1);
});

test('finds by id', () => {
  const startingNotes = [
    {
      id: '3',
      name: 'Erica',
      species: 'gorilla',
      diet: 'omnivore',
      personalityTraits: ['quirky', 'rash']
    },
    {
      id: '4',
      name: 'Noel',
      species: 'bear',
      diet: 'carnivore',
      personalityTraits: ['impish', 'sassy', 'brave']
    }
  ];

  const result = findById('3', startingNotes);

  expect(result.name).toBe('Erica');
});

test('validates personality traits', () => {
  const note = {
    id: '3',
    name: 'Erica',
    species: 'gorilla',
    diet: 'omnivore',
    personalityTraits: ['quirky', 'rash']
  };

  const invalidNote = {
    id: '3',
    name: 'Erica',
    species: 'gorilla',
    diet: 'omnivore'
  };

  const result = validateNote(note);
  const result2 = validateNote(invalidNote);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});

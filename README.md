# Notes Application

## Table of Contents
1. [Objective](#objective)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Dependencies](#dependencies)
6. [Usage](#usage)

## Objective
The primary objective of this project is to create a Notes Application that allows users to take very simple notes using Browser Storage. This application aims to provide an efficient and user-friendly way to manage daily notes.

## Features
The application includes the following functionalities:
1. **Add Notes**: Users can add notes with a title.
2. **View Notes**: Users can view the list of all notes.
3. **Edit Notes**: Users can edit existing notes.
4. **Delete Notes**: Users can delete notes that are no longer needed.
5. **Browser Storage**: All the notes are stored in Browser's Local Storage.

Additionally, the application supports the following features:
- **Encryption**: Encrypt notes before storing them in the browser storage.
- **Save as PDF**: Save notes as PDF files.
- **Insert Images**: Insert images into notes.
- **Search Notes**: Search through notes.

## Technologies
This project is built using the Angular framework.

## Installation
To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Christovao/cocus-code-challenge.git

2. **Navigate to the project directory**
   ```bash
   cd cocus-code-challenge

3. **Install dependencies**
   ```bash
   npm install

4. **Run the application**
   The server will run on http://localhost:4200
   ```bash
   ng serve

## Dependencies
These are the dependencies used in the Notes Application:

- **Angular CLI**: Command-line interface for Angular development.
- **Angular Material**: UI component library for Angular applications (optional, for enhanced UI features).
- **CryptoJS**: Library used for encryption and decryption of notes.
- **jsPDF**: Library for generating PDF documents from HTML content.

These dependencies are essential for the functionality and user interface enhancements of the application. Make sure they are installed and configured correctly to run the Notes Application smoothly.

## Usage
To effectively use the Notes Application, follow these steps:

1. **Add Note**:
   - Click on the 'Create new note' button.
   - Enter the title and content of your note in the provided fields.
   - Click 'Save note' to add the note.

2. **Edit Note**:
   - While viewing a note, click the 'Edit' button.
   - Modify the title or content as needed.
   - Click 'Save note' to update the note.

3. **Delete Note**:
   - While viewing a note, click the 'Delete' button to remove the note from your list.

4. **Browser Storage**:
   - All the notes are stored in the Browser's Local Storage.
   - Notes are saved in an encrypted format to ensure data security.
   - This ensures that your notes are saved locally on your device in a secure manner.
   - Notes persist even after closing the browser or refreshing the page.

5. **Save as PDF**:
   - While viewing a note, click the 'Save as PDF' button.
   - This action downloads the note as a PDF file to your device.

6. **Insert Images**:
   - When adding or editing a note, use the image upload option to insert images into your notes.

7. **Search Notes**:
   - Utilize the search bar to quickly find specific notes by title or content keywords.

Following these steps will help you efficiently manage your notes using the Notes Application. Enjoy organizing your thoughts and ideas!

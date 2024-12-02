# To-Do App

## Overview

This is a simple yet feature-rich **To-Do App** built with HTML, CSS, JavaScript, and TypeScript. The app allows users to manage their daily tasks by adding, marking as completed, and deleting tasks. The app features smooth animations, local storage support, and a clean, responsive design.

---

## Screenshots

### Image 1

![Empty Todo List](screenshots/image-1.jpeg)

### Image 2

![Dark mode](screenshots/image-2.jpeg)

### Image 3

![Todos](screenshots/image-3.jpeg)

---

## Features

- **Add New Todo**: Easily add new tasks to the list.
- **Delete Todo**: Remove tasks with a fade-out animation.
- **Mark as Completed**: Toggle a task's completion status with a custom checkbox.
- **Persistence with Local Storage**: Todos are saved to the browser's local storage, so your tasks persist even after refreshing the page.
- **Responsive Layout**: Optimized for both desktop and mobile devices.
- **Smooth Animations**: Tasks fade in when added, and fade out when deleted.
- **Drag-and-Drop Reordering**: Rearrange your tasks with drag-and-drop functionality.
- **Placeholder Message**: Shows a placeholder when no tasks are present.
- **Clear Completed**: Easily clear all completed tasks with one click.
- **Light/Dark Theme Toggle**: Switch between light and dark modes for better visibility depending on the time of day or user preference.

---

## How It Works

### Adding Todos

- The user can add a new todo item by typing into the input box and hitting enter.
- Each todo is saved into **local storage** so it persists across sessions.

### Deleting Todos

- The user can delete a todo by clicking the delete icon next to it. A smooth **fade-out animation** will play before the todo is removed.

### Completing Todos

- The user can mark a todo as completed by clicking the custom checkbox. The todo text will be struck through, and the checkbox will show a checkmark.

### Responsive Design

- The app is designed to be fully responsive. The layout will adjust based on the screen size.

### Local Storage

- Todos are saved in the browser's **localStorage**, ensuring that tasks persist across page reloads.
- The app automatically loads todos from **localStorage** when the page is refreshed.

---

### Light/Dark Theme Toggle

- Users can toggle between **light** and **dark** themes for a more comfortable experience depending on their preferences or time of day.
- The selected theme is saved in **localStorage**, so the app remembers the user's choice across sessions.
- The app supports dynamic theme switching, and the interface smoothly transitions between themes.

---

## Technologies Used

- **HTML5**: Structure and layout of the app.
- **CSS3/SCSS**: Styling, animations, and responsive design.
- **JavaScript (TypeScript)**: Logic for adding, deleting, and toggling todos, as well as handling local storage and drag-and-drop functionality.
- **Local Storage**: To save todos between sessions.

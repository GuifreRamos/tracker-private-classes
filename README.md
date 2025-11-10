# 📚 Private Class Tracker

A lightweight web application for tracking **private tutoring classes**, managing **students**, and dynamically creating lists of **schools**, **subjects**, and **towns**.  
All data is stored locally in the browser using `localStorage`, making the app fast, simple to deploy, and hassle-free.

---

## 🚀 Features

### ✅ Student Management
- Add new students with:
  - Name
  - School
  - Course level
  - Town
- Prevents duplicate names

### ✅ Class Registration
- Register private classes with:
  - Student selection
  - Date
  - Time
  - Subject

### ✅ Dynamic Select Fields
Select dropdowns automatically populate from stored data:
- Students
- Schools
- Subjects
- Towns

### ✅ Customizable Inputs
Users can add new:
- Subjects
- Schools
- Towns

### 📊 Data Visualization
Renders charts using Chart.js:
- Number of students by school (bar chart)
- Class distribution by subject (pie chart)
- Trends over time (line chart)

### 📤 Data Export
Export:
- Student list (`alumnes.json`)
- Class list (`classes.json`)

---

## 🧠 Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **Chart.js**
- **localStorage**

No backend required.

---

## 🗄️ Data Persistence

Data is saved and loaded using `localStorage`:

```js
const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
const savedClasses = JSON.parse(localStorage.getItem("classes")) || [];
const savedSchools = JSON.parse(localStorage.getItem("schools")) || [];
const savedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
const savedTowns = JSON.parse(localStorage.getItem("towns")) || [];

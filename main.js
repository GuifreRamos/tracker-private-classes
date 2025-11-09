document.addEventListener("DOMContentLoaded",async() =>{
    //VARIABLES
    const classForm = document.getElementById("class-form");
    const studentsForm = document.getElementById('new-student-form');
    const selectAlumne = document.getElementById("alumne")

    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    const savedClasses = JSON.parse(localStorage.getItem("classes")) || [];

    // FUNCIÓ : Actulitzar select de alumnes:
    function updateAlumneOptions() {
        selectAlumne.innerHTML = `<option value="">-- Selecciona una opción --</option>`;
        //Completar amb els alumnes guardats
        savedStudents.forEach((student)=>{
            const option = document.createElement("option");
            option.value = student.name;
            option.textContent = student.name;
            selectAlumne.appendChild(option);
        });
    }

    updateAlumneOptions();

    if(studentsForm){
        studentsForm.addEventListener("submit", (event)=>{
            event.preventDefault();

            const name = document.getElementById("name").value;
            const school = document.getElementById("school").value;
            const level = document.getElementById("level").value;
            const town = document.getElementById("town").value;

            if (!name) return alert("El nom de l'alumne és obligatori");

                  // Evitar duplicados
            if (savedStudents.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
                alert("Aquest alumne ja està registrat.");
                return;
            }


            savedStudents.push({name,town,school,level});
            localStorage.setItem('students', JSON.stringify(savedStudents));
            
            updateAlumneOptions();

            studentsForm.reset();
            alert("Alumne afegit correctament!");
        });
    }



    if(classForm){
        classForm.addEventListener("submit", (event)=> {
                event.preventDefault();

                const alumneName = document.getElementById("alumne").value;
                const data = document.getElementById("date").value;
                const hora = document.getElementById("hora").value;
                const materia = document.getElementById("topic").value;

                if (!alumneName) return alert("Has de seleccionar un alumne.");

                const alumneInfo = savedStudents.find((s)=> s.name === alumneName);

                const classEntry = {
                    alumne: alumneName,
                    data,
                    hora,
                    materia,
                    school: alumneInfo.school,
                    level: alumneInfo.level,
                    town: alumneInfo.town,
                };

                savedClasses.push(classEntry);

                localStorage.setItem('classes', JSON.stringify(savedClasses));

                classForm.reset();
                alert("Classe guardada correctament")
        });
    }

      // === EXPORTAR ALUMNES ===
  const exportButton = document.getElementById("export-alumnes");
  if (exportButton) {
    exportButton.addEventListener("click", () => {
      const dades = JSON.parse(localStorage.getItem("classes")) || [];
      const blob = new Blob([JSON.stringify(dades, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "alumnes.json";
      a.click();
      URL.revokeObjectURL(url);
    });
  }
    
});
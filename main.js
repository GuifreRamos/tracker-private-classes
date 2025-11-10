document.addEventListener("DOMContentLoaded",async() =>{


    //VARIABLES
    const classForm = document.getElementById("class-form");
    const studentsForm = document.getElementById('new-student-form');
    const selectAlumne = document.getElementById("alumne")

    const schoolForm = document.getElementById("add-school-form")
    const subjectForm = document.getElementById("add-subject-form")
    const townForm = document.getElementById("add-town-form")
    const selectSchool = document.getElementById("school")
    const selectSubject = document.getElementById("subject")
    const selectTown = document.getElementById("town")

    const savedStudents = JSON.parse(localStorage.getItem('students')) || [];
    const savedClasses = JSON.parse(localStorage.getItem("classes")) || [];
    const savedSchools = JSON.parse(localStorage.getItem("schools")) || [];
    const savedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    const savedTowns = JSON.parse(localStorage.getItem("towns")) || [];

    // FUNCIÓ : Actulitzar select de alumnes:
    function updateSelectOptions(selectElement, dataArray, labelProp = "name") {
        selectElement.innerHTML = `<option value="">-- Selecciona una opción --</option>`;
        //Completar amb les entrades guardades
        dataArray.forEach( item => {
            const option = document.createElement("option");

            if(typeof item === "object"){
                option.value = item[labelProp];
                option.textContent = item[labelProp];
            } else {
                option.value = item;
                option.textContent = item;
            }
            selectElement.appendChild(option);
        });
    }

    function refreshAllSelects() {
    updateSelectOptions(selectAlumne, savedStudents);
    updateSelectOptions(selectSubject, savedSubjects);
    updateSelectOptions(selectSchool, savedSchools);
    updateSelectOptions(selectTown, savedTowns);
    }

    refreshAllSelects();

    if(subjectForm){
        subjectForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const subject = document.getElementById("adding-subject").value

            savedSubjects.push(subject)
            localStorage.setItem("subjects", JSON.stringify(savedSubjects));
            
            refreshAllSelects();

            subjectForm.reset();
            alert("Assingatura afegida correctament!")
        })
    }

        if(schoolForm){
        schoolForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const school = document.getElementById("adding-school").value

            savedSchools.push(school)
            localStorage.setItem("schools", JSON.stringify(savedSchools));
            
            refreshAllSelects();

            schoolForm.reset();
            alert("Escola afegida correctament!")
        })
    }

        if(townForm){
        townForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const town = document.getElementById("adding-town").value

            savedTowns.push(town)
            localStorage.setItem("towns", JSON.stringify(savedTowns));
            
            refreshAllSelects();

            townForm.reset();
            alert("Muncipi afegit correctment!")
        })
    }

    if(studentsForm){
        studentsForm.addEventListener("submit", (event)=>{
            event.preventDefault();

            const name = document.getElementById("name").value;
            const school = document.getElementById("school").value;
            const level = document.getElementById("course").value;
            const town = document.getElementById("town").value;

            if (!name) return alert("El nom de l'alumne és obligatori");

                  // Evitar duplicados
            if (savedStudents.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
                alert("Aquest alumne ja està registrat.");
                return;
            }


            savedStudents.push({name,town,school,level});
            localStorage.setItem('students', JSON.stringify(savedStudents));
            
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
                const materia = document.getElementById("subject").value;

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
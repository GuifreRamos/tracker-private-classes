document.addEventListener("DOMContentLoaded", async()=>{

    const savedClasses = JSON.parse(localStorage.getItem("classes")) || [];

    const counterClases = {};
    savedClasses.forEach(classe => {
        let student = classe.alumne;
        counterClases[student] = (counterClases[student] || 0) + 1;
    });

    let sortedEntries = Object.entries(counterClases)
        .sort((a,b)=> b[1]-a[1]);

    const canvas = document.getElementById("bar-plot-students");
    labels = sortedEntries.map(entry => entry[0]);
    values = sortedEntries.map(entry => entry[1]);

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels:labels,
            datasets : [{
                label: 'Number of classes: ',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options : {
            responsive: false,
            plugins: {
                legend: {
                    display : true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Classes by student'
                }
            }
        }
    })

    const subjectCounts = {}
    savedClasses.forEach(classe =>{
        let subject = classe.materia ;
        subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
    })

    const canvas2 = document.getElementById("pie-plot-subjects")
    const labels2 = Object.keys(subjectCounts)
    const values2 = Object.values(subjectCounts)

        new Chart(canvas2, {
        type: 'pie',
        data: {
            labels:labels2,
            datasets : [{
                label: 'Subjects: ',
                data: values2,
                backgroundColor: [
                'rgba(255, 99, 132, 0.6)',   // rojo
                'rgba(54, 162, 235, 0.6)',   // azul
                'rgba(255, 206, 86, 0.6)',   // amarillo
                'rgba(75, 192, 192, 0.6)',   // verde agua
                'rgba(153, 102, 255, 0.6)',  // violeta
                'rgba(255, 159, 64, 0.6)',   // naranja
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
],
                borderWidth: 1
            }]
        },
        options : {
            responsive: false,
            plugins: {
                legend: {
                    display : true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Proportion of subjects'
                }
            }
        }
    })


    const classesByWeek = {};

    savedClasses.forEach(classe => {
        const date = new Date(classe.data);
        if (isNaN(date)) return;
        const year = date.getFullYear();
        const week = getISOWeek(date);

        const weekKey = `${year} - W${week}`;
        classesByWeek[weekKey] = (classesByWeek[weekKey] || 0) + 1;
    });

    const sortedWeeks = Object.keys(classesByWeek).sort();
    const counts = sortedWeeks.map(week => classesByWeek[week]);

    const ctx = document.getElementById("line-plot-trend").getContext("2d");

    new Chart(ctx, {
    type: 'line',
    data: {
        labels: sortedWeeks,
        datasets: [{
        label: 'Nombre de classes per setmana',
        data: counts,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3, // suaviza la línea
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        }]
    },
    options: {
        responsive: false,
        plugins: {
        title: {
            display: true,
            text: 'Evolució setmanal de classes particulars'
        }
        },
        scales: {
        y: {
            beginAtZero: true,
            title: { display: true, text: 'Nº de classes' }
        },
        x: {
            title: { display: true, text: 'Setmana' }
        }
        }
    }
    });

    // Función auxiliar para calcular la semana ISO
    function getISOWeek(date) {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    // Mover al jueves de la semana actual
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    return 1 + Math.round(((tempDate - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
    }
})
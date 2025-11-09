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
            responsive: true,
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

})
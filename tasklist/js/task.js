//Globale Variable
let taskSystem = null;

$(document).ready(function() {
    //Neues Tasksystem anlegen
    taskSystem = new TaskSystem();

    //3 Personen im Vorhinein anlegen
    let p1 = new Person("Max", "Mustermann");
    let p2 = new Person("Hilde", "Mannhaus");
    let p3 = new Person("Nina", "Wald");
    taskSystem.addPerson(p1.firstname + " " + p1.lastname);
    taskSystem.addPerson(p2.firstname + " " + p2.lastname);
    taskSystem.addPerson(p3.firstname + " " + p3.lastname);

    //Eingabe neuer Aufgaben (Button Hinzufügen)
    $("#add").on("click", function () {
        addTask();
    });

    //Alle offenen Aufgaben anzeigen (Button Offene anzeigen)
    $("#showOpen").on("click", function () {
        showOpen();
    });

    //Alle Aufgaben anzeigen (Button Alle anzeigen)
    $("#showAll").on("click", function () {
        showAll();
    });

    //Subtask hinzufügen (Button Subtask hinzufügen)
    $("#addSubtask").on("click", function () {
        addSubTask();
    });
});

//Neuen Task hinzufügen-----------------------------------------
function addTask() {

    //WERTE AUSLESEN
    let t = $("#task").val();
    let p = $("#person option:selected").val();
    let desc = $("#description").val();

    //ABFRAGE, OB IN FELD "AUFGABE" EINGABE ERFOLGTE
    if (t === "") {
        alert("Bitte geben Sie eine Aufgabe und Person ein!");
    } else {
        //Neuen Task anlegen
        let task = new Task(t, p, desc);
        taskSystem.addTask(task);
        task.writeTaskToHtml($("#taskDiv"), "tasks");
    }
}

//Neuen Subtask hinzufügen-----------------------------------------
function addSubTask() {
    let mainTask = taskSystem.getTask(); //Task in 1. Ebene
    let subTask = mainTask.getSubTask(); //Task in 2. Ebene
    let num = mainTask.id;

    //WERTE AUSLESEN
    let t = $("#task").val();
    let p = $("#person option:selected").val();
    let desc = $("#description").val();

    //Abfrage, ob markiertes Task erledigt ist oder nicht
    if (taskSystem.isClosed() === false){

        //ABFRAGE, OB IN FELD "AUFGABE" EINGABE ERFOLGTE
        if (t === "") {
            alert("Bitte geben Sie eine Aufgabe und Person ein!");
        } else {
            //neuen Task anlegen
            let newST = new Task(t, p, desc);

            //Abfrage, ob Subtasks bzw. davon Subtasks vorhanden sind
            //Funktioniert ab 3. Ebene nicht mehr richtig (es lassen sich dann nurnoch Tasks von 1.
            //oder 3. Ebene hinzufügen)
            if(subTask == null) { //Subtask 1. Ebene
                mainTask.addSubTask(newST);
                newST.writeTaskToHtml($("#taskDiv"), "tasks subTasks1");
            } else{ //Subtask 2. Ebene
                subTask.addSubTask(newST);
                newST.writeTaskToHtml($("#taskDiv"), "tasks subTasks2");
            }
        }
    }else{
        alert("Hinzufügen von Subtask nicht möglich, da Aufgabe bereits abgeschlossen!")
    }
}

//3. Alle offenen Tasks anzeigen (Button Offene anzeigen)--------
function showOpen() {
    //ANZAHL DER RADIOBUTTONS
    let num = $(".radio input").length;

    //SCHLEIFE:
    for (let x = 0; x < num; x++) {
        let open = document.querySelectorAll(".radio input")[x]; //RADIOBUTTON DER STELLE x

        //ABFRAGE: WENN RADIOBUTTON "OFFEN" ANGEHACKT -> ANZEIGEN
        //WENN RADIOBUTTON "ERLEDIGT" ANGEHACKT -> VERSTECKEN
        if (open.value === "0" && open.checked) {
            open.parentNode.parentNode.style.display = "block";
        } else if (open.value === "1" && open.checked) {
            open.parentNode.parentNode.style.display = "none";
        }
    }
}

//4. Alle Aufgaben anzeigen (Button Alle anzeigen)----------------
function showAll() {
    let num = document.querySelectorAll(".tasks").length;

    for (let x = 0; x < num; x++) {
        document.querySelectorAll(".tasks")[x].style.display = "block";
    }
}

//5. Tasks löschen (Button Löschen)-------------------------------
//Löscht den Task mit Subtasks aus dem Objektmodell sowie aus dem
//HTML Dokument
function deleteTask(btn, task){
    let p = task.parent;

    //Fall Haupttask - alle Subtasks mitlöschen
    if (p === undefined || p === null) {
        if(task.subtasks != null) {
            for (let e of task.subtasks) { //2. Ebene
                if (e.subtasks != null) {
                    for (let f of e.subtasks) { //3. Ebene
                        e.subtasks.splice(f.id,1);
                        f.newTask.remove();
                    }
                }
                task.subtasks.splice(e.id,1);
                e.newTask.remove();
            }
        }
    }
    //Haupttask löschen
    taskSystem.tasks.splice(task.id,1); //Task Objektmodell
    task.newTask.remove(); //Task HTML
}
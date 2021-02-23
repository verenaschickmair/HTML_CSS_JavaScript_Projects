//Globale Variable für Task-IDs
let num = 0;

class TaskSystem {
    constructor() {
        this.tasks = [];
        this.persons = [];
    }

    //Methode, um Task zum System hinzuzufügen
    addTask(task) {
        this.tasks.push(task);
    }

    //Methode, um Person zum System hinzuzufügen
    addPerson(person) {
        this.persons.push(person);
        $("#person").append(`<option>${person}</option>`);
    }

    //Methode, um markierten Task zu bekommen
    getTask() {
        for (let t of this.tasks) {
            if (t.marked === true) {
                return t;
            }
        }
        return null; //Kein Task gefunden
    }

    //Methode, welche prüft, ob der markierte Task erledigt ist
    isClosed() {
        for (let t of this.tasks) {
            if (t.marked === true && t.closed === true) {
                return true;
            }
            if (t.subtasks != null) {
                for (let s of t.subtasks) {
                    if (s.marked === true && s.closed === true) {
                        return true;
                    }
                    if (s.subtasks != null) {
                        for (let h of s.subtasks) {
                            if (h.marked === true && h.closed === true) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
}

//==============================================================
class Task {
    constructor(name, person, description) {
        this.id = num;
        this.name = name;
        this.person = person;
        this.description = description;
        this.marked = false;
        this.parent = undefined;
        this.closed = false;
        this.subtasks = [];
    }

    //Fügt zu einem Task einen Subtask hinzu
    addSubTask(subTask) {
        this.subtasks.push(subTask);
        subTask.parent = this;
    }

    //Methode, um den markierten Subtask zu bekommen
    getSubTask() {
        for (let t of this.subtasks) { //1. Ebene
            if (t.marked === true) {
                return t;
            }
            if(t.subtasks != null){ //2. Ebene
                for(let s of t.subtasks){
                    if(s.marked === true){
                        return s;
                    }
                }
            }
        }
        return null; //Kein Task gefunden
    }

    //Methode, welche den neu erstellten Task ins HTML-Dokument
    //schreibt und Eventlistener hinzufügt
    writeTaskToHtml(taskDiv, classes) {
        this.newTask = $(`
        <div class="${classes}" id="task${this.id}">   
            <div class="radio">
                <input type="radio" 
                class="open" checked="true" value="0"
                id="open${this.id}" name="r${this.id}">
                <label for="open${this.id}">Offen</label>
                
                <input type="radio" name="r${this.id}"
                class="closed" value="1" id="closed${this.id}">
                <label for="closed${this.id}">Erledigt</label>
            </div>
        
            <div class="info">
                <p>Task: ${this.name}</p>
                <p>Person: ${this.person}</p>
                <p>Beschreibung: ${this.description}</p>
                <input type="button" value="Löschen" id="b${this.id}" class="delete">
            </div>          
        </div>`);

        $(taskDiv).append(this.newTask);
        this.addEventListener(this);
        num++;
    }

    //Methode, um zum neu erstellten Task Eventlistener für den Radiobuttonstatus,
    //das Markieren der Tasks und für den Löschen-Button hinzuzufügen.
    addEventListener(that) {
        //Radiobutton - Offen und Erledigt
        $("input[type=radio]").on("click", function (e) {
            if (this.value === '0') {
                $(this).parent().next().removeClass("closedEntry");
                that.closed = false;
            } else if (this.value === '1') {
                $(this).parent().next().addClass("closedEntry");
                that.closed = true;
            }
        });

        //Markieren der Tasks
        this.newTask.click(() => {
            $(".tasks").each(function () {
                $(this).removeClass("marked");
            });

            this.newTask.addClass("marked");
            this.marked = true;
        });

        //Löschen-Button
        $(".delete").on("click", function () {
            deleteTask(this, that);
        });
    }
}

//==============================================================
class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
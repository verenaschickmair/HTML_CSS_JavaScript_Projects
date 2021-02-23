//Globale Variablen
let box = "";
let img = "";
let box2 = "";
let img2 = "";
let attempts = 0;
let pairMatch = 0;
let pairs = 0;
let counter = 0;

$(document).ready(function() {
//Klick auf den Start Button:
    $("#startMemory").click(function (e) {
        e.preventDefault();
        //Ausgewählte Größe für Memoryfeld auslesen:
        let noOfCards = $('input[name="mem"]:checked').val();
        pairs = (noOfCards/2)-1;
        //Memoryfeld aufbauen:
        buildBoard(noOfCards);

        //Klickhandler für die Memorykarten
        //Es werden die ID und SRC der angeklickten Memorykarte zum Öffnen der Karten mitgegeben
        $("#memoryField").unbind("click").on('click', "div", function (e) {
            let picID = $(this).children("img").attr("id");
            let picSRC = $(this).children("img").attr("src");
            OpenCard(picID, picSRC);
        });
    });

    //Aufbau des Memoryfelds
    function buildBoard(cards) {
        //Überprüfen, ob ein Memoryfeld bereits existiert
        if ($("#memoryField").length) {
            //Feld leeren
            $("#memoryField").empty();
        } else {
            //Neues Feld anlegen
            $("body").append('<div id="memoryField"></div>');
        }
        //Alle Werte zurücksetzen
        pairMatch = 0;
        attempts = 0;
        counter = 0;
        box = "";
        img = "";
        box2 = "";
        img2 = "";

        //Je nach Memorygröße die Feldbreite ändern
        if (cards == 16) {
            $("#memoryField").css("width", "600")
        } else if (cards == 24) {
            $("#memoryField").css("width", "900")
        } else if (cards == 36) {
            $("#memoryField").css("width", "1350")
        }

        //Memorybilder ins Feld einfügen
        let arr = new Array();
        for (let i = 0; i < cards; i++) {
            arr.push(i);
            $("#memoryField").append("<div><img width='75' src='' id='i" + i + "' /></div>");
        }

        //Zufallsanordnung der Memorykarten
        let r;
        for (let i = 0; i < (cards / 2); i++) {
            r = getRandom(0, arr.length - 1);
            $("#memoryField div #i" + arr[r]).attr("src", "imgs/img_" + i + ".jpg");
            arr.splice(r, 1); //deletes the element on index r
            r = getRandom(0, arr.length - 1);
            $("#memoryField div #i" + arr[r]).attr("src", "imgs/img_" + i + ".jpg");
            arr.splice(r, 1);
        }

        //Jede Memorykarte "umdrehen" -> Bild verstecken
        $("#memoryField div img").each(function () {
            $(this).addClass('hide');
        });
    }

    //Zum Öffnen der Karte -> je nachdem, die wievielte Karte gerade geöffnet wurde
    //werden verschiedene Events ausgeführt, der Counter zählt die Klicks
    function OpenCard(picID, picSRC) {
        //Je nachdem, der wievielte Klick gerade stattfand: Verschiedene Events
        switch (counter) {
            //Erster Klick: Karte wird umgedreht
            case 0:
                $("#" + picID).slideDown(300).removeClass("hide");
                box = picID;
                img = picSRC;
                counter++;
                break;
            //Zweiter Klick: Wenn nicht diesselbe Karte wie beim ersten Klick angeklickt wurde,
            //wird die zweite Karte umgedreht. Ansonsten wird der Klick ignoriert.
            case 1:
                if (box != picID) {
                    $("#" + picID).slideDown(300).removeClass("hide");
                    box2 = picID;
                    img2 = picSRC;
                    counter++;
                    //Falls letztes Paar gefunden wurde -> Abschlussmeldung
                    finished();
                    break;
                }
                break;
            //Dritter Klick: Solange keine Karte zweimal geklickt wurde, wird überprüft, ob
            //es sich um ein Kartenpaar handelt oder nicht. Danach wird das dritte Bild aufgedeckt.
            //Wird ein Bild doppelt angeklickt, wird der Klick ignoriert.
            case 2:
                //Anlage von Extravariablen - Verwendung von globale Variable wirft hier Fehler aus
                let b = box;
                let b2 = box2;
                let i = img;
                let i2 = img2;
                //Abfrage, ob ein ausgewähltes Bild doppelt geklickt wurde
                //Wenn ja -> kein Effekt
                if (b != b2 && b2 != picID && b != picID) {
                    //Wenn kein Bilderpaar gefunden wurde -> Karten werden wieder verdeckt
                    if (i != i2) {
                        setTimeout(function () {
                            $("#" + b).slideUp(300).addClass("hide");
                            $("#" + b2).slideUp(300).addClass("hide");
                        }, 1000);
                    } else {
                        //Wenn ein Bilderpaar gefunden wurde -> Karten "verschwinden" aus Feld
                        setTimeout(function () {
                            $("#" + b).parent().addClass("match");
                            $("#" + b2).parent().addClass("match");
                            pairMatch++;
                        }, 1000);
                    }
                    //Drittes, angeklicktes Bild wird aufgedeckt
                    setTimeout(function () {
                        $("#" + picID).slideDown(300).removeClass("hide");
                    }, 1000);
                    box = picID;
                    img = picSRC;
                    box2 = "";
                    img2 = "";
                    counter = 1;
                    attempts++;
                    break;
                }
                break;
            default:
                break;
        }
    }
});

//Zufallszahl generieren und zurückgeben
function getRandom(min, max) {
    if (min > max) return -1;
    if (min == max) return min;
    return min + parseInt(Math.random() * (max - min + 1));
}

//Abfrage, ob es sich um letztes Paar handelt, welches gefunden wurde
//Falls ja, wird das Memoryfeld geleert und es wird eine Abschlussmeldung
//mit den benötigten Versuchen angezeigt
function finished() {
    if (pairs === pairMatch) {
        setTimeout(function () {
            $("#memoryField").empty();
            $("#memoryField").append("<p>Gratuliere, du hast das Memory geschafft!</p>");
            $("#memoryField").append("<p>Du hast " + attempts + " Versuche gebraucht</p>");
        }, 2000);
    }
}
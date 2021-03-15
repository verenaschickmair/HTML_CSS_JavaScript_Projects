class PaintObj{
    constructor(posX, posY, color){ //Konstruktorfunktion
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.div = undefined;
    }

    draw($parent){
        //lege mir zusätzliches Attribute an
        this.div = $("<div></div>");
        this.div.css({ //JSON - anonymes Objekt
            position:"absolute",
            top: this.posY+"px",
            left:this.posX+"px",
            background : this.color
        });
        //einhängen in den DOM Baum
        $parent.append(this.div);
        this.setClickHandler();
    }

    deleteElement(div) { //have to handle div - this would be event-object
        div.remove();
    }

    setClickHandler() {
        //let that = this;
        //this.div.click(function(e){
        //    that.deleteElement(e.currentTarget);
        //});
        this.div.click((e) =>{
            this.deleteElement(e.currentTarget); //this is now the klicked div-Element, we need the object - saved it in that
        });
    }

    getWidth() {
        throw "Method abstract - please overwrite in subclass!"
    }

    getHeight() {
        throw "Method abstract - please overwrite in subclass!"
    }
}
//=================================================
class Square extends PaintObj {
    constructor(posX,posY, color, size){
        super(posX,posY,color);
        //neues, zusätzliches Attribute angelegt
        this.size = size;
    }

    //überschreiben der draw Methode
    draw($parent){
        super.draw($parent);
        $(this.div).css({
            width : this.size+"px",
            height:this.size+"px"
        });
    }

    getWidth() {
        return this.size;
    }

    getHeight() {
        return this.size;
    }
}
//=================================================
class Rectangle extends PaintObj{
    constructor(posX,posY,color,width,height){
        super(posX,posY,color);
        //neues, zusätzliches Attribute angelegt
        this.width = width;
        this.height = height;
    }

    //überschreiben der draw Methode
    draw($parent){
        super.draw($parent);
        $(this.div).css({
            width : this.width+"px",
            height:this.height+"px"
        });
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}
//=================================================
class Frame extends Rectangle{
    constructor(posX,posY,color) {
        super(posX,posY,color,0,0);
        this.elements = new Array();
    }

    addPaintObj(po) {
        let w = po.getWidth();
        let h = po.getHeight();

        if(this.width < po.posX + w){
            this.width = po.posX + w;
        }

        if(this.height < po.posY + h){
            this.height = po.posY + h;
        }

        this.elements.push(po);//push fügt element in Array ein
    }

    draw($parent){
        super.draw($parent);
        for(let val of this.elements){
            val.draw(this.div);
        }
    }
}

//=================================================
//Der Kreis/das Oval ist eigentlich ein Rechteck, welches jedoch mittels
//Veränderung durch Rahmenradius als ein Kreis/Oval erscheint.
class Circle extends PaintObj {
    constructor(posX,posY,color,width,height){
        super(posX,posY,color);
        this.width = width;
        this.height = height;
    }

    //überschreiben der draw Methode
    draw($parent){
        super.draw($parent);
        $(this.div).css({
            width : this.width+"px",
            height: this.height+"px",
            borderRadius: 50+"%"
        });
    }

    getWidth() {
        return this.size;
    }

    getHeight() {
        return this.size;
    }
}

//=================================================
//Das Strichmännchen besteht aus mehreren Unterelementen (Circle bzw.
//Rectangles), welche im Konstruktor erzeugt werden mit den passenden
//Maßen im Verhältnis zu der Gesamthöhe/breite. Die Klasse erbt von
//Frame, um die Methoden addPaintObj() und draw() aufzurufen.
class Strichmann extends Frame {
    constructor(posX, posY, color, width, height) {
        super(posX, posY);
        this.width = width;
        this.height = height;

        this.head = new Circle(width/2, 0, color, width/3, height/3);
        this.addPaintObj(this.head);
        this.body = new Rectangle(width/2, height/3, color, width/3, height/3);
        this.addPaintObj(this.body);
        this.leftarm = new Rectangle((width/2)-(width/3), height/3, color, width/3, height/8);
        this.addPaintObj(this.leftarm);
        this.rightarm = new Rectangle((width/2)+(width/3), height/3, color, width/3, height/8);
        this.addPaintObj(this.rightarm);
        this.leftfoot = new Rectangle(width/2, (height/3)*2, color, width/8, height/3);
        this.addPaintObj(this.leftfoot);
        this.rightfoot = new Rectangle((width/2)+(width/3)-(width/8),(height/3)*2, color,
            width/8, height/3);
        this.addPaintObj(this.rightfoot);
    }

    draw($parent){
        super.draw($parent);
        $(this.div).css({
            width : this.width+"px",
            height: this.height+"px",
            backgroundColor: "transparent"
        });
    }
}

//=================================================
//Zusatzaufgabe: Dreieck
//Das Dreieck ist eigentlich ein Rechteck, welches jedoch mittels
//Veränderung des Rahmens als ein Dreieck erscheint.
class Triangle extends PaintObj{
    constructor(posX,posY,color,width,height){
        super(posX,posY,color);
        this.width = width;
        this.height = height;
    }

    //überschreiben der draw Methode
    draw($parent){
        super.draw($parent);
        $(this.div).css({
            backgroundColor: "transparent",
            width : 0 + "px",
            height: 0 + "px",
            borderLeft: this.height/2 +"px solid transparent",
            borderRight: this.height/2 +"px solid transparent",
            borderBottom: this.width+"px solid "+ this.color
        });
    }
}

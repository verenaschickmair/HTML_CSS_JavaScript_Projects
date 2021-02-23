let $inputPosX;
let $inputPosY;
let $inputColor;
let $inputSize;
let $inputWidth;
let $inputHeight;
let $inputAmount;

$(document).ready(function(){
	$inputPosX = $("#positionX");
	$inputPosY = $("#positionY");
	$inputColor = $("#color");
	$inputSize = $("#size");
	$inputWidth = $("#width");
	$inputHeight = $("#height");

	updateFormElements();

	$("#draw").click(function(){
		validateInputAndDraw();
	});

	emptyButton = document.getElementById("empty");
	$("#empty").click(function(){
		$("#paintArea").children().remove();
	});

	$("#shape").change(function() {
		updateFormElements();
	});

	//Die Funktion ermittelt bei Klick auf die Zeichenfläche
	//die X und Y-Koordinate und überschribt die Input-Felder
	//Position X und Y mit dem ermittelten Werten.
	$('#paintArea').click(function (e) {
		let posX = e.clientX;
		let posY = e.clientY;

		$("#positionX").val(posX);
		$("#positionY").val(posY);
		validateInputAndDraw()
	});
});

function updateFormElements() {
	let shape = $("#shape").val();
	switch(shape) {
		case "square":
			$inputSize.parent().show();
			$inputWidth.parent().hide();
			$inputHeight.parent().hide();
			break;
		case "rectangle":
			$inputSize.parent().hide();
			$inputWidth.parent().show();
			$inputHeight.parent().show();
			break;
		case "frame":
			$inputSize.parent().hide();
			$inputWidth.parent().hide();
			$inputHeight.parent().hide();
			break;
		case "circle":
			$inputSize.parent().hide();
			$inputWidth.parent().show();
			$inputHeight.parent().show();
			break;
		case "strichmann":
			$inputSize.parent().hide();
			$inputWidth.parent().show();
			$inputHeight.parent().show();
			break;
		case "triangle":
			$inputSize.parent().hide();
			$inputWidth.parent().show();
			$inputHeight.parent().show();
			break;
		default:
			break;
	}
}

function validateInputAndDraw() {
	let shape = document.paintForm.shape.options[document.paintForm.shape.selectedIndex].value;
	let color = checkInputField("color");
	let positionX = checkInputField("positionX");
	let positionY = checkInputField("positionY");

	switch(shape) {
		case "square":
			let size = checkInputField("size");
			let s = new Square(Number(positionX),
				Number(positionY),color,Number(size));
			s.draw($("#paintArea"));
			break;

		case "rectangle":
			let width = checkInputField("width");
			let height = checkInputField("height");
			let r = new Rectangle(Number(positionX),
				Number(positionY),color,Number(width),Number(height));
			r.draw($("#paintArea"));
			break;

		case "frame":
			let frame = new Frame(Number(positionX), Number(positionY),color);
			let r1 = new Rectangle(0,0,"#aabbcc",5,10);
			frame.addPaintObj(r1);

			let s1 = new Square(100,100,"#aaffcc",50);
			frame.addPaintObj(s1);
			frame.draw($("#paintArea"));
			break;

		//Da es ein Oval und kein Kreis werden soll, bekommt es
		//eine Höhe und eine Breite. Dadurch soll ein neues Element
		//angelegt werden und in die Zeichenfläche gezeichnet werden
		case "circle":
			let width0 = checkInputField("width");
			let height0 = checkInputField("height");
			let c = new Circle(Number(positionX),
				Number(positionY),color,Number(width0),Number(height0));
			c.draw($("#paintArea"));
			break;

		//Das Strichmännchen bekommt eine Höhe und Breite mit, welche
		//für das neue Element gebraucht werden. Danach wird das
		//Strichmännchen gezeichnet
		case "strichmann":
			let width1 = checkInputField("width");
			let height1 = checkInputField("height");

			let strichmann = new Strichmann(Number(positionX),
				Number(positionY), color, Number(width1), Number(height1));
			strichmann.draw($("#paintArea"));
			break;

		//Das Dreieck bekommt Höhe und Breite, das Element wird
		//angelegt und das Element wird gezeichnet.
		case "triangle":
			let width2 = checkInputField("width");
			let height2 = checkInputField("height");
			let t = new Triangle(Number(positionX),
				Number(positionY),color,Number(width2),Number(height2));
			t.draw($("#paintArea"));
			break;
		default:
			break;
	}
}

function checkInputField(id) {
	let $inputField = $("#"+id);

	if($inputField.val() == "" ) {
		$inputField.css("border","1px solid red"); //roter Rahmen
		return "";
	} else {
		$inputField.css("border","1px solid #cdcdcd");
		return $inputField.val();
	}
}



class Card {
  constructor(title, description, quote, img, typ) {
    this.title = title
    this.description = description
    this.quote = quote
    this.img = img
    this.typ = typ
  }
}


var cards = []


for (var i=0;i<json.length;i++) {
    //console.log("aaa");
	var obj = json[i]
    cards.push(new Card(obj.Titolo, obj.Descrizione, obj.Citazione, obj.img, obj.Note))
}



function draw() {
	var r = Math.floor(Math.random() * cards.length);
	var card = cards[r]
	if(card.description.split(":").length == 2) {
		var splittedDescr = card.description.split(":")
		document.getElementById("power").innerHTML = splittedDescr[0];
		document.getElementById("description").innerHTML = splittedDescr[1];
	} else {
		document.getElementById("power").innerHTML = "";
		document.getElementById("description").innerHTML = card.description;
	}
    //console.log("BBB");
	if(card.typ == "gif") {
		document.getElementById("card_img").src="assets/img/"+card.img+".gif";
	} else {
		document.getElementById("card_img").src="assets/img/"+card.img+".jpg";
	}

	//document.getElementById("card_img").style.height = '60%';
	document.getElementById("name").innerHTML = card.title;

	if(card.quote != '""') {
		document.getElementById("quote").innerHTML = card.quote;
	} else {
		document.getElementById("quote").innerHTML = "";
	}

	cards.splice(r, 1)
	console.log(cards.length, card.title)
}


function uploadPage() {
	//document.getElementById("main").style.display = "none";
	//document.getElementById("newCard").style.display = "block";
}

function gamePage() {
	document.getElementById("main").style.display = "block";
	document.getElementById("newCard").style.display = "none";
}

function createNewCard() {
	var newCard = new Card(
		document.getElementById("titleForm").value,
		document.getElementById("descriptionForm").value,
		document.getElementById("quoteForm").value,
		"default", 	//document.getElementById("fileToUpload").value,
		document.getElementById("noteForm").value)
	cards.push(newCard)
	document.getElementById("titleForm").value = ""
	document.getElementById("descriptionForm").value = ""
	document.getElementById("quoteForm").value = ""
	//document.getElementById("fileToUpload").value = ""
	document.getElementById("noteForm").value = ""
	//window.open('mailto:luca.arrotta@gmail.com');
	gamePage()
	return false
}

var localJson = null
$(document).ready(function(){
	localStorage.setItem("json", JSON.stringify(json));		// store
	localJson = JSON.parse(localStorage.getItem("json"))	// retrieve

	$('#card_img').on('load', function () {
		$("#spinner").hide()
		$('#card_img').css('opacity', '1');
	});
});




function draw() {
	$("#spinner").css("display", "inline-block")
	$('#card_img').css('opacity', '0.5');
	var r = Math.floor(Math.random() * localJson.length);
	var card = localJson[r]

	try {
	  document.getElementById("card_img").src="assets/img/"+card.img
	}
	catch(err) {
	  document.getElementById("card_img").src="assets/img/default.jpg"
	}

	

	if(card.Descrizione.split(":").length == 2) {
		var splittedDescr = card.Descrizione.split(":")
		$("#power").html(splittedDescr[0])
		$("#description").html(splittedDescr[1])
	} else {
		$("#power").html("")
		$("#description").html(card.Descrizione)
	}

	
	$("#name").html(card.Titolo)
	if(card.Citazione != "") {
		$("#quote").html('"' + card.Citazione + '"')
	} else {
		$("#quote").html("")
	}
	
	localJson.splice(r, 1)	
	console.log(card.Titolo, localJson.length)
}


function uploadPage() {
	$("#main").hide()
	$("#newCard").show()
	//document.getElementById("main").style.display = "none";
	//document.getElementById("newCard").style.display = "block";
}

function gamePage() {
	$("#main").show()
	$("#newCard").hide()
	//document.getElementById("main").style.display = "block";
	//document.getElementById("newCard").style.display = "none";
}

function createNewCard(event) {
	//event.preventDefault()
	var title = $("#titleForm").val()
	var description = $("#descriptionForm").val()
	var quote = $("#quoteForm").val()
	var img = $("#imgForm").val()
	img = img.split("\\")
	img = img[img.length-1]
	//img = img.split(".")
	//img.pop()		// elimina l'estensione
	//img = img.join("");
	var author = $("#authorForm").val()
	var note = $("#noteForm").val()
	var jsonToUpload = "{'Titolo': '" + title + "', 'Descrizione': '" + description + "', 'Citazione': '" + quote + "', 'img': '" + img + "', 'Autore': '" + author + "', 'Note': '" + note + "'}"
	$("#jsonForm").val(jsonToUpload)	// così viene uploadato su Netlify
	return true
}





/*
class Card {
  constructor(title, description, quote, img, auth, typ) {
    this.title = title
    this.description = description
    this.quote = quote
    this.img = img
    this.auth = auth
    this.typ = typ
  }
}

var cards = []
for (var i=0;i<json.length;i++) {
    //console.log("aaa");
	var obj = json[i]
    cards.push(new Card(obj.Titolo, obj.Descrizione, obj.Citazione, obj.img, obj.Autore, obj.Note))
}
*/


var localJson = null
$(document).ready(function(){
	localStorage.setItem("json", JSON.stringify(json));		// store
	localJson = JSON.parse(localStorage.getItem("json"))	// retrieve

	$('#card_img').on('load', function () {
		$("#spinner").hide()
		$('#card_img').css('opacity', '1');
	});

	$("#eventoBtn").removeAttr("data-toggle");
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

	/*
	if(card.Descrizione.split(":").length == 2) {
		var splittedDescr = card.Descrizione.split(":")
		$("#power").html(splittedDescr[0])
		$("#description").html(splittedDescr[1])
	} else {
		$("#power").html("")
		$("#description").html(card.Descrizione)
	}*/

	$("#name").html(card.Titolo)
	$("#description").html(card.Descrizione)
	if(card.Citazione != "") {
		$("#quote").html('"' + card.Citazione + '"')
	} else {
		$("#quote").html("")
	}
	
	localJson.splice(r, 1)	
	console.log(card.Titolo, localJson.length)


	if($("#eventoBtn").html() == "Nessun evento in corso...") {		// da togliere...serve solo per testare ora
		$("#eventoBtn").attr("data-toggle", "modal");
		$("#eventoBtn").html("Evento in corso:\n<br><strong>Alcatraz</strong>")
	} else {
		if(card.tipo == "evento") {
			$("#description").html("<strong>Evento:</strong><br>"+card.Descrizione)
			document.getElementById("modalCardImg").src="assets/img/"+card.img
			$("#eventoBtn").html("Evento in corso:\n<br><strong>"+card.Titolo+"</strong>")
			$("#modalName").html(card.Titolo)
			$("#modalDescription").html(card.Descrizione)
			if(card.Citazione != "") {
				$("#modalQuote").html('"' + card.Citazione + '"')
			} else {
				$("#modalQuote").html("")
			}
		}
	}
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
	$("#spinnerCreateCard").css("display", "inline-block")
	$("#alert").show()
	$("#backButton").css("display", "none")
	$("#createButton").css("display", "none")
	//event.preventDefault()
	var title = $("#titleForm").val()
	var description = $("#descriptionForm").val()
	var quote = $("#quoteForm").val()
	var img = $("#imgForm").val()
	img = img.split("\\")
	img = img[img.length-1]
	var type = $('input[name="optradio"]:checked').val();
	var author = $("#authorForm").val()
	var note = $("#noteForm").val()
	var jsonToUpload = "{'Titolo': '" + title + "', 'Descrizione': '" + description + "', 'Citazione': '" + quote + "', 'img': '" + img + "', 'tipo': '" + type + "', 'Autore': '" + author + "', 'Note': '" + note + "'}"
	$("#jsonForm").val(jsonToUpload)	// così viene uploadato su Netlify
	alert(jsonToUpload)
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











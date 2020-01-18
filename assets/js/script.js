var localJson = null
$(document).ready(function(){
	localStorage.setItem("json", JSON.stringify(json));		// store
	localJson = JSON.parse(localStorage.getItem("json"))	// retrieve

	$("#badge").html(localJson.length)
	$("#eventoBtn").removeAttr("data-toggle");

	$('#card_img').on('load', function () {
		$("#spinner").hide()
		$('#card_img').css('opacity', '1');
	});

	
	$('#audioBtn').on('click', function () {
		if(audioCtrl) {
			startAudio()
		} else {
			stopAudio()
		}
	});

	$('#myAudio').on('ended', function() {
   		stopAudio()
	});
});


var audioCtrl = true
function startAudio() {
	audioCtrl = false
	document.getElementById("myAudio").play()
	$("#audioBtn").removeClass("fa-volume-up")
	$("#audioBtn").addClass("fa-volume-mute")
}

function stopAudio() {
	audioCtrl = true
	document.getElementById("myAudio").pause()
	document.getElementById("myAudio").currentTime = 0
	$("#audioBtn").removeClass("fa-volume-mute")
	$("#audioBtn").addClass("fa-volume-up")
}




function draw() {
	if(localJson.length > 0) {
		stopAudio()
		$("#spinner").css("display", "inline-block")
		$('#card_img').css('opacity', '0.5');

		var r = Math.floor(Math.random() * localJson.length);
		var card = localJson[r]

		if(card.audio != null) {
			console.log(card.audio)
			$("#audioSrc").attr("src", "assets/audio/"+card.audio);
			document.getElementById("myAudio").load()
			$("#audioBtn").show()
		} else {
			$("#audioBtn").hide()
		}

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
			$("#quote").show()
		} else {
			$("#quote").html("")
			$("#quote").hide()
		}
		
		localJson.splice(r, 1)	
		console.log(card.Titolo, localJson.length)
		$("#badge").html(localJson.length)

		if(card.tipo == "evento") {
			$("#eventoBtn").attr("data-toggle", "modal");
			$("#description").html("<strong>Evento:</strong><br>"+card.Descrizione)
			document.getElementById("modalCardImg").src="assets/img/"+card.img
			$("#eventoBtn").html("Evento in corso:\n<br><strong>"+card.Titolo+"</strong>")
			$("#modalName").html(card.Titolo)
			$("#modalDescription").html(card.Descrizione)
			if(card.Citazione != "") {
				$("#modalQuote").html('"' + card.Citazione + '"')
				$("#modalQuote").show()
			} else {
				$("#modalQuote").html("")
				$("#modalQuote").hide()
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












//Hangman - Breaking Bad theme

//Steps:
// 1. Choose random Breaking Bad related word
// 2. Display Hangman screen with word to be solved and instructions
// 3. Wait for user to press a letter-key
// 4. Check to see if letter is part of the word
// 5. If letter matches any of the word, display the letter in the word
// 6. If letter is not part of the word, update guesses remaining and hangman
// 7. Display the letters guessed already and guesses remaining 
// 8. If user completes the word, display winning sequence (sound-bite/song, graphic/animation)
// 9. If user runs out of guesses, display losing sequence (sound-bite/song, graphic animation)  
// 10. Start game over with new random word

	video.addEventListener('ended',function() {
		video.style.display = 'none';
	});


	var hangman = {
		wins: 0,
		losses: 0,
		guesses: 8,
		userGuess: " ",
		hits: 0,
		hit: false,
		repeat: false,
		invKey: false,
		winner: false,
		gameover: false,
		lettersGuessed: [],
		message: " ",
		instruct: " ",
		stsimg: " ",
		word: " ",
		statusHTML: " ",
		status_imgHTML: " ",
		wordsHTML: " ",
		hangmanHTML: " ",
		formattedWord: [],
		maskedString: " ",
		owords:[gustavo = {oword: "gustavo", lpic: " ", wpic: " ", lsound: " ", wsound: " "},
			    fring = {oword: "fring", lpic: " ", wpic: " ", lsound: " ", wsound: " "},
			    lydia = {oword: "lydia", lpic: " ", wpic: " ", lsound: " ", wsound: " "},
			    albuquereque = {oword: "albuquereque", lpic: " ", wpic: " ", lsound: " ", wsound: " "},
			    tuco = {oword: "tuco", lpic: " ", wpic: " ", lsound: " ", wsound: " "},
			    fring = {oword: "fring", lpic: " ", wpic: " ", lsound: " ", wsound: " "}
				]
		//look into using an array of word objects instead of just words. a word object can have it's own personalized win/loss images and sounds
		words: ["gustavo", "fring", "lydia", "albuquereque", "tuco", "flynn", "chemistry", "teacher", 
				"cancer", "crystal", "lawyer", "hank", "heisenberg", "walter", "white", "meth",
				"cranston", "pinkman", "saul", "goodman", "skyler", "ehrmantraut", "ricin", "salamanca"],

		initial: function() {
			this.chooseRandomWord()
			this.formatWord()


			this.message = "Welcome to Hangman: Breaking Bad Edition!"

			this.instruct = "Press any letter to start..."

		   	this.stsimg = " "

		},

		chooseRandomWord: function() {
			 
			this.word = this.words[Math.floor(Math.random() * this.words.length)]
			
			for(var i=0; i < this.word.length; i++) {

				this.formattedWord[i] = this.word.substr(i, 1)

			}

			// this.maskedString = this.formattedWord.toString().replace(/,/g, " ")

			
		},//close function chooseRandomWord

		validKey: function() {
			if ((this.userGuess >= "a") && (this.userGuess <= "z")) {
				this.message = " "
				this.instruct = "Press any letter to continue..."
				this.invKey = false
				return true
			}
			else {
				this.message = "Invalid key pressed, try again!"
				this.instruct = "Press any letter to continue..."
			   	this.invKey = true
				return false
			}
		},

		newLetter: function() {
			if (this.lettersGuessed.indexOf(this.userGuess) >= 0) {
				this.message = "You tried that letter already!"
			   	this.instruct = "Press any letter to continue..."
			   	this.repeat = true
				return false
			}
			else {
				//add letter to guessed letters
				this.lettersGuessed.push(this.userGuess)
				this.repeat = false
				return true	
			}
		},
		
		letterHit: function() {
			if (this.word.indexOf(this.userGuess) >= 0) {
				this.message = "Hit! Keep it up!"
				this.hit = true
				return true
			}
			else {
				this.message = "Miss! Try Again!"
				this.hit = false
				return false	
			}

		},

		formatWord: function() {
			this.maskedString = ""
			this.hits = 0
				 
			for(var i=0; i < this.word.length; i++) {
				if (this.lettersGuessed.indexOf(this.word.substr(i, 1)) >= 0) {
					this.formattedWord[i] = this.word.substr(i, 1)
					this.maskedString += (this.word.substr(i, 1)	+ " ")	
					this.hits++
				}
				else {
					this.formattedWord[i] = "_"	
					this.maskedString += "_ "
				}
			}
		},

		letterMiss: function() {
			this.guesses--
			if (this.guesses === 0) {
    			this.message = "Game Over!"
    			this.instruct = "Press Enter to start with a new word."
    			this.stsimg = "breakingbad_dead.jpg"
    			this.losses++
			   	
    		} 

		},

		checkWin: function() {
			if (this.hits === this.word.length) {
				// this.winner = true
				this.message = "Winner!"
				this.instruct = "Press Enter to start with a new word."
				this.stsimg = "yeah_bitch.gif"
				this.wins++
			   	
			}

		},

		updateStatus: function() {

			this.statusHTML = "<h3> " + this.message + "</h3><h3>Wins: " + this.wins + "</h3><h3>Losses: " + this.losses +  
				"</h3> <h3>" + this.instruct + "</h3>"			
		},

		updateWords: function() {

			this.wordsHTML = "<h3>Word: " + this.maskedString + "</h3> <br> <h4>Guessed letters: " + this.lettersGuessed.toString() + 
			"</h4> <br> <h4>Guesses remaining: " + this.guesses + "</h4>"	
		},

		updateStatusImg: function() {

			if (!(this.stsimg === " ")) {
				this.status_imgHTML = "<img class=\"img-responsive\" id=\"sts\" style=\"width:100%;\" src=\"assets/images/" + this.stsimg + "\" alt=\"status image\">"
			}
			else {
				this.status_imgHTML = " "
			}	
		},

		updateHangman: function() {

			switch(this.guesses) {
			    case 8:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 7:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg.png\" alt=\"Hangman bg\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 6:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 5:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 4:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 3:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 2:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 1:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_07\" style=\"width:85%;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 0:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_08\" style=\"width:85%;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\"> " 	
					}
					
					break;
			    default:
			        this.hangmanHTML = "<h2>ERROR!!</h2>";
			}			


		},

		reset: function() {
			this.guesses = 8
			this.hits = 0
			this.winner = false
			this.gameover = false
			this.lettersGuessed = []
			this.word = " "
			this.formattedWord = []
			this.maskedString = " "
			this.chooseRandomWord()
			this.formatWord()
			this.message = "Hangman: Breaking Bad Edition!"
			this.instruct = "Press any letter to start."
		    this.stsimg = " "

		},

		html: function() {
			
			if (!(this.gameover) && !(this.winner)) {

				// Update Instructions and Status
				this.updateStatus()
				document.getElementById("status").innerHTML = (this.statusHTML)

				// Update Word and Guesses
				this.updateWords()
				document.getElementById("words").innerHTML = (this.wordsHTML)

				// Update Status Image
				this.updateStatusImg()
				document.getElementById("status_img").innerHTML = (this.status_imgHTML)
			

				// Update Hangman Images
				this.updateHangman()
				document.getElementById("hangman").innerHTML = (this.hangmanHTML)

				if (this.guesses === 0) {
					this.gameover = true
				}

				if (this.hits === this.word.length) {
				this.winner = true
				}

			}
		}




	} // close object Hangman

	
	//Initial Word, we start here

	hangman.initial()

	hangman.html()

	document.onkeyup = function(event) {
 
    if (((event.keyCode == 13) && hangman.winner) || ((event.keyCode == 13) && (hangman.guesses === 0))) {
    	 
    	hangman.reset()

		hangman.html()

    }
    else { 
    	if (hangman.guesses > 0) { //USER LOST: Do not allow user to play until they hit Enter to start a new word!
    		if (!(hangman.winner)) { //USER WON: Do not allow user to play until they hit Enter to start a new word!

			    hangman.userGuess = String.fromCharCode(event.keyCode).toLowerCase();
			    // confirm letter was pressed
			    if (hangman.validKey()) {
		    		// confirm letter was not guessed yet
			    	if (hangman.newLetter()) {
			    		//check letter exist in word
			    		if (hangman.letterHit()) {
						    // if hit, then process hit
						    hangman.formatWord()
			    			hangman.checkWin()
			    		} // hit
			    		else {	
						    // if no hit, then process miss
			    			hangman.letterMiss()
			    		}
			    	} // new letter
			    	// else {
			    	// 	hangman.message = "You tried that letter already!"
			    	// }
			    } // Valid key-stroke
			    // else {
			    // 	hangman.message = "Invalid key pressed, try again!"
			    // }
			 } // Winner, press enter
			 // else {
			 // 	hangman.message = "You Won! Press Enter to start with a new word."
			 // }
		} // guesses = 0, Loser
		// else {
		// 	hangman.message = "Game Over! Press Enter to start with a new word."
		// }
	}

		hangman.html()

	}// key press	
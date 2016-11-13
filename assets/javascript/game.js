
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


	var hangman = {
		wins: 0,
		losses: 0,
		guesses: 8,
		userGuess: " ",
		hits: 0,
		winner: false,
		lettersGuessed: [],
		message: " ",
		word: " ",
		htmlCode: " ",
		formattedWord: [],
		maskedString: " ",
		words: ["gustavo", "fring", "lydia", "albuquereque", "tuco", "flynn", "chemistry", "teacher", 
				"cancer", "crystal", "lawyer", "hank", "heisenberg", "walter", "white", "meth",
				"cranston", "pinkman", "saul", "goodman", "skyler", "ehrmantraut", "ricin", "salamanca"],

		initial: function() {
			this.chooseRandomWord()
			this.formatWord()


			this.message = "Welcome to Hangman: Breaking Bad Edition! Press any letter to start."

		   	this.htmlCode = "<h1> " + this.message + "</h1><br><br><br> <h2>Word: " + this.maskedString + "</h2><br><br><h3>Wins: " + this.wins + 
			"</h3><br><h3>Guessed letters: " + this.lettersGuessed.toString() + "</h3><br><h3>Guesses remaining: " + this.guesses + 
			"</h3><br><br> <h1>Press any letter to continue...</h1>"
		},

		chooseRandomWord: function() {
			 
			this.word = this.words[Math.floor(Math.random() * this.words.length)]
			
			for(var i=0; i < this.word.length; i++) {

				this.formattedWord[i] = this.word.substr(i, 1)

			}

			// this.maskedString = this.formattedWord.toString().replace(/,/g, " ")

			
		},//close function chooseRandomWord

		newLetter: function() {
			if (this.lettersGuessed.indexOf(this.userGuess) >= 0) {
				return false
			}
			else {
				//add letter to guessed letters
				this.lettersGuessed.push(this.userGuess)
				return true	
			}
		},
		
		letterHit: function() {
			if (this.word.indexOf(this.userGuess) >= 0) {
				this.message = "Hit! Keep it up!"
				return true
			}
			else {
				this.message = "Miss! Try Again!"
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
    			this.message = "Game Over! Press Enter to start with a new word."
    			this.losses++
    		} 

		},

		checkWin: function() {
			if (this.hits === this.word.length) {
				this.winner = true
				this.message = "Winner! Press Enter to start with a new word."
				this.wins++

			}

		},

		reset: function() {
			this.guesses = 8
			this.hits = 0
			this.winner = false
			this.lettersGuessed = []
			this.word = " "
			this.formattedWord = []
			this.maskedString = " "
			this.chooseRandomWord()
			this.formatWord()
			this.message = "Hangman: Breaking Bad Edition! Press any letter to start."

	       	this.htmlCode = "<h1> " + this.message + "</h1><br><br><br> <h2>Word: " + this.maskedString + "</h2><br><br><h3>Wins: " + this.wins + 
	    	"</h3><br><h3>Guessed letters: " + this.lettersGuessed.toString() + "</h3><br><h3>Guesses remaining: " + this.guesses + 
	    	"</h3><br><br> <h1>Press any letter to continue...</h1>"

		}




	} // close object Hangman

	
	//Initial Word, we start here

	hangman.initial()

	document.getElementById("game").innerHTML = (hangman.htmlCode)

	document.onkeyup = function(event) {
 
    if (((event.keyCode == 13) && hangman.winner) || ((event.keyCode == 13) && (hangman.guesses === 0))) {
    	 
    	hangman.reset()

    	document.getElementById("game").innerHTML = (hangman.htmlCode)

    }
    else { 
    	if (hangman.guesses > 0) {
    		if (!(hangman.winner)) {

			    hangman.userGuess = String.fromCharCode(event.keyCode).toLowerCase();
			    // confirm letter was pressed
			    if ((hangman.userGuess >= "a") && (hangman.userGuess <= "z")) {
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
			    	else {
			    		hangman.message = "You tried that letter already!"
			    	}
			    } // Valid key-stroke
			    else {
			    	hangman.message = "Invalid key pressed, try again!"
			    }
			 } // Winner, press enter
			 else {
			 	hangman.message = "You Won! Press Enter to start with a new word."
			 }
		} // guesses = 0, Loser
		else {
			hangman.message = "Game Over! Press Enter to start with a new word."
		}
	}

    	hangman.htmlCode = "<h1> " + hangman.message + "</h1><br><br><br> <h2>Word: " + hangman.maskedString + "</h2><br><br><h3>Wins: " + hangman.wins + 
    	"</h3><br><h3>Guessed letters: " + hangman.lettersGuessed.toString() + "</h3><br><h3>Guesses remaining: " + hangman.guesses + 
    	"</h3><br><br> <h1>Press any letter to continue...</h1>"

    	document.getElementById("game").innerHTML = (hangman.htmlCode)

	}// key press	
class MemoryGame {
	constructor(cards) {
		this.cards = cards
		this.pickedCards = []
		this.pairsClicked = 0
		this.pairsGuessed = 0
	}

	shuffleCards() {
		function shuffle(array) {
			var m = array.length,
				t,
				i

			// While there remain elements to shuffle…
			while (m) {
				// Pick a remaining element…
				i = Math.floor(Math.random() * m--)

				// And swap it with the current element.
				t = array[m]
				array[m] = array[i]
				array[i] = t
			}

			return array
		}

		this.cards = shuffle(this.cards)
	}

	checkIfPair(card1, card2) {
		this.pairsClicked++
		if (card1 === card2) {
			this.pairsGuessed++
			return true
		} else {
			return false
		}
	}

	isFinished() {
		console.log(this.cards)
		if (this.pairsGuessed === this.cards.length / 2) {
			return true
		}
		return false
	}
}

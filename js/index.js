//array de cartas
const cards = [
	{ name: 'aquaman', img: 'aquaman.jpg' },
	{ name: 'batman', img: 'batman.jpg' },
	{ name: 'captain america', img: 'captain-america.jpg' },
	{ name: 'fantastic four', img: 'fantastic-four.jpg' },
	{ name: 'flash', img: 'flash.jpg' },
	{ name: 'green arrow', img: 'green-arrow.jpg' },
	{ name: 'green lantern', img: 'green-lantern.jpg' },
	{ name: 'ironman', img: 'ironman.jpg' },
	{ name: 'spiderman', img: 'spiderman.jpg' },
	{ name: 'superman', img: 'superman.jpg' },
	{ name: 'the avengers', img: 'the-avengers.jpg' },
	{ name: 'thor', img: 'thor.jpg' },
	{ name: 'aquaman', img: 'aquaman.jpg' },
	{ name: 'batman', img: 'batman.jpg' },
	{ name: 'captain america', img: 'captain-america.jpg' },
	{ name: 'fantastic four', img: 'fantastic-four.jpg' },
	{ name: 'flash', img: 'flash.jpg' },
	{ name: 'green arrow', img: 'green-arrow.jpg' },
	{ name: 'green lantern', img: 'green-lantern.jpg' },
	{ name: 'ironman', img: 'ironman.jpg' },
	{ name: 'spiderman', img: 'spiderman.jpg' },
	{ name: 'superman', img: 'superman.jpg' },
	{ name: 'the avengers', img: 'the-avengers.jpg' },
	{ name: 'thor', img: 'thor.jpg' },
]
//instanciamos el memoryGame, la lógica del juego
const memoryGame = new MemoryGame(cards)
//barajamos las cartas
// memoryGame.shuffleCards()

window.addEventListener('load', event => {
	//se genera el HTML de las cartas
	let html = ''
	memoryGame.cards.forEach(pic => {
		html += `<div class="card" data-card-name="${pic.name}">`
		html += `<div class="back" name="${pic.img}"></div>`
		html += `<div class="front" style="background: url(img/${pic.img}) no-repeat"></div>`
		html += `</div>`
	})
	//se inyectan las cartas en el DOM
	document.querySelector('#memory-board').innerHTML = html

	//se recorren todas las cartas
	document.querySelectorAll('.card').forEach(card => {
		//se les añade la función que se dispara cuando se hace click
		card.addEventListener('click', () => {
			//giramos la carta y nos guardamos el div para compararlo más tarde
			card.classList.add('turned')
			memoryGame.pickedCards.push(card)

			compareCards()
			updateScores()
			checkFinish()
		})
	})
})

function compareCards() {
	//comprobamos que tenemos ya dos cartas guardadas
	if (memoryGame.pickedCards.length === 2) {
		//guardamos los divs de cada carta
		const cardDiv1 = memoryGame.pickedCards[0]
		const cardDiv2 = memoryGame.pickedCards[1]
		//y los nombres de cada carta
		const cardName1 = memoryGame.pickedCards[0].dataset.cardName
		const cardName2 = memoryGame.pickedCards[1].dataset.cardName

		//comparamos si son pareja, si no lo son volvemos a girar las cartas
		if (!memoryGame.checkIfPair(cardName1, cardName2)) {
			setTimeout(() => {
				cardDiv1.classList.remove('turned')
				cardDiv2.classList.remove('turned')
			}, 500)
		}
		//limpiamos las cartas para continuar
		memoryGame.pickedCards = []
	}
}

function updateScores() {
	//actualizamos la puntuación
	document.querySelector('#pairs-clicked').innerHTML = memoryGame.pairsClicked
	document.querySelector('#pairs-guessed').innerHTML = memoryGame.pairsGuessed
}

function checkFinish() {
	//si hemos terminado quitamos el tablero y ponemos un mensaje
	if (memoryGame.isFinished()) {
		document.querySelector('#memory-board').remove()

		// const winMessage = '<h1>VICTORIA!</h1>'
		// document.querySelector('body').innerHTML += winMessage
		//div de fondo
		const winDiv = document.createElement('div')
		winDiv.style = 'background-color: rgba(255, 255, 255, 0.4)'

		//titulo
		const winMessage = document.createElement('h1')
		winMessage.textContent = 'VICTORIA!'

		winDiv.appendChild(winMessage)
		document.querySelector('body').appendChild(winDiv)
	}
}

(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				puzzlePieces = document.querySelectorAll('.puzzle-pieces img'),
				dropZones = document.querySelectorAll('.drop-zone'),
				gameBoard = document.querySelector('.puzzle-board'),
				resetButton = document.querySelector('#resetButton'),
				dragZone = document.querySelector('.puzzle-pieces');

	const pieceNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];


	function changeImageSet() {
		// change all the image elements on the page -> draggable image sources
		// change the image elements on the left to match the selected puzzle
		pieceNames.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.puzzleref}.jpg`;
			puzzlePieces[index].id = `${piece + this.dataset.puzzleref}`;
		});

		// and set the drop zone background image based on the puzzle the user selects
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleref}.jpg)`;
		// debugger;
	}

	function allowDrag(event) {
		console.log('started draggin an image');
		event.dataTransfer.setData("text/plain", this.id);
	}

	function allowDragOver(event) {
		event.preventDefault();
		console.log('dragged over a drop zone');
	}

	function allowDrop(event) {
		// set up a variable to make it cleaner
		let zone = event.target;

		// check if the zone has our hasPiece class, (will not have it initially)
		// if the zone does not contain hasPiece, execute the allowDrop function
		while (!zone.classList.contains("hasPiece")) {
		// go and get the dragged element's ID from the data transfer object
			let currentImage = event.dataTransfer.getData("text/plain");
			let currentPiece = document.querySelector(`#${currentImage}`);
		// add that image to whatever drop zone we're dropping our image on
			zone.appendChild(currentPiece);
			zone.classList.add("hasPiece");
			// adding the class to the image as well to make sure you still can't drop
			currentPiece.classList.add("hasPiece");

		// return the variables so that they have hasPiece on them next time we try dropping
			return currentPiece;
			return zone;
		}
		
		// if hasPiece is in the zone or image's classlist, don't do anything 
		// (by default, allowDrop isn't allowed)
		return false;
	}

	function resetPuzzlePieces() {
	//	debugger;

		dropZones.forEach(zone => {
			// set up variables (node is the parent, piece will be the only child after we've dropped a piece)
			nodes = zone.children;

			let piece = zone.firstChild;

			// check each dropzone for a piece by checking for the hasPiece class
			// we added in the allowdrop function

			if (zone.classList.contains("hasPiece")) {
				// take out the piece
  				zone.removeChild(piece);
  				// take out the hasPiece class to tell the console that the zone is empty
  				zone.classList.remove("hasPiece");
  				// add the piece we removed to the dragzone
  				dragZone.appendChild(piece);
  			}
		})
	}

	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));

	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
		});

	resetButton.addEventListener('click', resetPuzzlePieces);
	// call the function and pass in the first nav button as a reference
	// research call, apply and bind -> look at MDN
	changeImageSet.call(puzzleButtons[0]);
})();

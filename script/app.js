(() => {
	// set up the puzzle pieces and boards
	// navButtons -> images at the bottom of the page
	const navButtons = document.querySelectorAll('#buttonHolder img'), 
		puzzleBoard = document.querySelector('.puzzle-board'), 
		puzzlePiece = document.querySelectorAll('.puzzle-pieces img'), 
		dropZones = document.querySelectorAll('.drop-zone');

		const pieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	// functions go here => what we want tot have happen when our triggers fire
	function changeImageSet() {
		// change the thumbnail images on the left to match the button image
		// and set a background image on the drop zone container
		//debugger;
		pieces.forEach((piece, index) => { 
		puzzlePiece[index].src = `images/${piece + this.dataset.puzzleindex}.jpg`;
		puzzlePiece[index].id =`${piece + this.dataset.puzzleindex}`; 
	});

		puzzleBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleindex}.jpg)`;
	}

	function dragStart(event) {
		console.log('started a drag');

		// capture the id of the element we're dragging
		// the dataTransfer object is part of the drag event -> you can use this
		// to temporarily store data
		// like an audio track, as an example 

		event.dataTransfer.setData("text/plain", this.id);

	}

	function allowDragOver(event) {
		event.preventDefault();
		console.log('you dragged something onto me!');
	}

	function allowDrop(event) {
		console.log('you dropped something on me!');

		let currentPiece = event.dataTransfer.getData("text/plain");

		event.target.appendChild(document.querySelector(`#${currentPiece}`));
	}

	// add some event handling for the nav navButtons
	navButtons.forEach(button => button.addEventListener('click', changeImageSet));
	//changeImageSet.call(puzzlePiece[0]);	

	// set up our Drag event
	puzzlePiece.forEach(piece => piece.addEventListener('dragstart', dragStart));

	// set up the dragover content for our drop zones

	dropZones.forEach(zone => zone.addEventListener('dragover', allowDragOver));
	dropZones.forEach(zone => zone.addEventListener('drop', allowDrop));

})();

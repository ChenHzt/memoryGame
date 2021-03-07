/* eslint-disable no-unused-expressions */
/* eslint-disable no-extend-native */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
class Card {
  constructor(_pair, _location) {
    this.pair = _pair;
    // this._pairContent = _pairContent;
    this.location = _location;
    this.status = 'closed';
    this.cardHTML = document.createElement('div');
    this.cardHTML.classList.add('card');
    this.cardHTML.setAttribute('data-pair-id', this.id);
    this.cardHTML.setAttribute('data-color', this.pair.color);
    this.cardHTML.style.backgroundColor = this.pair.color;
    document.querySelector('.gameBoard').appendChild(this.cardHTML);
    // this.cardHTML.addEventListener('click', );
  }

  static compare(card1, card2) {
    card1.getAttribute('data-pair-id') === card2.getAttribute('data-pair-id');
  }

  revealed() {
    this.cardHTML.classList.add('card--revealed');
    this.status = 'revealed';
  }

  close() {
    this.cardHTML.classList.add('card--');
    this.status = 'revealed';
  }
}

class Pair {
  // static imgs = ['']
  constructor(_pairId) {
    this.id = _pairId;
    // this.cards = [];
    this.color = `#${(0x1000000 + Math.random() * 0xffffff)
      .toString(16)
      .substr(1, 6)}`;
  }
}

Array.prototype.shuffle = function () {
  return this.sort(() => Math.random() - 0.5);
};

class Board {
  constructor(_pairAmount) {
    console.log('todo');
    this.openCards = [];
    this.pairAmount = _pairAmount;
    this.boardArr = new Array(this.pairAmount * 2);
    let pairID = 0;
    for (let i = 0; i < this.boardArr.length; i += 2) {
      this.boardArr[i] = pairID;
      this.boardArr[i + 1] = pairID;
      pairID++;
    }
    this.boardArr = this.boardArr.shuffle();
    this.pairs = new Array(this.pairAmount);
    for (let i = 0; i < this.pairAmount; i++) this.pairs[i] = new Pair(i);
    this.board = new Array(this.pairAmount * 2);

    for (let i = 0; i < this.boardArr.length; i++) {
      this.board[i] = new Card(this.pairs[this.boardArr[i]], i);
    }
    this.openedCards = [];
  }

  cardClicked(card) {
    if (card.status === 'revealed') return;
    if (card.status === 'open') return;
    this.openCards.push(card);
    card.status = 'open';
    if (this.openCards.length === 2) {
      if (Card.compare(this.openCards[0], this.openCards[1])) {
        this.openCards.forEach((card) => card.revealed());
      } else {
        this.openCards.forEach((card) => card.close());
      }
    }
  }
}

const board = new Board(6);

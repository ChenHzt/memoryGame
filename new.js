/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-extend-native */
/* eslint-disable max-classes-per-file */
class Card {
  constructor(_pair) {
    this.pair = _pair;
    // this.location = _location;
    this.status = 'closed';
  }

  renderCard() {
    this.cardHTML = document.createElement('div');
    this.colorClosed = '#000000';
    this.cardHTML.classList.add('card');
    this.cardHTML.setAttribute('data-status', 'closed');
    this.cardHTML.setAttribute('data-pair-id', this.pair.id);
    this.cardHTML.setAttribute('data-color', this.pair.color);
    // this.cardHTML.setAttribute('status', 'closed');
    document.querySelector('.gameBoard').appendChild(this.cardHTML);
  }

  static compare(card1, card2) {
    return (
      card1.cardHTML.getAttribute('data-pair-id') ===
      card2.cardHTML.getAttribute('data-pair-id')
    );
  }

  setRevealed() {
    this.cardHTML.setAttribute('data-status', 'revealed');

    this.status = 'revealed';
  }

  setOpen() {
    this.cardHTML.setAttribute('data-status', 'open');
    this.cardHTML.style.backgroundColor = this.pair.color;
    this.status = 'open';
  }

  setClosed() {
    this.cardHTML.setAttribute('data-status', 'closed');
    this.cardHTML.style.backgroundColor = this.colorClosed;
    this.status = 'closed';
  }
}

class Pair {
  constructor(_pairID) {
    this.color = `#${(0x1000000 + Math.random() * 0xffffff)
      .toString(16)
      .substr(1, 6)}`;
    this.id = _pairID;
  }
}

Array.prototype.shuffle = function () {
  return this.sort(() => Math.random() - 0.5);
};

class Board {
  constructor(_pairAmount) {
    this.openCards = [];
    this.pairAmount = _pairAmount;
    this.wrongTries = 0;
    this.pairs = new Array(this.pairAmount);
    for (let i = 0; i < this.pairAmount; i++) this.pairs[i] = new Pair(i);
    this.toDisable = false;
    this.cards = new Array(this.pairAmount * 2);
    for (let i = 0; i < this.cards.length; i++)
      this.cards[i] = new Card(this.pairs[Math.floor(i / 2)]);

    this.shuffleCards();
    this.cards.forEach((card) => card.renderCard());
    this.cards.forEach((card) =>
      card.cardHTML.addEventListener('click', (event) => this.cardClicked(card))
    );
  }

  shuffleCards() {
    this.cards = this.cards.shuffle();
  }

  cardClicked(card) {
    if (card.status === 'closed' && !this.toDisable) {
      this.openCards.push(card);
      card.setOpen();
      if (this.openCards.length === 2) this.caseSecondCard();
    }
  }

  caseSecondCard() {
    if (Card.compare(this.openCards[0], this.openCards[1])) {
      this.rightGuess();
    } else this.wrongGuess();
  }

  rightGuess() {
    this.openCards.forEach((card) => card.setRevealed());
    this.openCards = [];
  }

  wrongGuess() {
    this.toDisable = true;

    setTimeout(() => {
      this.openCards.forEach((card) => card.setClosed());

      this.openCards = [];
      this.wrongTries++;
      this.toDisable = false;
    }, 1000);
  }
}

const board = new Board(6);

let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let cardSymbols = ["♥", "♦️", "♣", "♠"];

let generatedCards = [];

function generateCards(quantity) {
  const generatedCards = [];

  while (generatedCards.length < quantity) {
    const number = cards[Math.floor(Math.random() * cards.length)];
    const symbol = cardSymbols[Math.floor(Math.random() * cardSymbols.length)];
    const color = symbol === "♥" || symbol === "♦️" ? "red" : "black";

    const newCard = { number, symbol, color };

    const existingCard = generatedCards.find(card => (
      card.number === newCard.number &&
      card.symbol === newCard.symbol &&
      card.color === newCard.color
    ));

    if (!existingCard) {
      generatedCards.push(newCard);
    }
  }

  return generatedCards;
}

function generateCardsUI() {
  const quantity = document.getElementById('field').value;
  generatedCards = generateCards(parseInt(quantity));
  const generatedCardsElement = document.getElementById('generatedCards');
  generatedCardsElement.innerHTML = '';

  generatedCards.forEach(card => {
    const cardElement = createCardElement(card);
    generatedCardsElement.appendChild(cardElement);
  });
}

function createCardElement(card) {
  const cardUnit = document.createElement('div');
  cardUnit.classList.add('cardUnit');

  const symbol1 = document.createElement('div');
  symbol1.classList.add('cardUnitSymbol1');
  symbol1.textContent = card.symbol;
  symbol1.style.color = card.color;

  const number = document.createElement('div');
  number.classList.add('cardUnitNumber');
  number.textContent = card.number;

  const symbol2 = document.createElement('div');
  symbol2.classList.add('cardUnitSymbol2');
  symbol2.textContent = card.symbol;
  symbol2.style.color = card.color;

  cardUnit.appendChild(symbol1);
  cardUnit.appendChild(number);
  cardUnit.appendChild(symbol2);

  return cardUnit;
}

function sortCards() {
  const originalOrderStep = [...generatedCards];
  const sortedCards = selectionSort([...generatedCards]);
  displaySortedCards([originalOrderStep, ...sortedCards]);
}

function selectionSort(cards) {
  const changesLog = [];

  for (let i = 0; i < cards.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < cards.length; j++) {
      if (compareCards(cards[j], cards[minIndex]) < 0) {
        minIndex = j;
      }
    }

    if (i !== minIndex) {
      const temp = cards[i];
      cards[i] = cards[minIndex];
      cards[minIndex] = temp;

      changesLog.push([...cards]);
    }
  }

  return changesLog;
}

function compareCards(card1, card2) {
  const cardOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  const index1 = cardOrder.indexOf(card1.number);
  const index2 = cardOrder.indexOf(card2.number);

  if (index1 !== index2) {
    return index1 - index2;
  }
  
  return card1.symbol.localeCompare(card2.symbol);
}

function displaySortedCards(sortedCards) {
  const sortedCardsElement = document.getElementById('sortedCards');
  sortedCardsElement.innerHTML = '';

  sortedCards.forEach((step, index) => {
    const stepElement = document.createElement('div');
    stepElement.classList.add('step');
    stepElement.textContent = `${index + 1}:`;
    
    step.forEach(card => {
      const cardElement = createCardElement(card);
      stepElement.appendChild(cardElement);
    });

    sortedCardsElement.appendChild(stepElement);
  });
}
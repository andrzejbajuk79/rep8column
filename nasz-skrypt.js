function randomString() {
	var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";

	var str = "";
	for (var i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	console.log(str);
        return str;
}

randomString();




function Column(name) {
	var self = this;
	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

    function createColumn() {
    	var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnList = $('<ul>').addClass('column-list');
		var $columnDelete = $('<button>').addClass('btn-delete').append("<img id='theImg1' src='http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-edit-delete-icon.png'/>");
		var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ
		$columnDelete.click(function() {
			self.deleteColumn();
		});
		$columnAddCard.click(function(event) {
		self.addCard(new Card(prompt("Wpisz nazwę karty")));
  	});
  	// KONSTRUOWANIE ELEMENTU KOLUMNY
	$column.append($columnTitle)
		.append($columnDelete)
		.append($columnAddCard)
		.append($columnList);

	// ZWRACANIE STWORZONEJ  KOLUMNY
	  return $column;
    	}
}

Column.prototype = {
    addCard: function(card) {
	this.$element.children('ul').append(card.$element);
    },
    deleteColumn: function() {
      this.$element.remove();
    }
};


function Card(description) {
	var self = this;
	this.id = randomString();
	this.description = description;
	this.$element = createCard(); //
	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete').append("<img id='theImg' src='http://icons.iconarchive.com/icons/double-j-design/ravenna-3d/128/Accept-icon.png'/>");
		// PRZYPIĘCIE ZDARZENIA
		$cardDelete.click(function(){
	    self.removeCard();
	});
	$card.append($cardDelete)
		 .append($cardDescription);
		 console.log('$card', $card);
	return $card;
	}
}


Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
};
var board = {name: 'Tablica Kanban', addColumn: function(column) {
	this.element.append(column.$element);
	initSortable();
	},
	element: $('#board .column-container')
};

function initSortable() {$('.column-list').sortable({
	connectWith: '.column-list',
	placeholder: 'card-placeholder'
	}).disableSelection();  
}
    

$('.create-column').click(function(){
	var name = prompt('Wpisz nazwę kolumny');
	var column = new Column(name);
    	board.addColumn(column);
  });
      
 // TWORZENIE KOLUMN
var zakupy = new Column('Zakupy');
var rachunki = new Column('Rachunki');
var doneColumn = new Column('Zrobione');

// DODAWANIE KOLUMN DO TABLICY
board.addColumn(rachunki);
board.addColumn(zakupy);
board.addColumn(doneColumn);


// TWORZENIE NOWYCH EGZEMPLARZY KART
var card1 = new Card('maslo');
var card2 = new Card(' chleb');
var card3 = new Card('prad');
var card4 = new Card('piwo');
var card5 = new Card('telefon');

// DODAWANIE KART DO KOLUMN
zakupy.addCard(card1);
zakupy.addCard(card2);
zakupy.addCard(card4);


rachunki.addCard(card3);
rachunki.addCard(card5);

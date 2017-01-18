'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
	'id': 'p306',
	'vehicule': 'peugeot 306',
	'pricePerDay': 20,
	'pricePerKm': 0.10
}, {
	'id': 'rr-sport',
	'pricePerDay': 60,
	'pricePerKm': 0.30
}, {
	'id': 'p-boxster',
	'pricePerDay': 100,
	'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
	'id': '1-pb-92',
	'driver': {
		'firstName': 'Paul',
		'lastName': 'Bismuth'
	},
	'carId': 'p306',
	'pickupDate': '2016-01-02',
	'returnDate': '2016-01-02',
	'distance': 100,
	'options': {
	'deductibleReduction': false
},
	'price': 0,
	'commission': {
		'insurance': 0,
		'assistance': 0,
		'drivy': 0
	}
}, {
	'id': '2-rs-92',
	'driver': {
		'firstName': 'Rebecca',
		'lastName': 'Solanas'
	},
	'carId': 'rr-sport',
	'pickupDate': '2016-01-05',
	'returnDate': '2016-01-09',
	'distance': 300,
	'options': {
		'deductibleReduction': true
	},
	'price': 0,
	'commission': {
		'insurance': 0,
		'assistance': 0,
		'drivy': 0
	}
}, {
	'id': '3-sa-92',
	'driver': {
		'firstName': ' Sami',
		'lastName': 'Ameziane'
	},
	'carId': 'p-boxster',
	'pickupDate': '2015-12-01',
	'returnDate': '2015-12-15',
	'distance': 1000,
	'options': {
		'deductibleReduction': true
	},
	'price': 0,
	'commission': {
		'insurance': 0,
		'assistance': 0,
		'drivy': 0
	}
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
	'rentalId': '1-pb-92',
	'payment': [{
		'who': 'driver',
		'type': 'debit',
		'amount': 0
	}, {
		'who': 'owner',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'insurance',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'assistance',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'drivy',
		'type': 'credit',
		'amount': 0
	}]
	}, {
		'rentalId': '2-rs-92',
		'payment': [{
			'who': 'driver',
			'type': 'debit',
			'amount': 0
		}, {
			'who': 'owner',
			'type': 'credit',
			'amount': 0
		}, {
			'who': 'insurance',
			'type': 'credit',
			'amount': 0
		}, {
			'who': 'assistance',
			'type': 'credit',
			'amount': 0
		}, {
			'who': 'drivy',
			'type': 'credit',
			'amount': 0
		}]
	}, {
	'rentalId': '3-sa-92',
	'payment': [{
		'who': 'driver',
		'type': 'debit',
		'amount': 0
	}, {
		'who': 'owner',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'insurance',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'assistance',
		'type': 'credit',
		'amount': 0
	}, {
		'who': 'drivy',
		'type': 'credit',
		'amount': 0
	}]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//exercice 1
function locationTime(d1, d2) {
	var pickUpD = new Date(d1);
	var returnD = new Date(d2);
    var tmp = ((returnD - pickUpD) / (1000 * 60 * 60 * 24)) + 1 ;
	return tmp;
}
function price(i) {
	var rental = rentals[i];
	var car;
	
	for(var j =0; j  < cars.length; ++j) {
		if(cars[j].id == rental.carId){
			car = cars[j];
		}
	}
	
	console.log("     rental time = " + locationTime(rental.pickupDate, rental.returnDate) + " days" );
	rentals[i].price = (car.pricePerDay * locationTime(rental.pickupDate, rental.returnDate))
						+ (car.pricePerKm * rental.distance);
	console.log("     rental price before reduction = " + rentals[i].price + " €" );
	rentals[i].price = (car.pricePerDay * locationTime(rental.pickupDate, rental.returnDate) * reductionPrice(i, rental.pickupDate, rental.returnDate))
						+ (car.pricePerKm * rental.distance);
	console.log("     rental price after reduction = " + rentals[i].price + " €" );
	
	commission(i, rental.pickupDate, rental.returnDate.drivy);
	
	//exercice 4
	if(rentals[i].options.deductibleReduction) {
		car.pricePerDay += 4; //if the user subscribed
	}
	
	rentals[i].price = (car.pricePerDay * locationTime(rental.pickupDate, rental.returnDate) * reductionPrice(i, rental.pickupDate, rental.returnDate))
						+ (car.pricePerKm * rental.distance);
	console.log("     rental price with option = " + rentals[i].price + " €" );
}
function rentalsPrice() {
	for(var i = 0; i < rentals.length; ++i){
		console.log("order " + i );
		price(i);
	}
}

//exercice 2
function reductionPrice(i, d1, d2) {
	var day = locationTime(d1, d2)
	var percent
	
	if ( day > 1 && day <= 4) { percent = 0.9;}
	else if ( day > 4 && day <= 10) { percent = 0.7; }
	else if ( day > 10) { percent = 0.5; }
	else { percent = 1; }
	return percent;
}

//exercice 3
function commission(i, d1, d2) {
	var valuecomm = rentals[i].price * 0.3;
	var comm = rentals[i].commission;
	
	comm.insurance = valuecomm * 0.5;
	comm.assistance = locationTime(d1, d2);
	comm.drivy = valuecomm - comm.insurance - comm.assistance;
}

//exercice 5
function getRentalId(id) {
	for (var i = 0; i < rentals.length; i++) {
		if(rentals[i].id == id){
			return rentals[i];
		}
	}
}
for (var i = 0; i < actors.length; i++) {
	for (var j = 0; j < actors[i].payment.length; j++) {
		switch(actors[i].payment[j].who){
			case "driver":
				actors[i].payment[j].amount = getRentalId(actors[i].rentalId).price;
				break;
			case "owner":
				var rental = getRentalId(actors[i].rentalId);
				actors[i].payment[j].amount = rental.price - rental.commission.insurance - rental.commission.drivy - rental.commission.assistance;
				break;
			case "insurance":
				var rental = getRentalId(actors[i].rentalId);
				actors[i].payment[j].amount = rental.commission.insurance;
				break;
			case "assistance":
				var rental = getRentalId(actors[i].rentalId);
				actors[i].payment[j].amount = rental.commission.assistance;
				break;
			case "drivy":
				var rental = getRentalId(actors[i].rentalId);
				actors[i].payment[j].amount = rental.commission.assistance + 4 * locationTime(rental.pickupDate, rental.returnDate);
				break;
			default:
		}
	}
}

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
rentalsPrice();

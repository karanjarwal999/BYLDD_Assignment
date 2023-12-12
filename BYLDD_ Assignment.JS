
// Challenge 1: Food Delivery Application Price Calculator

function calculateTotalPrice(items, borough, userType, dayOfWeek, tip, promoCode) {
    // Menu Prices
    const menuPrices = {
        pizza: { small: 10, medium: 15, large: 20 },
        pasta: 20,
        salad: 15,
    };

    // Tax rate
    const taxRate = 10;     //10 %

    // Delivery Fees
    const deliveryFees = {
        "Manhattan": 5,
        "Brooklyn": 6,
        'The Bronx': 6,
        "Queens": 4,
        'Staten Island': 10,
    };

    // Discount amounts
    const weekdayDiscount = 2;
    const thursdayDiscount = 3;


    // Determine base prices based on items
    let subtotal = 0;
    for (const order of items) {
        if (order.item === 'pizza') {
            let temp = menuPrices.pizza[order.size] * order.quantity;

            promoCode = 'HALF-OFF-PIZZA' ? subtotal = temp / 2 : subtotal += temp

        } else {
            subtotal += menuPrices[order.item] * order.quantity;
        }
    }

    //  Adding promo codes 
    if (promoCode == "30-OFF") {
        subtotal = subtotal - (subtotal * 30 / 100)
    }


    // Apply weekday and Thursday discounts for delivery fee
    let deliveryFee = deliveryFees[borough];
    if (dayOfWeek === 'Thursday') {
        deliveryFee -= thursdayDiscount;
    } else {
        deliveryFee -= weekdayDiscount
    }


    // Special discounts for seniors and students
    if (userType === 'senior') {
        deliveryFee -= 2;
    } else if (userType === 'student') {
        deliveryFee -= 1;
    }

    // Incase deliveryFee goes less then 0
    if (deliveryFee < 0) { deliveryFee = 0 }


    // FREE delivery on large order and FREEDELEVERY promo code
    const itemCount = items.reduce((total, order) => total + order.quantity, 0);
    if (itemCount >= 8 || subtotal > 100 || promoCode == 'FREEDELIVERY') {
        deliveryFee = 0;
    }


    // Calculating tax
    const tax = subtotal * taxRate / 100;


    // Calculate total billing amount   and tax before gratuity and delivery fees
    let total = subtotal + tax + deliveryFee;

    // Calculating tip / gratuity
    if (tip.type === 'percentage') {
        total += subtotal * tip.value / 100;  // value % before tax
    } else {
        total += tip.value;
    }

    // Return the final price rounded to two decimal places
    return total.toFixed(2);
}




// Challenge 2: Compose Functions

function compose(pipeline) {

    return function (value) {
        //  deu to js Closure this function have acess to functions
        let answer = pipeline.reduce((acc, func) => {
            // after returning function value acc will become function value for next items
            return func(acc)
        }, value)

        console.log(answer)
        return answer
    };
}



// Challenge 3: Missing Lowercase Letters

function letters(word) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const missingChar = [];

    for (let character of alphabet) {
        if (!word.includes(character)) {  // if character is not in word then push into array
            missingChar.push(character);
        }
    }
    return missingChar
}




// Challenge 4: Debug Morning Routine

// bug : when we are attaching student methods to actionToTake "this" context is removed from it 
// reslove : need to add .bind method

class Student {

    constructor() {
        this.minutesLeft = 60;
    }

    digest() {
        console.log('digesting...');
        this.catchBus();
    }

    eat() {
        console.log('eating...');
        this.minutesLeft -= 30;
        this.digest();
    }

    catchBus() {
        console.log(`walking to the bus with ${this.minutesLeft} minutes left`);
        this.minutesLeft = 0;
    }

    showerAndBrushTeeth() {
        console.log('walking downstairs');
        this.minutesLeft -= 30;
    }

    wakeUp() {
        console.log('waking up...');
    }
}

function morningRoutine() {
    const student = new Student();

    student.wakeUp();
    student.showerAndBrushTeeth();

    // bug : when we are attaching student methods to actionToTake "this" context is removed from it 
    // reslove : need to add .bind method

    // const actionToTake = student.minutesLeft >= 30 ? student.eat : student.catchBus;
    const actionToTake = student.minutesLeft >= 30 ? student.eat.bind(student) : student.catchBus.bind(student);

    actionToTake();
}




// Challenge 5: One to Ten Timer

function oneToTen() {
    let count = 1
    let interval = setInterval(function () {

        console.log(count++)

        if (count > 10) { clearInterval(interval) }  //clearing the interval after count 10

    }, 1000)
}
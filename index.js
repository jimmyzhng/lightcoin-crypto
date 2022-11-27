class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    // calc balance using transaction objects
    let sum = 0;
    for (const trans of this.transactions) {
      sum += trans.value;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

//
class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return console.log('Sorry! That is not a valid option.');
    }
    this.time = new Date();
    this.account.addTransaction(this);
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}
// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAcc = new Account('jimmyzhng');

console.log('Starting Account Balance:', myAcc.balance);

d1 = new Deposit(50, myAcc);
d1.commit();
console.log('Transaction 1:', d1);

t2 = new Withdrawal(500, myAcc);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(1000, myAcc);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAcc.balance);

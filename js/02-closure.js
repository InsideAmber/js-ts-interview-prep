export function createAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      console.log(`Deposited: ₹${amount}, New Balance: ₹${balance}`);
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log(`Withdrawn: ₹${amount}, Remaining Balance: ₹${balance}`);
      } else {
        console.log("❌ Insufficient funds!");
      }
    },
    getBalance() {
      return balance;
    }
  };
}

// ❌ No way to directly change balance
// myAccount.balance = 100000; // won't work (balance is private)

/**
What happened here?
balance is not accessible from outside.

Only deposit, withdraw, and getBalance can access it.

✅ That’s data encapsulation using closures.
 */


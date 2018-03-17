# Week 1 Project: VirtLotto

Due: Sunday, March 18th at 10pm

Overview: Build a simple DApp that allows users to bet on which number will be selected by a random number generator (kind of like the lottery).

## User Stories
The following user stories must be completed:

- [ ] The contract has one operation pickNumber(uint number) payable.
* pickNumber should accept integer between 1 and 10 inclusive, and accept any amount of ether (minimum bet is X finney).
* After Y calls to pickNumber, the contract will choose a random number.
* X and Y are configurable in the constructor of the contract.
The winner(s) get to keep all the money that has been pooled in the contract. If there is more than one winner, the prize money is split evenly.
- [ ] Addresses are limited on the number of tickets. One address can only purchase a maximum of 4 tickets.
- [ ] Users should be able to pick numbers via a simple web interface. A sample index.html will be provided to you by Wednesday.

## Tips

* Creating a random number is a bit difficult. For this example, you can try using something like this: function random() private returns (uint){ return uint8(uint256(keccak256(block.timestamp, block.difficulty))%10); }
* You can use the require keyword to check that your parameters are correct.

## Advanced

The following advanced user stories are optional. You're not required to do these, but you will learn more from doing them:

* Make a "true" random number. A common example is to use Oraclize.
* Contract picks winner after 5 calls or 5 minutes, whichever happens first. To schedule calls, you might want to look into using the Ethereum Alarm Clock.
* Contract offers dynamic odds. Once a number is picked, the payout to the winners decreases and odds on others increase proportionally.

## Development

### Build and Deploy the contract

```
$ npm install
$ npm run build
$ npm run deploy
```
### Start frontend app

```
$ npm run dev
```

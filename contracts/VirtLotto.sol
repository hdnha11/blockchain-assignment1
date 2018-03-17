pragma solidity ^0.4.20;

contract VirtLotto {
    address owner;
    uint minimumBet = 100 finney;
    uint public totalBet = 0;
    uint public numberOfBets = 0;
    uint public maxAmountOfBets = 5;
    uint public constant maxAmountOfTickets = 4;
    uint public constant range = 10;
    address[] public players;

    struct Ticket {
        uint amount;
        uint number;
    }

    mapping(address => Ticket[]) public tickets;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function VirtLotto(uint _minimumBet, uint _maxAmountOfBets) public {
        owner = msg.sender;

        if (_minimumBet > 0) {
            minimumBet = _minimumBet;
        }

        if (_maxAmountOfBets > 0) {
            maxAmountOfBets = _maxAmountOfBets;
        }
    }

    function pickNumber(uint number) public payable {
        require(number >= 1 && number <= range);
        require(msg.value >= minimumBet);
        require(canPlay(msg.sender));

        Ticket memory ticket = Ticket({amount: msg.value, number: number});

        tickets[msg.sender].push(ticket);

        players.push(msg.sender);

        totalBet += msg.value;
        numberOfBets++;

        if (numberOfBets >= maxAmountOfBets) {
            generateWinner();
        }
    }

    function canPlay(address player) public view returns (bool) {
        Ticket[] storage playerTickets = tickets[player];

        if (playerTickets.length > maxAmountOfTickets) {
            return false;
        }

        return true;
    }

    function generateWinner() public onlyOwner {
        uint winningNumber = (uint(keccak256(block.timestamp, block.difficulty)) % range) + 1;

        distributePrizes(winningNumber);
    }

    function distributePrizes(uint winningNumber) private {
        address[] memory winners;
        uint count;

        (winners, count) = chooseWinners(winningNumber);

        uint winnerEtherAmount = totalBet / winners.length;

        resetGame();

        for (uint i = 0; i < count; i++) {
            if (winners[i] != address(0)) {
                winners[i].transfer(winnerEtherAmount);
            }
        }
    }

    function chooseWinners(uint winningNumber) private view returns (address[], uint) {
        address[] memory winners;
        uint count;

        for (uint i = 0; i < players.length; i++) {
            address player = players[i];
            for (uint j = 0; j < tickets[player].length; j++) {
                Ticket storage ticket = tickets[player][j];
                if (ticket.number == winningNumber) {
                    winners[count] = player;
                    count++;
                }
            }
        }

        return (winners, count);
    }

    function resetGame() private {
        for (uint i = 0; i < players.length; i++) {
            address player = players[i];
            delete tickets[player];
        }
        players.length = 0;
        totalBet = 0;
        numberOfBets = 0;
    }
}

pragma solidity ^0.4.20;

contract VirtLotto {
    struct Ticket {
        address owner;
        uint amount;
        uint number;
    }

    struct TicketType {
        uint number;
        uint totalTickets;
        mapping(uint => Ticket) tickets;
    }

    event Win(
        address winner,
        uint winningNumber
    );

    address owner;
    uint minimumBet = 100 finney;
    uint public totalBet = 0;
    uint public numberOfBets = 0;
    uint public maxAmountOfBets = 5;
    uint public constant maxAmountOfTickets = 4;
    uint public constant range = 10;
    address[] players;
    mapping(uint => TicketType) public ticketTypes;
    mapping(address => uint) public playerTicketsCount;

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

        TicketType storage ticketType = ticketTypes[number];

        ticketType.tickets[ticketType.totalTickets] = Ticket({
            owner: msg.sender,
            amount: msg.value,
            number: number
        });
        ticketType.totalTickets++;
        playerTicketsCount[msg.sender]++;

        if (!playerExists(msg.sender)) {
            players.push(msg.sender);
        }

        totalBet += msg.value;
        numberOfBets++;

        if (numberOfBets >= maxAmountOfBets) {
            generateWinner();
        }
    }

    function canPlay(address player) public view returns (bool) {
        return playerTicketsCount[player] < maxAmountOfTickets;
    }

    function draw() public onlyOwner returns (uint, address[]) {
        uint winningNumber;
        address[] memory winners;

        (winningNumber, winners) = generateWinner();

        return (winningNumber, winners);
    }

    function generateWinner() private returns (uint, address[]) {
        uint winningNumber = generateRandomNumber();
        address[] memory winners = distributePrizes(winningNumber);

        return (winningNumber, winners);
    }

    function distributePrizes(uint winningNumber) private returns (address[]) {
        TicketType storage ticketType = ticketTypes[winningNumber];
        address[] memory winners = new address[](ticketType.totalTickets);

        for (uint i = 0; i < ticketType.totalTickets; i++) {
            address winner = ticketType.tickets[i].owner;
            winners[i] = winner;
            emit Win(winner, winningNumber);
        }

        if (winners.length > 0) {
            uint winnerEtherAmount = totalBet / winners.length;

            resetGame();
            totalBet = 0;

            for (i = 0; i < ticketType.totalTickets; i++) {
                if (winners[i] != address(0)) {
                    winners[i].transfer(winnerEtherAmount);
                }
            }
        } else {
            resetGame();
        }

        return winners;
    }

    function generateRandomNumber() private view returns (uint) {
        return (uint(keccak256(block.timestamp, block.difficulty)) % range) + 1;
    }

    function playerExists(address player) private view returns (bool) {
        for (uint i = 0; i < players.length; i++) {
            if (players[i] == player) {
                return true;
            }
        }

        return false;
    }

    function resetGame() private {
        for (uint i = 1; i <= range; i++) {
            delete ticketTypes[i];
        }

        for (i = 0; i < players.length; i++) {
            delete playerTicketsCount[players[i]];
        }

        players.length = 0;
        numberOfBets = 0;
    }
}

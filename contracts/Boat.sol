pragma solidity >= 0.7.0 < 0.9.0;

contract Boat
{

    address public player1;
    address public player2;

    uint[] private player1_moves;
    uint[] private player2_moves; 

    uint[] private moves; 

    uint[] public verifier_output;

    uint8 private move;

    bool public gameOver;
    
    struct GameState
    {
        uint8 spot_selected;
        address whoseTurn;
    }

    GameState public state;

    event GameStarted();
    event MoveMade(address player, uint8 selection);

    msg.sender = player1;

    address public loser 

    function move(uint value) public
    {
        require(!gameOver,"Game Concluded");

        require(msg.sender == state.whoseTurn,"Currently Other Players Turn");

        //adding the move to the array of all game moves 

        moves.push(value);

        //solidity verifier contract that will return an output 
        //verifier_output = Verifier(moves);

        if (moves[-1]==0 and moves[-2]==0)
        {
            gameOver = true;
        }

        if (verifier_output == 1)
        {
            loser = msg.sender
            gameOver = true;
        }        

        if msg.sender == player1
        {
            player1_moves.push(value)
        }
        else
        {
            player2_moves.push(value)
        }
    }

    address public winner;

    function Winner(uint moves1[],uint moves2[],address player1, address player2, address winner, address loser)
    {
        require(gameOver,"Game must be over to start determining winner");

        if loser == player1
        {
            winner = player2;
        }
        
        if loser == player2
        {
            winner = player1;
        }

        for (uint i=0; i<moves1.length; i++)
        {
            if moves1[i] == 0
            {
                
            }
        }

        for (uint i=0; i<moves2.length; i++)
        {
            if moves2[i] == 0
            {
                
            }
        }

        if moves1.length > moves2.length
        {
            winner = player1;
        }

        if moves2.length > moves1.length
        {
            winner = player2;
        }

        return winner;
    }
}
// SPDX-License-Identifier: GPL
pragma solidity ^0.8.0;

contract Boat
{

  //struct holds the players address and wager amount
  struct Player
  {
    address adres;
    uint wager;
    uint turn;
    uint points;
  }

//may be switched to public later 
  Player[] public player;

  function add_connected_addreses
  //stores 5 addresses in a private array 'player_addresses_array'
  //there will be a fucntionaltiy to store incoming players into the array and then remove them based on game events
  address[5] private player_addresses_array;

  Player_Wager[] private play_wage;

  Player_Turn[] private play_turn;

  .push()

  //this address is who holds the testnet tokens and pays out when needed 
  address _treasury;

  

  function treasury_pays_player()


  //name of proposal
  bytes32 _name;

  //mapping to chekc if a user has already voted on a proposal
  mapping(address => bool) hasVoted;


  constructor(bytes32 name, bytes32[] memory optionNames, address proposer) public {
    _proposer = proposer;
    _name = name;

    //for each of the options names, create a new Option object and append to 'options' dynamic array
    for (uint i = 0; i < optionNames.length; i++) {
      options.push(Option({
        optionName: optionNames[i],
        voteCount: 0
      }));
    }
  }


  function assign_turn() external
  {
    for (uint i = 0; i < option.length,i++):

    address sender = msg.sender;
    require(!hasVoted[sender], "This address has already voted on this proposal");
    hasVoted[sender] = true;
    options[option].voteCount += 1;
  }

  function winningOption() public view
            returns (uint winningOption_)
    {
        uint winningOptionCount = 0;
        for (uint p = 0; p < options.length; p++) {
            if (options[p].voteCount >= winningOptionCount) {
                winningOptionCount = options[p].voteCount;
                winningOption_ = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() external view
            returns (bytes32 winnerName_)
    {
        winnerName_ = options[winningOption()].optionName;
    }
}


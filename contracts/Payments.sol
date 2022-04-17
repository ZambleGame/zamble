pragma solidity ^0.8.0;

//importing payments methods 

contract Payment
{
    address public pot_address;
    address[] public players;
    uint256 public expiration;


    function Pay_Players_Pot(address _pot_address, address[] _players) public payable
    {
        //players is an 
        players = _players;
        pot_address = _pot_address;


    }

    function Pay_Pot_Players(address _pot_address, uint _players) public payable 
    {





    }
}
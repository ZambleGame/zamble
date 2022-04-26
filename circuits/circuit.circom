pragma circom 2.0.0;

//The comparators circom file allows us to compare the vlaues in the array passed into Game()
include "../../client/node_modules/circomlib/circuits/comparators.circom"

//Might need input size
template Game(n)
{
  //The moves[] array is to track all the moves in the array that will be growing in size as more inputs are added
  //It's private, indicating it must remain a secret
  signal private input moves[n]

  //If the function iterates through the moves[] array and finds that the decrypted move is the same as another
  //Send out a output of 0 for "valid move" and 1 for "invalid move"
  signal output safe_eject;

  //component upper_bound = LessThan(37)

  //component lower_bound = LessThan(0)

  // Count duplicates
  var pairs = 0;
  for (var i=0; i<n-1; i++)
  {
     for (var j=i+1; j<n; j++)
     {
        if (moves[i] == moves[j]) && (moves[i] != 0 && moves[j]!= 0)
        {
           pairs++;
           // break doesn’t work. Just force j and i to exit
           j = n+1;
           i = n+1;
        }
     }
  }

  for (var i=0; i<n; i++)
  {
    if (moves[i] < 37  && moves[i] > -1) && (pairs == 0)
    {
      safe_eject <== 0;
    }
    else
    {
       safe_eject <== 1;
    }
  }

}

//We'll pass in the number of inputs inside Game() //so in this case 8 input
component main = Game(8);

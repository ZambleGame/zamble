#Creating all necessary files

#circom circuit.circom --r1cs --wasm --sym --c

#Loading our input into the java file
cp input.json circuit_js/input.json

#Enter the merklecircuit_js directory
cd circuit_js

#Generating witness
node generate_witness.js circuit.wasm input.json witness.wtns

cp witness.wtns ../witness.wtns

#Go to previous directory
cd ..

#Proving circuits with Zero Knowledge
#changes to 20 instead of 12
snarkjs powersoftau new bn128 16 pot12_0000.ptau -v

#Contributing to the ceremony
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v

#Phase 2
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v

#Set up the verification key
snarkjs groth16 setup circuit.r1cs pot12_final.ptau circuit_0000.zkey

snarkjs zkey contribute circuit_0000.zkey circuit_0001.zkey --name="1st Contributor Name" -v

#Export the verification key
snarkjs zkey export verificationkey circuit_0001.zkey verification_key.json

#Generating the proof
snarkjs groth16 prove circuit.zkey witness.wtns proof.json public.json

#Verifying the proof
snarkjs groth16 verify verification_key.json public.json proof.json
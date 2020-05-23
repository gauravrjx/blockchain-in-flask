### to run this app:
1. run `python3.8 pip install requirements.txt`
2. cd to Blockchain
3. **if using virtualenv then activate it, otherwise skit this step**
4. Run `python ./Blackchain/Blockchain.py -p 5001`
5. Run `python Blockchain.py -p 5002`
6. Run `python Blockchain_client/Blockchain_client.py -p 8001`
7. Run `python Blockchain_client -p 8002`


## to build tailwindcss
1. just run `npm start` to run for **Blockchain_client.py** and for **Blockchain.py** run `npm start:blockchain`
note that, everytime we modify css, we gotta run it <br />

**why command `npm start` works?**
answer lies in *script of package.json(build by running `npm init`)*

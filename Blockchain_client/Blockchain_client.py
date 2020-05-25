from flask import Flask, render_template, jsonify, request
from Crypto.PublicKey import RSA
from Crypto import Random as crypto_random
import binascii
from collections import OrderedDict


class Transaction:
    def __init__(self, sender_public_key, sender_private_key,
                 recipient_public_key, value):
        self.recipient_public_key = recipient_public_key
        self.sender_public_key = sender_public_key
        self.sender_private_key = sender_private_key
        self.value = value

    def to_dict(self):
        return OrderedDict({
            'sender_public_key': self.sender_public_key,
            'sender_private_key': self.sender_private_key,
            'recipient_public_key': self.recipient_public_key,
            'amount': self.value,
        })


#instantiating node~
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('/index.html')


@app.route('/make/transaction')
def make_transation():
    return render_template('./make_transaction.html')


@app.route('/generate/transaction', methods=["POST"])
def generate_transation():
    sender_public_key = request.form["pub-key-f-tra"]
    sender_private_key = request.form["pri-key-f-tra"]
    recipient_public_key = request.form["rcvr-pub-key-f-trac"]
    amount = request.form["amt-f-trac"]

    # instantialing Transaction
    transaction = Transaction(sender_public_key, sender_private_key,
                              recipient_public_key, amount)

    response = {
        'transaction': transaction.to_dict(),
        'signature': 'random-sign-needstobe-updated'
    }
    return jsonify(response), 200


@app.route('/view/transaction')
def view_transaction():
    return render_template('./view_transaction.html')


@app.route('/wallet/new')
def wallet():
    random_gen = crypto_random.new().read
    private_key = RSA.generate(1024, random_gen)
    public_key = private_key.publickey()

    response = {
        'private_key':
        binascii.hexlify(private_key.export_key(
            format('DER'))).decode('ascii'),
        'public_key':
        binascii.hexlify(public_key.export_key(format('DER'))).decode('ascii')
    }

    return jsonify(response), 200


if __name__ == '__main__':
    from argparse import ArgumentParser

    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=8001, help='port to listen to')
    args = parser.parse_args()
    port = args.port

    #To run flask app
    app.run(host='127.0.0.1', port=port, debug=True)

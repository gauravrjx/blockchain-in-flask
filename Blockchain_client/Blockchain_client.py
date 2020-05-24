from flask import Flask, render_template, jsonify
from Crypto.PublicKey import RSA
from Crypto import Random as crypto_random
import binascii

class Transaction:
    def __init__(self, sender_address, sender_private_key, recipient_address,
                 value):
        self.sender_address = sender_address
        self.sender_private_key = sender_private_key
        self.value = value


#instantiating node~
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('/index.html')


@app.route('/make/transaction')
def make_transation():
    return render_template('./make_transaction.html')

@app.route('/generate/transaction')
def generate_transation():
    return ''


@app.route('/view/transaction')
def view_transaction():
    return render_template('./view_transaction.html')


@app.route('/wallet/new')
def wallet():
    random_gen = crypto_random.new().read
    private_key = RSA.generate(1024, random_gen)
    public_key = private_key.publickey()

    response = {
        'private_key': binascii.hexlify(private_key.export_key(format('DER'))).decode('ascii'),
        'public_key': binascii.hexlify(public_key.export_key(format('DER'))).decode('ascii')
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

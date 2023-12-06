import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
# from flask_mysqldb import MySQL
import pymysql
# from decouple import config
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)

load_dotenv()

app.config['MYSQL_HOST'] = '185.224.137.180'
app.config['MYSQL_USER'] = 'u549231978_hetic_g_02'
app.config['MYSQL_PASSWORD'] = 'Hetic2023$'
app.config['MYSQL_DB'] = 'u549231978_hetic_g_02'
app.config['MYSQL_PORT'] = 3306
app.config['SECRET_KEY'] = 'je-deverouille-vos_mdp'

# app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
# app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
# app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
# app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
# app.config['MYSQL_PORT'] = int(os.getenv('MYSQL_PORT'))
# app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

mysql = pymysql.connect(
    host=app.config['MYSQL_HOST'],
    user=app.config['MYSQL_USER'],
    password=app.config['MYSQL_PASSWORD'],
    db=app.config['MYSQL_DB'],
    port=app.config['MYSQL_PORT']
)

db_config = {
    'host' : app.config['MYSQL_HOST'],
    'user' : app.config['MYSQL_USER'],
    'password' : app.config['MYSQL_PASSWORD'],
    'db' : app.config['MYSQL_DB'],
    'port' : app.config['MYSQL_PORT'],
    'cursorclass' : pymysql.cursors.DictCursor
}

print(os.listdir(os.getcwd()))

@app.route('/')
def home():
    print(os.listdir(os.getcwd()))
    return 'Je suis bien sur la page principale'

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        required_fields = ['email', 'password']

        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Le champ {field} est manquant'}), 400

        conn = pymysql.connect(**db_config)

        try:
            with conn.cursor() as cursor:
                sql = "SELECT * FROM users WHERE email = %s"
                cursor.execute(sql, (data['email'],))
                user = cursor.fetchone()

                if user and bcrypt.check_password_hash(user['password'], data['password']):
                    access_token = create_access_token(identity={'email': data['email']})
                    return jsonify({'access_token': access_token})
                else:
                    return jsonify({'error': 'Les id sont incorrects'}), 401
        finally:
            conn.close()

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_users/<int:user_id>', methods=['GET'])
def get_users(user_id):
    try:
        conn = pymysql.connect(**db_config)

        try: 
            with conn.cursor() as cursor:

                cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
                user = cursor.fetchone()
                # print(cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,)))

                # users_json = [{'id': user[0], 'first_name': user[1], 'last_name': user[2], 'password': user[3], 'mail': user[4]} for user in users]

                if user:
                    return jsonify(user)
                else:
                    return jsonify({'error': 'Utilisateur non trouvé'}), 404
            
        finally:
            conn.close()

    except Exception as e:
        return jsonify({'error': str(e)})
    

@app.route('/sendMsg', methods=['POST'])
def send_msg():
    try:
        data = request.get_json()

        required_fiels = ['content', 'idTo', 'idFrom']

        for field in required_fiels:
            if field not in data:
                return jsonify({'error': f'Le champ {field} est manquant'}), 400

        conn = pymysql.connect(**db_config)

        try:
            with conn.cursor() as cursor:
                sql = "INSERT INTO messages (content, idTo, idFrom) VALUES (%s, %s, %s)"
                cursor.execute(sql, (data['content'], data['idTo'], data['idFrom']))
            conn.commit()

            return jsonify({'success': True})
        
        finally:
            conn.close()

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/addUser', methods=['POST'])
def add_user():
    try:
        data = request.get_json()

        required_fields = ['firstName', 'lastName', 'password', 'email']

        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Le champ {field} est manquant'}), 400

        conn = pymysql.connect(**db_config)

        try:
            with conn.cursor() as cursor:

                hash_password = bcrypt.generate_password_hash(data['password']).decode('UTF-8')

                sql = "INSERT INTO users (first_name, last_name, password, mail) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (data['firstName'], data['lastName'], hash_password, data['email']))
            conn.commit()

            return jsonify({'success': True})
        
        finally:
            conn.close()
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/messages', methods=['GET'])

@app.route('/messages/<int:idTo>/<int:idFrom>', methods=['GET'])

@app.route('/users', methods=['GET'])

@app.route('/users/<int:id>', methods=['GET'])

@app.route('/users/<int:id>', methods=['UPDATE'])

@app.route('/users/<int:id>', methods=['DELETE'])






@app.route('/about')
def about():
    return 'About Page Route'


@app.route('/portfolio')
def portfolio():
    a = np.random.choice([1, 2, 3, 4, 5, 6])
    return f'Portfolio {a} Page Route'


@app.route('/contact')
def contact():
    return 'Contact Page Route'


if __name__ == '__main__':
    #port = int(os.environ.get('PORT', 5000))
    print(os.getcwd())
    # app.run(host='0.0.0.0', port=port)
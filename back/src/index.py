import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
# from flask_mysqldb import MySQL
import pymysql
# from decouple import config
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required, create_refresh_token
from flask_bcrypt import Bcrypt
from datetime import timedelta
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

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
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

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
                sql = "SELECT * FROM users WHERE mail = %s"
                cursor.execute(sql, (data['email'],))
                user = cursor.fetchone()

                if user and bcrypt.check_password_hash(user['password'], data['password']):
                    # access_token = jwt.encode({'email': data['email']}, app.config['SECRET_KEY'], algorithm='HS256')
                    expires = timedelta(hours=1)

                    access_token = create_access_token(identity={'id': user['id'],'email': data['email']}, expires_delta=expires)
                    refresh_token = create_refresh_token(identity={'email': data['email']})
                    return jsonify({'access_token': access_token, 'refresh_token': refresh_token})
                else:
                    return jsonify({'error': 'Les id sont incorrects'}), 401
        finally:
            conn.close()

    except Exception as e:
        print(f'Error: {str(e)}')
        return jsonify({'error': str(e)}), 500

@app.route('/get_user', methods=['GET'])
@jwt_required()
def get_users():
    try:
        conn = pymysql.connect(**db_config)

        current_user = get_jwt_identity()
        user_id = current_user['id']

        try: 
            with conn.cursor() as cursor:

                cursor.execute("SELECT id, first_name, last_name, mail FROM users WHERE id = %s", (user_id,))
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

@app.route('/get_first_name/<int:id>', methods=['GET'])
@jwt_required()
def get_first_name(id):
    try:
        conn = pymysql.connect(**db_config)


        try: 
            with conn.cursor() as cursor:

                cursor.execute("SELECT id, first_name, last_name, mail FROM users WHERE id = %s", (id,))
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
@jwt_required()
def send_msg():
    try:
        data = request.get_json()

        required_fiels = ['content', 'idTo']

        for field in required_fiels:
            if field not in data:
                return jsonify({'error': f'Le champ {field} est manquant'}), 400

        current_user = get_jwt_identity()
        id_user = current_user['id']

        timestamp = int(time.time())

        conn = pymysql.connect(**db_config)

        try:
            with conn.cursor() as cursor:
                sql = "INSERT INTO messages (content, idTo, idFrom, timstamp) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (data['content'], data['idTo'], id_user, timestamp))
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


@app.route('/contactsHistory', methods=['GET'])
@jwt_required()
def getHistoryContacts():
    try:
        current_user = get_jwt_identity()
        user_id = current_user['id']

        conn = pymysql.connect(**db_config)

        try:
            with conn.cursor() as cursor:
                sql = 'SELECT DISTINCT idTo FROM messages WHERE idFrom = %s'
                cursor.execute(sql, user_id)

                users = cursor.fetchall()

                return jsonify(users)

        finally:
            conn.close()

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/messages/<int:other_id>', methods=['GET'])
@jwt_required()
def get_messages(other_id):
    try:
        current_user = get_jwt_identity()
        user_id = current_user['id']

        conn = pymysql.connect(**db_config)

        try:
            with conn.cursor() as cursor:
                sql = "SELECT * FROM messages WHERE (idFrom = %s AND idTo = %s) OR (idFrom = %s AND idTo = %s)"
                cursor.execute(sql, (user_id, other_id, other_id, user_id,))
                messages = cursor.fetchall()

                if messages:
                    return jsonify(messages)
                else:
                    return jsonify({'error': 'Aucun messages trouvés'})
        finally:
            conn.close()

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/users', methods=['GET'])
@jwt_required()
def getUsers():
    current_user = get_jwt_identity()
    # data = request.get_json()

    try:
        conn = pymysql.connect(**db_config)

        try: 
            with conn.cursor() as cursor:

                cursor.execute("SELECT id, first_name, last_name FROM users")
                users = cursor.fetchall()

                if users:
                    return jsonify(users)
                else:
                    return jsonify({'error': 'Utilisateur non trouvé'}), 404
            
        finally:
            conn.close()

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/update_user_info/<field>', methods=['PUT'])
@jwt_required()
def update_user_info(field):
    try:
        current_user = get_jwt_identity()
        user_id = current_user['id']

        allowed_fields = ['first_name', 'last_name', 'mail', 'password']
        if field not in allowed_fields:
            return jsonify({'error': 'Champ non autorisé'}), 400

        data = request.get_json()

        if field not in data:
            return jsonify({'error': 'Champ manquant dans la requête'}), 400

        value = data[field]

        if field == 'password':
            hashed_password = bcrypt.generate_password_hash(value).decode('UTF-8')
            value = hashed_password

        conn = pymysql.connect(**db_config)

        try:
            with conn.cursor() as cursor:
                sql = f'UPDATE users SET {field} = %s WHERE id = %s'
                cursor.execute(sql, (value, user_id))
            conn.commit()

            return jsonify({'success': True})
        finally:
            conn.close()

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/delete_account', methods=['DELETE'])
@jwt_required()
def delete_account():
    try:
        current_user = get_jwt_identity()
        user_id = current_user['id']

        conn = pymysql.connect(**db_config)

        try:
            with conn.cursor() as cursor:
                # Supprimer l'utilisateur de la base de données
                sql = 'DELETE FROM users WHERE id = %s'
                cursor.execute(sql, user_id)
                conn.commit()

                return jsonify({'success': True, 'message': 'Compte utilisateur supprimé avec succès'})

        finally:
            conn.close()

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# @app.route('/users/<int:id>', methods=['GET'])

# @app.route('/users/<int:id>', methods=['UPDATE'])

# @app.route('/users/<int:id>', methods=['DELETE'])



if __name__ == '__main__':
    #port = int(os.environ.get('PORT', 5000))
    print(os.getcwd())
    app.run(debug=True)
    # app.run(host='0.0.0.0', port=port)
from main_app.auth import auth_bp
from main_app.auth.api.tokens import basic_auth, token_auth
from flask import jsonify
from apifairy import authenticate


@auth_bp.get('/login')
@authenticate(basic_auth)
def login():
    return jsonify({
        'success': 'hello world'
    }), 200


@auth_bp.get('/logout')
@authenticate(token_auth)
def logout():
    return jsonify({
        'success': 'logged out'
    }), 200

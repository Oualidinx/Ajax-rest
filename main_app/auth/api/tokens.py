from flask_httpauth import HTTPBasicAuth as BA, HTTPTokenAuth as TA

basic_auth = BA()
token_auth = TA()


@basic_auth.login_required
def verify_password():
    pass
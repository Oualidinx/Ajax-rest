class Config:
    SECRET_KEY = 'e57e0167aba63fa1656b564841ed74c8'
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    def __init__(self):
        pass


class Development(Config):
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root@localhost:6666/promotions"


config = {
    "development": Development
}

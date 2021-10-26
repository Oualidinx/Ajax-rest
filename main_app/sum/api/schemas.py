from main_app import marsh


class IntegersSchema(marsh.Schema):
    a = marsh.Float(required=True)
    b = marsh.Float(required=True)


class ResultSchema(marsh.Schema):
    a = marsh.Float()
    b = marsh.Float()
    result = marsh.Float(dump_only=True)

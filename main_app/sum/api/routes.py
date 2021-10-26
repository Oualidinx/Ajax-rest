from main_app.sum.api.schemas import ResultSchema, IntegersSchema
from apifairy import body, response, other_responses
from main_app.sum import sum_bp
from flask import request, jsonify


@sum_bp.post('/add')
@body(IntegersSchema)
@other_responses({
    400: "Bad request",
    404: "not found"
})
def add(parameters):
    '''
    The sum of Two floats
    '''
    print(request.get_json())
    _sum = parameters['a'] + parameters['b']
    # rs = ResultSchema()
    # rs.a = parameters['a']
    # rs.b = parameters['b']
    # rs.result = _sum
    return jsonify(dict(
        a=parameters['a'],
        b=parameters['b'],
        result=_sum
    )), 200

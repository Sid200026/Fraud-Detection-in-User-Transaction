from flask_restful import Resource, Api, reqparse, fields, marshal_with
from detector import FraudDetector

PARAMS = [
    'Time',
    'V1',
    'V2',
    'V3',
    'V4',
    'V5',
    'V6',
    'V7',
    'V8',
    'V9',
    'V10',
    'V11',
    'V12',
    'V13',
    'V14',
    'V15',
    'V16',
    'V17',
    'V18',
    'V19',
    'V20',
    'V21',
    'V22',
    'V23',
    'V24',
    'V25',
    'V26',
    'V27',
    'V28',
    'Amount',
]

resource_fields = {
    'result': fields.Boolean,
}


class FraudRest(Resource):
    @marshal_with(resource_fields)
    def post(self):
        parser = reqparse.RequestParser()
        for param in PARAMS:
            parser.add_argument(param, required=True, type=float,
                                help=f"{param} cannot be blank")
        args = parser.parse_args()
        result = False
        try:
            fraud = FraudDetector(args)
            result = fraud.isFraud()
        except Exception as e:
            return {
                'error': 'Please try again later',
                'message': str(e),
            }
        return {
            'result': result
        }

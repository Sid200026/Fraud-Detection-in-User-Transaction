from flask_restful import Resource, Api, reqparse, fields, marshal_with
from graphene import InputObjectType, Field, Float, Mutation, Boolean, String, ObjectType
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


class FraudObjectType(InputObjectType):
    Amount = Float(required=True)
    V1 = Float(required=True)
    V2 = Float(required=True)
    V3 = Float(required=True)
    V4 = Float(required=True)
    V5 = Float(required=True)

    V6 = Float(required=True)
    V7 = Float(required=True)
    V8 = Float(required=True)
    V9 = Float(required=True)
    V10 = Float(required=True)

    V11 = Float(required=True)
    V12 = Float(required=True)
    V13 = Float(required=True)
    V14 = Float(required=True)
    V15 = Float(required=True)

    V16 = Float(required=True)
    V17 = Float(required=True)
    V18 = Float(required=True)
    V19 = Float(required=True)
    V20 = Float(required=True)

    V21 = Float(required=True)
    V22 = Float(required=True)
    V23 = Float(required=True)
    V24 = Float(required=True)
    V25 = Float(required=True)

    V26 = Float(required=True)
    V27 = Float(required=True)
    V28 = Float(required=True)

    Time = Float(required=True)


class FraudGraphQL(Mutation):
    class Arguments:
        fraud_info = FraudObjectType(required=True)

    result = Boolean()
    error = String()
    message = String()

    def mutate(self, info, fraud_info=None):
        result = False
        try:
            fraud = FraudDetector(fraud_info)
            result = fraud.isFraud()
        except Exception as e:
            return FraudGraphQL(result=None, error='Please try again later', message=str(e))
        return {
            'result': result
        }
        return FraudGraphQL(result=result, error="", message="")


class Mutation(ObjectType):
    detect_fraud = FraudGraphQL.Field()

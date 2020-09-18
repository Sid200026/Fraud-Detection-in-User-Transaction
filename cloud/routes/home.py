from flask_restful import Resource, Api

information = {
    'project': "Fraudulent Transaction Detection",
    'authors': "Rajlaxmi Roy ( 18BCE1080 ) and Siddharth Singha Roy ( 18BCE1065 )",
    'university': "Vellore Institute of Technology",
    'domain': "Data Science, Restful Services, GraphQL Services, Cloud Services, Web Development",
    'period': "August 2020 - October 2020",
    'github': "https://github.com/Sid200026/Fraud-Detection-in-User-Transaction",
    'tech stack': {
        'Data Science': "Scikit Learn, Tensorflow, Keras, Numpy, Pandas, Matplotlib, R, Seaborn",
        'Restful Services': "flask_restful",
        'GraphQL Services': "flask_graphql",
        'Cloud Services': "AWS",
        'Web Development': {
            "Backend": "Flask, CubeJS",
            "Frontend": "ReactJS",
            "Database ( Sample )":  "MongoDB",
        }
    }
}


class Home(Resource):
    def get(self):
        return information

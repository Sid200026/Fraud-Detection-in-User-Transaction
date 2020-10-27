import os
from threading import Thread
import pickle
import pandas as pd
from classifier import NotFoundException, Classifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression


class ThreadWithReturnValue(Thread):
    def run(self):
        if self._target is not None:
            self._return = self._target(*self._args, **self._kwargs)

    def join(self):
        Thread.join(self)
        return self._return


class FraudDetector:
    def __init__(self, params={}):
        self.params = params
        self.classifier_list = []
        self.X = []

    def __str__(self):
        return "Fraud Detector"

    def __repr__(self):
        return "Fraud Detector()"

    def getScaler(self):
        classifier = Classifier()
        dump_path = classifier.get_dump_path()
        file_path = os.path.join(dump_path, "scaler.pickle")
        if os.path.exists(file_path):
            scaler = pickle.load(open(file_path, "rb"))
            return scaler, classifier
        raise NotFoundException("Scaler")

    def get_dataframe(self):
        data = pd.DataFrame([self.params])
        return data

    def isFraud(self):
        scaler_fit, classifier = self.getScaler()
        data = self.get_dataframe()
        data = data.drop(["Time"], axis=1)
        X = data.iloc[:, :].values
        normalisedAmount = scaler_fit.transform(X[:, -1].reshape(-1, 1))
        X[:, -1] = normalisedAmount.reshape(1, -1)
        self.X = X
        classifiers = classifier.get_classifiers()
        self.classifier_list = classifiers
        tensorflow_classifiers = ["artificial_neural_network"]
        all_classifiers = [
            "logisitic_regression",
            "decision_tree",
            "random_forest",
            "support_vector_classifier",
            "multilayer_perceptron",
            "artificial_neural_network",
        ]
        mapping = {
            "artificial_neural_network": "ANN",
            "logisitic_regression": "LogisticRegression",
            "decision_tree": "DecisionTree",
            "random_forest": "RandomForest",
            "support_vector_classifier": "SupportVectorMachine",
            "multilayer_perceptron": "MTPSklearn",
        }
        output = {
            "DecisionTree": [0],
            "RandomForest": [0],
            "LogisticRegression": [0],
            "SupportVectorMachine": [0],
            "MTPSklearn": [0],
            "ANN": [0],
        }
        pipeline = "pipeline"
        chunksize = 1
        threads = []
        for classifier in all_classifiers:
            process = ThreadWithReturnValue(target=self.classify, args=[classifier])
            process.start()
            threads.append(process)
        for process in threads:
            classifier, y_pred = process.join()
            output[mapping.get(classifier)] = y_pred

        pipeline_data = pd.DataFrame(output)
        X = pipeline_data.iloc[:, :].values

        pipeline = classifiers.get(pipeline)
        y = pipeline.predict(X)

        return y[0] == 1
        return 1

    def classify(self, classifier):
        X = self.X
        classifiers = self.classifier_list
        tensorflow_classifiers = ["artificial_neural_network"]
        all_classifiers = [
            "logisitic_regression",
            "decision_tree",
            "random_forest",
            "support_vector_classifier",
            "multilayer_perceptron",
            "artificial_neural_network",
        ]
        if classifier in tensorflow_classifiers:
            classifier_ann = classifiers.get(classifier)
            y_pred = classifier_ann.predict(X).astype(int).reshape(1, -1)[0]
            return classifier, y_pred
        else:
            classifier_sklearn = classifiers.get(classifier)
            y_pred = classifier_sklearn.predict(X)
            return classifier, y_pred


if __name__ == "__main__":

    SAMPLE = {
        "Time": 0,
        "V1": 1.1918571113148602,
        "V10": -0.16697441400461402,
        "V11": 1.6127266610547901,
        "V12": 1.06523531137287,
        "V13": 0.48909501589608,
        "V14": -0.143772296441519,
        "V15": 0.635558093258208,
        "V16": 0.463917041022171,
        "V17": -0.114804663102346,
        "V18": -0.18336127012399397,
        "V19": -0.14578304132525902,
        "V2": 0.26615071205963,
        "V20": -0.0690831352230203,
        "V21": -0.225775248033138,
        "V22": -0.6386719527718511,
        "V23": 0.10128802125323402,
        "V24": -0.33984647552912706,
        "V25": 0.167170404418143,
        "V26": 0.125894532368176,
        "V27": -0.00898309914322813,
        "V28": 0.0147241691924927,
        "V3": 0.16648011335321,
        "V4": 0.448154078460911,
        "V5": 0.0600176492822243,
        "V6": -0.0823608088155687,
        "V7": -0.0788029833323113,
        "V8": 0.0851016549148104,
        "V9": -0.255425128109186,
        "Amount": 2.69,
    }

    fraud = FraudDetector(SAMPLE)
    print(fraud)
    print(fraud.isFraud())

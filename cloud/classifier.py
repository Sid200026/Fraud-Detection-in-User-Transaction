import os
import logging
import pickle
from keras.models import model_from_json
import errno
import logging

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # FATAL
logging.getLogger('tensorflow').setLevel(logging.FATAL)


class NotFoundException(FileNotFoundError):

    def __init__(self, entity):
        self.message = f'{entity} not found in {os.path}'
        super().__init__(errno.ENOENT, os.strerror(errno.ENOENT), self.message)


class Classifier:

    def __init__(self):
        self.classifier_mapping = {
            'logisitic_regression': 'logistic_regression.sav',
            'decision_tree': 'decision_tree.sav',
            'random_forest': 'random_forest.sav',
            'support_vector_classifier': 'svc.sav',
            'multilayer_perceptron': 'mtp.sav',
            'artificial_neural_network': 'ann.json',
            'pipeline': 'pipeline.sav',
        }

    def __str__(self):
        return "ML Classifiers"

    def __repr__(self):
        return "Classifiers()"

    def get_path(self):
        return os.getcwd()

    def get_dump_path(self):
        dump_path = os.path.join(self.get_path(), 'dump')
        if os.path.exists(dump_path):
            return dump_path
        raise NotFoundException('dump')

    def get_classifier(self, mapper):
        dump_path = self.get_dump_path()
        file_path = os.path.join(
            dump_path, self.classifier_mapping.get(mapper))
        if os.path.exists(file_path):
            classifier = pickle.load(open(file_path, 'rb'))
            return classifier
        raise NotFoundException(mapper)

    def get_tensorflow_classifier(self):
        dump_path = self.get_dump_path()
        file_path = os.path.join(
            dump_path, self.classifier_mapping.get('artificial_neural_network'))
        if not os.path.exists(file_path):
            raise NotFoundException('artificial_neural_network ( JSON )')
        json_file = open(file_path, 'r')
        loaded_model = json_file.read()
        json_file.close()
        loaded_model = model_from_json(loaded_model)
        weight_path = os.path.join(
            dump_path, 'model.h5')
        if not os.path.exists(file_path):
            raise NotFoundException('artificial_neural_network ( Weights )')
        loaded_model.save_weights(weight_path)
        return loaded_model

    def get_classifiers(self, tensorflow_classifiers=['artificial_neural_network'],
                        sklearn_classifiers=['logisitic_regression', 'decision_tree',
                                             'random_forest', 'support_vector_classifier',
                                             'multilayer_perceptron', 'pipeline']):
        classifiers = {}
        for classifier in sklearn_classifiers:
            classifiers[f'{classifier}'] = self.get_classifier(classifier)
        for classifier in tensorflow_classifiers:
            classifiers[f'{classifier}'] = self.get_tensorflow_classifier()

        return classifiers


if __name__ == "__main__":
    classifier = Classifier()
    print(classifier)
    print(classifier.get_classifiers())

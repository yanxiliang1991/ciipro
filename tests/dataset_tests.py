from datasets import check_dataset_input
from ciipro_config import CIIProConfig
import pandas as pd
import numpy as np

er_path = "resources/ER_tutorial/ER_train_can.txt"
DF = pd.read_csv(er_path, sep='\t', header=None)


class TestDatasets:
    def setup(self):
        pass


    def test_check_dataset_test(self):
        """ testing check dataset test """

        # check columns length
        new_df = DF.copy()
        new_df[3] = ['fake_data']*len(new_df)
        assert ~check_dataset_input(new_df)[0]

        # check value uniqueness
        new_df = DF.copy()
        new_df.loc[len(new_df)] = [3, 'c1ccccc1']
        assert ~check_dataset_input(new_df)[0]

        # check for null values
        new_df = DF.copy()
        new_df.loc[len(new_df)] = [1, np.nan]
        assert ~check_dataset_input(new_df)[0]

        # clean dataset
        assert check_dataset_input(DF)
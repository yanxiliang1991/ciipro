from BioSimLib import file_to_pandas, makeBioprofile
from ciipro_config import CIIProConfig
from tests import skiptest

class TestBioProfile:
    def setup(self):
        pass

    @skiptest
    def test_makeBioprofile(self):
        df = file_to_pandas(CIIProConfig.TEST_COMPOUNDS + 'ld50_test_CIIPro.txt')
        profile = makeBioprofile(df, actives_cutoff=3)
        print(profile)
        assert False


    def test_with_tutorial_data(self):
        df = file_to_pandas(CIIProConfig.TEST_COMPOUNDS + 'ER_train_can_CIIPro.txt')
        profile = makeBioprofile(df, actives_cutoff=30)
        profile.to_csv(CIIProConfig.TEST_PROFILES + 'test.csv')
        assert ('410' in profile.columns) or (410 in profile.columns)
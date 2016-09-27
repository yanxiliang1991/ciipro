from BioSimLib import file_to_pandas, makeBioprofile
from ciipro_config import CIIProConfig
from tests import skiptest

class TestBioProfile:
    def setup(self):
        pass

    def test_makeBioprofile(self):
        df = file_to_pandas(CIIProConfig.TEST_COMPOUNDS + 'ld50_test_CIIPro.txt')
        profile = makeBioprofile(df, actives_cutoff=3)
        print(profile)
        assert False


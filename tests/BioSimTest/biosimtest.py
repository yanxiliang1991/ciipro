from BioSimLib import file_to_pandas, bioprofile_to_pandas, get_BioSim
from ciipro_config import CIIProConfig

class TestBioProfile:
    def setup(self):
        pass

    def test_biosim_conf(self):
        profile = bioprofile_to_pandas(CIIProConfig.TEST_PROFILES + 'BBB_full_CIIPro_BioProfile_4.txt')
        test = file_to_pandas(CIIProConfig.TEST_COMPOUNDS + 'BBB_full_CIIPro.txt')
        biosim, conf = get_BioSim(profile, test[:10])
        print(biosim)
        assert False
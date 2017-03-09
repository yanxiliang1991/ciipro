""" module for load CIIPRo datasets """

class Dataset:

    def __init__(self, id, cids, smiles, activity):
        self.id = id
        self.cids = cids
        self.smiles = smiles
        self.activity = activity

def check_dataset_input(df):
    """ checks to make sure a dataset uploaded to CIIPro is in the correct format returns a tuple of a boolean and
    a message """
    if df.shape[1] > 2:
        return (False, "Sorry, the dataset uploaded contains more than 2 columns.")
    elif set(df[1].unique()) != set([0, 1]):
        return (False, "Sorry, please make sure the activity column only contains 0's and 1's.")
    elif any(df.isnull()):
        return (False, "Sorry, there is a missing or null value in your dataset.")
    else:
        return (True, '')




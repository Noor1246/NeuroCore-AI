class ConversationMemory:

    def __init__(self):

        self.history = []


    def add_message(
        self,
        message:str
    ):

        self.history.append(message)



    def get_history(self):

        return self.history
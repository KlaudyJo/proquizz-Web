import requests


class postQuestion():

    def __init__(self, data):
            

        self.body = data[0]
        self.username = 'klaudyjo'
        self.password = 'qwert'
        self.credentials = None
        # if os.path.exists('token.pickle'):
        #  with open('token.pickle', 'rb') as token:
        #     self.credentials = pickle.load(token)
        # self.headers = None

    def auth(self):
        url = "https://proquizz-api.herokuapp.com/auth"
        resp = requests.post(url, json={'username':'klaudyjo', 'password': 'qwert'})

        return resp.json()['access_token']  

    
    def post_question(self):
        credentials  = self.auth()
        url = 'https://proquizz-api.herokuapp.com/questions/all'
        self.headers = {'Authorization': 'JWT {}'.format(credentials)}
        resp = requests.post(url, json=self.body,headers=self.headers)
        return  resp.json()
            




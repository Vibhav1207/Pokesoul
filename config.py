import random

def footer():
    with open("./db/tips.txt") as file:
        array = file.read().strip().split("\n")
        return random.choice(array).strip()

logChannel = "886565615022792704"
bugchannelid = "886565615022792704"
feedbackchannelid = "886565615022792704"
tradechannelid = "886565615022792704"
suggestionchannelid = "886565615022792704"

token = "ODQwNTc5MTQ0NTI1MDIxMTg1.YJaQVQ.w2Z--TjXq1lfhYk_7DmUKOyGt8U"
prefix = "p!"

banAppeal = ""
owners = ["721308731010449468", "778911797054930955", "636158569338634272", "620947358355554304", "716936768192118955", "592949366881255436"]

asliMalik = ["636158569338634272"]
dbdevs = ["636158569338634272"]

mongo_atlas = {
    "username": "niceuser",
    "password": "nicepassword",
    "cluster": "cluster0",
    "shard": {
        "one": "cluster0-shard-00-00.0knyp.mongodb.net:27017",
        "two": "cluster0-shard-00-02.0knyp.mongodb.net:27017",
        "three": "cluster0-shard-00-03.0knyp.mongodb.net:27017"
    }
}

webhooks = {
    "cmd": {
        "ID": "879930450288721980",
        "Token": "bjPpJplKuC36xk5Kz-AQBwyOTH4Ca54HTRkZu3uRJmUdLODtwexUyPkaumPBwQjOe6yE"
    },
    "guild": {
        "ID": "879930450288721980",
        "Token": "bjPpJplKuC36xk5Kz-AQBwyOTH4Ca54HTRkZu3uRJmUdLODtwexUyPkaumPBwQjOe6yE"
    }
}

dbl = {
    "authorization": "thisisasocalledauthtokenbro"
    # "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0MDU3OTE0NDUyNTAyMTE4NSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI3NTI3OTAzfQ.sFSBUxukmpQ07V-UZDtbOaddKd2gUn29zy5PUcYuaeM"
}

cooldown = 3000
import random

natures = [
    "Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Docile", "Bold", "Relaxed",
    "Impish", "Lax", "Serious", "Timid", "Hasty", "Jolly", "Naive", "Bashful",
    "Modest", "Mild", "Quiet", "Rash", "Quirky", "Calm", "Gentle", "Sassy", "Careful"
]

class Pokemon:
    def __init__(self, object, lvl=1, xp=0):
        self.level = lvl
        self.xp = xp
        self.name = object["name"]
        self.url = object["url"]
        self.hp = random.randint(0, 31)
        self.atk = random.randint(0, 31)
        self.defense = random.randint(0, 31)
        self.spatk = random.randint(0, 31)
        self.spdef = random.randint(0, 31)
        self.speed = random.randint(0, 31)
        self.moves = []
        self.shiny = object["shiny"]
        self.rarity = object["rarity"]
        self.xp = 0
        self.nature = random.choice(natures)
        totaliv = ((self.hp + self.atk + self.defense + self.spatk + self.spdef + self.speed) / 186) * 100
        self.totalIV = round(totaliv, 2)
        # self.fav = False
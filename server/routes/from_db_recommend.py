# importing libraries
import pandas as pd
import sys
import warnings
import json
from pymongo import MongoClient
from dotenv import dotenv_values
from scipy.spatial import distance
from sklearn.discriminant_analysis import StandardScaler
warnings.filterwarnings("ignore")

env = dotenv_values('../.env')

# connecting to mongodb
client = MongoClient(env['DB_STRING'])
db = client['test']

# fetch all songs from Songs collection 
songs = list(db.Songs.find())
client.close()

# convert list of songs to pd dataframe
data = pd.DataFrame(songs)

# fill all NaN values with 0 for column favorites
data['favorites'] = data['favorites'].fillna(0)

df = data
# covnvert ObjectId _id to string in def
df['_id'] = df['_id'].astype(str)

# df = df.drop(columns=['spotify_id', 'createdAt', 'updatedAt', 'type','uri', 'track_href', 'analysis_url', 'album', 'artist', 'language', 'category', 'imageURL', 'songURL'])


# This is a function to find the closest song name from the list
def find_word(word,words):
    t=[]
    count=0
    if word[-1]==' ':
        word=word[:-1]
    for i in words:
        if word.lower() in i.lower():
            t.append([len(word)/len(i),count])
        else:
            t.append([0,count])
        count+=1
    t.sort(reverse=True)
    return words[t[0][1]]

def make_matrix_cosine(data, song, number):
    df = data.drop(columns=['spotify_id', 'createdAt', 'updatedAt', 'type','uri', 'track_href', 'analysis_url', 'album', 'artist', 'language', 'category', 'imageURL', 'songURL'])
    # print type of each column
    songs = data['name'].values
    best = find_word(song, songs)
    x = df[df['name'] == best].drop(columns=['name', '_id']).values
    if len(x) > 1:
        x = x[1]

    names = df['name'].values
    df.drop(columns=['name', '_id'], inplace=True)
    df = df.fillna(df.mean())
    p = []
    count = 0
    for i in df.values:
        p.append([distance.cosine(x.ravel(), i.ravel()), count])
        count += 1
    p.sort()
    res = []
    for i in range(1, number + 1):
        res.append(names[p[i][1]])
    return res

names = make_matrix_cosine(df, sys.argv[1], 10)

# create list of songs from data whose name is in names
songs = []
data = data.drop(columns=['createdAt', 'updatedAt',])
for name in names:
    songs.append(data[data['name'] == name].to_dict('records')[0])

# convert songs to json
songs = json.dumps(songs)
print(songs)
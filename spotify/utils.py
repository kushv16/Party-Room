from .models import spotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID,CLIENT_SECRET,REDIRECT_URI
from requests import post, put, get

BASE_URL = "https://api.spotify.com/v1/me/"

def get_user_tokens(session_id):
    user_token = spotifyToken.objects.filter(user=session_id)

    if user_token.exists():
        return user_token[0]

    return None

def create_or_update_tokens(session_id,refresh_token,access_token,token_type,expires_in):
    
    token = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if token:
        token.refresh_token = refresh_token
        token.access_token = access_token
        token.token_type = token_type
        token.expires_in = expires_in
        token.save(update_fields=['token_type','refresh_token','access_token','expires_in'])

    else:
        tokens = spotifyToken(user = session_id,refresh_token = refresh_token,access_token = access_token,
                                token_type = token_type,expires_in = expires_in)
        tokens.save()


def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_token(session_id)

        return True   
    return False


def refresh_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type':'refresh_token',
        'refresh_token':refresh_token,
        'client_id':CLIENT_ID,
        'client_secret':CLIENT_SECRET,
    }).json()

    access_token = response.get('access_token')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    token_type = response.get('token_type')

    create_or_update_tokens(session_id,refresh_token,access_token,token_type,expires_in)

def execute_spotify_endpoints(session_id, endpoint, _post=False,_put=False):
    tokens = get_user_tokens(session_id)

    headers={'Content-Type' : 'application/json' , 'Authorization' : "Bearer " +tokens.access_token}

    if _post:
        post(BASE_URL+ endpoint,headers=headers)

    if _put:
        put(BASE_URL+endpoint,headers=headers)

    response = get(BASE_URL+endpoint,{},headers=headers)
    
    try:
        return response.json()
    except:
        return {"Error":"Issue with request"}
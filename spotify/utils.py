from .models import spotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID,CLIENT_SECRET,REDIRECT_URI

def get_user_tokens(session_id):
    user_token = spotifyToken.objects.filter(user=session_id)

    if user_token.exists():
        return user_token[0]

    return None


def create_or_update_tokens(session_id,refresh_token,access_token,token_type,expires_in):
    
    token = get_user_tokens(session_id)
    print(token)
    expires_in = timezone.now() + timedelta(seconds=expires_in)
    print(expires_in)

    if token:
        token.refresh_token = refresh_token
        token.access_token = access_token
        token.token_type = token_type
        token.expires_in = expires_in
        token.save(updated_fields=['token_type','refresh_token','access_token','expires_in'])

    else:
        tokens = spotifyToken(user = session_id,refresh_token = refresh_token,access_token = access_token,
                                token_type = token_type,expires_in = expires_in)
        tokens.save()


def is_spotify_authenticated(session_id):

    tokens = get_user_tokens(session_id)

    if tokens:
        expiry = tokens.expiry_in
        if expiry <= timezone.now():
            refresh_token(session_id)

        return True   
    return False


def refresh_token(session_id):
    tokens = get_user_token(session_id)
    refresh_token = tokens.refresh_token

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
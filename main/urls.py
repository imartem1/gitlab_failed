from django.urls import path, include
from .views import HomePageView, SearchResultView, SignUpView,Get_id, index, get_file

urlpatterns = [
    #path('', HomePageView, name='home'),
    path('', index),
    path('get_id', Get_id, name='get_id'),
    path('search', SearchResultView, name='search'),
    #path('signup/', SignUpView.as_view(), name='signup'),
    path('accounts/', include('allauth.urls')),
    path('get_file/', get_file, name='get_file')
]
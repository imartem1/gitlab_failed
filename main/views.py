from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Instance
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from django.core import serializers

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'signup.html'

def index(request):
    return render(request, 'index.html', {})

def HomePageView(request):
    CHOICES = Instance.objects.all().values_list('id', flat=True)
    return render(request,'main/home_page.html', {'choices' : CHOICES} )

    #success_url = 'myapp/success.html'

def Get_id(request):

    if request.method == 'GET':
        choises = Instance.objects.all().values_list('id', flat=True)
        response = {}
        for choise in choises:
            response[str(choise)] = f'media/uploads/{choise}'
        return JsonResponse(response)
    else:
        return HttpResponse("not get request")



def SearchResultView(request):

    if request.method == 'POST':
        data = request.Post.get()
        print(data)
        return Httpresponse("Принял запрос")
'''        id = (request.POST.getlist('id'))
        object_list = []
        for id_name in id:
            object_list += Instance.objects.filter(id__icontains=id_name)
        qdict = dict.fromkeys(['anterior_segment', 'posterior_segment', 'long_segment',
                               'fronto_occipital_fasciculus', 'inferior_longitudinal_fasciculus',
                               'uncinate_fasciculus', 'frontal_aslant_tract'])

        qdict['anterior_segment'] = request.POST.get('anterior_segment')
        qdict['posterior_segment'] = request.POST.get('posterior_segment')
        qdict['long_segment'] = request.POST.get('long_segment')
        qdict['fronto_occipital_fasciculus'] = request.POST.get('fronto_occipital_fasciculus')
        qdict['inferior_longitudinal_fasciculus'] = request.POST.get('inferior_longitudinal_fasciculus')
        qdict['uncinate_fasciculus'] = request.POST.get('uncinate_fasciculus')
        qdict['frontal_aslant_tract'] = request.POST.get('frontal_aslant_tract')

        object_list += Instance.objects.filter(anterior_segment=qdict['anterior_segment'])
        object_list += Instance.objects.filter(posterior_segment=qdict['posterior_segment'])
        object_list += Instance.objects.filter(long_segment=qdict['long_segment'])
        object_list += Instance.objects.filter(fronto_occipital_fasciculus=qdict['fronto_occipital_fasciculus'])
        object_list += Instance.objects.filter(inferior_longitudinal_fasciculus=qdict['inferior_longitudinal_fasciculus'])
        object_list += Instance.objects.filter(uncinate_fasciculus=qdict['uncinate_fasciculus'])
        object_list += Instance.objects.filter(frontal_aslant_tract=qdict['frontal_aslant_tract'])

        object_list = set(object_list)

    #response = JsonResponse({'instances': map(model_to_dict, object_list)})
    response_data = serializers.serialize('json', object_list)

    return JsonResponse(response_data, safe=False)
    #return render(request,'main/search.html', {'object_list': object_list}, JsonResponse(response_data, safe=False))

'''
def get_file(request):
    if request.method == 'GET':
        name = request.GET.get("name")
        return f'madia/uploads/{name}'
    else:
        return HttpResponse("not get request")

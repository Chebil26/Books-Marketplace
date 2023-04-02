from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser



from base.models import Store
from base.serializers import StoreSerializer

@api_view(['GET'])
def getStores(request):

    stores = Store.objects.all()
    serializer = StoreSerializer(stores, many=True)
    print(serializer.data)
    return Response(serializer.data)

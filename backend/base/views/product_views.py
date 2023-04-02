

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser



from base.models import Product
from base.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    print('aaaa', query)
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user = user,
        name= 'sample name',
        price = 0,
        language = 'FR',
        publisher= 'Sample publisher',
        category= 'sample category',
        description= 'sample description',

    )
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)



@api_view(['PUT'])
# @permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.language = data['language']
    product.publisher = data['publisher']
    product.available = data['available']
    product.category = data['category']
    product.description = data['description']

    product.save()
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()

    return Response('Product Deleted')



@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


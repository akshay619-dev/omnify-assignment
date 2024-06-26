from rest_framework import viewsets
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from .models import User
from .serializers import UserSerializer, UserCreateUpdateSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [TokenHasReadWriteScope]

    def get_serializer_class(self):
        if self.action in ['create', 'update' , 'partial_update']:
            return UserCreateUpdateSerializer
        return UserSerializer

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.friends.all().delete()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=['get'], permission_classes=[TokenHasReadWriteScope])
    def all_users(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
angular.module('mainApp')
    .factory('PostService', ['$http', '$q', function ($http) {
        var postService = {};

        postService.getAll = () => {
            return $http.get('/api/post').then((response) => {
                return response.data.data.posts;
            })
                .catch((err) => {
                    return err;
                });
        };
        postService.getOne = (postId) => {
            return $http({
                url: ('/api/post/' + postId),
                method: "GET",
                params: {
                    postId: postId
                }
            })
                .then((response) => {
                    return response.data.post;
                })
                .catch(function (err) {
                    return err;
                });
        };
        return postService;
    }]);
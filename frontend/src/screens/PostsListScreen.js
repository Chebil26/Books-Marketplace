import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from '../features/postSlice';

import Post from '../components/Post';

function PostsListScreen() {
    const posts = useSelector((state) => state.post.posts);
    const loading = useSelector((state) => state.post.loading);
    const error = useSelector((state) => state.post.error);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
        

        <div>
        {posts.map(post => (
        <Post key={post.id} post={post} />
        ))}
        </div>


    );
}


export default PostsListScreen




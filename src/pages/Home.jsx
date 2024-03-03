import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const  userData  = useSelector(state => state.auth.data);
  const { posts, tags } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => 
            isPostsLoading ? (
              < Post key={index} isLoading={true} />
            ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id===obj.user._id}
            />
          ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Болегенов Толеген',
                  avatarUrl: 'data:image/jpeg;base64,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',
                },
                text: 'А ведь то же самое было с Twisted Metal: сначала в сети появились слухи о разработке, а позднее официально отменили',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

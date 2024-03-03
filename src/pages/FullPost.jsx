import React from "react";
import { useParams } from 'react-router-dom';
import axios from '../axios'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const {id}  = useParams();

  React.useEffect(() => { 
    axios.get(`/posts/${id}`).then(res => {
      setData(res.data);   
      setLoading(false); 
    }).catch((err) => {
      console.warn(err);
      alert('Ошибка при получении статьи');
    });
  }, []);

  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (  
    <>
      <Post
         id={data._id}
         title={data.title}
         imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
         user={data.user}
         createdAt={data.createdAt}
         viewsCount={data.viewsCount}
         commentsCount={3}
         tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}/>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Адилет Абылмансур",
              avatarUrl: "",
            },
            text: "Когда выйдет игра Outlast?",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header'
import Body from '../components/Body'
import Footer from '../components/Footer';
import userImage from '../data/userImage';

const Home = () => {
  const [step, setStep] = useState(1);
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState('');
  const [filter, setFilter] = useState('');
  const [caption, setCaption] = useState('');
  const savePost = async (post) => {
    const config = {
      method: 'post',
      url:'http://localhost:3000/api/posts',
      data: post
    };
    const res = await axios(config);
    return res;
  }
  const handleGoHome = () => setStep(1);
  const handleNext = () => setStep(step +1);
  const handleUploadImage = (ev) => {
    const files = ev.target.files;
    if(files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = ev => {
        setImage(ev.target.result);
        setStep(2);
      }
    }
  }


  const getPosts = async () => {
    const config = {
      method: 'get',
      url: 'http://localhost:3000/api/posts'
    };
    const res = await axios(config);
    setPosts(res.data);
  }

  const handleShare = () => {
    const post = {
      username: 'nodegirls',
      userImage,
      postImage: image,
      caption,
      filter
    }
    const res = savePost(post);
    setStep(1);
    setTimeout(() => getPosts());
  }

  useEffect(() => {
    getPosts();
  }, []);

  return(
    <>
      <h2>Home</h2>
      <Header 
        step={step}
        handleGoHome={handleGoHome}
        handleNext={handleNext}
        handleShare={handleShare}  
      />
      <Body 
        step={step}
        posts={posts}
        image={image}
        setFilter={setFilter}
        setCaption={setCaption}
      />
      <Footer
        handleGoHome={handleGoHome} 
        step={step}
        handleUploadImage={handleUploadImage}
      />
    </>
  );
}


export default Home;
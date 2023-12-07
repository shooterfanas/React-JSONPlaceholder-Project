import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import axios from "axios";
import Pagination from "./paginates/Pagination";
import { Link } from "react-router-dom";
import Comments from "./posts/Comments";
import TodoList from "./todo/TodoList";
import { DragDropContext } from "react-beautiful-dnd";
import InputField from "./todo/InputField";
import Moment from "react-moment";
import EmblaCarousel from "./Photos/EmblaCarousel";
import './Photos/base.css'
import './Photos/embla.css'
import InfiniteScroll from "react-infinite-scroll-component";
import YetLightbox from "./Photos/YetLightbox";


// Functions
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};
// Functions End

// Profile Page - My Posts Tab
export const Posts = () => {
  const {user} = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(2);
  const [totalCount, setTotalCount] = useState(0)
  const [randomMomentDate, setRandomMomentDate] = useState(Array.from({ length: 10 }, () => randomDate(new Date(2022, 0, 1), new Date())));


  const postData = async (page, limit) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user[0].id}&_page=${page}&_limit=${limit}`);

      randomMomentDate.sort((a, b) => new Date(b) - new Date(a));


      const postDate = res.data.map((post) => ({
        ...post,
        date: randomMomentDate[post.id - 1],
      }));

      setPosts(postDate);
      setTotalCount(res.headers['x-total-count']);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  // useEffect(() => {
  //   const generatedDates = Array.from({ length: 10 }, () => randomDate(new Date(2022, 0, 1), new Date()));
  //   generatedDates.sort((a, b) => new Date(b) - new Date(a));
  //   setRandomMomentDate(generatedDates);
  // },[])
  
  useEffect(() => {
    postData(currentPage, postPerPage);
    
  }, [currentPage, postPerPage]);

  // Get Current Posts
  // const indexOfLastPost= currentPage * postPerPage;
  // const indexOfFirstPost= indexOfLastPost - postPerPage;
  // const currentPosts= posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change Page
  const paginate= pageNumber => setCurrentPage(pageNumber);

  return (
    <>
    <div className="container ">
      <div className="row d-flex justify-content-center">
        {
          loading ?
          <h2 className="text-center mt-4">Loading...</h2>
          :
          posts.map((post) => (
              <div className="card w-75 my-3" key={post.id}>
                <div className="card-body">
                  <div className="row pt-4">
                    <div className="col-12 pt-3 d-flex justify-content-center position-absolute top-0 start-50 translate-middle">
                      <img src="/assets/img/avatar.png" style={{width: '68px', height:'68px'}} className="img-fluid rounded-circle shadow " alt=""/>
                    </div>
                    <div className="col-12 col-sm-6 text-sm-start text-center pt-3 py-sm-2 fw-semibold">{user[0].name}</div>
                    <div className="col-12 col-sm-6 text-sm-end text-center py-2 fw-semibold">{<Moment fromNow>{post.date}</Moment>}</div>
                    <hr className="my-3"/>
                  </div>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body}</p>
                </div>
              </div>
            
          ))
        }
        <Pagination totalPosts={totalCount} postPerPage={postPerPage} paginate={paginate}/>
      </div>
    </div>
    </>
  )
}

// Posts Page
export const PostsNonPaginate = () => {
  const {user} = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const postNonPaginateData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user[0].id}`);
        const postRandomDates= res.data.map((post) => ({
          ...post,
          date: randomDate(new Date(2022,0,1), new Date())
        }))

        postRandomDates.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(postRandomDates);
        setLoading(false);
      } catch (error) {
        return error;
      }
    }
    postNonPaginateData();
  }, [])

  return (
    <>
    <div className="container py-2 ">
      <div className="row d-flex justify-content-center">
        {
          loading ?
          <h2 className="text-center mt-4">Loading...</h2>
          :
          posts.map((post,index) => (
            <div className="row" key={post.id}>
              <div className="col-md-3 col-lg-3 col-xl-2 text-center flex-column d-flex " >
                <div className="row h-50">
                  <div className={`col ${index === 0 ? '' : ' border-end'}`}>&nbsp;</div>
                  <div className="col">&nbsp;</div>
                </div>
                <h5 className="m-2">
                  <span className="badge rounded-pill bg-light border text-body">{post.date.toLocaleDateString()}</span>
                </h5>
                <div className="row h-50">
                  <div className={`col ${index === posts.length - 1 ? '' : ' border-end'}`}>&nbsp;</div>
                  <div className="col">&nbsp;</div>
                </div>
              </div>
              <div className="col-md-9 col-lg-9 col-xl-10 py-2" >
                <div className="card my-3" >
                  <div className="card-body">
                    <div className="row pt-4">
                      <div className="col-12 pt-3 d-flex justify-content-center position-absolute top-0 start-50 translate-middle">
                        <img src="/assets/img/avatar.png" style={{width: '68px', height:'68px'}} className="img-fluid rounded-circle shadow" alt=""/>
                      </div>
                      <div className="col-12 col-sm-6 text-sm-start text-center pt-3 py-sm-2 fw-semibold">{user[0].name}</div>
                      <div className="col-12 col-sm-6 text-sm-end text-center py-2 fw-semibold">{<Moment fromNow>{post.date}</Moment>}</div>
                      <hr className="my-3"/>
                    </div>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                    <Link to={`/posts/${post.id}`}>Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
    </>
  )
}

export const AllPostsData = () => {

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    const allPostData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        const postRandomDates= res.data.map((post) => ({
          ...post,
          date: randomDate(new Date(2022,0,1), new Date())
        }))

        postRandomDates.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(postRandomDates);
        setLoading(false);
      } catch (error) {
        return error;
      }
    }

    const AllUsers = async () => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        setUsers(res.data);
      } catch (error) {
        return error;
      }
    }
    allPostData();
    AllUsers();
  }, [])
 
  const postUserName= posts.map(post => {
    const userDetect= users.find(user => user.id === post.userId);
    const username = userDetect && userDetect.name;

    return {...post, username};
  })


  // Get Current Posts
  const indexOfLastPost= currentPage * postPerPage;
  const indexOfFirstPost= indexOfLastPost - postPerPage;
  const currentPosts= postUserName.slice(indexOfFirstPost, indexOfLastPost);

  // Change Page
  const paginate= pageNumber => setCurrentPage(pageNumber);

  return (
    <>
    <div className="container pt-1">
      <div className="row d-flex justify-content-center">
        {
          loading ?
          <h2 className="text-center mt-4">Loading...</h2>
          :
          currentPosts.map((post,index) => (
            <div className="row" key={post.id}>
            <div className="col-md-3 col-lg-3 col-xl-2 text-center flex-column d-flex" >
              <div className="row h-50">
                <div className={`col ${index === 0 ? '' : ' border-end'}`}>&nbsp;</div>
                <div className="col">&nbsp;</div>
              </div>
              <h5 className="m-2">
                <span className="badge rounded-pill bg-light border text-body">{post.date.toLocaleDateString()}</span>
              </h5>
              <div className="row h-50">
                <div className={`col ${index === currentPosts.length - 1 ? '' : ' border-end'}`}>&nbsp;</div>
                <div className="col">&nbsp;</div>
              </div>
            </div>
            <div className="col-md-9 col-lg-9 col-xl-10 py-2" >
              <div className="card my-3" >
                <div className="card-body">
                  <div className="row pt-4">
                    <div className="col-12 pt-3 d-flex justify-content-center position-absolute top-0 start-50 translate-middle">
                      <img src="/assets/img/avatar.png" style={{width: '68px', height:'68px'}} className="img-fluid rounded-circle shadow " alt=""/>
                    </div>
                    <div className="col-12 col-sm-6 text-sm-start text-center pt-3 py-sm-2 fw-semibold ">{post.username}</div>
                    <div className="col-12 col-sm-6 text-sm-end text-center py-2 fw-semibold">{<Moment fromNow>{post.date}</Moment>}</div>
                    <hr className="my-3"/>
                  </div>
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.body}</p>
                  <Link to={`/posts/${post.id}`}>Read More</Link>
                </div>
              </div>
            </div>
          </div>
            
          ))
        }
        <Pagination totalPosts={postUserName.length} postPerPage={postPerPage} paginate={paginate}/>
      </div>
    </div>
    </>
  )
}

// Post Detail Page
export const PostDetail = ({id}) => {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments,setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isShowComments, setIsShowComments] = useState(false);

  

  useEffect(() => {
    const postDetailData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const resData = {...res.data,date: randomDate(new Date(2022,0,1), new Date())}
        setPost(resData);
        setLoading(false);
      } catch (error) {
        return error;
      }
    }
    const AllUsers = async () => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        setUsers(res.data);
      } catch (error) {
        return error;
      }
    }

    const postComments = async () => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const commentDates= res.data.map((comments) => ({
          ...comments,
          date: randomDate(new Date(2022,0,1), new Date())
        }))

        commentDates.sort((a, b) => new Date(b.date) - new Date(a.date));
        setComments(commentDates);
      } catch (error) {
        return error
      }
    }
    postDetailData();
    AllUsers();
    postComments();
  }, [])

  const userDetect= users.find(user => user.id === post.userId);
  const username = userDetect && userDetect.name;
  const lastData = {...post, username};
  return (
    <>
    <div className="container ">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12 py-3">
          <Link to={'/posts'} className="mt-3 text-dark text-decoration-none"><i className="bi bi-arrow-left fs-2">Posts</i></Link>
        </div>
      
        {
          loading ?
          <h2 className="text-center mt-4">Loading...</h2>
          :
          <>
          <div className="card w-75 my-3 mt-5">
            <div className="card-body">
              <div className="row pt-4">
                <div className="col-12 pt-3 d-flex justify-content-center position-absolute top-0 start-50 translate-middle">
                  <img src="/assets/img/avatar.png" style={{width: '68px', height:'68px'}} className="img-fluid rounded-circle shadow " alt=""/>
                </div>
                <div className="col-12 col-sm-6 text-sm-start text-center pt-3 py-sm-2 fw-semibold">{lastData.username}</div>
                <div className="col-12 col-sm-6 text-sm-end text-center py-2 fw-semibold">{<Moment fromNow>{post.date}</Moment>}</div>
                <hr className="my-3"/>
              </div>
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.body}</p>
              <div className="row">
                <div className="col-12 d-flex justify-content-center justify-content-sm-start">
                  <button className="btn btn-success" onClick={() => setIsShowComments(!isShowComments)}>Show Comments</button>
                </div>
              </div>
            </div>
          </div>

          <Comments comments={comments} isShowComments={isShowComments}/>
          </>
        }
      </div>
    </div>
    </>
  )
}

// Todo Page
export const TodoData = ()=> {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);


  const {user} = useAuth();

  const handleAdd = (e) => {
    e.preventDefault();

    if(todo){
      setTodos([...todos, {id: Date.now(), title: todo, completed: false}])
      setTodo("");
    }
  }


  useEffect(() => {
    const todoData = async () => {
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${user[0].id}`);
        const resTodo = res.data;

        const completed = resTodo.filter(todofilter => todofilter.completed )
        const active = resTodo.filter(todofilter => !todofilter.completed )

        setTodos(active);
        setCompletedTodos(completed);
      } catch (error) {
        return error;
      }
    }
    todoData();
  }, [user])
  

  const onDragEnd = (result) => {
    const {destination, source} = result;

    if(!destination){return;} 

    if(destination.droppableId === source.droppableId && 
      destination.index === source.index) {
        return;
      }

    let add;
    let active = todos;
    let complete = completedTodos;

    if(source.droppableId === "TodosList"){
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if(destination.droppableId === "TodosList"){
      active.splice(destination.index, 0, {
        "userId": add.userId,
        "id": add.id,
        "title": add.title,
        "completed": false
    });
    } else {
      complete.splice(destination.index, 0, {
        "userId": add.userId,
        "id": add.id,
        "title": add.title,
        "completed": true
    });
      
    }

    setCompletedTodos(complete);
    setTodos(active)

  }


  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList 
        todos={todos} 
        setTodos={setTodos} 
        completedTodos={completedTodos} 
        setCompletedTodos={setCompletedTodos}
        />
    </DragDropContext>
    </>
  )
}

// Album Page
export const AlbumData = () => {

  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(3);
  const [isEdit, setIsEdit] = useState({bool: false ,id: 0});
  const [editTitle, setEditTitle] = useState("");

  const {user} = useAuth();

  useEffect(() => {
    const AlbumGetData = async () => {
      setLoading(true);
      
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${user[0].id}`);
        
        const postRandomDates= res.data.map(async (album) => {
          const photos = await getAlbumCoverPhotosForIds(album.id);
          const shuffledAlbums = photos?.sort(() => Math.random() - 0.5);
          const shuffledAlbumsData = shuffledAlbums?.slice(0, 4);
          return {
            ...album,
            date: randomDate(new Date(2022,0,1), new Date()),
            photos: shuffledAlbumsData
          }
        })

        const albumsWithPhotos = await Promise.all(postRandomDates);
        
        albumsWithPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAlbum(albumsWithPhotos);
        setLoading(false);
      } catch (error) {
        return error;
      }
    }

    const getAlbumCoverPhotosForIds = async (ids) => {
      try {
          const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${ids}/photos`);
          return res.data;

      } catch (error) {
        console.error("Error fetching album data:", error);
        return [];
      }
    };

    AlbumGetData();
  }, [])
  

  const loadMorePaginate = () => {
    setLoadMore((prevValue) => prevValue + 3);
  }

  const handleEdit = (id) => {
    axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, { "id":1, "title": editTitle})
    .then((res) => {
      const updateAlbumState= album.map((item) => {
        if(item.id === id){
          return {...item, "title": res.data.title}
        }
  
        return item;
      })
      setAlbum(updateAlbumState);
      setIsEdit({bool: false,id: 0});
    })
    .catch((error) => {
      console.log("Error updating album:", error);
    });
    
  }

  const handleIsEdit = (id) => {
    setIsEdit({bool: true,id: id});
    const inputValueAlbumTitleFindId = album.find((item) => item.id === id);

    setEditTitle(inputValueAlbumTitleFindId.title);
  }

  const handleDelete = (id) => {
    const res = axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
    
    setAlbum(oldAlbum => { return oldAlbum.filter(album => album.id !== id)});

    return res;
  }


  return (
    <>
    <div className="container py-3">
      <div className="row">
        {
          loading ? (

            <h2 className="text-center mt-4">Loading...</h2>
          )
          :
          (
            <>
            {album.slice(0,loadMore).map((album) => (
              <div className="col-12 col-sm-6 col-md-4" key={album.id}>
                <div className="card mb-4 shadow-sm">
                  <div className="row">
                    <div className="col-6 pe-0">
                      <img src={album.photos[0].url} className="img-fluid rounded-top rounded-end-0" alt="" />
                      <img src={album.photos[1].url} className="img-fluid" alt="" />
                    </div>
                    <div className="col-6 ps-0">
                      <img src={album.photos[2].url} className="img-fluid rounded-top rounded-start-0" alt="" />
                      <img src={album.photos[3].url} className="img-fluid" alt="" />
                    </div>
                  </div>
                  <div className="card-body">
                    {
                      isEdit.bool && isEdit.id === album.id ? 
                      <input type="text" className="my-3" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
                      :
                      <p className="card-text">{album.title}</p>
                    }
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <Link className="btn btn-sm btn-outline-primary" to={`/albums/${album.id}/photos`}><i className="bi bi-eye-fill"></i></Link>
                        {
                          isEdit.id === album.id ?
                          <>
                          <button type="button" id="save" className="btn btn-sm btn-outline-success" onClick={() => handleEdit(album.id)}><i className="bi bi-floppy-fill"></i></button>
                          <button type="button" id="close" className="btn btn-sm btn-outline-danger" onClick={() => setIsEdit({bool: false,id: 0})}><i className="bi bi-x-circle-fill"></i></button>
                          </>
                          :
                          <button type="button" id="edit" className="btn btn-sm btn-outline-warning" onClick={() => handleIsEdit(album.id)}><i className="bi bi-pencil-square"></i></button> 
                        }
                        <button type="button" id="delete" className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(album.id)}><i className="bi bi-trash3-fill"></i></button>
                      </div>
                      <small className="text-muted">{<Moment fromNow>{album.date}</Moment>}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center">
              <div className="col-auto">
                <button className="btn btn-primary" onClick={loadMorePaginate} disabled={loadMore >= album.length ? true : false}>{loadMore >= album.length ? "It's Done" : 'Load More' }</button>
              </div>
            </div>
            
            
            </>
          )
        }
      </div>
    </div>
    </>
  )
}

export const AllAlbumData = () => {

  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(3);
  const [isEdit, setIsEdit] = useState({bool: false ,id: 0});
  const [editTitle, setEditTitle] = useState("");
  
  useEffect(() => {
    const AlbumGetData = async () => {
      setLoading(true);
      
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/albums`);
        
        const postRandomDates= res.data.map(async (album) => {
          const photos = await getAlbumCoverPhotosForIds(album.id);
          const shuffledAlbums = photos?.sort(() => Math.random() - 0.5);
          const shuffledAlbumsData = shuffledAlbums?.slice(0, 4);
          return {
            ...album,
            date: randomDate(new Date(2022,0,1), new Date()),
            photos: shuffledAlbumsData
          }
        })

        const albumsWithPhotos = await Promise.all(postRandomDates);
        
        albumsWithPhotos.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAlbum(albumsWithPhotos);
        setLoading(false);
      } catch (error) {
        return error;
      }
    }

    const getAlbumCoverPhotosForIds = async (ids) => {
      try {
          const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${ids}/photos`);
          return res.data;

      } catch (error) {
        console.error("Error fetching album data:", error);
        return [];
      }
    };

    AlbumGetData();
  }, [])

  const loadMorePaginate = () => {
    setLoadMore((prevValue) => prevValue + 6);
  }

  const handleEdit = (id) => {
    axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`, { "id":1, "title": editTitle})
    .then((res) => {
      const updateAlbumState= album.map((item) => {
        if(item.id === id){
          return {...item, "title": res.data.title}
        }
  
        return item;
      })
      setAlbum(updateAlbumState);
      setIsEdit({bool: false,id: 0});
    })
    .catch((error) => {
      console.log("Error updating album:", error);
    });
    
  }

  const handleIsEdit = (id) => {
    setIsEdit({bool: true,id: id});
    const inputValueAlbumTitleFindId = album.find((item) => item.id === id);

    setEditTitle(inputValueAlbumTitleFindId.title);
  }

  const handleDelete = (id) => {
    const res = axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
    
    setAlbum(oldAlbum => { return oldAlbum.filter(album => album.id !== id)});

    return res;
  }

  return (
    <>
    <div className="container py-3">
      <div className="row">
        {
          loading ? (
          <h2 className="text-center mt-4">Loading...</h2>
          )
          :
          (
          <>
          {album.slice(0,loadMore).map((album) => (
            <div className="col-12 col-sm-6 col-md-4" key={album.id}>
              <div className="card mb-4 shadow-sm">
                <div className="row">
                  <div className="col-6 pe-0">
                    <img src={album.photos[0].url} className="img-fluid rounded-top rounded-end-0" alt="" />
                    <img src={album.photos[1].url} className="img-fluid" alt="" />
                  </div>
                  <div className="col-6 ps-0">
                    <img src={album.photos[2].url} className="img-fluid rounded-top rounded-start-0" alt="" />
                    <img src={album.photos[3].url} className="img-fluid" alt="" />
                  </div>
                </div>
                <div className="card-body">
                  {
                    isEdit.bool && isEdit.id === album.id ? 
                    <input type="text" className="my-3" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}/>
                    :
                    <p className="card-text">{album.title}</p>
                  }
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link className="btn btn-sm btn-outline-primary" to={`/albums/${album.id}/photos`}><i className="bi bi-eye-fill"></i></Link>
                      {
                        isEdit.id === album.id ?
                        <>
                        <button type="button" id="save" className="btn btn-sm btn-outline-success" onClick={() => handleEdit(album.id)}><i className="bi bi-floppy-fill"></i></button>
                        <button type="button" id="close" className="btn btn-sm btn-outline-danger" onClick={() => setIsEdit({bool: false,id: 0})}><i className="bi bi-x-circle-fill"></i></button>
                        </>
                        :
                        <button type="button" id="edit" className="btn btn-sm btn-outline-warning" onClick={() => handleIsEdit(album.id)}><i className="bi bi-pencil-square"></i></button> 
                      }
                      <button type="button" id="delete" className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(album.id)}><i className="bi bi-trash3-fill"></i></button>
                    </div>
                    <small className="text-muted">{<Moment fromNow>{album.date}</Moment>}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
            <div className="d-flex justify-content-center">
                <div className="col-auto">
                  <button className="btn btn-primary" onClick={loadMorePaginate} disabled={loadMore >= album.length ? true : false}>{loadMore >= album.length ? "It's Done" : 'Load More' }</button>
                </div>
            </div>
          </>
          )
        }
      </div>
    </div>
    </>
  )
}

// Album Detail (Photos) Page
export const AlbumToPhotos = ({id}) => {
  const [albumToPhotos, setAlbumToPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [photoPage, setPhotoPage] = useState(2);
  const [photoLimit, setPhotoLimit] = useState(10);
  const [dataLength, setDataLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);


  useEffect(() => {
    const AlbumToPhotosData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos?_page=1&_limit=10`);
        const resData= res.data.map((photos) => ({
          ...photos,
          date: randomDate(new Date(2022,0,1), new Date())
        }))

        resData.sort((a, b) => new Date(b.date) - new Date(a.date));

        setAlbumToPhotos(resData);
        setDataLength(res.headers['x-total-count']);
        setLoading(false);
      } catch (error) {
        return error;
      }
    }
    AlbumToPhotosData();
  }, [])
  
  const OPTIONS = { dragFree: true }
  const SLIDE_COUNT = 3
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


  const totalPage = dataLength / photoLimit;
  const moreData = () => {

    if(photoPage <= totalPage){
      axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos?_page=${photoPage}&_limit=${photoLimit}`)
      .then((res) => {
        setAlbumToPhotos(albumToPhotos.concat(res.data))
      })
      setPhotoPage(prevData => prevData + 1);
    }else {
      setHasMore(false);
    }
    
  }

  const handleOpenLightBox = (index) => {
    setIsOpen(true);
    setLightboxIndex(index + SLIDE_COUNT);
  }
  return ( 
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-3">
          <Link to={'/albums'} className="mt-3 text-dark text-decoration-none"><i className="bi bi-arrow-left fs-2">Albums</i></Link>
        </div>
      
        {
          loading ?
          <h2 className="text-center mt-4">Loading...</h2>
          :
          <>
          {
            isOpen && <YetLightbox isOpen={isOpen} close={() => setIsOpen(false)} albumToPhotos={albumToPhotos} photoIndex={lightboxIndex}/>
          }
            <EmblaCarousel slides={SLIDES} options={OPTIONS} albumToPhotos={albumToPhotos.slice(0,3)} allAlbumPhotos={albumToPhotos} />
            <InfiniteScroll
            dataLength={albumToPhotos.length}
            next={moreData} 
            hasMore={hasMore}
            loader={<p>Loading...</p>}
            endMessage={<p className="text-warning fw-semibold pt-2">It's Done!</p>}
            style={{overflow: "hidden", textAlign: "center"}}
            >
                
            <div className="row">
            {
              albumToPhotos.slice(3,photoLimit * (photoPage - 1)).map( (item,index) => (
                  <div className="col-12 col-sm-6 col-md-3 py-2 " key={item.id}>
                    <Link>
                      <img src={item.url} alt="" className="img-fluid" onClick={() => handleOpenLightBox(index,"img")}/>
                    </Link>
                  </div>
              ))
            }
            </div>
            </InfiniteScroll>
          </>
        }
      </div>
    </div>
    </>
  )
}


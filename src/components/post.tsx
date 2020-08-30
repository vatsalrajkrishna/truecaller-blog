import React, { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";

import './post.scss';
import { IPostsEntity } from './home';
import PostCardComponent from './screams';


function SingleViewComponent() {
    let { id } = useParams();
    const [loading, setLoader] = useState<boolean>(false);
    const [loadingRelated, setLoaderRelated] = useState<boolean>(false);
    const [apiRes, setApiRes] = useState<IPostsEntity | null>(null);
    const [apiResRelated, setApiResRelated] = useState<IPostsEntity[] | null>(null);


    const fetchPosts = () => {
        setLoader(true);
        fetch(`http://localhost:9000/post?id=${id}`)
            .then(res => res.json())
            .then((res: IPostsEntity) => {
                setLoader(false);
                if (res && res.ID) {
                    setApiRes(res);
                }
            }).catch(() => {
                setLoader(false);
                console.log("error");
            });
    }

    const fetchRelatedPosts = () => {
        setLoaderRelated(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://localhost:9000/related?id=${id}`, requestOptions)
            .then(res => res.json())
            .then((res: IPostsEntity[]) => {
                setLoaderRelated(false);
                setApiResRelated(res);
            }).catch(() => {
                setLoaderRelated(false);
                console.log("error");
            });
    }

    useEffect(() => {
        fetchPosts();
        fetchRelatedPosts();
    }, [id])

    return <div className="single-content-wrapper">
        {loading ?
            <div className="loader">
                Loading...
            </div>
            :
            apiRes ?
                <>
                    <div className="title" dangerouslySetInnerHTML={{ __html: apiRes.title }} />
                    <br />
                    <br />
                    <div className="thumbnail-wrapper">
                        <img src={apiRes.post_thumbnail && apiRes.post_thumbnail.URL} alt={apiRes.title} />
                    </div>
                    <div className="date">Published on: {new Date(apiRes.date).getDate()}/{new Date(apiRes.date).getMonth()}/{new Date(apiRes.date).getFullYear()}</div>
                    <br />
                    <div className="content" dangerouslySetInnerHTML={{ __html: apiRes.content ? apiRes.content : '' }} />
                    <br />
                    <br />
                    <h1>Related Posts -</h1>
                    {loadingRelated ? <div className="loader">Loading Related Posts...</div> :
                        apiResRelated && apiResRelated.length > 0 ?
                            apiResRelated.map(relatedPost =>
                                <PostCardComponent key={relatedPost.ID} {...relatedPost} reverse={0} />
                            )
                            :
                            <div>
                                No Related Posts Found!
                                </div>}
                </>
                :
                <div>
                    No post found!
                </div>
        }
    </div>
}

export default SingleViewComponent;

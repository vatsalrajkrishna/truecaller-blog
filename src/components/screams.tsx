import React from 'react';
import TimeAgo from 'react-timeago';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {
    Link
} from "react-router-dom";

import './screams.scss';
import { IPostsEntity } from './home';

function PostCardComponent(props: IPostsEntity & { reverse: number | boolean }) {
    return <div className={`card-box ${props.reverse ? 'card-box-row-reverse' : 'card-box-row'}`}>
        <div className="thumbnail-wrapper">
            <Link className="post-link" to={`/post/${props.ID}`}>
                <img src={props.post_thumbnail && props.post_thumbnail.URL} alt={props.title} className="post-thumbnail" />
            </Link>
        
        <div className="content-wrapper">
          
            <Link className="post-link" to={`/post/${props.ID}`}>
                <div className="title" dangerouslySetInnerHTML={{ __html: props.title }} />
            </Link>
            <div className="date"><AccessTimeIcon style={{height:14, marginBottom:-2}} /> <TimeAgo date={props.date} /></div>

            <Link className="post-link" to={`/post/${props.ID}`}>
                <div className="excerpt" dangerouslySetInnerHTML={{ __html: props.excerpt ? props.excerpt : '' }} />
            </Link>
            <br/>
            <Link className="post-linked" to={`/post/${props.ID}`}>
                Continue Reading →            
            </Link>
            
        </div>
        
        </div> 
        
    </div>
}

export default PostCardComponent;

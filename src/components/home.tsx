import React from 'react';
import './home.scss';
import PostCardComponent from '../components/screams';


interface IHomeComponent {
    apiResponse: IGetPostsApiResponse | null;
    loading: boolean;
    lastPageNumber: number;
    currentPageNumber: number;
    loadingCategories: boolean;
    loadingTags: boolean;
    apiResponseCat: [{
        name: string;
        slug: string;
        ID: number
    }] | null;
    apiResponseTags: [{
        name: string;
        slug: string;
        ID: number
    }] | null;
}

export interface IGetPostsApiResponse {
    found: number;
    posts?: (IPostsEntity)[] | null;
    meta: IMeta;
}
export interface IPostsEntity {
    ID: number;
    date: string;
    title: string;
    URL?: string;
    excerpt?: string;
    content?: string;
    status?: string;
    post_thumbnail?: IPostThumbnail;
}
export interface IPostThumbnail {
    ID: number;
    URL: string;
    guid: string;
    mime_type: string;
    width: number;
    height: number;
}
export interface IMeta {
    links: ILinks;
    next_page: string;
}
export interface ILinks {
    counts: string;
}


class HomeComponent extends React.Component<{}, IHomeComponent> {

    constructor(props: {}) {
        super(props);
        this.state = {
            apiResponse: null,
            apiResponseCat: null,
            apiResponseTags: null,
            loading: false,
            loadingCategories: false,
            loadingTags: false,
            currentPageNumber: 1,
            lastPageNumber: 1
        }
    }

    componentDidMount() {
        this.fetchPosts();
        this.fetchCategories();
        this.fetchTags();
    }
    fetchPosts(pageNumber: number = 1, opt?: { key: string, value: string }) {
        this.setState({ loading: true, currentPageNumber: pageNumber });
        const optionalParam = opt ? '&' + opt.key + '=' + opt.value : '';
        fetch(`http://localhost:9000/posts?page=${pageNumber}${optionalParam}`)
            .then(res => res.json())
            .then((res: IGetPostsApiResponse) => {
                this.setState({ loading: false });
                if (Object.keys(res) && Object.keys(res).length > 0 && res.found) {
                    this.setState({ apiResponse: res, lastPageNumber: Math.ceil(res.found / 25) });
                }
            }).catch(() => {
                this.setState({ loading: false });
                console.log("error");
            });;
    }

    fetchCategories() {
        fetch('http://localhost:9000/categories')
            .then(res => res.json())
            .then((res: [{
                name: string;
                slug: string;
                ID: number
            }]) => {
                console.log(res);
                this.setState({ loadingCategories: false });
                if (Object.keys(res) && Object.keys(res).length > 0) {
                    this.setState({ apiResponseCat: res });
                }
            }).catch(() => {
                this.setState({ loadingCategories: false });
                console.log("error");
            });;
    }

    fetchTags() {
        fetch('http://localhost:9000/tags')
            .then(res => res.json())
            .then((res: [{
                name: string;
                slug: string;
                ID: number
            }]) => {
                console.log(res);
                this.setState({ loadingTags: false });
                if (Object.keys(res) && Object.keys(res).length > 0) {
                    this.setState({ apiResponseTags: res });
                }
            }).catch(() => {
                this.setState({ loadingTags: false });
                console.log("error");
            });;
    }

    setCategory(slug: string) {
        const opt = { key: 'category', value: slug };
        this.fetchPosts(1, opt);
    }

    setTag(slug: string) {
        const opt = { key: 'tag', value: slug };
        this.fetchPosts(1, opt);
    }

    render() {
        return (
            <div className="home-page-wrapper">
                <div className="main-page">
                    {this.state.loading ? <div className="loader">
                        Loading...
                    </div>
                        :
                        <>
                            {this.state.apiResponse && this.state.apiResponse.posts && this.state.apiResponse.posts.length > 0 ?
                                <>
                                    <div>
                                        {this.state.apiResponse.posts.map((post, pi) => {
                                            return <PostCardComponent key={post.ID} {...post} reverse={pi % 2} />
                                        })}
                                    </div>
                                    {this.state.currentPageNumber <= 1 && this.state.currentPageNumber >= this.state.lastPageNumber ? '' : <div className="pagination">
                                        <button className={`${this.state.currentPageNumber <= 1 ? 'disabled' : ''}`} onClick={() => this.fetchPosts(this.state.currentPageNumber - 1)}
                                            disabled={this.state.currentPageNumber <= 1}>Prev</button>
                                        <button className={`${this.state.currentPageNumber >= this.state.lastPageNumber ? 'disabled' : ''}`} onClick={() => this.fetchPosts(this.state.currentPageNumber + 1)}
                                            disabled={this.state.currentPageNumber >= this.state.lastPageNumber}>Next</button>
                                    </div>}

                                </>
                                :
                                <div>No Posts Available to show</div>}
                        </>}
                        
                </div>
                <div className="side-page">
                    <br/><br/>
                    <div className="cats-wrapper">
                        <a href="https://play.google.com/store/apps/details?id=com.truecaller&referrer=utm_source%3Dblogbanner" target="_blank">
                        <img src="ad.png" alt="Ads"/>
                        </a>
                    </div>
                    <div className="line"></div>
                    <h5>CATEGORIES</h5>
                    {this.state.loadingCategories ? <div className="loader">Loading Categories...</div> :
                        this.state.apiResponseCat && this.state.apiResponseCat.length > 0 ?
                            <ul className="cats-wrapper">
                                {this.state.apiResponseCat.map(cat =>
                                

                                
                                    <li className="cat" onClick={() => this.setCategory(cat.slug)}>
                                        <p></p>{cat.name}
                                    </li>)
                                    }
                            </ul> :
                            <div>No Categories Found!</div>}
                    <br />
                    <div className="line"></div>
                    <h5>Tags</h5>
                    {this.state.loadingTags ? <div className="loader">Loading Categories...</div> :
                        this.state.apiResponseTags  && this.state.apiResponseTags.length > 0 ?
                            <ul className="tags-wrapper">
                                {this.state.apiResponseTags.map(tag =>
                                    <li className="tag" onClick={() => this.setTag(tag.slug)}>{tag.name}</li>
                                )}
                            </ul> :
                            <div>No Tags Found!</div>}
                </div>
                
            </div>
            
        );
    }
}

export default HomeComponent;

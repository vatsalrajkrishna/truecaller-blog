import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import HomeComponent from '../components/home';
import SingleViewComponent from '../components/post';
import './index.scss';
import Footer from '../components/footer';
function IndexRouter() {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}

            <div className="header-main">

                <div className="header-title">
                    <h1 className="site-title">
                        <a href="/Home" style={{color:"white", textDecoration: 'none', fontStyle:'italic'}}>
                            truecaller
                        </a>
                        <a className="an" href="https://www.truecaller.com/" style={{color:"white", textDecoration: 'none', fontSize:'10px',position: 'absolute', right: 0, marginTop:'15px', marginRight:'5px'}}>
                            VISIT TRUECALLER.COM
                        </a>

                    </h1>
                </div>
                <header className="header-image-container">
                    <img src="https://truecaller.blog/wp-content/uploads/2017/03/cropped-blog-header.png" alt="Header"/>
                </header>
            </div>
            <Switch>
                <Route path="/post/:id">
                    <SingleViewComponent />
                </Route>
                <Route path="/Home">
                    <HomeComponent />
                </Route>

                <Route render={() => <Redirect to="/Home" />} />
            </Switch>
            <Footer/>
        </Router>
    );
}

export default IndexRouter;

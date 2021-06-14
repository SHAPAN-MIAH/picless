import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import About from '../About/About';
import PhotoGallery from '../PhotoGallery/PhotoGallery';
import VideoGallery from '../VideoGallery/VideoGallery';

const LiveSectionRoutes: React.FunctionComponent = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/photos">
                        <PhotoGallery />
                    </Route>
                    <Route path="/videos">
                        <VideoGallery />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default LiveSectionRoutes;
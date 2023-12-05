import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading/Spinner';
import ProjectsItem from '../ProjectItem';
import RecomProjects from '../RecomProject';
import './styles.css';

const Feed = props => {
    if(props.loading) {
        return <LoadingFeed />
    } else if(props.feed){
        return <RenderFeed {...props} />
    }
}

const LoadingFeed = props => (
    <div>
        <Loading />
    </div>
);


const RenderFeed = props => (
    <div className = "projectfeed_container">
        <div className = "projectfeed_projects">
            <br/>
            <h1>
                &nbsp; # 프로젝트 
            </h1>
            <br></br>
            {props.feed.map(project => <ProjectsItem { ...project} key={project.id} />)}
        </div>

        <div className = "projectfeed_recomprojects">
            <br/>
            <p className = "projectfeed_recomprojects_title">
                &nbsp; # 추천 프로젝트 
            </p>
            <RecomProjects/>
        </div>
    </div>
)

Feed.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Feed;
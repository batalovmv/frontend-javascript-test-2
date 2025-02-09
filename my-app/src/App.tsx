import React from 'react';

import SearchBarContainer from './containers/SearchBarContainer';
import RepoListContainer from './containers/RepoListContainer';

const App: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <SearchBarContainer />
            <RepoListContainer />
        </div>
    );
};

export default App;
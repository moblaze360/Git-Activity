import React, { useState, useEffect} from "react";
import { Form, FormGroup, FormButton, FormInput, Card, Icon, Image } from 'semantic-ui-react';
import './App.css';

function App() {
	const [name, setName] = useState('');
	const [userName, setUsername] = useState('');
	const [followers, setFollowers] = useState('');
	const [following, setFollowing] = useState('');
	const [repos, setRepos] = useState('');
	const [avatar, setAvatar] = useState('');
	const [userInput, setUserInput] = useState('');
	
    useEffect(() => {
        fetch(`https://api.github.com/users/facebook`)
        .then(response => response.json())
        .then(data => {
            setData(data);
        });

    }, []);

    const setData = ({ name, login, followers, following, public_repos, avatar_url }) => {
        setName (name);
        setUsername(login);
        setFollowers(followers);
        setFollowing(following);
        setRepos(public_repos);
        setAvatar(avatar_url);
    };

    const handleSearch = (event) => {
        setUserInput(event.target.value)
    }

    const handleSubmit = () => {
        fetch(`https://api.github.com/users/${userInput}`)
        .then(response => response.json())
        .then(data => {
            
            setData(data);
        });

    }

	return (
		<div>
		    <div className='navbar'>
                Find Git User 
            </div>
            <div className='search'>
                <Form onSubmit={handleSubmit} >
                    <FormGroup>
                        <FormInput placeholder='Search' name='github user' onChange={handleSearch} />
                        <FormButton content='Search' />
                    </FormGroup>
                </Form>
            </div>
            <div className="card">
                <Card>
                    <Image src={avatar} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Header>{userName}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        
                            <Icon name='user' />
                            {followers} Friends
                        
                    </Card.Content>
                    <Card.Content extra>
                        
                            <Icon name='user' />
                            {repos} Repos
                        
                    </Card.Content>
                    <Card.Content extra>
                        
                            <Icon name='user' />
                            {following} following
                        
                    </Card.Content>
                </Card>
            </div>
		</div>
	);
}

export default App;
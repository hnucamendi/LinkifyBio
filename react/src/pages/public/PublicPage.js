import Button from '@mui/material-next/Button';
import { Container, Avatar, CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { getBioData } from '../../api/public/PublicApi';
import React from 'react';
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons'

export default class PublicPage extends React.Component {

    state = {
        bioInfo: {},
        links: [],
        socialMediaLinks: [],
        isImageLoaded: false,
        isLoading: true,
        error: false
    };

    componentDidMount() {
        const id = window.location.href.split('/')[3]
        getBioData(id).then((data) => {
            document.title = `${data.bioInfo.name} - LinkifyBio`;

            this.setState({ bioInfo: data.bioInfo });
            this.setState({ links: data.links });
            this.setState({ socialMediaLinks: data.socialMediaLinks });
            this.setState({ isLoading: false })
            this.setState({ error: false })
        }).catch((error) => {
            this.setState({ error: true })
        });
    }

    render() {


        if (!this.state.error) {

            return (

                <Container maxWidth="sm">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={1} width="100%">
                            <Box justifyContent="center" marginTop={10} alignItems="center" textAlign="center">
                                <center>

                                    {this.state.isLoading && <CircularProgress />}

                                    <Avatar
                                        src={this.state.bioInfo.imageUrl}
                                        onLoad={() => this.setState({ isImageLoaded: true })}
                                        sx={{ width: 100, height: 100, display: this.state.isImageLoaded ? 'block' : 'none' }}
                                    />
                                </center>
                                <h1>{this.state.bioInfo.name}</h1>
                                <p>{this.state.bioInfo.descriptionTitle}</p>
                            </Box>
                            {this.state.links ?
                                this.state.links.map((link, index) => (
                                    <Box key={index} width="100%">

                                        <Box key={index} width="100%" style={{ marginBottom: '10px' }}> {/* Add this line */}
                                            <Button
                                                color="tertiary"
                                                size="large"
                                                variant="filled"
                                                href={link.url}
                                                sx={{
                                                    width: "100%",
                                                    backgroundColor: "#000000",
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center', // Change this line
                                                    padding: '12px',
                                                    '&:hover': {
                                                        backgroundColor: "#808080",
                                                    }
                                                }}
                                            >
                                                <SocialIcon url={`${link.url}`} bgColor="transparent" fgColor='white' style={{ height: 30, width: 30 }} /> {/* Add marginRight */}
                                                <Box style={{ textAlign: 'center', flexGrow: 1, marginRight: 30 }}> {/* Remove margin and add flexGrow */}
                                                    {link.name}
                                                </Box>
                                            </Button>
                                        </Box>
                                    </Box>
                                ))
                                : <Box><h1>No links found</h1></Box>
                            }
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" marginBottom={4} marginTop={4} flexWrap="wrap">
                        {
                            this.state.socialMediaLinks.map((link, index) => (
                                <Box key={index} margin={1}>
                                    <SocialIcon url={link.url} bgColor="transparent" fgColor='#1DA1F2' />
                                </Box>
                            ))
                        }
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Button variant="contained" href='https://linkifybio.com' color="primary" startIcon={
                            <img
                                src={'/logox100.png'}
                                style={{ height: 20, width: 20, marginRight: -3 }}
                                draggable="false"
                                alt='linkifybio'
                            />}>
                            LinkifyBio
                        </Button>
                    </Box>
                </Container>
            );

        } else {

            return (
                <Container maxWidth="sm" style={{ height: '100vh' }}>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                        <Typography variant="h2" align="center">Oops!</Typography>
                        <Typography variant="h2" align="center">Page Not Found</Typography>

                        <Button variant="contained" href='https://linkifybio.com' sx={{ marginTop: 10}} color="primary" startIcon={
                            <img
                                src={'/logox100.png'}
                                style={{ height: 20, width: 20, marginRight: -3 }}
                                draggable="false"
                                alt='linkifybio'
                            />}>
                            Create a LinkifyBio page
                        </Button>
                    </Box>
                </Container>
            )

        }


    }
}

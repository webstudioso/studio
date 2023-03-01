/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Chip, InputLabel, Input, Container, Stack, FormControl, InputAdornment } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import AccountCircle from '@mui/icons-material/AccountCircle';


import { LOADER, SNACKBAR_OPEN } from "store/actions";
import { useDispatch } from "react-redux";
import axios from 'axios';

const Users = ({ handleClose, editor, principal, projectId }) => {
    const dispatch = useDispatch();
    const [project, setProject] = useState();
    const [collaborators, setCollaborators] = useState([]);
    const [current, setCurrent] = useState();

    const loadProject = async () => {
        try {
            setCurrent();
            setCollaborators([]);
            dispatch({ type: LOADER, show: true });
            const currentProject = await axios.get(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${projectId}`,
                {
                    headers: {
                    "AuthorizeToken": `Bearer ${principal}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                    }
                }
            );
            setProject(currentProject?.data);
            const collabs = currentProject?.data?.collaborators;
            setCollaborators(collabs || []);
        } finally {
            dispatch({ type: LOADER, show: false });
        }
    };

    useEffect(() => {
        loadProject();
    }, []);

    const handleAddUser = async(e) => {
        try {
            dispatch({ type: LOADER, show: true });
            if (e.key === 'Enter') {
                e.preventDefault();
                const newCollaborator = current;
                if (!project.collaborators) project.collaborators = [];
                if (!project.collaborators.includes(newCollaborator) && newCollaborator) {
                    console.log('Adding new collaborator ', newCollaborator);
                    project.collaborators.unshift(newCollaborator);
                    await axios.post(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${projectId}`,
                        project,
                        {
                            headers: {
                                "AuthorizeToken": `Bearer ${principal}`,
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            }
                        }
                    )
                    loadProject();
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: 'Collaborators Saved',
                        variant: "alert",
                        anchorOrigin: { vertical: "bottom", horizontal: "right" },
                        alertSeverity: "success"
                    });
                }
            }
        } catch (e) {
            dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: e.message,
				variant: "alert",
				anchorOrigin: { vertical: "bottom", horizontal: "right" },
				alertSeverity: "error"
			});
        } finally {
            dispatch({ type: LOADER, show: false });
        }
    }


    const handleDeleteUser = async(uid) => {
        try {
            dispatch({ type: LOADER, show: true });
            if (project.collaborators.includes(uid)) {
                console.log('Removing collaborator ', uid);
                const collabs = project.collaborators.filter((e) => e !== uid);
                project.collaborators = collabs;

                console.log(project);
                await axios.post(`${process.env.REACT_APP_WEBSTUDIO_API_URL}/project/${projectId}`,
                    project,
                    {
                        headers: {
                            "AuthorizeToken": `Bearer ${principal}`,
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    }
                )
                loadProject();
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: 'Collaborators Saved',
                    variant: "alert",
                    anchorOrigin: { vertical: "bottom", horizontal: "right" },
                    alertSeverity: "success"
                });
            }
        } catch (e) {
            dispatch({
				type: SNACKBAR_OPEN,
				open: true,
				message: e.message,
				variant: "alert",
				anchorOrigin: { vertical: "bottom", horizontal: "right" },
				alertSeverity: "error"
			});
        } finally {
            dispatch({ type: LOADER, show: false });
        }
    }

    return (
        <Container sx={{ p: 5 }}>
            <Stack direction="column">
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Add a content collaborator format: did:ethr:0x.... and press enter
                    </InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    autoFocus
                    startAdornment={
                        <InputAdornment position="start" sx={{ color: 'white' }}>
                        <AccountCircle />
                        </InputAdornment>
                    }
                    onChange={ (e) => setCurrent(e.target.value) }
                    onKeyDown={handleAddUser}/>
                </FormControl>
            </Stack>
            <Stack direction="row" sx={{ mt: 4 }}>
                { collaborators?.map((collaborator, index) => {
                    return (
                        <Chip   key={collaborator} 
                                id={collaborator}
                                label={collaborator} 
                                variant="outlined" 
                                sx={{ mr: 1 }}
                                onClick={() => {}} icon={<FaceIcon />} 
                                onDelete={() => {
                                    handleDeleteUser(collaborator)
                                }}
                        />
                    )
                })}
            </Stack>
        </Container>
    );
}

export default Users;

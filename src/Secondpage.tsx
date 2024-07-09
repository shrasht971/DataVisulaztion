import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import DepartmentComponent from '../src/DepartmentCompnent/DepartmentCompnent';
import axios from 'axios';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const SecondPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const columns: GridColDef[] = [
        { field: 'userId', headerName: 'User ID', width: 90 },
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'body', headerName: 'Body', width: 300 },
    ];

    return (
        <Box
            sx={{
                height: 400,
                width: '98%',
                marginLeft: { xs: 0, md: 5 }, // marginLeft 0 for mobile and 5 for md and up
                padding: { xs: 2, md: 4 },
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontSize: { xs: '1.2rem', md: '2rem' }, // Smaller font size for mobile
                }}
                gutterBottom
                align="center"
            >
                User Posts
            </Typography>
            <DataGrid 
                rows={posts}
                columns={columns}
                checkboxSelection
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5 },
                    },
                }}
                autoHeight
            />
            <DepartmentComponent />
        </Box>
    );
};

export default SecondPage;

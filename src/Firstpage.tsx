import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';

const FirstPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ name: '', phone: '', email: '' });

    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const validatePhone = (phone: string) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    };

    const handleSubmit = () => {
        let valid = true;
        const newErrors = { name: '', phone: '', email: '' };

        if (!name) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!phone) {
            newErrors.phone = 'Phone number is required';
            valid = false;
        } else if (!validatePhone(phone)) {
            newErrors.phone = 'Enter a valid 10-digit phone number';
            valid = false;
        }

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Enter a valid email';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
            navigate('/second');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                padding: { xs: 2, md: 6 },
                marginLeft: { xs: 0, md: 60 },
                marginRight: { xs: 0, md: 60 },
            }}
        >
            <Box sx={{ width: '100%', maxWidth: 400, padding: { xs: 2, md: 0 } }}>
                <Typography variant="h4" gutterBottom align="center">
                    User Details
                </Typography>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                error={Boolean(errors.phone)}
                                helperText={errors.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default FirstPage;

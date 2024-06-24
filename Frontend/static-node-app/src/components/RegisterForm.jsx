import { useState } from "react";
import { Button, Input, Link, Spacer } from "@nextui-org/react";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success) {
                setSuccess('Registration successful! You can now log in.');
                setError('');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                automaticLogin();
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const automaticLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            const data = await response.json();
            console.log('Response data:', data);
            if (data.success) {
                window.location.href = '/';
                console.log("data login success");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="loginDiv">
            <h1 className="loginHeader">Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <Spacer y={3} />
            <form onSubmit={handleSubmit}>
                <Spacer y={1} />
                <Input
                    label="Username"
                    placeholder="Enter your name"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    required
                />
                <Spacer y={2} />
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />
                <Spacer y={2} />
                <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                />
                <Spacer y={2} />
                <Input
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    required
                />
                <Spacer y={3} />
                <Button type="submit" shadow color="primary" auto>
                    Register
                </Button>
                <Spacer y={3} />
            </form>
            <p>Already have an account? <Link href="/login">Login here</Link></p>
        </div>
    );
}

export default RegisterForm;

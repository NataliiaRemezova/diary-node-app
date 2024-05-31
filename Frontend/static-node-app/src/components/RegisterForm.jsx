import {useState} from "react";
import {Button, Input, Link, Spacer} from "@nextui-org/react";

function RegisterForm (){
    const [name, setName] = useState('');
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
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (data.success) {
                // Redirect to login page or display success message
                setSuccess('Registration successful! You can now log in.');
                setError('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };
    return(
        <div className="loginDiv">
            <h1 className="loginHeader">Register</h1>
            {error && <p color="error">{error}</p>}
            {success && <p color="success">{success}</p>}
            <Spacer y={3} />
            <form onSubmit={handleSubmit}>
                <Spacer y={1} />
                <Input
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
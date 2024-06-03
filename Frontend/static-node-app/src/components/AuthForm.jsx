import  {useState} from "react";
import {Button, Input, Link, Spacer} from "@nextui-org/react";

function AuthForm (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.success) {
                // Redirect to dashboard or home page
                setEmail('');
                setPassword('');
                window.location.href = '/dashboard';
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };
    return (
        <div className="loginDiv">
            <h1 className="loginHeader">Login</h1>
            {error && <p color="error">{error}</p>}
            <Spacer y={10} />
            <form onSubmit={handleSubmit}>
                <Spacer y={1} />
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    autoComplete="off"
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
                <Spacer y={5} />
                <Button type="submit" shadow color="primary" auto>
                    Login
                </Button>
                <Spacer y = {4}/>
            </form>
            <p> You don´t have a profil? <Link href="/registration">Register here</Link></p>
        </div>
    );
}
export default AuthForm;
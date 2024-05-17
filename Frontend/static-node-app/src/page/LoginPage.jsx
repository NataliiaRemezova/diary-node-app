import "../styles/LoginPage.css";
import {Card} from "@nextui-org/react";
function LoginPage(){

    return (
        <div>
            <div className="loginDiv">
                <p>hello</p>
            </div>
            <Card
                isBlurred
                className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
                shadow="sm">
                {/*hier kommt später Login registration hin*/}
            </Card>
        </div>
    );
}
export default LoginPage
import { Link } from "react-router-dom";
export function Start(){
 return(
    <>
        <Link to={"/Home"}>Jobs</Link>
        <Link to={"/Admin"}>Admin</Link>
    </>
 );
}
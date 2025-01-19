import { useParams } from "react-router-dom";

function UserSumUp() {

    const { email } = useParams();

    return(<>{email}</>)
}

export default UserSumUp;
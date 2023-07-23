import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { Button, Center, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

const GmailLogin = ({ login }) => {
  const { signInWithGmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLog = () => {
    signInWithGmail().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };

  return (
    <Button
      onClick={handleGoogleLog}
      w={"full"}
      variant={"outline"}
      leftIcon={<FcGoogle />}
    >
      <Center>
        <Text>Sign in with Google</Text>
      </Center>
    </Button>
  );
};

export default GmailLogin;

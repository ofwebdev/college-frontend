import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { FaFacebook } from "react-icons/fa";
import { Button, Center, Text } from "@chakra-ui/react";

const FacebookLogin = ({ login }) => {
  const { signInWithFacebook } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLog = () => {
    signInWithFacebook().then((result) => {
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
      colorScheme={"facebook"}
      leftIcon={<FaFacebook />}
    >
      <Center>
        <Text>Continue with Facebook</Text>
      </Center>
    </Button>
  );
};

export default FacebookLogin;
